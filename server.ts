import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SHAIRU_SYSTEM_PROMPT = `You are "Shairu AI Concierge", the official virtual assistant for Shairu Mobile Massage Australia.
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
   - Certified, background-vetted, insured female and male professional therapists.
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

// Smart Contextual Knowledge Base for fallback when Gemini API hits quota limits
function getContextualFallback(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('fee') || q.includes('how much') || q.includes('taka') || q.includes('dollar')) {
    return `Here is our transparent, all-inclusive pricing for all 6 signature treatments across Australia:

• 1 Hour (60 min): $100 — Ideal for focused tension relief or a targeted back/head session.
• 1.5 Hours (90 min): $140 — Our most popular choice for a deep, full-body restorative experience.
• 2 Hours (120 min): $170 — Ultimate head-to-toe luxury immersion.

*Note: All prices include portable heated table setup, organic oils, and fresh linens. No hidden travel fees within major metro hotel and residential zones!*

To book your treatment, simply message our team on WhatsApp at +61 433 556 409!`;
  }

  if (q.includes('hotel') || q.includes('room') || q.includes('resort') || q.includes('suite') || q.includes('stay')) {
    return `Yes! We specialize in 5-star hotel in-room visits across Australia (including Four Seasons, Crown, Hilton, Sofitel, Meriton, Hyatt, and boutique hotels).

How our hotel service works:
1. Booking: Message us on WhatsApp (+61 433 556 409) with your hotel name and room number.
2. Arrival: Your certified therapist arrives discreetly at your room with a portable heated massage table, clean luxury cotton sheets, organic essential oils, and tranquil ambient music.
3. Treatment: Enjoy a relaxing day-spa session without having to leave your room.

Available 7 days a week from 8:00 AM to 10:00 PM. Message us on WhatsApp (+61 433 556 409) for immediate hotel dispatch!`;
  }

  if (q.includes('deep tissue') || q.includes('pressure') || q.includes('knot') || q.includes('pain') || q.includes('sore') || q.includes('muscle')) {
    return `Our Deep Tissue Massage ($100 for 1h, $140 for 1.5h, $170 for 2h) is specifically designed to alleviate chronic muscle tightness, structural strain, and stubborn myofascial knots.

Key benefits:
• Targeted, firm pressure along deeper layers of muscle tissue and tendons
• Unravels tension from prolonged desk work, gym training, or long flights
• Custom pressure adapted to your comfort level throughout the session
• Uses heated therapeutic oils for smooth, restorative muscle release

Our therapists are fully certified and can adjust the intensity to your preference. Would you like to schedule a Deep Tissue session today?`;
  }

  if (q.includes('head') || q.includes('indian head') || q.includes('migraine') || q.includes('headache') || q.includes('scalp')) {
    return `Our Indian Head Massage ($100 for 1h, $140 for 1.5h, $170 for 2h) focuses on the acupressure points of the scalp, neck, temples, and shoulders.

What to expect:
• Dissolves mental fatigue, brain fog, and chronic tension headaches
• Stimulates micro-circulation in the scalp and releases upper trapezius stiffness
• Uses gentle circular thumb and fingertip friction with soothing botanical drops
• Leaves you deeply centered, clear-minded, and refreshed

Perfect as a mid-day recharge or an evening unwind in your room.`;
  }

  if (q.includes('feet') || q.includes('foot') || q.includes('leg') || q.includes('reflexology') || q.includes('walking')) {
    return `Our Restorative Feet Massage ($100 for 1h, $140 for 1.5h, $170 for 2h) is a revitalizing treatment targeting acupressure zones across the feet, ankles, and calves.

Highlights:
• Relieves swelling, travel fatigue, and soreness from walking or flights
• Balances energy pathways through targeted reflexology techniques
• Includes warm compression towels and hydrating botanical foot balm
• Promotes improved lymphatic drainage and deep relaxation

Ideal for travelers, runners, or anyone on their feet all day!`;
  }

  if (q.includes('prepare') || q.includes('bring') || q.includes('need') || q.includes('space') || q.includes('table')) {
    return `You don't need to prepare anything complicated—we bring the complete 5-star day-spa experience directly to you!

What our certified therapist brings:
• Deluxe portable heated massage table
• Freshly laundered cotton linens and soft plush towels
• Hypoallergenic organic massage oils and relaxing aromatherapy
• Soothing ambient relaxation soundscape

All you need is:
• A clear floor area of approximately 2m x 3m (in your living room, bedroom, or hotel suite)
• A comfortable room temperature

We take care of the entire setup and pack-down so you can simply relax and unwind.`;
  }

  if (q.includes('couple') || q.includes('two') || q.includes('2') || q.includes('partner') || q.includes('together')) {
    return `Yes, we gladly cater to couples, partners, and friends!

Options for Couples:
• Back-to-Back: One therapist provides consecutive treatments (e.g., 1 hour each or 1.5 hours each).
• Dual Therapists (Side-by-Side): Subject to therapist availability in your area, two therapists can visit together for synchronized treatments.

Rates remain our standard transparent pricing: $100 (1h), $140 (1.5h), and $170 (2h) per person.
Please reach out on WhatsApp at +61 433 556 409 to check simultaneous therapist availability for your area!`;
  }

  if (q.includes('sydney') || q.includes('melbourne') || q.includes('brisbane') || q.includes('location') || q.includes('area') || q.includes('where') || q.includes('coverage')) {
    return `Shairu provides on-demand mobile massage across Australia, with rapid dispatch to:
• Sydney (CBD, Eastern Suburbs, North Shore, Inner West, Northern Beaches, Western Suburbs)
• Melbourne (CBD, Southbank, Docklands, St Kilda, South Yarra)
• Brisbane, Gold Coast & metropolitan hubs

We travel directly to your hotel, serviced apartment, or residential home 7 days a week from 8:00 AM to 10:00 PM. No extra travel fees apply in major metro zones.

Need a therapist dispatched to your location today? Chat with us directly on WhatsApp at +61 433 556 409!`;
  }

  if (q.includes('time') || q.includes('hour') || q.includes('open') || q.includes('when') || q.includes('sunday') || q.includes('night')) {
    return `Our mobile therapists operate 7 days a week:
• Monday to Sunday: 8:00 AM – 10:00 PM
• On-demand daytime, evening, and weekend appointments available
• Advance bookings and same-day requests welcomed

To book your treatment, simply message us on WhatsApp at +61 433 556 409 for instant dispatch!`;
  }

  // Comprehensive custom answer for any other question
  return `Thank you for your question about "${query}".

Shairu Mobile Massage Australia brings luxury 5-star day-spa treatments straight to your hotel room or home 7 days a week (8:00 AM – 10:00 PM).

Our 6 signature treatments:
1. Indian Head Massage (Scalp, neck & mental decompression)
2. Feet Massage (Restorative reflexology & travel fatigue relief)
3. Back Massage (Spinal decompression & muscle release)
4. Deep Tissue Massage (Firm targeted knot release)
5. Relaxation Spa (Swedish aromatherapy & nervous system reset)
6. Signature Whole Body (Complete head-to-toe restorative care)

Pricing is unified across all treatments:
• 1 Hour: $100
• 1.5 Hours: $140
• 2 Hours: $170

Our certified therapists bring heated tables, fresh luxury linens, and organic oils. Would you like to book a session now, or ask about a specific treatment? You can also message our team instantly on WhatsApp at +61 433 556 409!`;
}

// Track temporary quota limits on search grounding to ensure sub-second response times
let searchGroundingBackoffUntil = 0;

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Shairu Mobile Massage Australia' });
  });

  // AI Chat Assistant endpoint with multi-tier Google & Gemini intelligence
  app.post('/api/chat', async (req, res) => {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      const reply = getContextualFallback(message);
      res.json({ reply, grounded: false });
      return;
    }

    // Format previous conversation context if provided
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        if (item.sender === 'user' && item.text) {
          contents.push({ role: 'user', parts: [{ text: item.text }] });
        } else if (item.sender === 'bot' && item.text) {
          contents.push({ role: 'model', parts: [{ text: item.text }] });
        }
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }],
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

    // TIER 1: Try Gemini with Google Search tool if not in temporary quota backoff
    const canAttemptSearchGrounding = Date.now() > searchGroundingBackoffUntil;
    if (canAttemptSearchGrounding) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents,
          config: {
            systemInstruction: SHAIRU_SYSTEM_PROMPT,
            tools: [{ googleSearch: {} }],
          },
        });
        if (response.text) {
          generatedReply = response.text;
          isGrounded = true;
        }
      } catch (err: unknown) {
        // Remember quota exhaustion for 10 minutes so subsequent queries don't wait on failed tool calls
        searchGroundingBackoffUntil = Date.now() + 10 * 60 * 1000;
        console.warn('Tier 1 Google Search grounding tool quota reached, caching backoff and proceeding to Tier 2...');
      }
    }

    // TIER 2: If Search tool hit 429 quota or failed, query Gemini directly (has full knowledge of Google index, Australia, and massage therapies)
    if (!generatedReply) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents,
          config: {
            systemInstruction: SHAIRU_SYSTEM_PROMPT,
          },
        });
        if (response.text) {
          generatedReply = response.text;
          isGrounded = false;
        }
      } catch (err2: unknown) {
        console.warn('Tier 2 Gemini direct query failed:', err2);
      }
    }

    // TIER 3: If Gemini API is completely exhausted (429 across all requests), use smart contextual knowledge base
    if (!generatedReply) {
      generatedReply = getContextualFallback(message);
      isGrounded = false;
    }

    res.json({
      reply: generatedReply,
      grounded: isGrounded,
    });
  });

  // Mount Vite middlewares in dev mode, serve static dist in prod
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Shairu Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
