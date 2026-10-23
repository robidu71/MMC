import { STUDIO_INFO } from '../data/massageData';
import { MMCLogo } from './MMCLogo';

interface FooterProps {
  logoStyle?: 'botanical-palm' | 'zen-meridian' | 'monogram';
}

export function Footer({ logoStyle = 'botanical-palm' }: FooterProps) {
  return (
    <footer className="border-t border-[#ded9ce] bg-[#ede8dc] px-5 py-12 text-[#59675d] md:px-10 lg:px-16">
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 md:flex-row md:items-center">
        
        {/* Brand Lockup with MMCLogo */}
        <MMCLogo variant="footer" logoStyle={logoStyle} />

        {/* Navigation Mirror */}
        <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#59675d]">
          <a href="#approach" className="hover:text-[#29483c] transition-colors">Approach</a>
          <a href="#services" className="hover:text-[#29483c] transition-colors">Services</a>
          <a href="#gallery" className="hover:text-[#29483c] transition-colors">The Space</a>
          <a href="#practitioner" className="hover:text-[#29483c] transition-colors">Practitioner</a>
          <a href="#reviews" className="hover:text-[#29483c] transition-colors">Kind words</a>
          <a href="#faq" className="hover:text-[#29483c] transition-colors">FAQ</a>
          <a href="#booking" className="hover:text-[#29483c] transition-colors">Booking</a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-[#78857a]">
          &copy; {new Date().getFullYear()} {STUDIO_INFO.name}. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
