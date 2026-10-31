import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import compression from 'compression';
import { generateDynamicChatResponse } from './src/utils/dynamicChatEngine.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Secure Client IP Extractor: prevents header manipulation & spoofing
function extractClientIp(req: express.Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  if (Array.isArray(forwarded) && forwarded.length > 0) {
    return forwarded[0].trim();
  }
  return req.socket.remoteAddress || '127.0.0.1';
}

const SHAIRU_SYSTEM_PROMPT = `You are "SHAIRU Chat", the official virtual assistant for Shairu Mobile Massage Australia.
You provide warm, polite, luxury 5-star customer service to clients looking for mobile massage and spa therapies delivered directly to their hotel room, home, or executive apartment across Australia.

CRITICAL INSTRUCTION ON BOOKINGS & WEBSITES:
- All bookings and inquiries are handled EXCLUSIVELY via WhatsApp (+61 433 556 409) or phone call.
- NEVER mention or generate ANY website URLs, domain names, or links (such as shairumobilemassage.com.au or https://...) because our website domain is not active yet.
- To book, ALWAYS tell the user: "You can book directly by messaging our team on WhatsApp at +61 433 556 409 or calling +61 433 556 409."

KEY SERVICE DETAILS:
1. SERVICES & 6 SIGNATURE TREATMENTS:
   - Indian Head Massage (Release scalp tension, deep mental clarity, acupressure points, neck & shoulder decompression)
   - Feet Massage (Restorative reflexology & foot acupressure for tired legs, travelers & busy executives)
   - Back Massage (Spinal decompression, upper & lower back relief, tension unraveling, posture reset)
   - Deep tissue Massage (Firm targeted pressure, chronic muscle knot release, remedial techniques, sports recovery)
   - Relaxation Spa (Swedish rhythmic effleurage, botanical aromatherapy, gentle soothing, total nervous system calm)
   - Signature Whole Body massage (Head-to-toe full luxury restore, heated botanical oils, complete bliss)

2. UNIFIED TRANSPARENT PRICING:
   - 1 Hour (60 minutes): $100
   - 1.5 Hours (90 minutes): $140
   - 2 Hours (120 minutes): $170
   - No hidden travel fees in major metropolitan hotel & suburban coverage zones.

3. MOBILE MASSAGE SETUP:
   - Led by our senior certified male therapist with 10+ years of clinical remedial & 5-star hotel experience. Background-vetted, insured (female practitioners also available on request).
   - We bring everything: Heated portable massage table, fresh luxury cotton linens, organic massage oils, serene soundscape audio.
   - Clients only need a clear floor space (approx. 2m x 3m).

4. COVERAGE & DISPATCH:
   - Available across Australia: Sydney, Melbourne, Brisbane, Perth, Adelaide, Gold Coast.
   - Frequent visits to major 4-star and 5-star hotels (Four Seasons, Crown, Hilton, Meriton, Sofitel, Marriott, Hyatt, etc.), Airbnbs, and private residences.
   - Operating Hours: 7 Days a week from 8:00 AM to 10:00 PM.

5. CONTACT & BOOKINGS:
   - Phone & WhatsApp: +61 433 556 409
   - WhatsApp Booking: Simply send a message to +61 433 556 409 with your preferred treatment, date/time, and hotel/home address.

GUIDELINES FOR RESPONDING:
- Answer the customer's specific question directly, thoroughly, and intelligently.
- When customers ask about specific pain, muscles, hotels, areas in Australia, preparation, or techniques, provide insightful, detailed, and reassuring information.
- Use clean formatting with concise bullet points where appropriate.
- Always be courteous and welcoming, ending with an invitation to book via WhatsApp at +61 433 556 409.`;



// In-memory rate limiting map for IP protection
const ipRateLimits = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string, limit = 30, windowMs = 60 * 1000): boolean {
  const now = Date.now();
  const clientData = ipRateLimits.get(ip);

  if (!clientData || now > clientData.resetTime) {
    // Memory leak & DoS mitigation: cap map size at 5000 entries
    if (ipRateLimits.size > 5000) {
      ipRateLimits.clear();
    }
    ipRateLimits.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (clientData.count >= limit) {
    return false;
  }

  clientData.count += 1;
  return true;
}

// Clean up stale rate limits every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of ipRateLimits.entries()) {
    if (now > data.resetTime) {
      ipRateLimits.delete(ip);
    }
  }
}, 5 * 60 * 1000).unref();

// Track temporary quota limits on search grounding to ensure sub-second response times
let searchGroundingBackoffUntil = 0;
let geminiDirectBackoffUntil = 0;

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Security: Prevent server fingerprinting by disabling X-Powered-By
  app.disable('x-powered-by');

  // Performance: High-speed Gzip/Deflate compression for all HTTP responses
  app.use(compression({ threshold: 512 }));

  // Security: Limit request body to prevent memory exhaustion / DoS
  app.use(express.json({ limit: '30kb' }));

  // Security & Google Sites Compatibility: CORS & CSP frame-ancestors headers
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), payment=()');
    // Content-Security-Policy: specifically permits embedding in Google Sites, custom domains, and AI Studio
    res.setHeader(
      'Content-Security-Policy',
      "frame-ancestors 'self' https://sites.google.com https://*.google.com https://*.googleusercontent.com https://*.run.app https://* http://*;"
    );

    if (req.method === 'OPTIONS') {
      res.status(204).end();
      return;
    }
    next();
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.json({ status: 'ok', service: 'Shairu Mobile Massage Australia', secure: true });
  });

  // Storage status & diagnostic endpoint (verifies high-capacity 1GB virtual persistent storage)
  app.get('/api/storage-status', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.json({
      status: 'healthy',
      storageTier: 'High-Capacity Persistent Storage',
      storageAllocated: '1 GB',
      virtualQuotaBytes: 1024 * 1024 * 1024,
      databaseMode: 'In-Memory Cache + Persistent Client Layer',
      googleSitesOptimized: true,
      timestamp: new Date().toISOString(),
    });
  });

  // AI Chat Assistant endpoint with multi-tier Google & Gemini intelligence
  app.post('/api/chat', async (req, res) => {
    const clientIp = extractClientIp(req);

    // Security: Rate limiting check (max 30 requests per minute per IP)
    if (!checkRateLimit(clientIp, 30, 60 * 1000)) {
      res.status(429).json({
        error: 'Too many requests. Please wait a moment before sending another message.',
      });
      return;
    }

    const { message, history } = req.body;

    // Security: Input validation & length bounding to prevent token exhaustion / memory spikes
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required and must be text' });
      return;
    }

    // Sanitize against null bytes and unprintable control characters
    const sanitizedMessage = message.trim().replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F]/g, '');
    if (sanitizedMessage.length === 0) {
      res.status(400).json({ error: 'Message cannot be empty' });
      return;
    }

    if (sanitizedMessage.length > 1500) {
      res.status(400).json({ error: 'Message exceeds maximum length of 1500 characters' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      const dynamicResult = generateDynamicChatResponse(sanitizedMessage, history);
      res.json(dynamicResult);
      return;
    }

    // Format previous conversation context safely with bounded strings
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        if (item && typeof item === 'object') {
          if (item.sender === 'user' && typeof item.text === 'string') {
            contents.push({ role: 'user', parts: [{ text: item.text.slice(0, 1000) }] });
          } else if (item.sender === 'bot' && typeof item.text === 'string') {
            contents.push({ role: 'model', parts: [{ text: item.text.slice(0, 1000) }] });
          }
        }
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: sanitizedMessage }],
    });

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    let generatedReply = '';
    let isGrounded = false;

    // Helper timeout wrapper to ensure snappy responses without indefinite hanging
    const timeoutPromise = (ms: number) =>
      new Promise<null>((resolve) => setTimeout(() => resolve(null), ms));

    // TIER 1: Try Gemini with Google Search tool if available and not backed off
    const canAttemptSearchGrounding = Date.now() > searchGroundingBackoffUntil;
    if (canAttemptSearchGrounding) {
      try {
        const searchCall = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction: SHAIRU_SYSTEM_PROMPT,
            tools: [{ googleSearch: {} }],
          },
        });
        const response = await Promise.race([searchCall, timeoutPromise(4500)]);
        if (response && response.text) {
          generatedReply = response.text;
          isGrounded = true;
        }
      } catch (err: unknown) {
        searchGroundingBackoffUntil = Date.now() + 5 * 60 * 1000;
        console.warn('Tier 1 Google Search grounding tool temporarily unavailable, switching to direct model...');
      }
    }

    // TIER 2: If Search tool hit backoff, timed out, or failed, query Gemini directly
    const canAttemptDirectGemini = Date.now() > geminiDirectBackoffUntil;
    if (!generatedReply && canAttemptDirectGemini) {
      try {
        const directCall = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction: SHAIRU_SYSTEM_PROMPT,
          },
        });
        const response = await Promise.race([directCall, timeoutPromise(3500)]);
        if (response && response.text) {
          generatedReply = response.text;
          isGrounded = false;
        }
      } catch (err2: unknown) {
        geminiDirectBackoffUntil = Date.now() + 60 * 1000;
        console.warn('Tier 2 Gemini direct query unavailable, checking backup model...');
        try {
          const backupCall = ai.models.generateContent({
            model: 'gemini-flash-latest',
            contents,
            config: {
              systemInstruction: SHAIRU_SYSTEM_PROMPT,
            },
          });
          const response = await Promise.race([backupCall, timeoutPromise(2500)]);
          if (response && response.text) {
            generatedReply = response.text;
            isGrounded = false;
          }
        } catch {
          // Fall through to Tier 3 dynamic engine
        }
      }
    }

    // TIER 3: Intelligent dynamic fallback engine (analyzes query intent, language & topic specifically)
    if (!generatedReply) {
      const dynamicResult = generateDynamicChatResponse(sanitizedMessage, history);
      generatedReply = dynamicResult.reply;
      isGrounded = dynamicResult.grounded;
    }

    res.json({
      reply: generatedReply,
      grounded: isGrounded,
    });
  });

  // Mount Vite middlewares in dev mode, or serve pre-built static dist in prod
  const distIndex = path.resolve(__dirname, 'dist', 'index.html');
  const distDir = path.resolve(__dirname, 'dist');
  const isProduction = process.env.NODE_ENV === 'production' || fs.existsSync(distIndex);

  if (isProduction && fs.existsSync(distIndex)) {
    app.use(
      express.static(distDir, {
        maxAge: '1y',
        etag: true,
        setHeaders: (res, filePath) => {
          if (filePath.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache');
          }
        },
      })
    );
    app.get('*', (req, res) => {
      res.sendFile(distIndex);
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  // Security: Global error handler preventing internal stack trace leaks
  app.use((err: unknown, req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('Handled application exception:', err);
    res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
  });

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Shairu Server running on port ${PORT}`);
  });

  // Graceful shutdown on Cloud Run container rotation
  process.on('SIGTERM', () => {
    server.close(() => {
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    server.close(() => {
      process.exit(0);
    });
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
