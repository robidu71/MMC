import { useState, useEffect } from 'react';
import { STUDIO_INFO } from '../data/massageData';
import {
  Clock,
  MapPin,
  Phone,
  Download,
  CalendarCheck,
  Trash2,
  Sparkles,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import {
  ConfirmedBooking,
  getStoredBookings,
  cancelStoredBooking,
} from '../utils/bookingStore';

interface BookingSectionProps {
  onOpenBookingModal?: (serviceId?: string) => void;
}

export function BookingSection({ onOpenBookingModal }: BookingSectionProps) {
  // Persistent bookings list
  const [allBookings, setAllBookings] = useState<ConfirmedBooking[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load existing bookings on mount and on custom events
  useEffect(() => {
    setAllBookings(getStoredBookings());

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<ConfirmedBooking[]>;
      if (customEvent.detail) {
        setAllBookings(customEvent.detail);
      } else {
        setAllBookings(getStoredBookings());
      }
    };

    window.addEventListener('mmc_booking_updated', handleUpdate);
    return () => window.removeEventListener('mmc_booking_updated', handleUpdate);
  }, []);

  const handleDownloadCalendar = (booking: ConfirmedBooking) => {
    const loc = booking.deliveryAddress ? `${booking.deliveryAddress}, ${booking.sydneySuburb || 'Sydney'}` : STUDIO_INFO.address;
    const title = `Shairu Mobile Massage: ${booking.serviceTitle}`;
    const desc = `Booking Ref: ${booking.refCode}\\nService: ${booking.serviceTitle} (${booking.durationMinutes} min - $${booking.price})\\nLocation: ${loc}\\nClient: ${booking.clientName}\\nPhone: 1300 742 478`;
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Shairu Mobile Massage Sydney//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${desc}`,
      `LOCATION:${loc}`,
      `DTSTART:${booking.date.replace(/-/g, '')}T110000Z`,
      `DTEND:${booking.date.replace(/-/g, '')}T123000Z`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `shairu-sydney-${booking.refCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCancelBooking = (id: string) => {
    cancelStoredBooking(id);
  };

  const activeBookingsCount = allBookings.filter((b) => b.status === 'confirmed').length;

  return (
    <>
      {/* Contact & Direct Dispatch Section */}
      <section id="contact" className="bg-[#f5f3ec] px-4 sm:px-8 lg:px-12 py-16 sm:py-24 border-t border-[#ded8cc]">
        <div className="mx-auto max-w-[1000px]">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#eef4f0] text-[11px] font-bold text-[#285244] border border-[#d2e2d8] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#285244]" />
              <span>On-Demand Mobile Dispatch Sydney &amp; Australia</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1a3127] tracking-tight mb-4">
              Direct Contact &amp; Fast Booking
            </h2>
            
            <p className="text-sm sm:text-base leading-relaxed text-[#475b51] font-light">
              Staying in a Sydney CBD hotel, or relaxing at home in Bondi, North Sydney, or the Inner West? Message us directly on WhatsApp or call our hotline. A qualified therapist arrives with a heated table, fresh linens, and calming organic oils.
            </p>
          </div>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
            
            {/* WhatsApp Direct Card */}
            <div className="p-6 bg-white rounded-2xl border border-emerald-300 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 fill-emerald-600 text-emerald-600" />
                </div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-700 block mb-1">
                  Instant WhatsApp Concierge
                </span>
                <h3 className="text-xl font-bold text-[#1a3127] mb-2">
                  +61 433 556 409
                </h3>
                <p className="text-xs text-[#5a7065] leading-relaxed mb-6">
                  Chat directly with our dispatch team. Get instant availability, share your address/hotel room, and customize pressure or aromatherapy.
                </p>
              </div>

              <a
                href={STUDIO_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Direct Phone Hotline Card */}
            <div className="p-6 bg-white rounded-2xl border border-[#d2e2d8] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#eef4f0] text-[#285244] flex items-center justify-center mb-4 border border-[#d2e2d8]">
                  <Phone className="w-6 h-6" />
                </div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#285244] block mb-1">
                  Direct Phone Hotline
                </span>
                <h3 className="text-xl font-bold text-[#1a3127] mb-2">
                  {STUDIO_INFO.phoneDisplay}
                </h3>
                <p className="text-xs text-[#5a7065] leading-relaxed mb-6">
                  Speak with our Australian concierge team for same-day mobile reservations, couples bookings, or corporate wellness inquiries.
                </p>
              </div>

              <a
                href={`tel:${STUDIO_INFO.phone.replace(/\s+/g, '')}`}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#285244] hover:bg-[#1e3e33] px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Call {STUDIO_INFO.phoneDisplay}</span>
              </a>
            </div>

          </div>

          {/* Operating Hours & Dispatch Details Banner */}
          <div className="max-w-3xl mx-auto p-5 bg-white rounded-2xl border border-[#ded8cc] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#475b51]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#eef4f0] text-[#285244] flex items-center justify-center shrink-0 border border-[#d2e2d8]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#697d73] block">Operating Hours</span>
                <span className="font-semibold text-[#1a3127]">Monday – Sunday: 8:00 AM – 10:00 PM (7 Days)</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#697d73] block">Trust &amp; Safety</span>
                <span className="font-semibold text-[#1a3127]">Police Vetted &amp; Insured Therapists</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#5a7065] font-medium">
              <MapPin className="w-4 h-4 text-[#285244] shrink-0" />
              <span>{STUDIO_INFO.travelFeeNote}</span>
            </div>
          </div>

          {/* Stored Bookings Button & View (if active) */}
          {allBookings.length > 0 && (
            <div className="max-w-3xl mx-auto mt-6 text-center">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="inline-flex items-center gap-2 rounded-full bg-white border border-[#ded8cc] px-5 py-2.5 text-xs font-bold text-[#35483f] hover:border-[#285244] hover:text-[#285244] transition-colors cursor-pointer shadow-xs"
              >
                <CalendarCheck className="w-4 h-4 text-[#285244]" />
                <span>Your Confirmed Sessions ({activeBookingsCount})</span>
              </button>

              {showHistory && (
                <div className="mt-4 p-5 bg-white text-left rounded-2xl border border-[#ded8cc] space-y-3 shadow-md animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-[#f0ece3] pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#285244]">Your Confirmed Mobile Sessions</span>
                    <button
                      onClick={() => setShowHistory(false)}
                      className="text-xs text-[#697d73] hover:text-[#1a3127] cursor-pointer"
                    >
                      Hide
                    </button>
                  </div>

                  <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                    {allBookings.map((b) => (
                      <div
                        key={b.id}
                        className={`p-3 rounded-lg text-xs border flex items-center justify-between ${
                          b.status === 'confirmed'
                            ? 'bg-[#faf9f5] border-[#ded8cc]'
                            : 'bg-slate-100 border-transparent opacity-60'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-[#1a3127]">
                            {b.serviceTitle} ({b.durationMinutes}m) · ${b.price} AUD
                          </div>
                          <div className="text-[11px] text-[#5a7065] mt-0.5">
                            {b.date} at {b.timeSlot} · Ref: <strong className="font-mono text-[#1a3127]">{b.refCode}</strong>
                          </div>
                          {b.deliveryAddress && (
                            <div className="text-[10px] text-[#475b51] mt-0.5 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#285244]" />
                              <span>{b.deliveryAddress} ({b.sydneySuburb})</span>
                            </div>
                          )}
                          {b.status === 'cancelled' && <span className="text-rose-600 font-bold">(Cancelled)</span>}
                        </div>

                        {b.status === 'confirmed' && (
                          <div className="flex items-center gap-2 shrink-0 ml-2">
                            <button
                              onClick={() => handleDownloadCalendar(b)}
                              title="Download .ics calendar invite"
                              className="p-1.5 text-[#5a7065] hover:text-[#285244] cursor-pointer"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleCancelBooking(b.id)}
                              title="Cancel reservation"
                              className="p-1.5 text-rose-500 hover:text-rose-700 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </section>

      {/* Rejuvenators Australia Locations Directory Section */}
      <section id="locations" className="px-4 sm:px-8 lg:px-12 py-16 bg-[#faf9f5] border-t border-[#ded8cc]">
        <div className="mx-auto max-w-[1240px]">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#285244]">
              National Service Network
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1a3127] mt-1">
              Locations Serviced Across Australia
            </h3>
            <p className="text-xs text-[#5a7065] mt-1.5">
              Operating 7 days a week with certified therapists ready to dispatch to your hotel or home.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border-2 border-[#285244] bg-[#eef4f0]">
              <span className="text-xs font-bold text-[#285244] uppercase tracking-wider block mb-1">Active Hub</span>
              <h4 className="text-base font-bold text-[#1a3127]">Sydney &amp; NSW</h4>
              <p className="text-xs text-[#475b51] mt-1">Sydney CBD, Darling Harbour, Bondi, Double Bay, North Sydney, Manly, Surry Hills &amp; Parramatta.</p>
            </div>

            <div className="p-4 rounded-xl border border-[#ded8cc] bg-white shadow-2xs">
              <span className="text-xs font-bold text-[#697d73] uppercase tracking-wider block mb-1">Network Hub</span>
              <h4 className="text-base font-bold text-[#1a3127]">Melbourne &amp; VIC</h4>
              <p className="text-xs text-[#5a7065] mt-1">Melbourne CBD, Southbank, Docklands, St Kilda, South Yarra &amp; Richmond.</p>
            </div>

            <div className="p-4 rounded-xl border border-[#ded8cc] bg-white shadow-2xs">
              <span className="text-xs font-bold text-[#697d73] uppercase tracking-wider block mb-1">Network Hub</span>
              <h4 className="text-base font-bold text-[#1a3127]">Brisbane &amp; Gold Coast</h4>
              <p className="text-xs text-[#5a7065] mt-1">Brisbane CBD, South Bank, Fortitude Valley, Surfers Paradise &amp; Broadbeach.</p>
            </div>

            <div className="p-4 rounded-xl border border-[#ded8cc] bg-white shadow-2xs">
              <span className="text-xs font-bold text-[#697d73] uppercase tracking-wider block mb-1">Network Hub</span>
              <h4 className="text-base font-bold text-[#1a3127]">Perth &amp; Adelaide</h4>
              <p className="text-xs text-[#5a7065] mt-1">Perth CBD, Fremantle, Adelaide CBD, Glenelg &amp; North Adelaide.</p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
