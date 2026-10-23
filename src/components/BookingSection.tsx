import { useState, useEffect } from 'react';
import { SERVICES, STUDIO_INFO } from '../data/massageData';
import {
  ArrowUpRight,
  Clock,
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  Download,
  PlusCircle,
  CalendarCheck,
  Trash2,
} from 'lucide-react';
import {
  ConfirmedBooking,
  getStoredBookings,
  saveStoredBooking,
  cancelStoredBooking,
} from '../utils/bookingStore';

interface BookingSectionProps {
  onOpenBookingModal: (serviceId?: string) => void;
}

export function BookingSection({ onOpenBookingModal }: BookingSectionProps) {
  // Inline booking form state
  const [selectedServiceId, setSelectedServiceId] = useState(SERVICES[0].id);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('11:00 AM');
  const [notes, setNotes] = useState('');

  // Confirmation state for the current just-submitted booking
  const [justConfirmedBooking, setJustConfirmedBooking] = useState<ConfirmedBooking | null>(null);

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

  const currentService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  // Submit Handler: Saves order dynamically
  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim() || !clientPhone.trim()) return;

    const ref = 'MMC-' + Math.floor(100000 + Math.random() * 900000);
    const selectedDuration = currentService.durationOptions[0].minutes;
    const selectedPrice = currentService.durationOptions[0].price;

    const newBooking: ConfirmedBooking = {
      id: 'book_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      refCode: ref,
      serviceId: currentService.id,
      serviceTitle: currentService.title,
      durationMinutes: selectedDuration,
      price: selectedPrice,
      date,
      timeSlot: time,
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      clientPhone: clientPhone.trim(),
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };

    saveStoredBooking(newBooking);
    setJustConfirmedBooking(newBooking);
  };

  // Reset function to book another order with pristine clean fields
  const handleBookAnother = () => {
    setJustConfirmedBooking(null);
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setNotes('');
    setDate(new Date().toISOString().split('T')[0]);
    setTime('11:00 AM');
    setSelectedServiceId(SERVICES[0].id);
  };

  const handleDownloadCalendar = (booking: ConfirmedBooking) => {
    const title = `Masud's Massage Center: ${booking.serviceTitle}`;
    const desc = `Appointment Ref: ${booking.refCode}\\nService: ${booking.serviceTitle} (${booking.durationMinutes} min)\\nAddress: ${STUDIO_INFO.address}\\nPhone: ${STUDIO_INFO.phone}`;
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Masuds Massage Center//Appointment Calendar//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${desc}`,
      `LOCATION:${STUDIO_INFO.address}`,
      `DTSTART:${booking.date.replace(/-/g, '')}T110000Z`,
      `DTEND:${booking.date.replace(/-/g, '')}T123000Z`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `mmc-booking-${booking.refCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCancelBooking = (id: string) => {
    cancelStoredBooking(id);
    if (justConfirmedBooking?.id === id) {
      setJustConfirmedBooking(null);
    }
  };

  const activeBookingsCount = allBookings.filter((b) => b.status === 'confirmed').length;

  return (
    <>
      {/* Booking Section */}
      <section id="booking" className="bg-[#ede8dc] px-5 py-16 md:px-10 md:py-24 lg:px-16 border-t border-[#ded9ce]">
        <div className="mx-auto max-w-[1240px]">
          
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            
            {/* Left Narrative Column */}
            <div>
              <p className="eyebrow mb-3 text-[#9a7053]">
                Make room for yourself
              </p>
              <h2 className="serif text-4xl sm:text-5xl md:text-6xl tracking-[-0.035em] text-[#29483c] mb-6">
                Ready to find a time?
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-[#59675d] font-light mb-8 max-w-md">
                Have a question or ready to reserve your session? You can book directly using the form, or launch our full step-by-step reservation concierge.
              </p>

              <div className="space-y-4 text-xs sm:text-sm text-[#48564e]">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#9a7053] shrink-0" />
                  <a href={`mailto:${STUDIO_INFO.email}`} className="hover:text-[#29483c] underline underline-offset-4">
                    {STUDIO_INFO.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#9a7053] shrink-0" />
                  <a href={`tel:${STUDIO_INFO.phone}`} className="hover:text-[#29483c]">
                    {STUDIO_INFO.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#9a7053] shrink-0" />
                  <span>{STUDIO_INFO.hours}</span>
                </div>
              </div>

              {/* Action Buttons & Appointments Counter */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenBookingModal()}
                  className="group inline-flex items-center gap-2 rounded-full border border-[#29483c] px-6 py-3 text-xs font-medium text-[#29483c] hover:bg-[#29483c] hover:text-[#f3eee3] transition-colors"
                >
                  <span>Open Full Booking Concierge</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                {allBookings.length > 0 && (
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#f5f2e9] border border-[#ded9ce] px-4 py-3 text-xs font-medium text-[#29483c] hover:bg-white transition-colors"
                  >
                    <CalendarCheck className="w-4 h-4 text-[#9a7053]" />
                    <span>Your Bookings ({activeBookingsCount})</span>
                  </button>
                )}
              </div>

              {/* Dynamic View of Stored Bookings */}
              {showHistory && allBookings.length > 0 && (
                <div className="mt-6 p-5 bg-[#f5f2e9] rounded-[2px] border border-[#ded9ce] space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-[#ded9ce] pb-2">
                    <span className="eyebrow text-[#9a7053]">Your Confirmed Sessions</span>
                    <button
                      onClick={() => setShowHistory(false)}
                      className="text-[11px] text-[#78857a] hover:text-[#29483c]"
                    >
                      Hide
                    </button>
                  </div>

                  <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                    {allBookings.map((b) => (
                      <div
                        key={b.id}
                        className={`p-3 rounded-[2px] text-xs border flex items-center justify-between ${
                          b.status === 'confirmed'
                            ? 'bg-white border-[#ded9ce]'
                            : 'bg-[#ede8dc] border-transparent opacity-60'
                        }`}
                      >
                        <div>
                          <div className="font-semibold text-[#29483c]">
                            {b.serviceTitle} ({b.durationMinutes}m) · {b.date} at {b.timeSlot}
                          </div>
                          <div className="text-[11px] text-[#78857a]">
                            Ref: <strong className="font-mono">{b.refCode}</strong> · {b.clientName}
                            {b.status === 'cancelled' && <span className="text-rose-600 ml-2">(Cancelled)</span>}
                          </div>
                        </div>

                        {b.status === 'confirmed' && (
                          <div className="flex items-center gap-1.5 shrink-0 ml-2">
                            <button
                              onClick={() => handleDownloadCalendar(b)}
                              title="Download .ics"
                              className="p-1.5 text-[#59675d] hover:text-[#29483c]"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleCancelBooking(b.id)}
                              title="Cancel reservation"
                              className="p-1.5 text-rose-500 hover:text-rose-700"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Interactive Booking Form */}
            <div className="rounded-[3px] border border-[#ded9ce] bg-[#f5f2e9] p-6 sm:p-8 shadow-xs">
              
              {justConfirmedBooking ? (
                /* Confirmation Screen with Clean "Book Another Time" Action */
                <div className="space-y-5 py-2 animate-in fade-in">
                  <div className="flex items-start gap-3.5 text-[#29483c]">
                    <div className="w-9 h-9 rounded-full bg-[#29483c] text-[#f3eee3] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="serif text-2xl text-[#29483c] leading-tight">
                        Session Reserved for {justConfirmedBooking.clientName}
                      </h4>
                      <p className="text-xs text-[#59675d] mt-1">
                        Confirmation code: <strong className="font-mono font-bold text-[#29483c]">{justConfirmedBooking.refCode}</strong>
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#59675d] font-light leading-relaxed">
                    We have held your <strong>{justConfirmedBooking.serviceTitle} ({justConfirmedBooking.durationMinutes} min)</strong> on <strong>{justConfirmedBooking.date} at {justConfirmedBooking.timeSlot}</strong> with Masud, LMT. A confirmation summary has been logged for {justConfirmedBooking.clientEmail}.
                  </p>

                  <div className="p-4 bg-[#ede8dc] rounded-[2px] text-xs text-[#526357] space-y-1.5 border border-[#ded9ce]">
                    <div className="flex justify-between">
                      <span>Service:</span>
                      <strong className="text-[#29483c]">{justConfirmedBooking.serviceTitle} ({justConfirmedBooking.durationMinutes}m)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Due:</span>
                      <strong className="text-[#29483c]">${justConfirmedBooking.price}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Studio Location:</span>
                      <span className="text-[#29483c]">{STUDIO_INFO.address}</span>
                    </div>
                  </div>

                  {/* Clean Action Buttons: Calendar Download & Fresh "Book Another" Button */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => handleDownloadCalendar(justConfirmedBooking)}
                      className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium rounded-full bg-[#ded9ce] text-[#29483c] hover:bg-[#d0c8b9] transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Calendar (.ics)</span>
                    </button>

                    <button
                      onClick={handleBookAnother}
                      className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-medium rounded-full bg-[#29483c] text-[#f3eee3] hover:bg-[#1f372e] transition-colors shadow-xs"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Book Another Appointment</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Fresh Clean Reservation Form */
                <form onSubmit={handleQuickBook} className="space-y-4">
                  <div className="border-b border-[#ded9ce] pb-3">
                    <h3 className="serif text-2xl text-[#29483c]">
                      Reserve online directly
                    </h3>
                    <p className="text-xs text-[#68766c] mt-0.5">
                      Select your treatment and time — payment taken upon visit
                    </p>
                  </div>

                  {/* 3 Services Selector */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#738276] font-semibold mb-1.5">
                      Select Service
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {SERVICES.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setSelectedServiceId(s.id)}
                          className={`p-2.5 rounded-[2px] text-left border text-xs transition-all ${
                            selectedServiceId === s.id
                              ? 'bg-white border-[#29483c] font-semibold text-[#29483c] shadow-xs'
                              : 'bg-[#ede8dc] border-[#ded9ce] text-[#59675d] hover:bg-white'
                          }`}
                        >
                          <div className="truncate">{s.title}</div>
                          <div className="text-[11px] text-[#9a7053] mt-0.5 font-medium">
                            {s.durations} · {s.priceDisplay}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#29483c] mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-[2px] bg-white border border-[#ded9ce] text-[#29483c] outline-hidden focus:border-[#29483c]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#29483c] mb-1">
                        Preferred Time Slot
                      </label>
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-[2px] bg-white border border-[#ded9ce] text-[#29483c] outline-hidden focus:border-[#29483c]"
                      >
                        <option value="9:30 AM">9:30 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="1:30 PM">1:30 PM</option>
                        <option value="3:00 PM">3:00 PM</option>
                        <option value="4:30 PM">4:30 PM</option>
                        <option value="6:00 PM">6:00 PM</option>
                      </select>
                    </div>
                  </div>

                  {/* Customer Information (Clean, independent inputs) */}
                  <div className="space-y-2 pt-1">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Your Full Legal Name *"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-[2px] bg-white border border-[#ded9ce] text-[#29483c] outline-hidden focus:border-[#29483c]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="email"
                        required
                        placeholder="Email for receipt *"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-[2px] bg-white border border-[#ded9ce] text-[#29483c] outline-hidden focus:border-[#29483c]"
                      />
                      <input
                        type="tel"
                        required
                        placeholder="Mobile Phone *"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-[2px] bg-white border border-[#ded9ce] text-[#29483c] outline-hidden focus:border-[#29483c]"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Focus areas or notes (e.g. neck tension, left shoulder, pressure preference)..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-[2px] bg-white border border-[#ded9ce] text-[#29483c] outline-hidden focus:border-[#29483c]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-3 py-3 text-xs font-medium text-[#f3eee3] bg-[#29483c] hover:bg-[#1f372e] rounded-full transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span>Reserve {currentService.title} ({currentService.durations})</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <p className="text-[10px] text-center text-[#78857a] pt-1">
                    Free cancellation up to 24 hours prior · Itemized insurance receipts provided
                  </p>
                </form>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* Studio Location & Visit Section */}
      <section id="visit" className="px-5 py-16 md:px-10 md:py-20 lg:px-16 border-t border-[#ded9ce] bg-[#f5f2e9]">
        <div className="mx-auto max-w-[1240px]">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="eyebrow mb-2 text-[#9a7053]">The Studio</p>
              <h3 className="serif text-2xl text-[#29483c] mb-2">{STUDIO_INFO.name}</h3>
              <p className="text-xs text-[#59675d] leading-relaxed">
                A private, quiet bodywork sanctuary situated in a peaceful courtyard away from street noise.
              </p>
            </div>

            <div>
              <p className="eyebrow mb-2 text-[#9a7053]">Location &amp; Access</p>
              <div className="flex items-start gap-2 text-xs text-[#59675d]">
                <MapPin className="w-4 h-4 text-[#29483c] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#29483c]">{STUDIO_INFO.address}</p>
                  <p className="mt-1">Dedicated visitor parking available in the rear lot, with elevator access to Suite 2B.</p>
                </div>
              </div>
            </div>

            <div>
              <p className="eyebrow mb-2 text-[#9a7053]">Studio Hours</p>
              <div className="text-xs text-[#59675d] space-y-1">
                <p><strong>Monday – Friday:</strong> 9:00 AM – 8:00 PM</p>
                <p><strong>Saturday:</strong> 10:00 AM – 6:00 PM</p>
                <p><strong>Sunday:</strong> Closed for rest &amp; studio maintenance</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
