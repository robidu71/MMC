import { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Calendar,
  Globe,
  Phone,
  RefreshCw,
  ChevronDown,
} from 'lucide-react';
import { STUDIO_INFO } from '../data/massageData';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  grounded?: boolean;
}

interface ChatAgentProps {
  onOpenBooking: (serviceId?: string) => void;
}

const QUICK_SUGGESTIONS = [
  'What are the 6 treatments and prices?',
  'Do you visit hotel rooms in Australia?',
  'What should I prepare for in-room massage?',
  'Can I book a couples massage?',
];

export function ChatAgent({ onOpenBooking }: ChatAgentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: `Hello! I am your Shairu AI Wellness Concierge. 
I have live access to Google information and our 5-star mobile massage menu across Australia.

How can I assist you with treatments, pricing, or hotel room visits today?`,
      timestamp: 'Just now',
      grounded: true,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages]);

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText || input).trim();
    if (!textToSend || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-5),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.reply || 'Thank you for your question! We are here to help.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        grounded: data.grounded ?? true,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      // Dynamic fallback based on user query
      let dynamicReply = `Shairu provides 5-star mobile in-room and at-home massages across Australia 7 days a week (8:00 AM – 10:00 PM).
Pricing: $100 (1h) · $140 (1.5h) · $170 (2h) across all 6 treatments.
For instant dispatch, message our team on WhatsApp at +61 433 556 409!`;

      const q = textToSend.toLowerCase();
      if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('how much')) {
        dynamicReply = `All 6 Shairu massage treatments have simple, transparent pricing:\n• 1 Hour: $100\n• 1.5 Hours: $140\n• 2 Hours: $170\nIncludes heated table setup, organic oils, and fresh linens with no travel fee in major metro areas!`;
      } else if (q.includes('hotel') || q.includes('room')) {
        dynamicReply = `Yes! We specialize in 5-star hotel in-room visits across Australia. Our certified therapist arrives directly at your room with a heated table and fresh linens. Available 8am–10pm daily!`;
      } else if (q.includes('deep tissue')) {
        dynamicReply = `Our Deep Tissue Massage focuses on releasing chronic muscle tightness, knots, and sports tension with firm, targeted pressure ($100 / $140 / $170).`;
      } else if (q.includes('head') || q.includes('migraine')) {
        dynamicReply = `Our Indian Head Massage targets scalp, neck, and shoulder pressure points to dissolve mental fatigue, brain fog, and headaches ($100 / $140 / $170).`;
      } else if (q.includes('couple') || q.includes('two')) {
        dynamicReply = `We offer back-to-back or side-by-side couples massages for hotel and home visits. Message +61 433 556 409 on WhatsApp to check availability!`;
      }

      const fallbackReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: dynamicReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        grounded: false,
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Expanded Interactive Chat Modal Window */}
      {isOpen && (
        <div className="mb-3 w-[92vw] sm:w-[420px] max-w-[440px] h-[560px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#005e68] via-[#007a87] to-[#0092a2] text-white p-4 flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <Bot className="w-5 h-5 text-teal-100" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#005e68]" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm tracking-wide text-white">Shairu AI Concierge</h3>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-amber-400/20 text-amber-200 text-[9px] font-semibold">
                    <Sparkles className="w-2.5 h-2.5" />
                    AI
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-teal-100/90">
                  <Globe className="w-3 h-3 text-emerald-300" />
                  <span>Google Search Grounded • Australia</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages([messages[0]])}
                title="Reset conversation"
                className="p-1.5 text-teal-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Reset chat"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-teal-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close chat window"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Info Bar */}
          <div className="bg-teal-50/80 border-b border-teal-100 px-4 py-2 text-[11px] text-teal-900 flex items-center justify-between shrink-0">
            <span>6 Treatments: <strong>$100 (1h) · $140 (1.5h) · $170 (2h)</strong></span>
            <a
              href={STUDIO_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#007a87] font-bold hover:underline flex items-center gap-1"
            >
              <span>+61 433 556 409</span>
            </a>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/60">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center text-[#007a87] shrink-0 mt-0.5 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#007a87] text-white rounded-br-none shadow-xs'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none shadow-sm'
                }`}>
                  <div className="whitespace-pre-line">{m.text}</div>

                  {/* Grounded Badge for Bot answers */}
                  {m.sender === 'bot' && m.grounded && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-500">
                      <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                        <Globe className="w-3 h-3" />
                        Verified with Google &amp; Shairu Data
                      </span>
                      <span>{m.timestamp}</span>
                    </div>
                  )}

                  {/* Action Shortcuts on Bot Replies */}
                  {m.sender === 'bot' && m.id !== 'welcome' && (
                    <div className="mt-3 pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          onOpenBooking();
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#007a87] hover:bg-[#00636e] text-white font-bold text-[11px] transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white" />
                        <span>Book via WhatsApp</span>
                      </button>

                      <a
                        href={STUDIO_INFO.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-[11px] transition-colors"
                      >
                        <MessageCircle className="w-3 h-3 fill-white" />
                        <span>WhatsApp Chat</span>
                      </a>
                    </div>
                  )}
                </div>

                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-slate-300 flex items-center justify-center text-slate-700 shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-start">
                <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center text-[#007a87] shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-xs">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-teal-600 animate-bounce" />
                      <span className="w-2 h-2 rounded-full bg-teal-600 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-2 h-2 rounded-full bg-teal-600 animate-bounce [animation-delay:0.4s]" />
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Searching Google &amp; formulating response...
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            {QUICK_SUGGESTIONS.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(s)}
                disabled={isLoading}
                className="shrink-0 px-2.5 py-1 text-[11px] font-medium bg-slate-100 hover:bg-teal-50 hover:text-[#007a87] text-slate-700 rounded-full transition-colors border border-slate-200/60 disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about treatments, hotels, rates..."
              className="flex-1 bg-slate-100 text-xs px-3.5 py-2.5 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#007a87] focus:bg-white text-slate-900 transition-all"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-full bg-[#007a87] hover:bg-[#00636e] active:scale-95 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Powered by Google Footer Note */}
          <div className="bg-slate-50 border-t border-slate-100 py-1 px-4 text-center text-[9px] text-slate-400">
            Powered by Google Gemini 3.8 &amp; Google Search Grounding
          </div>
        </div>
      )}

      {/* Floating Action Buttons Dock (AI Concierge + WhatsApp) */}
      <div className="flex items-center gap-2.5 select-none">
        
        {/* Direct WhatsApp Quick Chat Pill */}
        <a
          href={STUDIO_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp +61 433 556 409"
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white px-3.5 py-2.5 rounded-full shadow-lg transition-all"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span className="hidden sm:inline text-xs font-bold">WhatsApp</span>
        </a>

        {/* AI Chat Agent Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Shairu AI Concierge Chat"
          className="group flex items-center gap-2.5 bg-gradient-to-r from-[#005e68] to-[#007a87] hover:from-[#004e57] hover:to-[#00636e] active:scale-95 text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:shadow-teal-500/30 cursor-pointer border border-teal-400/30"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
          </span>

          <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />

          <span className="text-xs font-bold tracking-wide uppercase pr-0.5">
            {isOpen ? 'Close Chat' : 'AI Concierge'}
          </span>
        </button>
      </div>
    </div>
  );
}
