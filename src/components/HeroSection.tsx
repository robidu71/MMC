import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { STUDIO_INFO } from '../data/massageData';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onExploreTreatments: () => void;
}

export function HeroSection({ onOpenBooking, onExploreTreatments }: HeroSectionProps) {
  return (
    <section id="home" className="relative px-5 pt-12 pb-16 md:px-10 md:pt-16 md:pb-24 lg:px-16 overflow-hidden">
      <div className="mx-auto max-w-[1440px]">
        
        {/* Top Headline & Pitch Grid */}
        <div className="grid gap-8 md:grid-cols-[1.1fr_.9fr] md:items-end lg:gap-16 mb-12 md:mb-16">
          <div>
            <p className="eyebrow mb-4 text-[#9a7053]">
              A QUIETER KIND OF CARE
            </p>
            <h1 className="serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] leading-[1.04] tracking-[-0.035em] text-[#29483c] text-balance">
              Space to soften, room to breathe
            </h1>
          </div>

          <div className="flex flex-col justify-end md:pb-2">
            <p className="text-base sm:text-lg leading-relaxed text-[#59675d] font-light max-w-lg mb-8">
              {STUDIO_INFO.heroDesc}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreTreatments}
                className="group flex items-center gap-2 rounded-full border border-[#29483c] px-6 py-3 text-xs font-medium text-[#29483c] transition-colors hover:bg-[#29483c] hover:text-[#f3eee3]"
              >
                <span>Explore a session</span>
                <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
              </button>

              <button
                onClick={onOpenBooking}
                className="group flex items-center gap-2 rounded-full bg-[#29483c] px-6 py-3 text-xs font-medium text-[#f3eee3] transition-colors hover:bg-[#1f372e] shadow-xs"
              >
                <span>Book an appointment</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Hero Visual Showcase with real photo from reference site */}
        <div className="group relative overflow-hidden rounded-[3px] border border-[#ded9ce] bg-[#ede5d8]">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full max-h-[560px] overflow-hidden">
            <img
              src="/studio-room.jpg"
              alt="Sunlight falling across a calm massage room with natural textures at Masud's Massage Center"
              className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.015]"
              onError={(e) => {
                // Fallback in case browser blocks image
                (e.target as HTMLElement).style.display = 'none';
              }}
            />

            {/* Subtle overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#29483c]/50 via-transparent to-transparent pointer-events-none" />

            {/* Lower Caption Bar */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
              <div className="max-w-md">
                <p className="serif text-xl sm:text-2xl text-[#f5f2e9] drop-shadow-xs">
                  Unhurried care, in a space that feels like yours.
                </p>
                <p className="text-xs text-[#dce5dd] font-light mt-0.5 drop-shadow-xs">
                  Sunlight, washed organic linens, and quiet acoustic insulation.
                </p>
              </div>

              <div className="self-start sm:self-auto bg-[#29483c]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-[11px] font-medium text-[#f5f2e9]">
                Masud&apos;s Massage Center (MMC) · Private Studio
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
