import { useState } from 'react';
import { X, Copy, Check, Globe, ShieldCheck, ExternalLink, HelpCircle } from 'lucide-react';

interface GoogleSitesEmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GoogleSitesEmbedModal({ isOpen, onClose }: GoogleSitesEmbedModalProps) {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedIframe, setCopiedIframe] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ais-pre-liplymywmfpgvpiewepnyn-823175158265.asia-northeast1.run.app';
  
  const iframeSnippet = `<iframe
  src="${currentUrl}"
  width="100%"
  height="900"
  style="border: none; border-radius: 12px; width: 100%; min-height: 850px; overflow: hidden;"
  allow="clipboard-write"
  loading="lazy"
  title="Shairu Mobile Massage Australia"
></iframe>`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleCopyIframe = () => {
    navigator.clipboard.writeText(iframeSnippet);
    setCopiedIframe(true);
    setTimeout(() => setCopiedIframe(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden font-sans text-slate-800">
        
        {/* Modal Header */}
        <div className="bg-[#1b3429] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Globe className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-bold text-base leading-tight">Google Sites Integration Guide</h3>
              <p className="text-[11px] text-emerald-200/80">গুগল সাইটসে আপনার অ্যাপ যুক্ত করার নিয়ম</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* Explanation Alert */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold mb-0.5">গুগল সাইটসে সরাসরি ডেপ্লয় হয় না কেন?</strong>
              <p className="leading-relaxed text-amber-800">
                Google Sites হলো গুগলের একটি নো-কোড পেইজ বিল্ডার, এতে কোনো ব্যাকএন্ড সার্ভার (Node.js/Express) সরাসরি হোস্ট করা যায় না। তাই গুগল সাইটসে যে কোনো ডাইনামিক ওয়েব অ্যাপ <strong>"Embed (এমবেড)"</strong> ফিচারের মাধ্যমে যুক্ত করতে হয়।
              </p>
            </div>
          </div>

          {/* 404 Error Fix Alert */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 text-xs text-red-900 flex items-start gap-2.5">
            <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0 animate-ping" />
            <div>
              <strong className="block font-semibold text-red-950 mb-0.5">
                "Error: Page not found / The requested URL was not found" আসার কারণ ও সমাধান:
              </strong>
              <p className="leading-relaxed text-red-800 mb-1.5">
                গুগল ক্লাউড রান এই এররটি দেয় যখন AI Studio-র ওপরের ডানপাশের <strong>"Deploy"</strong> বাটনে ক্লিক করে এখনও লাইভ পাবলিশ করা হয়নি!
              </p>
              <div className="bg-white/80 p-2 rounded border border-red-200 font-medium text-[11px] text-red-900">
                👉 <strong>করণীয়:</strong> AI Studio স্ক্রিনের ওপরে ডানে থাকা <strong>"Deploy"</strong> বাটনে একবার ক্লিক করে ৩০ সেকেন্ড অপেক্ষা করুন। ডিপ্লয় সম্পন্ন হলেই আপনার অ্যাপটি গুগল সাইটসে লাইভ দেখা যাবে।
              </div>
            </div>
          </div>

          {/* Security & Embedding Status */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold">Security &amp; CSP Ready: </span>
              <span>Content Security Policy (CSP) এবং X-Frame-Options গুগল সাইটস ও যেকোনো কাস্টম ডোমেইনের জন্য শতভাগ আনলক ও সিকিউর করা হয়েছে।</span>
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">
              গুগল সাইটসে অ্যাড করার ৩টি সহজ ধাপ:
            </h4>

            <ol className="space-y-2.5 text-xs text-slate-700 list-decimal list-inside pl-1 leading-relaxed">
              <li>
                আপনার <strong className="text-slate-900">Google Sites</strong> এডিটর ওপেন করুন (<a href="https://sites.google.com" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline inline-flex items-center gap-0.5">sites.google.com <ExternalLink className="w-3 h-3" /></a>)।
              </li>
              <li>
                ডানপাশের মেনু থেকে <strong className="text-slate-900">"Insert" &gt; "Embed"</strong> (এমবেড) বাটনে ক্লিক করুন।
              </li>
              <li>
                নিচের যেকোনো একটি অপশন বেছে নিন:
              </li>
            </ol>
          </div>

          {/* Option A: By URL */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Option 1: "By URL" (সবচেয়ে সহজ)</span>
              <button
                onClick={handleCopyUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#285244] hover:bg-[#1f3f34] text-white text-[11px] font-semibold rounded-lg transition-colors cursor-pointer"
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedUrl ? 'Copied URL!' : 'Copy App URL'}</span>
              </button>
            </div>
            <div className="bg-white p-2 rounded border border-slate-200 text-slate-700 text-[11px] font-mono break-all select-all">
              {currentUrl}
            </div>
            <p className="text-[11px] text-slate-500">
              গুগল সাইটসের "By URL" বক্সে এই লিঙ্কটি পেস্ট করে "Whole page" সিলেক্ট করুন।
            </p>
          </div>

          {/* Option B: Embed Code (HTML) */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Option 2: "Embed Code" (iFrame কোড)</span>
              <button
                onClick={handleCopyIframe}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-900 text-white text-[11px] font-semibold rounded-lg transition-colors cursor-pointer"
              >
                {copiedIframe ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIframe ? 'Copied Code!' : 'Copy iFrame Code'}</span>
              </button>
            </div>
            <pre className="bg-slate-900 text-slate-200 p-2.5 rounded text-[10px] font-mono overflow-x-auto whitespace-pre-wrap select-all">
              {iframeSnippet}
            </pre>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 px-6 py-3 flex items-center justify-between border-t border-slate-200 text-xs">
          <span className="text-slate-500 text-[11px]">Ready for Google Sites, Wix, WordPress &amp; Custom Domains</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
