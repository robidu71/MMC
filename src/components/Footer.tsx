import { Phone, Clock, MapPin, ShieldCheck, MessageCircle } from 'lucide-react';
import { STUDIO_INFO, SERVICES } from '../data/massageData';
import { MMCLogo } from './MMCLogo';

export function Footer() {
  return (
    <footer className="bg-[#13241c] text-[#d1e5dc] border-t border-[#1e362a] font-sans">
      {/* Top Banner inside Footer */}
      <div className="border-b border-[#1e362a] py-10 px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1440px] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <MMCLogo variant="footer" theme="light" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <a
              href={STUDIO_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-2.5 rounded-full font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp: +61 433 556 409</span>
            </a>

            <a
              href={`tel:${STUDIO_INFO.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 bg-[#285244] hover:bg-[#1e3e33] text-white px-5 py-2.5 rounded-full font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Call {STUDIO_INFO.phoneDisplay}</span>
            </a>

            <a
              href="#treatments"
              className="border border-[#3d6050] hover:bg-[#1e362a] text-[#d1e5dc] px-5 py-2.5 rounded-full font-bold uppercase tracking-wider transition-colors"
            >
              View 6 Treatments
            </a>
          </div>
        </div>
      </div>

      {/* 4 Multi-Column Directory */}
      <div className="py-14 px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1440px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: About */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#a8cfbd] mb-4">
              About Shairu
            </h4>
            <p className="text-xs text-[#a0beaf] leading-relaxed font-light mb-4">
              Shairu is Australia’s premier provider of in-room hotel and in-home mobile massage services. Trusted by 4 and 5-star hotels, luxury apartments, and private residences across Australia.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#cfa052] font-semibold">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Fully Insured &amp; Police Vetted</span>
            </div>
          </div>

          {/* Col 2: The 6 Treatments & Rates */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#a8cfbd] mb-4">
              6 Treatments &amp; Rates
            </h4>
            <ul className="space-y-2 text-xs text-[#b8d4c7]">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a href="#treatments" className="hover:text-white transition-colors flex items-center justify-between">
                    <span>{s.title}</span>
                    <span className="text-[11px] text-[#a8cfbd] font-bold">1h $100 · 1.5h $140 · 2h $170</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Locations Across Australia */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#a8cfbd] mb-4">
              Australian Locations
            </h4>
            <ul className="space-y-1.5 text-xs text-[#b8d4c7]">
              <li className="font-bold text-white flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#52876f]" />
                <span>Sydney &amp; Greater Metro (Active Hub)</span>
              </li>
              <li className="text-[11px] text-[#8fae9f] pl-5">CBD, Eastern Suburbs, North Shore, Inner West</li>
              <li className="text-[#8fae9f] pl-5">Melbourne &amp; Victoria</li>
              <li className="text-[#8fae9f] pl-5">Brisbane &amp; Gold Coast, QLD</li>
              <li className="text-[#8fae9f] pl-5">Perth &amp; Western Australia</li>
              <li className="text-[#8fae9f] pl-5">Adelaide &amp; South Australia</li>
              <li className="text-[#8fae9f] pl-5">Canberra, ACT</li>
            </ul>
          </div>

          {/* Col 4: Contact & Operating Hours */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#a8cfbd] mb-4">
              Direct Contact &amp; Hours
            </h4>
            <div className="space-y-3 text-xs text-[#b8d4c7]">
              <div className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5 fill-[#25D366]" />
                <div>
                  <a
                    href={STUDIO_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-white hover:underline block"
                  >
                    +61 433 556 409
                  </a>
                  <span className="text-[11px] text-emerald-300">WhatsApp Chat Available</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#a8cfbd] shrink-0 mt-0.5" />
                <div>
                  <a href={`tel:${STUDIO_INFO.phone.replace(/\s+/g, '')}`} className="font-bold text-white block hover:underline">
                    {STUDIO_INFO.phoneDisplay}
                  </a>
                  <span className="text-[11px] text-[#8fae9f]">Direct Telephone Booking</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#a8cfbd] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium">Monday – Sunday: 8:00 AM – 10:00 PM</span>
                  <span className="text-[11px] text-[#8fae9f] block">7 Days On-Demand Service</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-[#1e362a] py-6 px-4 sm:px-8 text-center text-xs text-[#8fae9f]">
        <div className="mx-auto max-w-[1440px] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            &copy; {new Date().getFullYear()} Shairu Mobile Massage &amp; Therapies Australia. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[#8fae9f]">
            <a href="#services" className="hover:text-white">Services</a>
            <span>•</span>
            <a href="#treatments" className="hover:text-white">Treatments</a>
            <span>•</span>
            <a href="#gallery" className="hover:text-white">Sanctuary</a>
            <span>•</span>
            <a href="#locations" className="hover:text-white">Locations</a>
            <span>•</span>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
