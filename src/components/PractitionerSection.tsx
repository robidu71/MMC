import { ArrowUpRight, Check, Award, ShieldCheck, HeartHandshake } from 'lucide-react';

interface PractitionerSectionProps {
  onOpenBooking: () => void;
}

export function PractitionerSection({ onOpenBooking }: PractitionerSectionProps) {
  return (
    <section id="practitioner" className="bg-[#29483c] px-5 py-16 text-[#f3eee3] md:px-10 md:py-24 lg:px-16">
      <div className="mx-auto grid max-w-[1240px] gap-12 md:grid-cols-[.85fr_1.15fr] md:items-center md:gap-20">
        
        {/* Practitioner Image Column with real photo from reference site */}
        <figure className="group relative mx-auto w-full max-w-[430px] md:mx-0">
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-[3px] border border-[#f3eee3]/15 transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-[#1f372e]">
            <img
              src="/massage-session.jpg"
              alt="Masud, a professional massage therapist providing respectful and focused bodywork"
              className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.025]"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <figcaption className="mt-4 flex items-center justify-between text-xs text-[#cad5cb]">
            <span>Masud, LMT</span>
            <span className="text-[#d6a982]">Founder · Lead Practitioner</span>
          </figcaption>
        </figure>

        {/* Narrative Column */}
        <div>
          <p className="eyebrow mb-3 text-[#d6a982]">
            Care, in practice
          </p>

          <h2 className="serif text-4xl sm:text-5xl md:text-6xl tracking-[-0.035em] text-[#f3eee3] mb-6">
            A collaborative approach to relief.
          </h2>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#c6d3c8] font-light">
            <p>
              Bodywork, for me, begins with listening. I work with people who carry tension from long hours at the desk, active training, or simply living through demanding days.
            </p>
            <p>
              Every session is collaborative: we pay close attention to what feels supportive, leave ample space to adjust pressure as we go, and never force a muscle to release before your nervous system is ready.
            </p>
          </div>

          {/* Credentials and Highlights */}
          <div className="mt-8 pt-6 border-t border-[#f3eee3]/15 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#dbe6dc]">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#d6a982] shrink-0" />
              <span>Licensed Massage Therapist (LMT)</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#d6a982] shrink-0" />
              <span>Board Certified &amp; Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-[#d6a982] shrink-0" />
              <span>Pressure guided by you at every step</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#d6a982] shrink-0" />
              <span>Itemized insurance receipts provided</span>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={onOpenBooking}
              className="group inline-flex items-center gap-2 rounded-full bg-[#f3eee3] px-6 py-3 text-xs font-medium text-[#29483c] transition-colors hover:bg-white"
            >
              <span>Schedule with Masud</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
