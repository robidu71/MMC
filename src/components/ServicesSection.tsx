import { useState } from 'react';
import { Check, Sparkles, Clock, Home, Building2, Briefcase, Award, CheckCircle2, MessageCircle, ShieldCheck } from 'lucide-react';
import { SERVICES, PRICING_TIERS } from '../data/massageData';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceId: string, duration?: number) => void;
}

export function ServicesSection({ onSelectServiceForBooking }: ServicesSectionProps) {
  const [selectedDuration, setSelectedDuration] = useState<number>(90);
  // Store selected duration per treatment card; initially null (inactive)
  const [cardSelectedDuration, setCardSelectedDuration] = useState<Record<string, number | null>>({});

  // Shairu Core 4 Delivery Services
  const deliveryServices = [
    {
      id: 'hotel',
      icon: Building2,
      badge: 'Hotel Service',
      title: 'Hotel In-Room Massage',
      desc: 'Seamless room delivery to Sydney’s premier 4 & 5-star hotels and luxury suites. Unwind directly in your room without travelling.',
      points: ['Discreet room arrival', 'Full heated table & fresh linens', 'Available 8am – 10pm daily'],
    },
    {
      id: 'home',
      icon: Home,
      badge: 'Residential Spa',
      title: 'At-Home Mobile Massage',
      desc: 'Skip Sydney traffic and parking. Enjoy 5-star day spa quality delivered right into your living room, terrace, or bedroom.',
      points: ['Heated massage table', 'Cold-pressed organic oils', 'Zero travel friction'],
    },
    {
      id: 'corporate',
      icon: Briefcase,
      badge: 'Workplace Wellness',
      title: 'Corporate Seated Massage',
      desc: 'Energizing desk-side or conference neck and back decompression for teams and corporate events across Sydney CBD.',
      points: ['Ergonomic massage chairs', 'Relieves tension & stress', 'Custom team schedules'],
    },
    {
      id: 'couples',
      icon: Award,
      badge: 'Couples & Escapes',
      title: 'Couples & Side-by-Side',
      desc: 'Simultaneous dual treatments for couples, staycations, anniversaries, and pampering weekends in Sydney.',
      points: ['Synchronized therapists', 'Tailored pressure per person', 'Organic aromatherapy'],
    },
  ];

  return (
    <>
      {/* SECTION 1: CORE MOBILE DELIVERY FORMATS */}
      <section id="services" className="bg-[#f5f3ec] px-4 sm:px-8 lg:px-12 py-16 sm:py-20 border-t border-[#e2dbce]">
        <div className="mx-auto max-w-[1440px]">
          
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#285244] flex items-center justify-center gap-1.5 mb-2.5">
              <Sparkles className="w-4 h-4 text-[#285244]" />
              Australia Mobile Wellness
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a3127] tracking-tight">
              Our Mobile Massage Services
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#475b51] font-light leading-relaxed">
              Certified therapists bring the full day-spa sanctuary experience directly to your Sydney hotel room or home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliveryServices.map((srv) => {
              const Icon = srv.icon;
              return (
                <div
                  key={srv.id}
                  className="bg-white rounded-2xl p-6 border border-[#ded8cc] hover:border-[#285244] hover:shadow-lg transition-all flex flex-col justify-between group shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#eef4f0] group-hover:bg-[#285244] text-[#285244] group-hover:text-white flex items-center justify-center transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#f3efe6] text-[#3d5348] border border-[#e2dcce] px-2.5 py-1 rounded-full">
                        {srv.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#1a3127] mb-2 group-hover:text-[#285244] transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-[#475b51] leading-relaxed font-light mb-4">
                      {srv.desc}
                    </p>

                    <div className="space-y-1.5 pt-3 border-t border-[#f0ece3]">
                      {srv.points.map((pt, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-[#42584d]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#285244] shrink-0" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 2: 6 SPECIALIZED TREATMENTS & CLEAN UNIFIED PRICING */}
      <section id="treatments" className="bg-[#fbfaf7] px-4 sm:px-8 lg:px-12 py-16 sm:py-24 border-t border-[#e2dbce]">
        <div className="mx-auto max-w-[1440px]">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#285244] flex items-center justify-center gap-1.5 mb-2.5">
              <Sparkles className="w-4 h-4 text-[#285244]" />
              Signature Bodywork Menu
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1a3127] tracking-tight">
              Our 6 Specialized Treatments
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#475b51] font-light leading-relaxed">
              Simple, transparent pricing across all treatments. Choose your duration and relax as certified therapists take care of the rest.
            </p>
          </div>

          {/* DEDICATED, LUXURY STYLISH PRICING SHOWCASE (SELECTOR 3) */}
          <div className="mb-14 max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-[#1b352b] via-[#203f34] to-[#162d24] text-white p-7 sm:p-9 shadow-xl border border-emerald-500/20 relative overflow-hidden">
            {/* Background luxury ambient glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#cfa052]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold tracking-widest uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#cfa052]" />
                All-Inclusive Australia Flat Rates
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif italic font-normal tracking-wide text-white drop-shadow-sm">
                Transparent Pricing Across All 6 Treatments
              </h3>
              <p className="text-xs sm:text-sm text-[#b8d4c7] font-light max-w-xl mx-auto mt-2 leading-relaxed">
                Every booking includes our heated portable massage table, 100% Egyptian cotton linens, pure botanical oils, and serene soundscapes. Zero travel surcharge in metro areas.
              </p>
            </div>

            {/* 3 Stylish Tier Cards */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {PRICING_TIERS.map((tier) => {
                const isActive = selectedDuration === tier.minutes;
                return (
                  <button
                    key={tier.minutes}
                    type="button"
                    onClick={() => setSelectedDuration(tier.minutes)}
                    className={`relative p-5 sm:p-6 rounded-2xl text-center border transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                      isActive
                        ? 'bg-[#fbfaf7] text-[#1b352b] border-[#cfa052] shadow-xl scale-[1.02] ring-2 ring-[#cfa052]'
                        : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-emerald-400/40'
                    }`}
                  >
                    {tier.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] uppercase font-black tracking-widest px-3 py-0.5 rounded-full shadow-md bg-gradient-to-r from-[#cfa052] to-[#dfb86e] text-slate-950 border border-amber-200">
                        Most Popular
                      </span>
                    )}

                    <div>
                      <div className="flex items-center justify-center gap-1.5 mb-2 text-xs font-bold uppercase tracking-widest">
                        <Clock className={`w-3.5 h-3.5 ${isActive ? 'text-[#285244]' : 'text-emerald-400'}`} />
                        <span className={isActive ? 'text-[#285244]' : 'text-[#b8d4c7]'}>{tier.hours}</span>
                      </div>

                      <div className="my-2">
                        <span className="text-4xl sm:text-5xl font-black tracking-tight leading-none">
                          ${tier.price}
                        </span>
                        <span className={`text-[11px] block mt-1 font-semibold uppercase tracking-wider ${isActive ? 'text-[#697d73]' : 'text-[#96b5a6]'}`}>
                          Flat Rate
                        </span>
                      </div>

                      <p className={`text-xs font-light leading-relaxed my-3 ${isActive ? 'text-[#394d43]' : 'text-[#c2ded1]'}`}>
                        {tier.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-current/10">
                      <span className={`text-xs font-bold tracking-wider uppercase inline-flex items-center justify-center gap-1 w-full py-1.5 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-[#1b352b] text-white shadow-xs'
                          : 'bg-white/10 text-white group-hover:bg-emerald-400 group-hover:text-slate-950'
                      }`}>
                        {isActive ? '✓ Selected' : 'Select Plan'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Luxury Perks Strip & WhatsApp Quick Connect */}
            <div className="relative z-10 mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#b8d4c7]">
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1 text-white font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#cfa052]" />
                  No Hidden Travel Charges
                </span>
                <span className="hidden sm:inline text-white/30">·</span>
                <span>Available 7 Days, 8:00 AM – 10:00 PM</span>
              </div>

              <a
                href={`https://wa.me/61433556409?text=Hi%20Shairu%2C%20I%20would%20like%20to%20book%20a%20massage%20for%20${selectedDuration}%20minutes%20in%20Australia.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer shrink-0"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Book {selectedDuration}m via WhatsApp</span>
              </a>
            </div>
          </div>

          {/* THE 6 SPECIALIZED TREATMENTS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {SERVICES.map((service) => {
              const activeMinutes = cardSelectedDuration[service.id] ?? null;
              const activeTier = PRICING_TIERS.find((t) => t.minutes === activeMinutes);

              return (
                <article
                  key={service.id}
                  className="group relative flex min-h-[500px] flex-col justify-between overflow-hidden rounded-2xl border border-[#ded8cc] p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#285244] bg-white"
                >
                  <div>
                    {/* Photo Preview */}
                    {service.imageSrc && (
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl mb-4 bg-[#f0ece3]">
                        <img
                          src={service.imageSrc}
                          alt={service.title}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                        <span className="absolute bottom-2 left-2.5 text-[10px] font-bold uppercase tracking-wider text-white drop-shadow-md">
                          {service.num} · Mobile Sanctuary
                        </span>
                      </div>
                    )}

                    {/* Top Bar */}
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#285244]">
                          {service.num} · Shairu Australia
                        </span>
                        <h4 className="text-xl font-extrabold text-[#1a3127] mt-0.5 group-hover:text-[#285244] transition-colors">
                          {service.title}
                        </h4>
                        <span className="block text-xs font-medium text-[#5a7065] mt-0.5">
                          {service.tagline}
                        </span>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="my-4">
                      <p className="text-xs sm:text-sm leading-relaxed text-[#475b51] font-light mb-4">
                        {service.detail}
                      </p>

                      {/* What's Included */}
                      <div className="space-y-1.5 pt-3 border-t border-[#f0ece3]">
                        {service.included.map((inc, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-[#394d43]">
                            <Check className="w-3.5 h-3.5 text-[#285244] shrink-0 mt-0.5" />
                            <span className="font-light">{inc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Duration Selection and Dynamic WhatsApp Button (SELECTOR 2) */}
                  <div className="border-t border-[#ede8de] pt-4 mt-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#697d73] block mb-2">
                      Choose Duration &amp; Price:
                    </span>

                    {/* Interactive Price Chips (1h $100, 1.5h $140, 2h $170) */}
                    <div className="grid grid-cols-3 gap-2">
                      {PRICING_TIERS.map((tier) => {
                        const isTierActive = activeMinutes === tier.minutes;
                        return (
                          <button
                            key={tier.minutes}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Toggle or select this duration for this card
                              setCardSelectedDuration((prev) => ({
                                ...prev,
                                [service.id]: tier.minutes,
                              }));
                            }}
                            className={`px-2 py-2 rounded-xl text-center border transition-all duration-200 cursor-pointer flex flex-col items-center justify-center ${
                              isTierActive
                                ? 'bg-[#285244] text-white border-[#285244] shadow-md ring-2 ring-[#285244]'
                                : 'bg-[#faf9f5] hover:bg-[#eef4f0] text-[#1a3127] border-[#ded8cc] hover:border-[#285244]/60'
                            }`}
                          >
                            <span className={`text-[10px] uppercase font-bold tracking-wider ${isTierActive ? 'text-teal-200' : 'text-[#697d73]'}`}>
                              {tier.hours}
                            </span>
                            <span className="text-sm font-black tracking-tight mt-0.5">
                              ${tier.price}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Dynamic WhatsApp Connection Bar: appears when a duration price is clicked */}
                    <div className="mt-3">
                      {activeTier ? (
                        <a
                          href={`https://wa.me/61433556409?text=Hi%20Shairu%2C%20I%20would%20like%20to%20book%20the%20${encodeURIComponent(service.title)}%20for%20${encodeURIComponent(activeTier.hours)}%20(%24${activeTier.price})%20in%20Australia.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
                        >
                          <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                          <span>Connect with WhatsApp ({activeTier.hours} · ${activeTier.price})</span>
                        </a>
                      ) : (
                        <a
                          href={`https://wa.me/61433556409?text=Hi%20Shairu%2C%20I%20would%20like%20to%20book%20the%20${encodeURIComponent(service.title)}%20(1h%20%24100%20%2F%201.5h%20%24140%20%2F%202h%20%24170)%20in%20Australia.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#eef4f0] hover:bg-[#285244] hover:text-white text-[#285244] border border-[#d2e2d8] text-xs font-semibold transition-all cursor-pointer text-center"
                        >
                          <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>Click a price above or connect on WhatsApp</span>
                        </a>
                      )}
                    </div>
                  </div>

                </article>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}
