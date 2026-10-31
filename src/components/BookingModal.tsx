import { useState, useId, useEffect } from 'react';
import { SERVICES, STUDIO_INFO, SYDNEY_AREAS } from '../data/massageData';
import { ServiceItem } from '../types';
import {
  X,
  Check,
  ChevronRight,
  ChevronLeft,
  Download,
  CheckCircle2,
  PlusCircle,
  MapPin,
  Home,
  Hotel,
  Building,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { saveStoredBooking, ConfirmedBooking } from '../utils/bookingStore';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  initialDuration?: number;
}

export function BookingModal({
  isOpen,
  onClose,
  initialServiceId,
  initialDuration,
}: BookingModalProps) {
  const formId = useId();

  // Step 1: Service & Duration, Step 2: Location & Timing, Step 3: Details & Customization, Step 4: Confirmation
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Selected Booking Values
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServiceId || SERVICES[0].id
  );
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0);

  const selectedService: ServiceItem =
    SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  const currentOption =
    selectedService.durationOptions[selectedOptionIndex] ||
    selectedService.durationOptions[0];

  const selectedDuration = currentOption.minutes;
  const currentDurationPrice = currentOption.price;

  // Location Details
  const [locationType, setLocationType] = useState<'home' | 'hotel' | 'office'>('hotel');
  const [sydneySuburb, setSydneySuburb] = useState<string>(SYDNEY_AREAS[0]);
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');

  // Date & Time
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('11:00 AM');

  // Client Details & Somatic Customization
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [pressurePreference, setPressurePreference] = useState<string>('Medium balance');
  const [focusAreas, setFocusAreas] = useState<string[]>(['Neck & Shoulders', 'Lower Back']);
  const [notes, setNotes] = useState<string>('');
  const [bookingRef, setBookingRef] = useState<string>('');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // WhatsApp Direct Order State
  const [whatsappOrderUrl, setWhatsappOrderUrl] = useState<string>('');
  const [copiedOrder, setCopiedOrder] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      if (initialServiceId) {
        setSelectedServiceId(initialServiceId);
        const s = SERVICES.find((item) => item.id === initialServiceId);
        if (s && initialDuration) {
          const optIdx = s.durationOptions.findIndex((o) => o.minutes === initialDuration);
          if (optIdx !== -1) setSelectedOptionIndex(optIdx);
        } else {
          setSelectedOptionIndex(0);
        }
      }
      if (step === 4) {
        resetState();
      }
    }
  }, [isOpen, initialServiceId, initialDuration]);

  if (!isOpen) return null;

  const resetState = () => {
    setStep(1);
    setSelectedOptionIndex(0);
    setDeliveryAddress('');
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setNotes('');
    setFormErrors({});
    setWhatsappOrderUrl('');
    setCopiedOrder(false);
  };

  const handleCloseAndReset = () => {
    resetState();
    onClose();
  };

  // Generate next 14 available dates
  const datesList = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dayName = d.toLocaleDateString('en-AU', { weekday: 'short' });
    const month = d.toLocaleDateString('en-AU', { month: 'short' });
    const dayNum = d.getDate();
    const full = d.toISOString().split('T')[0];
    return { dayName, month, dayNum, full };
  });

  const timeSlots = [
    '8:30 AM',
    '10:00 AM',
    '11:30 AM',
    '1:00 PM',
    '2:30 PM',
    '4:00 PM',
    '5:30 PM',
    '7:00 PM',
    '8:30 PM',
    '9:30 PM',
  ];

  const muscleAreas = [
    'Neck & Shoulders',
    'Upper Back & Scapula',
    'Lower Back / Lumbar',
    'Glutes & Hips',
    'Hamstrings & Calves',
    'Feet & Arches',
    'Scalp & Cranial Relief',
  ];

  const toggleFocusArea = (area: string) => {
    if (focusAreas.includes(area)) {
      setFocusAreas(focusAreas.filter((a) => a !== area));
    } else {
      setFocusAreas([...focusAreas, area]);
    }
  };

  const validateStep2 = () => {
    const errors: { [key: string]: string } = {};
    if (!deliveryAddress.trim()) {
      errors.address = 'Please specify your Sydney address or Hotel name and room number';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep3 = () => {
    const errors: { [key: string]: string } = {};
    if (!clientName.trim()) errors.name = 'Please enter your full name';
    if (!clientEmail.trim() || !clientEmail.includes('@')) errors.email = 'Please provide a valid email for confirmation';
    if (!clientPhone.trim() || clientPhone.length < 7) errors.phone = 'Please provide an Australian contact number';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    const generatedRef = 'SHAIRU-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(generatedRef);

    const newBooking: ConfirmedBooking = {
      id: 'book_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      refCode: generatedRef,
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      tierLabel: currentOption.label,
      durationMinutes: selectedDuration,
      price: currentDurationPrice,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      locationType,
      deliveryAddress: deliveryAddress.trim(),
      sydneySuburb,
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      clientPhone: clientPhone.trim(),
      pressurePreference,
      focusAreas,
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };
    saveStoredBooking(newBooking);

    // Build the complete, professional WhatsApp Order Message
    const loc = deliveryAddress.trim() ? `${deliveryAddress.trim()} (${sydneySuburb})` : sydneySuburb;
    const locationLabel = locationType === 'hotel' ? 'Hotel Suite / Room' : locationType === 'home' ? 'Residential Home' : 'Corporate Office';
    
    const orderMessage = [
      `🌿 *SHAIRU MOBILE MASSAGE AUSTRALIA*`,
      `📋 *Booking Reference:* ${generatedRef}`,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `💆 *Treatment:* ${selectedService.title}`,
      `⏱️ *Duration:* ${selectedDuration} min ($${currentDurationPrice} AUD flat rate)`,
      `🏨 *Location Type:* ${locationLabel}`,
      `📍 *Address:* ${loc}`,
      `📅 *Preferred Date:* ${selectedDate}`,
      `⏰ *Arrival Window:* ${selectedTimeSlot}`,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 *Client Name:* ${clientName.trim()}`,
      `📞 *Phone:* ${clientPhone.trim()}`,
      `📧 *Email:* ${clientEmail.trim()}`,
      `✨ *Pressure Depth:* ${pressurePreference}`,
      `🎯 *Focus Areas:* ${focusAreas.join(', ')}`,
      notes.trim() ? `📝 *Special Access/Notes:* ${notes.trim()}` : null,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `Please confirm therapist dispatch. Thank you!`,
    ].filter(Boolean).join('\n');

    const generatedWhatsappUrl = `https://wa.me/61433556409?text=${encodeURIComponent(orderMessage)}`;
    setWhatsappOrderUrl(generatedWhatsappUrl);

    // Direct trigger to open WhatsApp with safe fallback
    try {
      window.open(generatedWhatsappUrl, '_blank', 'noopener,noreferrer');
    } catch {
      // Handled in Step 4 view with direct unblockable button
    }

    setStep(4);
  };

  const handleCopyOrderText = () => {
    const loc = deliveryAddress.trim() ? `${deliveryAddress.trim()} (${sydneySuburb})` : sydneySuburb;
    const locationLabel = locationType === 'hotel' ? 'Hotel Suite / Room' : locationType === 'home' ? 'Residential Home' : 'Corporate Office';
    const orderText = `SHAIRU MOBILE MASSAGE ORDER
Ref: ${bookingRef}
Treatment: ${selectedService.title} (${selectedDuration} min - $${currentDurationPrice} AUD)
Location: ${locationLabel} - ${loc}
Date & Time: ${selectedDate} at ${selectedTimeSlot}
Client: ${clientName.trim()} (${clientPhone.trim()})
Pressure: ${pressurePreference} | Focus: ${focusAreas.join(', ')}
${notes.trim() ? `Notes: ${notes.trim()}` : ''}`;

    navigator.clipboard?.writeText(orderText);
    setCopiedOrder(true);
    setTimeout(() => setCopiedOrder(false), 3000);
  };

  const handleDownloadCalendar = () => {
    const loc = deliveryAddress ? `${deliveryAddress}, ${sydneySuburb}` : STUDIO_INFO.address;
    const title = `Shairu Mobile Massage: ${selectedService.title}`;
    const desc = `Booking Ref: ${bookingRef}\\nService: ${selectedService.title} (${selectedDuration} min - $${currentDurationPrice})\\nLocation: ${loc}\\nClient: ${clientName}\\nPhone: +61 433 556 409`;
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Shairu Mobile Massage Australia//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${desc}`,
      `LOCATION:${loc}`,
      `DTSTART:${selectedDate.replace(/-/g, '')}T110000Z`,
      `DTEND:${selectedDate.replace(/-/g, '')}T123000Z`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `shairu-booking-${bookingRef}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden border border-slate-200 shadow-2xl relative my-6 max-h-[92vh] flex flex-col font-sans">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#285244] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#285244]" />
              Shairu Mobile Massage Australia
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
              {step === 4 ? 'WhatsApp Booking Dispatched' : 'Book on WhatsApp (+61 433 556 409)'}
            </h3>
          </div>

          <button
            onClick={handleCloseAndReset}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {step < 4 && (
          <div className="px-6 py-3 bg-slate-100/60 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-3 sm:gap-4">
              {[
                { num: 1, label: 'Treatment' },
                { num: 2, label: 'Location' },
                { num: 3, label: 'Contact' },
              ].map((s) => (
                <div
                  key={s.num}
                  className={`flex items-center gap-1.5 ${
                    step === s.num ? 'font-bold text-[#285244]' : 'text-slate-500'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      step === s.num
                        ? 'bg-[#285244] text-white'
                        : s.num < step
                        ? 'bg-teal-100 text-[#285244]'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {s.num < step ? '✓' : s.num}
                  </span>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>

            <div className="text-base font-extrabold text-[#285244] tabular-nums">
              ${currentDurationPrice} AUD
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* STEP 1: Service & Duration */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Select 1 of 6 Specialized Treatments
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {SERVICES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setSelectedServiceId(s.id);
                        setSelectedOptionIndex(0);
                      }}
                      className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                        selectedServiceId === s.id
                          ? 'bg-teal-50/80 border-[#285244] shadow-sm ring-1 ring-[#285244]'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
                      }`}
                    >
                      <div className="text-[10px] font-bold uppercase text-[#285244] mb-1">{s.num}</div>
                      <div className="text-base font-bold text-slate-900 mb-1 leading-snug">{s.title}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-2 font-light">{s.detail}</div>
                      <div className="mt-2 text-[11px] font-bold text-[#285244] pt-2 border-t border-slate-200/80">
                        {s.durations}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tier / Session Option Selector (1h $100, 1.5h $140, 2h $170) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Select Session Duration &amp; Flat Rate
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {selectedService.durationOptions.map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedOptionIndex(idx)}
                      className={`p-3 rounded-xl text-center border transition-all cursor-pointer ${
                        selectedOptionIndex === idx
                          ? 'bg-[#285244] text-white border-[#285244] shadow-sm ring-1 ring-[#285244]'
                          : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-white'
                      }`}
                    >
                      <div className="font-semibold text-xs">{opt.label}</div>
                      <div className={`text-lg font-black mt-1 ${selectedOptionIndex === idx ? 'text-amber-300' : 'text-[#285244]'}`}>
                        ${opt.price}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Inclusions */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="font-bold text-slate-800 mb-1">Included with every Sydney mobile visit:</div>
                {selectedService.included.map((inc, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#285244] shrink-0" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Location, Date & Time */}
          {step === 2 && (
            <div className="space-y-6">
              {/* Delivery Location Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Where Should We Deliver Your Treatment?
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setLocationType('hotel')}
                    className={`p-3 rounded-xl text-center border text-xs transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      locationType === 'hotel'
                        ? 'bg-[#285244] text-white border-[#285244] font-bold shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
                    }`}
                  >
                    <Hotel className="w-5 h-5" />
                    <span className="font-bold">Hotel / Suite</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLocationType('home')}
                    className={`p-3 rounded-xl text-center border text-xs transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      locationType === 'home'
                        ? 'bg-[#285244] text-white border-[#285244] font-bold shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
                    }`}
                  >
                    <Home className="w-5 h-5" />
                    <span className="font-bold">Home / Apt</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLocationType('office')}
                    className={`p-3 rounded-xl text-center border text-xs transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      locationType === 'office'
                        ? 'bg-[#285244] text-white border-[#285244] font-bold shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
                    }`}
                  >
                    <Building className="w-5 h-5" />
                    <span className="font-bold">Office / Workplace</span>
                  </button>
                </div>
              </div>

              {/* Suburb and Address Inputs */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Sydney Region / Suburb
                    </label>
                    <select
                      value={sydneySuburb}
                      onChange={(e) => setSydneySuburb(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 border border-slate-200 text-slate-800 outline-hidden focus:border-[#285244]"
                    >
                      {SYDNEY_AREAS.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {locationType === 'hotel' ? 'Hotel Name & Room Number *' : 'Street Address / Apt # *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={locationType === 'hotel' ? 'e.g. Crown Sydney, Room 2201' : 'e.g. 24 Ocean Ave, Double Bay'}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 border border-slate-200 text-slate-800 outline-hidden focus:border-[#285244]"
                    />
                    {formErrors.address && <p className="text-[11px] text-rose-600 mt-1">{formErrors.address}</p>}
                  </div>
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Choose a Date
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {datesList.slice(0, 7).map((d) => (
                    <button
                      key={d.full}
                      type="button"
                      onClick={() => setSelectedDate(d.full)}
                      className={`p-2 rounded-lg text-center border text-xs transition-all cursor-pointer ${
                        selectedDate === d.full
                          ? 'bg-[#285244] text-white border-[#285244] font-bold shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-white'
                      }`}
                    >
                      <div className="text-[10px] uppercase">{d.dayName}</div>
                      <div className="text-base font-bold tabular-nums mt-0.5">{d.dayNum}</div>
                      <div className="text-[10px]">{d.month}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Select Therapist Arrival Time Slot (8am – 10pm)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`py-2 px-2.5 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                        selectedTimeSlot === slot
                          ? 'bg-[#285244] text-white border-[#285244] font-bold shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-white'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Details & Customization */}
          {step === 3 && (
            <form id={formId} onSubmit={handleCompleteBooking} className="space-y-4">
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Recipient Contact Details
                </label>

                <div>
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 border border-slate-200 text-slate-800 outline-hidden focus:border-[#285244]"
                  />
                  {formErrors.name && <p className="text-[11px] text-rose-600 mt-1">{formErrors.name}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email address for confirmation *"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 border border-slate-200 text-slate-800 outline-hidden focus:border-[#285244]"
                    />
                    {formErrors.email && <p className="text-[11px] text-rose-600 mt-1">{formErrors.email}</p>}
                  </div>

                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Mobile Phone (for arrival SMS) *"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 border border-slate-200 text-slate-800 outline-hidden focus:border-[#285244]"
                    />
                    {formErrors.phone && <p className="text-[11px] text-rose-600 mt-1">{formErrors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Pressure Preference */}
              <div className="pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Pressure Depth Preference
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Gentle restorative', 'Medium balance', 'Firm & targeted'].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPressurePreference(p)}
                      className={`p-2 text-xs rounded-lg border text-center cursor-pointer ${
                        pressurePreference === p
                          ? 'bg-[#285244] text-white border-[#285244] font-bold shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Focus Areas */}
              <div className="pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Focus Areas
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {muscleAreas.map((area) => (
                    <button
                      key={area}
                      type="button"
                      onClick={() => toggleFocusArea(area)}
                      className={`px-3 py-1 text-xs rounded-full border cursor-pointer ${
                        focusAreas.includes(area)
                          ? 'bg-[#285244] text-white border-[#285244] font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              {/* Health Notes or Access */}
              <div className="pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Access Notes (e.g. Concierge notification, buzzer code, parking)...
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Hotel guest registered under Smith, visitor parking on basement level 1..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 border border-slate-200 text-slate-800 outline-hidden focus:border-[#285244]"
                />
              </div>

              <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg text-xs text-teal-800">
                Payment is taken upon completion. We provide itemized receipts for private health insurance rebates.
              </div>
            </form>
          )}

          {/* STEP 4: Confirmation */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="p-6 bg-teal-50 border border-teal-200 rounded-xl flex items-start gap-4">
                <CheckCircle2 className="w-8 h-8 text-[#285244] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-2xl font-bold text-slate-900">
                    Mobile Visit Confirmed for {clientName}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    A formal booking confirmation and SMS receipt have been logged for <strong>{clientEmail}</strong>.
                  </p>
                </div>
              </div>

              <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-3 text-xs text-slate-700 shadow-xs">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#285244]">Booking Reference</span>
                  <span className="font-mono font-bold text-base text-[#285244]">{bookingRef}</span>
                </div>

                <div className="flex justify-between">
                  <span>Treatment:</span>
                  <span className="font-bold text-slate-900">
                    {selectedService.title} ({selectedDuration} min){currentOption.label ? ` · ${currentOption.label}` : ''}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Address:</span>
                  <span className="font-bold text-slate-900 text-right">
                    {deliveryAddress} ({sydneySuburb})
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Therapist Arrival:</span>
                  <span className="font-bold text-slate-900">{selectedDate} at {selectedTimeSlot}</span>
                </div>

                <div className="flex justify-between pt-2 border-t border-slate-100 font-bold text-slate-900 text-sm">
                  <span>Total Due Upon Completion:</span>
                  <span className="text-lg font-black text-[#285244]">${currentDurationPrice} AUD</span>
                </div>
              </div>

              {/* Primary Direct WhatsApp Action */}
              <div className="p-4 sm:p-5 bg-[#eef4f0] rounded-2xl border border-[#285244]/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1a3127] flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                    WhatsApp Order Ready
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#25D366] text-white px-2.5 py-0.5 rounded-full shadow-2xs">
                    Direct Dispatch
                  </span>
                </div>
                <p className="text-xs text-[#475b51] leading-relaxed">
                  Your customized booking details with reference <strong>{bookingRef}</strong> are ready. Click below to send your complete order directly to our Australian team via WhatsApp:
                </p>
                <a
                  href={whatsappOrderUrl || `https://wa.me/61433556409`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.99] text-white transition-all shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Send Order to WhatsApp (+61 433 556 409)</span>
                </a>
              </div>

              {/* Utility actions: Copy text, download calendar, book another */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleCopyOrderText}
                  className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer border border-slate-200"
                >
                  <span>{copiedOrder ? '✓ Order Details Copied!' : '📋 Copy Order Text'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadCalendar}
                  className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer border border-slate-200"
                >
                  <Download className="w-4 h-4 text-[#285244]" />
                  <span>Calendar Invite (.ics)</span>
                </button>

                <button
                  type="button"
                  onClick={resetState}
                  className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-[#285244] text-white hover:bg-[#1e3e33] transition-colors shadow-xs cursor-pointer ml-auto"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>New Booking</span>
                </button>

                <button
                  type="button"
                  onClick={handleCloseAndReset}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation */}
        {step < 4 && (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
                className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div />
            )}

            {step === 1 && (
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#285244] hover:bg-[#1e3e33] rounded-full flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>Continue to Location</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {step === 2 && (
              <button
                type="button"
                onClick={() => {
                  if (validateStep2()) {
                    setStep(3);
                  }
                }}
                className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#285244] hover:bg-[#1e3e33] rounded-full flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>Continue to Contact</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {step === 3 && (
              <button
                type="submit"
                form={formId}
                className="px-7 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20ba59] active:scale-95 rounded-full flex items-center gap-2 shadow-md hover:shadow-emerald-500/30 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Confirm &amp; Book on WhatsApp (+61 433 556 409)</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
