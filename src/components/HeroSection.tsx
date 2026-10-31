import { ArrowDown, ArrowUpRight, MapPin, Building2, Home, ShieldCheck, Clock, CheckCircle2, Sparkles, Phone, Award, MessageCircle } from 'lucide-react';
import { STUDIO_INFO, SYDNEY_AREAS } from '../data/massageData';
import australiaHeroImage from '../assets/images/australia_mobile_massage_hero_1793386800809.jpg';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onExploreTreatments: () => void;
}

export function HeroSection({ onOpenBooking, onExploreTreatments }: HeroSectionProps) {
  return (
    <section id="home" className="relative bg-white pb-12 sm:pb-16 overflow-hidden">
      
      {/* Full-Width Hero Panoramic Banner — Iconic Australia Harbour Water & Opera House at Twilight Sunset */}
      <div className="relative w-full aspect-[21/9] min-h-[340px] sm:min-h-[440px] md:min-h-[500px] lg:min-h-[560px] max-h-[620px] bg-slate-950 overflow-hidden flex items-center justify-center">
        {/* Background panoramic image of Australia & Sydney Opera House Water Skyline */}
        <img
          src={australiaHeroImage}
          alt="Mobile Massage Australia River and Opera House at Twilight"
          className="absolute inset-0 h-full w-full object-cover object-center filter brightness-[0.98] contrast-[1.08] saturate-[1.12] transition-transform duration-1000 hover:scale-105"
        />

        {/* Sophisticated dual cinematic overlay: gentle gradient + radial focus to make text pop while letting the golden twilight & serene water shine */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/25 to-slate-900/40 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black/40 via-transparent to-black/60 pointer-events-none" />

        {/* Centered Bold Luxury Typography */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 mb-3 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-emerald-200">
              5-Star In-Room &amp; Mobile Massage
            </span>
          </div>

          <h1 className="font-sans font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-white uppercase drop-shadow-[0_4px_28px_rgba(0,0,0,0.95)] select-none">
            MOBILE MASSAGE AUSTRALIA
          </h1>
          
          <p className="mt-3 text-xs sm:text-sm md:text-base font-semibold tracking-wider text-teal-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-2xl uppercase">
            Heated Tables &amp; Organic Oils Delivered to Your Hotel Room or Home · 7 Days 8am – 10pm
          </p>

          {/* Quick WhatsApp Booking Pill directly in Hero */}
          <div className="mt-5 flex items-center gap-3">
            <a
              href={STUDIO_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-extrabold tracking-wider uppercase shadow-xl transition-all hover:shadow-emerald-500/30 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Book on WhatsApp (+61 433 556 409)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Intro & Booking Section Directly Below the Panoramic Image */}
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 pt-8 sm:pt-12">
        {/* Breadcrumb matching website hierarchy */}
        <div className="flex items-center gap-2 mb-6 text-xs font-semibold tracking-wider uppercase text-slate-500">
          <a href="#home" className="hover:text-[#007a87]">HOME</a>
          <span className="text-slate-300">/</span>
          <a href="#services" className="hover:text-[#007a87]">SERVICES</a>
          <span className="text-slate-300">/</span>
          <a href="#treatments" className="hover:text-[#007a87]">TREATMENTS</a>
          <span className="text-slate-300">/</span>
          <span className="text-[#007a87] font-bold">AUSTRALIA</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_.7fr] lg:items-start">
          
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3.5 py-1 mb-3.5 border border-teal-200">
              <span className="w-2 h-2 rounded-full bg-[#007a87] animate-pulse" />
              <p className="text-[11px] font-bold tracking-wider uppercase text-[#007a87]">
                SHAIRU MOBILE MASSAGE · AUSTRALIA-WIDE DISPATCH
              </p>
            </div>

            <h2 className="font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight text-slate-900 mb-4 leading-tight">
              Professional Day-Spa Treatments Delivered Directly to Your Room
            </h2>

            {/* Targeted Description Text */}
            <p className="text-base sm:text-lg leading-relaxed text-slate-600 mb-6 font-light">
              {STUDIO_INFO.heroDesc}
            </p>

            {/* Feature Pills */}
            <div className="grid sm:grid-cols-2 gap-3.5 mb-8">
              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center text-[#007a87] shrink-0 font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Hotel In-Room Service</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Trusted by Sydney’s 4 &amp; 5 star hotels with seamless room delivery.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center text-[#007a87] shrink-0 font-bold">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">At-Home Comfort</h4>
                  <p className="text-xs text-slate-500 mt-0.5">We bring the full setup: heated table, organic cotton linen &amp; music.</p>
                </div>
              </div>
            </div>

            {/* Direct Booking & WhatsApp Action Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="flex items-center gap-2 rounded-full bg-[#007a87] hover:bg-[#00636e] px-6 sm:px-7 py-3 text-xs sm:text-sm font-bold tracking-wider uppercase text-white shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span>Book Mobile Visit</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              {/* WhatsApp direct chat button */}
              <a
                href={STUDIO_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20ba59] px-6 py-3 text-xs sm:text-sm font-bold tracking-wider uppercase text-white shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp: +61 433 556 409</span>
              </a>

              <a
                href={`tel:${STUDIO_INFO.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 rounded-full border-2 border-slate-300 hover:border-[#007a87] hover:text-[#007a87] px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-700 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#007a87]" />
                <span>Call {STUDIO_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Clean, Gorgeous Sydney Service Highlights Card (Clutter removed, prices consolidated in Treatments) */}
          <div className="bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-100 p-6 sm:p-7 rounded-2xl border border-teal-100 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-teal-100 pb-3">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#007a87] block">
                  SYDNEY LUXURY ON DEMAND
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">
                  5-Star Day Spa to Your Door
                </h3>
              </div>
              <span className="w-10 h-10 rounded-full bg-teal-100 text-[#007a87] flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </span>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#007a87] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900">Full Luxury Spa Equipment Provided</strong>
                  <span className="text-slate-500 text-[11px]">Heated portable table, sanitized Egyptian cotton linens &amp; relaxing soundscapes.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#007a87] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900">Certified &amp; Insured Sydney Therapists</strong>
                  <span className="text-slate-500 text-[11px]">100% vetted professionals with continuous police checks and qualification screening.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#007a87] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900">Zero Travel Surcharge in Metro</strong>
                  <span className="text-slate-500 text-[11px]">Direct mobile dispatch across Sydney CBD, Eastern Suburbs, North Shore &amp; Inner West.</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onExploreTreatments}
                className="w-full py-2.5 rounded-xl bg-white border border-[#007a87] text-[#007a87] hover:bg-[#007a87] hover:text-white font-bold text-xs uppercase tracking-wider transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>View Treatments Menu &amp; Rates</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Coverage Suburbs Banner */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="font-bold text-slate-800 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#007a87]" />
            Sydney Coverage Zones:
          </span>
          {SYDNEY_AREAS.map((area, i) => (
            <span key={i} className="bg-slate-100 hover:bg-teal-50 px-3 py-1 rounded-full text-slate-700 border border-slate-200">
              {area}
            </span>
          ))}
        </div>

      </div>

    </section>
  );
}
