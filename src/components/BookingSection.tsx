import { useState, useEffect } from 'react';
import { SERVICES, STUDIO_INFO, SYDNEY_AREAS } from '../data/massageData';
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
  Home,
  Hotel,
  Building,
  Sparkles,
  ShieldCheck,
  MessageCircle,
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
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [locationType, setLocationType] = useState<'home' | 'hotel' | 'office'>('hotel');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [sydneySuburb, setSydneySuburb] = useState(SYDNEY_AREAS[0]);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('11:00 AM');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');

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
  const currentOption = currentService.durationOptions[selectedOptionIndex] || currentService.durationOptions[0];

  // Submit Handler: Saves order dynamically
  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!deliveryAddress.trim()) {
      setFormError('Please enter your Sydney delivery address (or Hotel name and room #).');
      return;
    }
    if (!clientName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!clientEmail.trim() || !clientEmail.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!clientPhone.trim() || clientPhone.trim().length < 7) {
      setFormError('Please enter a valid Australian contact number.');
      return;
    }

    const ref = 'SHAIRU-' + Math.floor(100000 + Math.random() * 900000);
    const selectedDuration = currentOption.minutes;
    const selectedPrice = currentOption.price;

    const newBooking: ConfirmedBooking = {
      id: 'book_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      refCode: ref,
      serviceId: currentService.id,
      serviceTitle: currentService.title,
      tierLabel: currentOption.label,
      durationMinutes: selectedDuration,
      price: selectedPrice,
      date,
      timeSlot: time,
      locationType,
      deliveryAddress: deliveryAddress.trim(),
      sydneySuburb,
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      clientPhone: clientPhone.trim(),
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };

    saveStoredBooking(newBooking);
    setJustConfirmedBooking(newBooking);

    // Automatically trigger WhatsApp booking
    const loc = deliveryAddress.trim() ? `${deliveryAddress.trim()} (${sydneySuburb})` : sydneySuburb;
    const msg = `Hi Shairu Mobile Massage Australia! I would like to book a visit:
• Reference: ${ref}
• Treatment: ${currentService.title} (${selectedDuration} min - $${selectedPrice} AUD)
• Location: ${locationType === 'hotel' ? 'Hotel Room' : 'Home'}: ${loc}
• Preferred Time: ${date} at ${time}
• Client: ${clientName.trim()} (${clientPhone.trim()})
${notes.trim() ? `• Notes: ${notes.trim()}` : ''}
Please confirm therapist dispatch.`;

    const whatsappUrl = `https://wa.me/61433556409?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleBookAnother = () => {
    setJustConfirmedBooking(null);
    setDeliveryAddress('');
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setNotes('');
    setFormError('');
    setDate(new Date().toISOString().split('T')[0]);
    setTime('11:00 AM');
    setSelectedServiceId(SERVICES[0].id);
    setSelectedOptionIndex(0);
  };

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
    if (justConfirmedBooking?.id === id) {
      setJustConfirmedBooking(null);
    }
  };

  const activeBookingsCount = allBookings.filter((b) => b.status === 'confirmed').length;

  return (
    <>
      {/* Booking Section */}
      <section id="contact" className="bg-slate-50 px-4 sm:px-8 lg:px-12 py-16 sm:py-24 border-t border-slate-200">
        <div className="mx-auto max-w-[1240px]">
          
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            
            {/* Left Narrative Column */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-50 text-[11px] font-bold text-[#007a87] border border-teal-200 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#007a87]" />
                <span>On-Demand Mobile Dispatch Sydney</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-5">
                Book Your Mobile Visit in 60 Seconds
              </h2>
              
              <p className="text-sm sm:text-base leading-relaxed text-slate-600 font-light mb-8 max-w-md">
                Staying in a Sydney CBD hotel, or relaxing at home in Bondi, North Sydney, or the Inner West? Reserve a qualified massage therapist to arrive with a heated table, fresh linens, and calming organic oils.
              </p>

              {/* Contact Info Card */}
              <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-4 text-xs sm:text-sm text-slate-700 mb-8 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-teal-50 text-[#007a87] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Direct Hotline</span>
                    <a href={`tel:${STUDIO_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-[#007a87] font-bold text-sm text-slate-900">
                      {STUDIO_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Instant WhatsApp Concierge</span>
                    <a
                      href={STUDIO_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline font-bold text-sm text-emerald-700"
                    >
                      +61 433 556 409 (Chat Now)
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-teal-50 text-[#007a87] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Email Reservations</span>
                    <a href={`mailto:${STUDIO_INFO.email}`} className="hover:text-[#007a87] font-medium text-slate-900">
                      {STUDIO_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-teal-50 text-[#007a87] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Operating Hours</span>
                    <span className="font-semibold text-slate-900">Monday – Sunday: 8:00 AM – 10:00 PM (7 Days)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <MapPin className="w-4 h-4 text-[#007a87] shrink-0" />
                  <span className="text-xs text-slate-600 font-medium">{STUDIO_INFO.travelFeeNote}</span>
                </div>
              </div>

              {/* Action Buttons & Appointments Counter */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenBookingModal()}
                  className="flex items-center gap-2 rounded-full bg-[#007a87] hover:bg-[#00636e] px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <span>Open Sydney Concierge</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <a
                  href={STUDIO_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20ba59] px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp Booking</span>
                </a>

                {allBookings.length > 0 && (
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="flex items-center gap-2 rounded-full bg-white border border-slate-300 px-5 py-3 text-xs font-bold text-slate-700 hover:border-[#007a87] hover:text-[#007a87] transition-colors cursor-pointer"
                  >
                    <CalendarCheck className="w-4 h-4 text-[#007a87]" />
                    <span>Your Bookings ({activeBookingsCount})</span>
                  </button>
                )}
              </div>

              {/* Dynamic View of Stored Bookings */}
              {showHistory && allBookings.length > 0 && (
                <div className="mt-6 p-5 bg-white rounded-xl border border-slate-200 space-y-3 shadow-md animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#007a87]">Your Confirmed Mobile Sessions</span>
                    <button
                      onClick={() => setShowHistory(false)}
                      className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
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
                            ? 'bg-slate-50 border-slate-200'
                            : 'bg-slate-100 border-transparent opacity-60'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-slate-900">
                            {b.serviceTitle} ({b.durationMinutes}m) · ${b.price} AUD
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {b.date} at {b.timeSlot} · Ref: <strong className="font-mono text-slate-800">{b.refCode}</strong>
                          </div>
                          {b.deliveryAddress && (
                            <div className="text-[10px] text-slate-600 mt-0.5 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#007a87]" />
                              <span>{b.deliveryAddress} ({b.sydneySuburb})</span>
                            </div>
                          )}
                          {b.status === 'cancelled' && <span className="text-rose-600 font-bold">(Cancelled)</span>}
                        </div>

                        {b.status === 'confirmed' && (
                          <div className="flex items-center gap-2 shrink-0 ml-2">
                            <button
                              onClick={() => handleDownloadCalendar(b)}
                              title="Download .ics"
                              className="p-1.5 text-slate-600 hover:text-[#007a87] cursor-pointer"
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

            {/* Right Interactive Booking Form */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-md">
              
              {justConfirmedBooking ? (
                /* Confirmation Screen */
                <div className="space-y-5 py-2 animate-in fade-in">
                  <div className="flex items-start gap-3.5 text-slate-900">
                    <div className="w-10 h-10 rounded-full bg-[#007a87] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-slate-900 leading-tight">
                        Mobile Visit Confirmed for {justConfirmedBooking.clientName}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Confirmation code: <strong className="font-mono font-bold text-[#007a87] text-sm">{justConfirmedBooking.refCode}</strong>
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                    Our certified therapist will arrive at your address with the heated massage table, fresh linens, and calming organic aromatherapy for your <strong>{justConfirmedBooking.serviceTitle} ({justConfirmedBooking.durationMinutes} min)</strong> on <strong>{justConfirmedBooking.date} at {justConfirmedBooking.timeSlot}</strong>.
                  </p>

                  <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-700 space-y-2.5 border border-slate-200">
                    <div className="flex justify-between">
                      <span>Treatment:</span>
                      <strong className="text-slate-900">
                        {justConfirmedBooking.serviceTitle} ({justConfirmedBooking.durationMinutes}m)
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Address:</span>
                      <strong className="text-slate-900 text-right">
                        {justConfirmedBooking.deliveryAddress} ({justConfirmedBooking.sydneySuburb})
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Flat Rate Fee:</span>
                      <strong className="text-2xl font-black text-[#007a87]">${justConfirmedBooking.price} AUD</strong>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                      <span>Travel &amp; Equipment:</span>
                      <span className="text-emerald-700 font-bold">Included (No extra fees)</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => handleDownloadCalendar(justConfirmedBooking)}
                      className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-full bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-[#007a87]" />
                      <span>Download Calendar (.ics)</span>
                    </button>

                    <button
                      onClick={handleBookAnother}
                      className="flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full bg-[#007a87] text-white hover:bg-[#00636e] transition-colors shadow-sm cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Book Another Visit</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Reservation Form */
                <form onSubmit={handleQuickBook} className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-2xl font-bold text-slate-900">
                      Reserve Sydney Mobile Visit
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Select treatment, location &amp; duration — simple payment upon visit
                    </p>
                  </div>

                  {/* Location Delivery Selector (Home vs Hotel vs Office) */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-600 font-bold mb-1.5">
                      Delivery Location Type
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setLocationType('hotel')}
                        className={`p-2.5 rounded-lg text-center border text-xs transition-all cursor-pointer flex flex-col items-center gap-1 ${
                          locationType === 'hotel'
                            ? 'bg-[#007a87] text-white border-[#007a87] font-bold shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <Hotel className="w-4 h-4" />
                        <span>Hotel / Suite</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setLocationType('home')}
                        className={`p-2.5 rounded-lg text-center border text-xs transition-all cursor-pointer flex flex-col items-center gap-1 ${
                          locationType === 'home'
                            ? 'bg-[#007a87] text-white border-[#007a87] font-bold shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <Home className="w-4 h-4" />
                        <span>Home / Apt</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setLocationType('office')}
                        className={`p-2.5 rounded-lg text-center border text-xs transition-all cursor-pointer flex flex-col items-center gap-1 ${
                          locationType === 'office'
                            ? 'bg-[#007a87] text-white border-[#007a87] font-bold shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <Building className="w-4 h-4" />
                        <span>Office / Event</span>
                      </button>
                    </div>
                  </div>

                  {/* Sydney Suburb & Address Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Sydney Suburb / Region
                      </label>
                      <select
                        value={sydneySuburb}
                        onChange={(e) => setSydneySuburb(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 border border-slate-200 text-slate-800 outline-hidden focus:border-[#007a87]"
                      >
                        {SYDNEY_AREAS.map((a) => (
                          <option key={a} value={a}>
                            {a}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        {locationType === 'hotel' ? 'Hotel Name & Room Number *' : 'Street Address / Apt # *'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={locationType === 'hotel' ? 'e.g. Four Seasons Sydney, Room 1402' : 'e.g. 14 Campbell Pde, Bondi'}
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 border border-slate-200 text-slate-800 outline-hidden focus:border-[#007a87]"
                      />
                    </div>
                  </div>

                  {/* 6 Services Selector */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-600 font-bold mb-1.5">
                      Select Treatment (6 Options)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {SERVICES.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => {
                            setSelectedServiceId(s.id);
                            setSelectedOptionIndex(0);
                          }}
                          className={`p-2.5 rounded-lg text-left border text-xs transition-all cursor-pointer ${
                            selectedServiceId === s.id
                              ? 'bg-teal-50 border-[#007a87] font-bold text-[#007a87] shadow-2xs ring-1 ring-[#007a87]'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <div className="truncate font-bold text-xs">{s.title}</div>
                          <div className="text-[10px] text-teal-700 mt-0.5 truncate font-medium">
                            {s.durations}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Tiers ($100 for 1h, $140 for 1.5h, $170 for 2h) */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-600 font-bold mb-1.5">
                      Session Duration &amp; Flat Rate
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {currentService.durationOptions.map((opt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedOptionIndex(idx)}
                          className={`p-2.5 rounded-lg text-center border text-xs transition-all cursor-pointer ${
                            selectedOptionIndex === idx
                              ? 'bg-[#007a87] text-white border-[#007a87] font-bold shadow-xs'
                              : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                          }`}
                        >
                          <div className="font-semibold text-xs">{opt.label}</div>
                          <div className={`text-base font-black mt-0.5 tabular-nums ${selectedOptionIndex === idx ? 'text-amber-300' : 'text-[#007a87]'}`}>
                            ${opt.price}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 border border-slate-200 text-slate-800 outline-hidden focus:border-[#007a87]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Arrival Time (8am – 10pm)
                      </label>
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 border border-slate-200 text-slate-800 outline-hidden focus:border-[#007a87]"
                      >
                        <option value="9:00 AM">9:00 AM</option>
                        <option value="10:30 AM">10:30 AM</option>
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="1:30 PM">1:30 PM</option>
                        <option value="3:00 PM">3:00 PM</option>
                        <option value="4:30 PM">4:30 PM</option>
                        <option value="6:00 PM">6:00 PM</option>
                        <option value="7:30 PM">7:30 PM</option>
                        <option value="9:00 PM">9:00 PM</option>
                      </select>
                    </div>
                  </div>

                  {/* Client Info */}
                  <div className="space-y-2 pt-1">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 border border-slate-200 text-slate-800 outline-hidden focus:border-[#007a87]"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="email"
                        required
                        placeholder="Email Address *"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 border border-slate-200 text-slate-800 outline-hidden focus:border-[#007a87]"
                      />
                      <input
                        type="tel"
                        required
                        placeholder="Mobile Phone (for arrival SMS) *"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 border border-slate-200 text-slate-800 outline-hidden focus:border-[#007a87]"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Special notes (e.g. hotel reception call, parking notes, focus on neck)..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 border border-slate-200 text-slate-800 outline-hidden focus:border-[#007a87]"
                    />
                  </div>

                  {formError && (
                    <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
                      {formError}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 text-xs font-bold tracking-wider uppercase text-white bg-[#25D366] hover:bg-[#20ba59] active:scale-95 rounded-full transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/30 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Book via WhatsApp ({currentOption.minutes}m · ${currentOption.price} AUD)</span>
                  </button>

                  <p className="text-[10px] text-center text-slate-500 pt-1">
                    Free cancellation up to 24 hours prior · Police vetted &amp; insured therapists
                  </p>
                </form>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* Rejuvenators Australia Locations Directory Section */}
      <section id="locations" className="px-4 sm:px-8 lg:px-12 py-16 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-[1240px]">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#007a87]">
              National Service Network
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Locations Serviced Across Australia
            </h3>
            <p className="text-xs text-slate-600 mt-1.5">
              Operating 7 days a week with certified therapists ready to dispatch to your hotel or home.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border-2 border-[#007a87] bg-teal-50/50">
              <span className="text-xs font-bold text-[#007a87] uppercase tracking-wider block mb-1">Active Hub</span>
              <h4 className="text-base font-bold text-slate-900">Sydney &amp; NSW</h4>
              <p className="text-xs text-slate-600 mt-1">Sydney CBD, Darling Harbour, Bondi, Double Bay, North Sydney, Manly, Surry Hills &amp; Parramatta.</p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Network Hub</span>
              <h4 className="text-base font-bold text-slate-900">Melbourne &amp; VIC</h4>
              <p className="text-xs text-slate-600 mt-1">Melbourne CBD, Southbank, Docklands, St Kilda, South Yarra &amp; Richmond.</p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Network Hub</span>
              <h4 className="text-base font-bold text-slate-900">Brisbane &amp; Gold Coast</h4>
              <p className="text-xs text-slate-600 mt-1">Brisbane CBD, South Bank, Fortitude Valley, Surfers Paradise &amp; Broadbeach.</p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Network Hub</span>
              <h4 className="text-base font-bold text-slate-900">Perth &amp; Adelaide</h4>
              <p className="text-xs text-slate-600 mt-1">Perth CBD, Fremantle, Adelaide CBD, Glenelg &amp; North Adelaide.</p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
