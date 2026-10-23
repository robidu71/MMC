import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Palette } from 'lucide-react';
import { soundscape } from '../utils/soundscape';
import { MMCLogo } from './MMCLogo';
import { getStoredBookings } from '../utils/bookingStore';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
  logoStyle?: 'botanical-palm' | 'zen-meridian' | 'monogram';
  onChangeLogoStyle?: (style: 'botanical-palm' | 'zen-meridian' | 'monogram') => void;
}

export function Navbar({
  onOpenBooking,
  logoStyle = 'botanical-palm',
  onChangeLogoStyle,
}: NavbarProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoModal, setShowLogoModal] = useState(false);
  const [bookingCount, setBookingCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const active = getStoredBookings().filter((b) => b.status === 'confirmed').length;
      setBookingCount(active);
    };
    updateCount();

    window.addEventListener('mmc_booking_updated', updateCount);
    return () => window.removeEventListener('mmc_booking_updated', updateCount);
  }, []);

  const toggleAudio = () => {
    const nextState = soundscape.toggle();
    setIsPlayingAudio(nextState);
  };

  const navLinks = [
    { label: 'Approach', href: '#approach' },
    { label: 'Services', href: '#services' },
    { label: 'The Space', href: '#gallery' },
    { label: 'Practitioner', href: '#practitioner' },
    { label: 'Kind words', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Visit', href: '#visit' },
  ];

  const logoIdeas = [
    {
      id: 'botanical-palm' as const,
      name: 'Botanical Palm & Zen Arc',
      subtitle: 'Recommended · Harmonious human touch arches forming "MMC" with healing leaf & river stone',
      tone: 'Warm, organic, deeply restorative',
    },
    {
      id: 'zen-meridian' as const,
      name: 'Lotus Meridian & Pebble',
      subtitle: 'Symmetrical lotus energy lines cradled by grounding stones',
      tone: 'Quiet, meditative, contemplative',
    },
    {
      id: 'monogram' as const,
      name: 'Modern Monogram MMC',
      subtitle: 'Editorial linear monogram interlocking MMC with fluid curvature',
      tone: 'Refined, architectural, clinical precision',
    },
  ];

  return (
    <>
      {/* Top Quiet Banner matching reference site */}
      <div className="bg-[#29483c] px-4 py-2 text-center text-[10px] font-semibold tracking-[.12em] text-[#f3eee3] sm:text-xs">
        A QUIETER KIND OF CARE <span className="mx-2 text-[#d6a982]">/</span> MASUD&apos;S MASSAGE CENTER (MMC)
      </div>

      <header className="sticky top-0 z-40 bg-[#f5f2e9]/95 backdrop-blur-md border-b border-[#ded9ce] transition-all">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-10 lg:px-16">
          
          {/* Logo & Studio Mark with bespoke MMC Logo */}
          <div className="flex items-center gap-2">
            <a href="#home" aria-label="Masud's Massage Center (MMC) home" className="group">
              <MMCLogo variant="full" logoStyle={logoStyle} />
            </a>

            {/* Quick Logo Style Picker Button */}
            <button
              onClick={() => setShowLogoModal(true)}
              title="View & choose Logo Ideas"
              className="hidden sm:flex items-center gap-1 ml-2 px-2.5 py-1 rounded-full text-[10px] text-[#78857a] hover:text-[#29483c] bg-[#ede7dc] hover:bg-[#e2d8cb] transition-colors"
            >
              <Palette className="w-3 h-3 text-[#9a7053]" />
              <span>Logo Ideas</span>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-medium text-[#5c695f]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#29483c] transition-colors py-1 hover:underline underline-offset-4 decoration-[#a8b39e]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Zone */}
          <div className="flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={toggleAudio}
              title={isPlayingAudio ? 'Mute serene soundscape' : 'Listen to tranquil spa soundscape'}
              aria-label={isPlayingAudio ? 'Mute soundscape' : 'Play soundscape'}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#4b5a51] bg-[#ece6d9] hover:bg-[#e4dcce] rounded-full transition-colors"
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#29483c] animate-pulse" />
                  <span className="hidden sm:inline text-[11px]">Sound on</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#7b887f]" />
                  <span className="hidden sm:inline text-[11px]">Sound off</span>
                </>
              )}
            </button>

            {/* Primary Booking Button (+ active badge) */}
            <button
              onClick={() => onOpenBooking()}
              className="group flex items-center gap-1.5 rounded-full bg-[#29483c] px-4 py-2 text-xs font-medium text-[#f3eee3] transition-colors hover:bg-[#1f372e] shadow-xs cursor-pointer"
            >
              <span>Book a session</span>
              {bookingCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#d6a982] text-[#29483c] text-[10px] font-bold flex items-center justify-center -mr-0.5">
                  {bookingCount}
                </span>
              )}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[#29483c] rounded-md hover:bg-[#eae3d5] lg:hidden"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[90px] z-30 bg-[#f5f2e9] border-b border-[#ded9ce] shadow-lg lg:hidden px-6 py-6 animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-4 text-sm font-medium text-[#29483c]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 border-b border-[#e9e3d6]"
              >
                {link.label}
              </a>
            ))}
            
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setShowLogoModal(true);
              }}
              className="flex items-center gap-2 py-2 text-xs text-[#78857a]"
            >
              <Palette className="w-4 h-4 text-[#9a7053]" />
              <span>Explore Logo Ideas</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="mt-2 w-full py-2.5 text-center text-xs font-medium text-[#f3eee3] bg-[#29483c] rounded-full"
            >
              Book a session
            </button>
          </nav>
        </div>
      )}

      {/* Logo Idea Showcase Modal */}
      {showLogoModal && (
        <div className="fixed inset-0 z-50 bg-[#1f372e]/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-[#f5f2e9] rounded-[3px] max-w-xl w-full p-6 sm:p-8 border border-[#ded9ce] shadow-2xl relative">
            <button
              onClick={() => setShowLogoModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#59675d] hover:bg-[#ded9ce]"
            >
              <X className="w-5 h-5" />
            </button>

            <p className="eyebrow text-[#9a7053] mb-1">
              Logo Design Concepts
            </p>
            <h3 className="serif text-3xl text-[#29483c] mb-2">
              Masud&apos;s Massage Center (MMC)
            </h3>
            <p className="text-xs text-[#59675d] leading-relaxed mb-6 font-light">
              Crafted around therapeutic human touch, somatic healing palm arches, smooth river stones, and botanical renewal. Click any concept to preview it live across the site:
            </p>

            <div className="space-y-3">
              {logoIdeas.map((idea) => {
                const isSelected = logoStyle === idea.id;
                return (
                  <button
                    key={idea.id}
                    onClick={() => {
                      onChangeLogoStyle?.(idea.id);
                    }}
                    className={`w-full p-4 rounded-[2px] border text-left flex items-start gap-4 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white border-[#29483c] shadow-xs ring-1 ring-[#29483c]'
                        : 'bg-[#ede8dc] border-[#ded9ce] hover:bg-white'
                    }`}
                  >
                    <div className="w-12 h-12 shrink-0">
                      <MMCLogo variant="mark-only" logoStyle={idea.id} className="w-12 h-12" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-lg text-[#29483c]">{idea.name}</span>
                        {isSelected && (
                          <span className="text-[10px] bg-[#29483c] text-[#f3eee3] px-2 py-0.5 rounded font-sans uppercase tracking-wider font-semibold">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#59675d] mt-0.5 leading-relaxed font-light">
                        {idea.subtitle}
                      </p>
                      <div className="text-[11px] text-[#9a7053] mt-1 font-medium">
                        Tone: {idea.tone}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-[#ded9ce] flex justify-end">
              <button
                onClick={() => setShowLogoModal(false)}
                className="px-5 py-2 text-xs font-medium rounded-full bg-[#29483c] text-[#f3eee3] hover:bg-[#1f372e]"
              >
                Apply &amp; Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
