import { ArrowUpRight, Award, ShieldCheck, HeartHandshake, CheckCircle2, UserCheck, Star } from 'lucide-react';

interface PractitionerSectionProps {
  onOpenBooking: () => void;
}

export function PractitionerSection({ onOpenBooking }: PractitionerSectionProps) {
  return (
    <section id="practitioners" className="bg-[#004e57] text-white px-4 sm:px-8 lg:px-12 py-16 sm:py-24">
      <div className="mx-auto grid max-w-[1240px] gap-12 md:grid-cols-[.85fr_1.15fr] md:items-center md:gap-16">
        
        {/* Practitioner Image Column */}
        <figure className="group relative mx-auto w-full max-w-[430px] md:mx-0">
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-2xl border border-teal-400/20 transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-teal-950 shadow-2xl">
            <img
              src="/massage-session.jpg"
              alt="Qualified Shairu mobile massage therapist delivering in-room care"
              className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <figcaption className="mt-4 flex items-center justify-between text-xs text-teal-200">
            <span className="flex items-center gap-1 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              5-Star Vetted Therapists
            </span>
            <span className="text-teal-100">Shairu Australia Network</span>
          </figcaption>
        </figure>

        {/* Narrative Column */}
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-teal-300 block mb-2">
            Professional Standards &amp; Care
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Qualified, Police-Checked &amp; Personally Selected Therapists
          </h2>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-teal-100 font-light">
            <p>
              At <strong>Shairu</strong>, your comfort, safety, and therapeutic recovery are paramount. We maintain the most stringent recruitment and qualification standards in the Australian mobile health industry.
            </p>
            <p>
              Each practitioner arrives fully equipped with commercial-grade portable tables, sanitized linens, and organic oils. Whether you require firm remedial trigger-point release or gentle jet-lag recovery in your hotel room, our therapists adjust the pressure continuously to your preference.
            </p>
          </div>

          {/* Credentials and Highlights */}
          <div className="mt-8 pt-6 border-t border-teal-500/30 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-teal-100">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Accredited Remedial &amp; Swedish Therapists</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
              <span>National Police Vetted &amp; Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Partnered with 800+ 4 &amp; 5 Star Hotels</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Private Health Fund Rebates Available</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2 rounded-full bg-white text-[#004e57] hover:bg-teal-50 px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <span>Book a Qualified Therapist</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <span className="text-xs text-teal-200">Available 7 Days, 8am – 10pm</span>
          </div>

        </div>

      </div>
    </section>
  );
}
