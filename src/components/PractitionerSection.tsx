import { ArrowUpRight, Award, ShieldCheck, CheckCircle2, UserCheck, Star, MessageCircle } from 'lucide-react';
import maleTherapistProfile from '../assets/images/male_therapist_profile_1793442093261.jpg';

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
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#12231c] shadow-2xl">
            <img
              src={maleTherapistProfile}
              alt="David - Senior certified male massage therapist with 10+ years experience"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            {/* 10+ Years Experience Floating Badge */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold">
              <Award className="w-3.5 h-3.5 text-[#cfa052]" />
              <span>10+ Years Experience</span>
            </div>
          </div>
          <figcaption className="mt-4 flex items-center justify-between text-xs text-[#b8d4c7]">
            <span className="flex items-center gap-1 font-bold">
              <Star className="w-3.5 h-3.5 fill-[#cfa052] text-[#cfa052]" />
              Senior Certified Male Therapist
            </span>
            <span className="text-[#96b5a6]">10+ Years Clinical Care</span>
          </figcaption>
        </figure>

        {/* Narrative Column */}
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#a8cfbd] block mb-2">
            Professional Standards &amp; Senior Care
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Senior Certified Male Therapist with 10+ Years Experience
          </h2>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#d1e5dc] font-light">
            <p>
              At <strong>Shairu</strong>, your therapeutic recovery and comfort are in expert hands. Our senior certified male practitioner brings over <strong>10 years of professional clinical, remedial, and luxury 5-star hotel experience</strong> across Australia.
            </p>
            <p>
              Arriving fully equipped with commercial-grade heated massage tables, fresh Egyptian cotton linens, and warm organic oils, he delivers master-level treatments. With a decade of dedicated hands-on experience, whether you require firm trigger-point knot release or gentle restorative relaxation, pressure is calibrated continuously to your exact comfort level.
            </p>
          </div>

          {/* Credentials and Highlights */}
          <div className="mt-8 pt-6 border-t border-emerald-900/60 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-[#d1e5dc]">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#cfa052] shrink-0" />
              <span>10+ Years Clinical &amp; Spa Practice</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#cfa052] shrink-0" />
              <span>Accredited Remedial &amp; Swedish Qualifications</span>
            </div>
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#cfa052] shrink-0" />
              <span>National Police Clearance &amp; Fully Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#cfa052] shrink-0" />
              <span>Partnered with 800+ 4 &amp; 5 Star Hotels</span>
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
