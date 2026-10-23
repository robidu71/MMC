import { ArrowUpRight, Check } from 'lucide-react';
import { APPROACH_PILLARS, SERVICES } from '../data/massageData';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceId: string, duration?: number) => void;
}

export function ServicesSection({ onSelectServiceForBooking }: ServicesSectionProps) {
  return (
    <>
      {/* The Approach Section */}
      <section id="approach" className="px-5 py-16 md:px-10 md:py-24 lg:px-16 border-t border-[#ded9ce]">
        <div className="mx-auto max-w-[1440px]">
          
          <div className="max-w-2xl mb-12 md:mb-16">
            <p className="eyebrow mb-3 text-[#9a7053]">
              The Masud&apos;s Massage Center way
            </p>
            <h2 className="serif text-4xl sm:text-5xl md:text-6xl tracking-[-0.035em] text-[#29483c]">
              Care that meets you where you are.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {APPROACH_PILLARS.map((pillar) => (
              <div
                key={pillar.num}
                className="flex flex-col justify-between border-t border-[#29483c]/20 pt-6"
              >
                <div>
                  <span className="serif text-3xl sm:text-4xl text-[#9a7053] block mb-4 tabular-nums">
                    {pillar.num}
                  </span>
                  <h3 className="serif text-2xl sm:text-3xl text-[#29483c] mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-6 text-[#59675d] font-light">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* The Services & Pricing Section */}
      <section id="services" className="bg-[#f0eee5] px-5 py-16 md:px-10 md:py-24 lg:px-16 border-t border-[#ded9ce]">
        <div className="mx-auto max-w-[1440px]">
          
          <div className="max-w-2xl mb-12 md:mb-16">
            <p className="eyebrow mb-3 text-[#9a7053]">
              Services &amp; Pricing
            </p>
            <h2 className="serif text-4xl sm:text-5xl md:text-6xl tracking-[-0.035em] text-[#29483c] text-balance">
              Every session is tailored. These are simply good places to start.
            </h2>
            <p className="text-sm text-[#59675d] font-light mt-3 leading-relaxed">
              Select any session to reserve online. Pressure, pace, and priority muscle areas are customized collaboratively during your intake.
            </p>
          </div>

          {/* 3 Distinctive Styled Cards matching the reference site */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {SERVICES.map((service) => (
              <article
                key={service.id}
                onClick={() => onSelectServiceForBooking(service.id, service.durationOptions[0].minutes)}
                className="group relative flex min-h-[350px] md:min-h-[380px] flex-col justify-between overflow-hidden rounded-[2px] border border-[#ded9ce] p-6 md:p-8 transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
                style={{ backgroundColor: service.color }}
              >
                {/* Top Number & Circle Icon */}
                <div className="flex items-start justify-between">
                  <span className="eyebrow text-[#9a7053]">
                    {service.num} / session
                  </span>
                  <span
                    aria-label={`Book ${service.title}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#aeb8a8] text-[#46604f] transition-transform duration-300 group-hover:rotate-45 bg-white/40"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>

                {/* Content */}
                <div className="my-5">
                  <h3 className="serif text-3xl sm:text-4xl tracking-[-0.02em] text-[#29483c] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-6 text-[#59675d] font-light max-w-[310px] mb-4">
                    {service.detail}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    {service.included.slice(0, 3).map((inc, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#526357]">
                        <Check className="w-3.5 h-3.5 text-[#3b5949] shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Duration and Price bar */}
                <div className="flex items-end justify-between border-t border-[#29483c]/15 pt-4">
                  <div>
                    <span className="text-xs font-medium text-[#29483c] block">{service.durations}</span>
                    <span className="text-[10px] text-[#78857a]">One-to-one session</span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-serif font-bold text-[#29483c] tabular-nums block">
                      {service.priceDisplay}
                    </span>
                    <span className="text-[10px] text-[#9a7053] font-medium group-hover:underline">
                      Reserve this session &rarr;
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-6 text-[11px] leading-5 text-[#788076]">
            Every session includes organic cold-pressed oils, warm compresses, and unhurried intake time. Rates are transparent with no hidden clinic fees.
          </p>

        </div>
      </section>
    </>
  );
}
