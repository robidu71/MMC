import { ArrowDown, ArrowUpRight, MapPin, Building2, Home, CheckCircle2, Sparkles, Phone, MessageCircle, ShieldCheck, Award } from 'lucide-react';
import { STUDIO_INFO, SYDNEY_AREAS } from '../data/massageData';
import massageHeroLive from '../assets/images/massage_therapy_live_motion_1793437685128.jpg';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onExploreTreatments: () => void;
}

export function HeroSection({ onOpenBooking, onExploreTreatments }: HeroSectionProps) {
  return (
    <section id="home" className="relative bg-[#faf9f5] pb-12 sm:pb-16 overflow-hidden">
      
      {/* Full-Width Hero Panoramic Banner — Living Massage Session with Cinemagraph Motion */}
      <div className="relative w-full aspect-[21/9] min-h-[380px] sm:min-h-[480px] md:min-h-[540px] lg:min-h-[600px] max-h-[660px] bg-slate-950 overflow-hidden flex items-center justify-center">
        
        {/* Animated living massage photo: gentle continuous zoom & pan simulating relaxing hands-on motion */}
        <img
          src={massageHeroLive}
          alt="Certified Shairu therapist administering relaxing mobile massage therapy to client"
          className="absolute inset-0 h-full w-full object-cover object-center filter brightness-[0.93] contrast-[1.05] saturate-[1.1] animate-massage-motion"
        />

        {/* Soothing rhythmic stroke ripple effect centered near the hands-on massage contact zone */}
        <div aria-hidden="true" className="absolute top-[58%] left-[54%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 hidden sm:block">
          <div className="w-24 h-24 rounded-full border-2 border-emerald-300/40 animate-stroke-wave-1" />
          <div className="w-24 h-24 rounded-full border border-[#cfa052]/40 animate-stroke-wave-2" />
        </div>

        {/* Live session floating indicator */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-8 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase shadow-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>Therapist In Session · Mobile Sanctuary</span>
        </div>

        {/* Cinematic ambient overlays for soft warmth and perfect readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/45 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black/20 via-transparent to-black/65 pointer-events-none" />

        {/* Centered Luxury Typography */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-3 sm:mb-4 shadow-sm">
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.24em] uppercase text-emerald-300">
              5-Star In-Room &amp; Mobile Massage Sanctuary
            </span>
          </div>

          <h1 className="font-serif italic font-normal text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white drop-shadow-[0_4px_32px_rgba(0,0,0,0.95)] select-none">
            Mobile Massage Australia
          </h1>
          
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-medium tracking-wider text-emerald-100/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] max-w-2xl leading-relaxed uppercase">
            Heated Tables · Fresh Organic Linens · Delivered Directly to Your Suite or Home
          </p>
        </div>
      </div>

      {/* Main Intro & Booking Section Directly Below the Panoramic Image */}
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 pt-8 sm:pt-12">
        {/* Breadcrumb matching website hierarchy */}
        <div className="flex items-center gap-2 mb-6 text-xs font-semibold tracking-wider uppercase text-[#697d73]">
          <a href="#home" className="hover:text-[#285244] transition-colors">HOME</a>
          <span className="text-[#c5cfc9]">/</span>
          <a href="#services" className="hover:text-[#285244] transition-colors">SERVICES</a>
          <span className="text-[#c5cfc9]">/</span>
          <a href="#treatments" className="hover:text-[#285244] transition-colors">TREATMENTS</a>
          <span className="text-[#c5cfc9]">/</span>
          <span className="text-[#285244] font-bold">AUSTRALIA</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.25fr_.75fr] lg:items-stretch">
          
          {/* Left Column: Narrative & Action buttons */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-3.5 border-b border-[#285244]/30">
                <p className="text-[11px] font-bold tracking-wider uppercase text-[#285244]">
                  SHAIRU MOBILE MASSAGE · AUSTRALIA-WIDE DISPATCH
                </p>
              </div>

              <h2 className="font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight text-[#1a3127] mb-4 leading-tight">
                Professional Day-Spa Treatments Delivered Directly to Your Room
              </h2>

              <p className="text-base sm:text-lg leading-relaxed text-[#475b51] mb-6 font-light">
                Enjoy 5-star relaxation without leaving your room. Our certified, professional therapists bring everything to your door—a heated memory-foam table, fresh organic linens, natural botanical oils, and soothing ambient music. Available 7 days a week from 8:00 AM to 10:00 PM for private homes, executive apartments, and luxury hotel suites across Australia.
              </p>

              {/* Feature Cards */}
              <div className="grid sm:grid-cols-2 gap-3.5 mb-6">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[#ded8cc] shadow-xs">
                  <div className="w-10 h-10 rounded-full bg-[#eef4f0] flex items-center justify-center text-[#285244] shrink-0 font-bold border border-[#d2e2d8]">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1a3127] uppercase">Hotel In-Room Service</h4>
                    <p className="text-xs text-[#5a7065] mt-0.5">Trusted by Australia’s 4 &amp; 5 star hotels with seamless room delivery.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[#ded8cc] shadow-xs">
                  <div className="w-10 h-10 rounded-full bg-[#eef4f0] flex items-center justify-center text-[#285244] shrink-0 font-bold border border-[#d2e2d8]">
                    <Home className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1a3127] uppercase">At-Home Comfort</h4>
                    <p className="text-xs text-[#5a7065] mt-0.5">We bring the full setup: heated table, organic cotton linen &amp; soundscapes.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp & Call Action Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
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
                className="flex items-center gap-2 rounded-full border-2 border-[#ded8cc] hover:border-[#285244] hover:text-[#285244] px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#35483f] transition-colors bg-white shadow-xs"
              >
                <Phone className="w-4 h-4 text-[#285244]" />
                <span>Call {STUDIO_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Right Column / Luxury Highlights Card (SELECTOR 2) */}
          <div className="rounded-3xl bg-gradient-to-b from-white via-[#faf9f5] to-[#f4f1e8] p-6 sm:p-8 border-2 border-[#285244]/25 hover:border-[#285244]/50 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden group">
            {/* Ambient luxury glow */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#cfa052]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              {/* Header with Live Dispatch Beacon */}
              <div className="flex items-start justify-between border-b border-[#e2dbce] pb-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
                    </span>
                    <span className="text-[10px] font-black tracking-widest uppercase text-[#285244]">
                      LIVE DISPATCH · AUSTRALIA-WIDE
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif italic text-[#1a3127] font-normal leading-tight">
                    5-Star Day Spa Delivered to You
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#285244] text-white text-[10px] font-bold tracking-wider uppercase shadow-xs shrink-0">
                  8am – 10pm Daily
                </span>
              </div>

              {/* 4 Premium Benefit Tiles */}
              <div className="space-y-2.5 text-xs text-[#475b51]">
                <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-[#ded8cc] shadow-2xs hover:border-[#285244]/40 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#eef4f0] flex items-center justify-center text-[#285244] shrink-0 font-bold border border-[#d2e2d8]">
                    <CheckCircle2 className="w-4 h-4 text-[#285244]" />
                  </div>
                  <div>
                    <strong className="block text-[#1a3127] text-xs">Commercial Heated Spa Table</strong>
                    <span className="text-[#5a7065] text-[11px] leading-relaxed">
                      Memory-foam table, heated fleece topper, 100% Egyptian cotton linens &amp; ambient soundscape.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-[#ded8cc] shadow-2xs hover:border-[#285244]/40 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#eef4f0] flex items-center justify-center text-[#285244] shrink-0 font-bold border border-[#d2e2d8]">
                    <ShieldCheck className="w-4 h-4 text-[#285244]" />
                  </div>
                  <div>
                    <strong className="block text-[#1a3127] text-xs">Certified, Vetted &amp; Insured</strong>
                    <span className="text-[#5a7065] text-[11px] leading-relaxed">
                      100% accredited Australian remedial &amp; Swedish therapists with active police clearances.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-[#ded8cc] shadow-2xs hover:border-[#285244]/40 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#eef4f0] flex items-center justify-center text-[#285244] shrink-0 font-bold border border-[#d2e2d8]">
                    <Sparkles className="w-4 h-4 text-[#285244]" />
                  </div>
                  <div>
                    <strong className="block text-[#1a3127] text-xs">Cold-Pressed Botanical Oils</strong>
                    <span className="text-[#5a7065] text-[11px] leading-relaxed">
                      Pure organic jojoba, sweet almond &amp; botanical aromatherapy (unscented options available).
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-[#ded8cc] shadow-2xs hover:border-[#285244]/40 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#eef4f0] flex items-center justify-center text-[#285244] shrink-0 font-bold border border-[#d2e2d8]">
                    <Award className="w-4 h-4 text-[#285244]" />
                  </div>
                  <div>
                    <strong className="block text-[#1a3127] text-xs">Zero Travel Fee in Metro Zones</strong>
                    <span className="text-[#5a7065] text-[11px] leading-relaxed">
                      Flat rates across Sydney CBD, Eastern Suburbs, North Shore &amp; Inner West.
                    </span>
                  </div>
                </div>
              </div>

              {/* Mini Transparent Rate Snapshot */}
              <div className="mt-4 pt-3.5 border-t border-[#e2dbce] flex items-center justify-between text-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#697d73]">
                  All-Inclusive Rates:
                </span>
                <div className="flex items-center gap-1.5 font-bold">
                  <span className="px-2 py-0.5 rounded-md bg-[#eef4f0] text-[#1b3429] border border-[#d2e2d8] text-[11px]">
                    1h $100
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#285244] text-white text-[11px] shadow-2xs">
                    1.5h $140
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#eef4f0] text-[#1b3429] border border-[#d2e2d8] text-[11px]">
                    2h $170
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons: Instant Booking & Menu View */}
            <div className="relative z-10 pt-2 space-y-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full py-3.5 px-4 rounded-xl bg-[#285244] hover:bg-[#1e3e33] active:scale-[0.99] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Instant Booking &amp; WhatsApp Order</span>
                <ArrowUpRight className="w-4 h-4 text-emerald-300" />
              </button>

              <button
                type="button"
                onClick={onExploreTreatments}
                className="w-full py-2.5 rounded-xl border border-[#285244]/30 hover:border-[#285244] hover:bg-[#eef4f0] text-[#285244] font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Explore 6 Treatments Menu</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Coverage Suburbs Banner */}
        <div className="mt-10 pt-6 border-t border-[#ded8cc] flex flex-wrap items-center gap-2 text-xs text-[#5a7065]">
          <span className="font-bold text-[#1a3127] flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#285244]" />
            Sydney Coverage Zones:
          </span>
          {SYDNEY_AREAS.map((area, i) => (
            <span key={i} className="bg-white hover:bg-[#eef4f0] px-3 py-1 rounded-full text-[#394d43] border border-[#ded8cc] shadow-2xs">
              {area}
            </span>
          ))}
        </div>

      </div>

    </section>
  );
}
