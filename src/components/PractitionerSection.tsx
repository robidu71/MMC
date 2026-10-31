import { ArrowUpRight, Award, ShieldCheck, CheckCircle2, UserCheck, Star, MessageCircle } from 'lucide-react';

interface PractitionerSectionProps {
  onOpenBooking: () => void;
}

export function PractitionerSection({ onOpenBooking }: PractitionerSectionProps) {
  return (
    <section id="practitioners" className="bg-[#1b352b] text-white px-4 sm:px-8 lg:px-12 py-16 sm:py-24 border-t border-[#152a22]">
      <div className="mx-auto grid max-w-[1240px] gap-12 md:grid-cols-[.85fr_1.15fr] md:items-center md:gap-16">
        
        {/* Practitioner Image Column */}
        <figure className="group relative mx-auto w-full max-w-[430px] md:mx-0">
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-2xl border border-emerald-400/20 transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#12231c] shadow-2xl">
            <img
              src="/massage-session.jpg"
              alt="Qualified Shairu mobile massage therapist delivering in-room care"
              className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <figcaption className="mt-4 flex items-center justify-between text-xs text-[#b8d4c7]">
            <span className="flex items-center gap-1 font-bold">
              <Star className="w-3.5 h-3.5 fill-[#cfa052] text-[#cfa052]" />
              5-Star Vetted Therapists
            </span>
            <span className="text-[#96b5a6]">Shairu Australia Network</span>
          </figcaption>
        </figure>

        {/* Narrative Column */}
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#a8cfbd] block mb-2">
            Professional Standards &amp; Care
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Qualified, Police-Checked &amp; Personally Selected Therapists
          </h2>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#d1e5dc] font-light">
            <p>
              At <strong>Shairu</strong>, your comfort, safety, and therapeutic recovery are paramount. We maintain the most stringent recruitment and qualification standards in the Australian mobile health industry.
            </p>
            <p>
              Each practitioner arrives fully equipped with commercial-grade portable tables, sanitized linens, and organic oils. Whether you require firm remedial trigger-point release or gentle jet-lag recovery in your hotel room, our therapists adjust the pressure continuously to your preference.
            </p>
          </div>

          {/* Credentials and Highlights */}
          <div className="mt-8 pt-6 border-t border-emerald-900/60 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-[#d1e5dc]">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#cfa052] shrink-0" />
              <span>Accredited Remedial &amp; Swedish Therapists</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#cfa052] shrink-0" />
              <span>National Police Vetted &amp; Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#cfa052] shrink-0" />
              <span>Partnered with 800+ 4 &amp; 5 Star Hotels</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#cfa052] shrink-0" />
              <span>Private Health Fund Rebates Available</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="https://wa.me/61433556409?text=Hi%20Shairu%2C%20I%20would%20like%20to%20book%20a%20qualified%20therapist%20for%20a%20mobile%20massage%20in%20Australia."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Book a Qualified Therapist (WhatsApp)</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <span className="text-xs text-[#a8cfbd]">Direct Chat · Available 7 Days, 8am – 10pm</span>
          </div>

        </div>

      </div>
    </section>
  );
}
