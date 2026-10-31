import { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronDown, MessageCircle } from 'lucide-react';
import { MMCLogo } from './MMCLogo';
import { STUDIO_INFO } from '../data/massageData';
import { getStoredBookings } from '../utils/bookingStore';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
  onSelectTab?: (tab: string) => void;
}

export function Navbar({ onOpenBooking }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingCount, setBookingCount] = useState(0);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [locationsDropdown, setLocationsDropdown] = useState(false);

  useEffect(() => {
    const updateCount = () => {
      const active = getStoredBookings().filter((b) => b.status === 'confirmed').length;
      setBookingCount(active);
    };
    updateCount();

    window.addEventListener('mmc_booking_updated', updateCount);
    return () => window.removeEventListener('mmc_booking_updated', updateCount);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'SERVICES', href: '#services', hasDropdown: true },
    { label: 'TREATMENTS', href: '#treatments' },
    { label: 'SANCTUARY', href: '#gallery' },
    { label: 'LOCATIONS', href: '#locations', hasDropdown: true },
    { label: 'PRICING', href: '#treatments' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const serviceItems = [
    { title: 'Hotel In-Room Massage', desc: 'Partnered with 4 & 5 star hotels' },
    { title: 'At-Home Mobile Massage', desc: 'Day-spa delivered directly to your home' },
    { title: 'Corporate Workplace Wellness', desc: 'Seated desk massages for teams' },
    { title: 'Couples & Special Occasions', desc: 'Side-by-side treatments & celebrations' },
  ];

  const locationItems = [
    { name: 'Sydney CBD & Darling Harbour', desc: 'Immediate dispatch to all hotels & apartments' },
    { name: 'Eastern Suburbs', desc: 'Bondi, Double Bay, Paddington, Coogee' },
    { name: 'North Shore & Northern Beaches', desc: 'North Sydney, Mosman, Manly' },
    { name: 'Inner West & Surry Hills', desc: 'Newtown, Balmain, Alexandria' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#faf9f5]/95 border-b border-[#e5dfd5] shadow-xs backdrop-blur-md">
      {/* Main Navigation Bar */}
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 sm:px-8 py-2.5 sm:py-3">
        
        {/* Shairu Brand Signature Logo */}
        <a href="#home" aria-label="Shairu Mobile Massage Australia Home" className="shrink-0 transition-opacity hover:opacity-90">
          <MMCLogo variant="full" />
        </a>

        {/* Desktop Navigation Links — All accessible in header */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 font-sans text-[13px] font-bold text-[#35483f] tracking-wider">
          {navLinks.map((link) => {
            if (link.label === 'SERVICES') {
              return (
                <div
                  key={link.label}
                  className="relative group py-2"
                  onMouseEnter={() => setServicesDropdown(true)}
                  onMouseLeave={() => setServicesDropdown(false)}
                >
                  <a
                    href={link.href}
                    className="flex items-center gap-1 text-[#35483f] hover:text-[#285244] transition-colors"
                  >
                    <span>{link.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#6c8075] group-hover:text-[#285244]" />
                  </a>

                  {/* Dropdown */}
                  {servicesDropdown && (
                    <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-[#ded8cc] py-3 px-2 z-50 animate-in fade-in duration-150">
                      {serviceItems.map((s, idx) => (
                        <a
                          key={idx}
                          href="#services"
                          className="block px-3 py-2 rounded-lg hover:bg-[#eef4f0] transition-colors"
                          onClick={() => setServicesDropdown(false)}
                        >
                          <div className="text-xs font-bold text-[#1b3127] hover:text-[#285244]">{s.title}</div>
                          <div className="text-[11px] text-[#5a7065] font-normal">{s.desc}</div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            if (link.label === 'LOCATIONS') {
              return (
                <div
                  key={link.label}
                  className="relative group py-2"
                  onMouseEnter={() => setLocationsDropdown(true)}
                  onMouseLeave={() => setLocationsDropdown(false)}
                >
                  <a
                    href={link.href}
                    className="flex items-center gap-1 text-[#35483f] hover:text-[#285244] transition-colors"
                  >
                    <span>{link.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#6c8075] group-hover:text-[#285244]" />
                  </a>

                  {/* Dropdown */}
                  {locationsDropdown && (
                    <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-[#ded8cc] py-3 px-2 z-50 animate-in fade-in duration-150">
                      {locationItems.map((loc, idx) => (
                        <a
                          key={idx}
                          href="#locations"
                          className="block px-3 py-2 rounded-lg hover:bg-[#eef4f0] transition-colors"
                          onClick={() => setLocationsDropdown(false)}
                        >
                          <div className="text-xs font-bold text-[#1b3127] flex items-center justify-between">
                            <span>{loc.name}</span>
                            <span className="text-[9px] bg-[#eef4f0] text-[#285244] border border-[#d2e2d8] px-1.5 py-0.5 rounded font-semibold">Active</span>
                          </div>
                          <div className="text-[11px] text-[#5a7065] font-normal">{loc.desc}</div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <a
                key={link.label}
                href={link.href}
                className="text-[#35483f] hover:text-[#285244] transition-colors py-2 border-b-2 border-transparent hover:border-[#285244]"
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action Buttons: WhatsApp Quick Chat + BOOK NOW Pill */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* WhatsApp Direct Header Button */}
          <a
            href={STUDIO_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] px-4 py-2 text-xs font-bold text-white shadow-xs transition-all active:scale-95"
            aria-label="Chat on WhatsApp +61 433 556 409"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span className="hidden xl:inline">WhatsApp:</span>
            <span>+61 433 556 409</span>
          </a>

          <button
            onClick={() => onOpenBooking()}
            className="group relative flex items-center justify-center gap-2 rounded-full bg-[#285244] px-5 sm:px-7 py-2 sm:py-2.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-white shadow-md hover:bg-[#1e3e33] active:scale-95 transition-all cursor-pointer"
          >
            <span>BOOK NOW</span>
            {bookingCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#cfa052] text-slate-900 text-[10px] font-extrabold flex items-center justify-center">
                {bookingCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#285244] rounded-lg hover:bg-[#eef4f0] lg:hidden"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#285244]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#faf9f5] border-t border-[#ded8cc] px-6 py-5 shadow-xl animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-3 font-sans text-sm font-bold text-[#1b3127]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-[#ece6da] hover:text-[#285244] flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs text-[#7d9187]">&rarr;</span>
              </a>
            ))}
            
            <div className="pt-3 flex flex-col gap-2.5">
              <a
                href={STUDIO_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-3 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba59] rounded-full shadow-xs"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp: +61 433 556 409</span>
              </a>

              <a
                href={`tel:${STUDIO_INFO.phone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-[#285244] border border-[#285244] rounded-full"
              >
                <Phone className="w-4 h-4" />
                <span>Call {STUDIO_INFO.phoneDisplay}</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 text-center text-xs font-bold tracking-wider uppercase text-white bg-[#285244] hover:bg-[#1e3e33] rounded-full shadow-md cursor-pointer"
              >
                BOOK NOW
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
