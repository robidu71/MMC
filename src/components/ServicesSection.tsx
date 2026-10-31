import { useState } from 'react';
import { ArrowUpRight, Check, Sparkles, Clock, Home, Building2, Briefcase, Award, CheckCircle2, ChevronRight, MessageCircle } from 'lucide-react';
import { SERVICES, PRICING_TIERS, STUDIO_INFO } from '../data/massageData';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceId: string, duration?: number) => void;
}

export function ServicesSection({ onSelectServiceForBooking }: ServicesSectionProps) {
  const [selectedDuration, setSelectedDuration] = useState<number>(90);

  // Shairu Core 4 Delivery Services
  const deliveryServices = [
    {
      id: 'hotel',
      icon: Building2,
      badge: 'Hotel Service',
      title: 'Hotel In-Room Massage',
      desc: 'Seamless room delivery to Sydney’s premier 4 & 5-star hotels and luxury suites. Unwind directly in your room without travelling.',
      points: ['Discreet room arrival', 'Full table & fresh linens', 'Available 8am – 10pm'],
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
      <section id="services" className="bg-slate-50 px-4 sm:px-8 lg:px-12 py-16 sm:py-20 border-t border-slate-200">
        <div className="mx-auto max-w-[1440px]">
          
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#007a87] flex items-center justify-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4 text-[#007a87]" />
              Sydney Mobile Wellness
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Mobile Massage Services
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 font-light leading-relaxed">
              Certified therapists bring the full day-spa sanctuary experience directly to your Sydney hotel room or home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliveryServices.map((srv) => {
              const Icon = srv.icon;
              return (
                <div
                  key={srv.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#007a87] hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-teal-50 group-hover:bg-[#007a87] text-[#007a87] group-hover:text-white flex items-center justify-center transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
                        {srv.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#007a87] transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-light mb-4">
                      {srv.desc}
                    </p>

                    <div className="space-y-1.5 pt-3 border-t border-slate-100">
                      {srv.points.map((pt, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#007a87] shrink-0" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectServiceForBooking('signature-whole-body')}
                    className="mt-6 w-full py-2.5 text-center text-xs font-bold uppercase tracking-wider rounded-xl border border-slate-200 group-hover:border-[#007a87] group-hover:bg-[#007a87] group-hover:text-white text-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Book Service</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 2: 6 SPECIALIZED TREATMENTS & CLEAN UNIFIED PRICING */}
      <section id="treatments" className="bg-white px-4 sm:px-8 lg:px-12 py-16 sm:py-24 border-t border-slate-200">
        <div className="mx-auto max-w-[1440px]">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#007a87] flex items-center justify-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4 text-[#007a87]" />
              Signature Bodywork Menu
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Our 6 Specialized Treatments
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 font-light leading-relaxed">
              Simple, transparent pricing across all treatments. Choose your duration and relax as certified therapists take care of the rest.
            </p>
          </div>

          {/* DEDICATED, SINGLE PRICING SHOWCASE (No clutter, exactly as requested) */}
          <div className="mb-14 max-w-4xl mx-auto bg-gradient-to-br from-teal-50/70 via-white to-slate-50 rounded-2xl border border-teal-200/80 p-6 sm:p-8 shadow-sm">
            <div className="text-center mb-6">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#007a87] block mb-1">
                Transparent Rates · Greater Sydney
              </span>
              <h3 className="text-2xl font-black text-slate-900">
                Universal Flat Pricing for All Treatments
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Heated massage table, luxury organic cotton linens, and botanical oils included. No travel fees in Sydney metro.
              </p>
            </div>

            {/* 3 Clear Pricing Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {PRICING_TIERS.map((tier) => {
                const isActive = selectedDuration === tier.minutes;
                return (
                  <button
                    key={tier.minutes}
                    type="button"
                    onClick={() => setSelectedDuration(tier.minutes)}
                    className={`relative p-5 rounded-xl text-center border transition-all cursor-pointer flex flex-col justify-between ${
                      isActive
                        ? 'bg-[#007a87] text-white border-[#007a87] shadow-md ring-2 ring-[#007a87]'
                        : 'bg-white border-slate-200 text-slate-900 hover:border-[#007a87]/60'
                    }`}
                  >
                    {tier.popular && (
                      <span className={`absolute -top-2.5 left-1/2 -translate-x-1/2 text-[9px] uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded-full shadow-xs ${
                        isActive ? 'bg-amber-400 text-slate-900' : 'bg-[#007a87] text-white'
                      }`}>
                        Most Popular
                      </span>
                    )}

                    <div>
                      <div className="flex items-center justify-center gap-1.5 mb-1 text-xs font-bold uppercase tracking-wider">
                        <Clock className={`w-3.5 h-3.5 ${isActive ? 'text-teal-200' : 'text-[#007a87]'}`} />
                        <span>{tier.hours}</span>
                      </div>
                      <div className="text-3xl sm:text-4xl font-black tracking-tight my-1">
                        ${tier.price}
                      </div>
                      <p className={`text-[11px] font-light leading-snug ${isActive ? 'text-teal-100' : 'text-slate-500'}`}>
                        {tier.desc}
                      </p>
                    </div>

                    <span className={`mt-3 text-[11px] font-bold ${isActive ? 'text-amber-300' : 'text-[#007a87]'}`}>
                      {isActive ? '✓ Selected Duration' : 'Select Duration'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* THE 6 REQUESTED TREATMENTS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {SERVICES.map((service) => {
              const activePrice = selectedDuration === 60 ? 100 : selectedDuration === 90 ? 140 : 170;

              return (
                <article
                  key={service.id}
                  onClick={() => onSelectServiceForBooking(service.id, selectedDuration)}
                  className="group relative flex min-h-[380px] flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#007a87] cursor-pointer bg-white"
                >
                  {/* Top Bar */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#007a87]">
                        {service.num} · Shairu Sydney
                      </span>
                      <h4 className="text-xl font-extrabold text-slate-900 mt-1 group-hover:text-[#007a87] transition-colors">
                        {service.title}
                      </h4>
                      <span className="block text-xs font-medium text-slate-500 mt-0.5">
                        {service.tagline}
                      </span>
                    </div>

                    <span
                      aria-label={`Book ${service.title}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition-all duration-300 group-hover:bg-[#007a87] group-hover:text-white bg-slate-50 shrink-0"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="my-4 flex-1">
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-light mb-4">
                      {service.detail}
                    </p>

                    {/* What's Included */}
                    <div className="space-y-1.5 pt-3 border-t border-slate-100">
                      {service.included.slice(0, 3).map((inc, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-[#007a87] shrink-0 mt-0.5" />
                          <span className="font-light">{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Rate & Quick Booking */}
                  <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-black text-[#007a87]">
                        ${activePrice}
                      </span>
                      <span className="text-[11px] text-slate-500 ml-1">
                        / {selectedDuration === 60 ? '1 hour' : selectedDuration === 90 ? '1.5 hours' : '2 hours'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/61433556409?text=Hi%20Shairu%2C%20I%20would%20like%20to%20book%20the%20${encodeURIComponent(service.title)}%20(${selectedDuration === 60 ? '1 hour' : selectedDuration === 90 ? '1.5 hours' : '2 hours'})%20in%20Sydney`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectServiceForBooking(service.id, selectedDuration);
                        }}
                        className="px-4 py-2 rounded-lg bg-[#007a87] group-hover:bg-[#00636e] text-white text-xs font-bold uppercase tracking-wider shadow-xs transition-colors cursor-pointer"
                      >
                        Book Now
                      </button>
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
