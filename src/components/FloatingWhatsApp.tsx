import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { STUDIO_INFO } from '../data/massageData';

export function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 font-sans select-none">
      {/* Friendly Chat Tooltip (dismissible) */}
      {showTooltip && (
        <div className="relative bg-white text-slate-800 text-xs px-3.5 py-2 rounded-xl shadow-xl border border-slate-200 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-xs flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
          <div>
            <p className="font-bold text-slate-900 leading-tight">Need a Massage in Sydney?</p>
            <p className="text-[11px] text-slate-500">Chat with us on WhatsApp</p>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            aria-label="Close tooltip"
            className="text-slate-400 hover:text-slate-600 p-0.5 ml-1 rounded-full cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating WhatsApp Action Pill / Button */}
      <a
        href={STUDIO_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open WhatsApp Chat with Shairu Mobile Massage Sydney"
        className="group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:shadow-emerald-500/30"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="w-5 h-5 fill-white text-white" />
        <span className="text-xs font-bold tracking-wide uppercase pr-1">
          WhatsApp Us
        </span>
      </a>
    </div>
  );
}
