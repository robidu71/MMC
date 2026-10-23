import { useState, useId, useEffect } from 'react';
import { SERVICES, STUDIO_INFO } from '../data/massageData';
import { ServiceItem } from '../types';
import {
  X,
  Check,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Download,
  CheckCircle2,
  PlusCircle,
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

  // Step 1: Service & Duration, Step 2: Date & Time, Step 3: Details & Preferences, Step 4: Confirmation
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Selected Booking Values
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServiceId || SERVICES[0].id
  );

  const selectedService: ServiceItem =
    SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  const [selectedDuration, setSelectedDuration] = useState<number>(
    initialDuration || selectedService.durationOptions[0].minutes
  );

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

  // Reset form when modal opens if previously completed
  useEffect(() => {
    if (isOpen) {
      if (initialServiceId) {
        setSelectedServiceId(initialServiceId);
        const s = SERVICES.find((item) => item.id === initialServiceId);
        if (s) {
          setSelectedDuration(initialDuration || s.durationOptions[0].minutes);
        }
      }
      // If modal was on confirmation step, reset to step 1
      if (step === 4) {
        resetState();
      }
    }
  }, [isOpen, initialServiceId, initialDuration]);

  if (!isOpen) return null;

  const resetState = () => {
    setStep(1);
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setNotes('');
    setBookingRef('');
    setFormErrors({});
    setSelectedDate(new Date().toISOString().split('T')[0]);
    setTimeSlot('11:00 AM');
  };

  const handleCloseAndReset = () => {
    resetState();
    onClose();
  };

  const setTimeSlot = (slot: string) => {
    setSelectedTimeSlot(slot);
  };

  // Pricing
  const currentDurationPrice =
    selectedService.durationOptions.find((d) => d.minutes === selectedDuration)?.price ||
    selectedService.durationOptions[0].price;

  // Next 8 days
  const getNextDates = () => {
    const dates = [];
    for (let i = 0; i < 8; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push({
        full: d.toISOString().split('T')[0],
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: d.getDate(),
        month: d.toLocaleDateString('en-US', { month: 'short' }),
      });
    }
    return dates;
  };

  const datesList = getNextDates();
  const timeSlots = ['9:30 AM', '11:00 AM', '1:30 PM', '3:00 PM', '4:30 PM', '6:00 PM'];

  const muscleAreas = [
    'Neck & Shoulders',
    'Upper Back & Trapezius',
    'Lower Back & Lumbar',
    'Hips & Glutes',
    'Legs & Calves',
    'Feet & Plantar Fascia',
    'Jaw & Cranial Relief',
  ];

  const toggleFocusArea = (area: string) => {
    if (focusAreas.includes(area)) {
      setFocusAreas(focusAreas.filter((a) => a !== area));
    } else {
      setFocusAreas([...focusAreas, area]);
    }
  };

  const validateGuestInfo = () => {
    const errors: { [key: string]: string } = {};
    if (!clientName.trim()) errors.name = 'Please enter your full name';
    if (!clientEmail.trim() || !clientEmail.includes('@')) errors.email = 'Please provide a valid email for confirmation';
    if (!clientPhone.trim() || clientPhone.length < 7) errors.phone = 'Please provide a valid phone number';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateGuestInfo()) return;

    const generatedRef = 'MMC-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(generatedRef);

    // Persist dynamically into booking store
    const newBooking: ConfirmedBooking = {
      id: 'book_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      refCode: generatedRef,
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      durationMinutes: selectedDuration,
      price: currentDurationPrice,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
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

    setStep(4);
  };

  const handleDownloadCalendar = () => {
    const title = `Masud's Massage Center: ${selectedService.title}`;
    const desc = `Appointment Ref: ${bookingRef}\\nService: ${selectedService.title} (${selectedDuration} min)\\nAddress: ${STUDIO_INFO.address}\\nPhone: ${STUDIO_INFO.phone}`;
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Masuds Massage Center//Appointment Calendar//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${desc}`,
      `LOCATION:${STUDIO_INFO.address}`,
      `DTSTART:${selectedDate.replace(/-/g, '')}T110000Z`,
      `DTEND:${selectedDate.replace(/-/g, '')}T123000Z`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `mmc-session-${bookingRef}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1f372e]/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#f5f2e9] rounded-[3px] max-w-2xl w-full overflow-hidden border border-[#ded9ce] shadow-2xl relative my-6 max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-[#ded9ce] flex items-center justify-between bg-[#ede8dc]">
          <div>
            <div className="eyebrow text-[#9a7053]">
              Masud&apos;s Massage Center (MMC)
            </div>
            <h3 className="serif text-xl sm:text-2xl text-[#29483c]">
              {step === 4 ? 'Session Confirmed' : 'Book a Session'}
            </h3>
          </div>

          <button
            onClick={handleCloseAndReset}
            className="p-1.5 rounded-full text-[#59675d] hover:text-[#29483c] hover:bg-[#ded9ce] transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {step < 4 && (
          <div className="px-6 py-3 bg-[#f0eee5] border-b border-[#ded9ce] flex items-center justify-between text-xs text-[#59675d]">
            <div className="flex items-center gap-4">
              {[
                { num: 1, label: 'Service' },
                { num: 2, label: 'Date & Time' },
                { num: 3, label: 'Details' },
              ].map((s) => (
                <div
                  key={s.num}
                  className={`flex items-center gap-1.5 ${
                    step === s.num ? 'font-semibold text-[#29483c]' : 'text-[#78857a]'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                      step === s.num
                        ? 'bg-[#29483c] text-[#f3eee3]'
                        : s.num < step
                        ? 'bg-[#aeb8a8] text-[#29483c]'
                        : 'bg-[#ded9ce] text-[#78857a]'
                    }`}
                  >
                    {s.num < step ? '✓' : s.num}
                  </span>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>

            <div className="serif text-base font-semibold text-[#29483c] tabular-nums">
              ${currentDurationPrice}
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* STEP 1: Service & Duration */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block eyebrow text-[#78857a] mb-2">
                  Select Desired Session
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {SERVICES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setSelectedServiceId(s.id);
                        setSelectedDuration(s.durationOptions[0].minutes);
                      }}
                      className={`p-4 rounded-[2px] text-left border transition-all cursor-pointer ${
                        selectedServiceId === s.id
                          ? 'bg-white border-[#29483c] shadow-xs ring-1 ring-[#29483c]'
                          : 'bg-[#ede8dc] border-[#ded9ce] text-[#59675d] hover:bg-white'
                      }`}
                    >
                      <div className="eyebrow text-[#9a7053] mb-1">{s.num}</div>
                      <div className="serif text-xl text-[#29483c] mb-1">{s.title}</div>
                      <div className="text-xs text-[#59675d] line-clamp-2 font-light">{s.detail}</div>
                      <div className="mt-3 text-xs font-semibold text-[#29483c] pt-2 border-t border-[#29483c]/10">
                        {s.durations} · {s.priceDisplay}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Inclusions */}
              <div className="p-4 bg-[#ede8dc] rounded-[2px] border border-[#ded9ce] text-xs text-[#526357] space-y-1">
                <div className="font-semibold text-[#29483c] mb-1">Included with every visit:</div>
                {selectedService.included.map((inc, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#29483c] shrink-0" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Date & Time */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block eyebrow text-[#78857a] mb-2">
                  Choose a Date
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {datesList.map((d) => (
                    <button
                      key={d.full}
                      type="button"
                      onClick={() => setSelectedDate(d.full)}
                      className={`p-2 rounded-[2px] text-center border text-xs transition-all cursor-pointer ${
                        selectedDate === d.full
                          ? 'bg-[#29483c] text-[#f3eee3] border-[#29483c]'
                          : 'bg-[#ede8dc] border-[#ded9ce] text-[#29483c] hover:bg-white'
                      }`}
                    >
                      <div className="text-[10px] uppercase">{d.dayName}</div>
                      <div className="serif text-lg font-bold tabular-nums mt-0.5">{d.dayNum}</div>
                      <div className="text-[10px]">{d.month}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block eyebrow text-[#78857a] mb-2">
                  Select a Time Slot
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`py-2 px-3 rounded-[2px] text-xs font-medium border text-center transition-all cursor-pointer ${
                        selectedTimeSlot === slot
                          ? 'bg-[#29483c] text-[#f3eee3] border-[#29483c]'
                          : 'bg-[#ede8dc] border-[#ded9ce] text-[#29483c] hover:bg-white'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-xs text-[#68766c]">
                All appointments include a quiet 10-minute check-in buffer before hands-on work begins.
              </div>
            </div>
          )}

          {/* STEP 3: Details & Somatic Customization */}
          {step === 3 && (
            <form id={formId} onSubmit={handleCompleteBooking} className="space-y-4">
              <div className="space-y-3">
                <label className="block eyebrow text-[#78857a]">
                  Contact Information
                </label>

                <div>
                  <input
                    type="text"
                    required
                    placeholder="Full Legal Name *"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-[2px] bg-white border border-[#ded9ce] text-[#29483c] outline-hidden focus:border-[#29483c]"
                  />
                  {formErrors.name && <p className="text-[11px] text-rose-600 mt-1">{formErrors.name}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email address for receipt *"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-[2px] bg-white border border-[#ded9ce] text-[#29483c] outline-hidden focus:border-[#29483c]"
                    />
                    {formErrors.email && <p className="text-[11px] text-rose-600 mt-1">{formErrors.email}</p>}
                  </div>

                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Mobile Phone *"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-[2px] bg-white border border-[#ded9ce] text-[#29483c] outline-hidden focus:border-[#29483c]"
                    />
                    {formErrors.phone && <p className="text-[11px] text-rose-600 mt-1">{formErrors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Pressure Preference */}
              <div className="pt-2">
                <label className="block eyebrow text-[#78857a] mb-1.5">
                  Pressure Depth
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Gentle restorative', 'Medium balance', 'Firm & targeted'].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPressurePreference(p)}
                      className={`p-2 text-xs rounded-[2px] border text-center cursor-pointer ${
                        pressurePreference === p
                          ? 'bg-[#29483c] text-[#f3eee3] border-[#29483c]'
                          : 'bg-[#ede8dc] border-[#ded9ce] text-[#29483c]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Focus Areas */}
              <div className="pt-2">
                <label className="block eyebrow text-[#78857a] mb-1.5">
                  Focus Areas
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {muscleAreas.map((area) => (
                    <button
                      key={area}
                      type="button"
                      onClick={() => toggleFocusArea(area)}
                      className={`px-2.5 py-1 text-xs rounded-[2px] border cursor-pointer ${
                        focusAreas.includes(area)
                          ? 'bg-[#29483c] text-[#f3eee3] border-[#29483c]'
                          : 'bg-white border-[#ded9ce] text-[#59675d]'
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              {/* Health Notes */}
              <div className="pt-2">
                <label className="block eyebrow text-[#78857a] mb-1">
                  Health Notes or Sensitivities (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Desk forward-head posture, sensitive to strong fragrances..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-[2px] bg-white border border-[#ded9ce] text-[#29483c] outline-hidden focus:border-[#29483c]"
                />
              </div>

              <div className="p-3 bg-[#ede8dc] rounded-[2px] text-xs text-[#526357]">
                Payment is taken upon completion. We provide itemized receipts for extended health insurance benefits.
              </div>
            </form>
          )}

          {/* STEP 4: Confirmation with Clean Reset Action */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="p-6 bg-[#e3e8dc] border border-[#aeb8a8] rounded-[2px] flex items-start gap-4">
                <CheckCircle2 className="w-8 h-8 text-[#29483c] shrink-0 mt-0.5" />
                <div>
                  <h4 className="serif text-2xl text-[#29483c]">
                    Appointment Held for {clientName}
                  </h4>
                  <p className="text-xs text-[#59675d] mt-1 leading-relaxed">
                    A formal booking confirmation has been dispatched to <strong>{clientEmail}</strong>.
                  </p>
                </div>
              </div>

              <div className="p-5 bg-white border border-[#ded9ce] rounded-[2px] space-y-3 text-xs text-[#48564e]">
                <div className="flex justify-between items-center pb-3 border-b border-[#ded9ce]">
                  <span className="eyebrow text-[#9a7053]">Reference Code</span>
                  <span className="font-mono font-bold text-sm text-[#29483c]">{bookingRef}</span>
                </div>

                <div className="flex justify-between">
                  <span>Session:</span>
                  <span className="font-semibold text-[#29483c]">{selectedService.title} ({selectedDuration} min)</span>
                </div>

                <div className="flex justify-between">
                  <span>Practitioner:</span>
                  <span className="font-semibold text-[#29483c]">Masud, LMT</span>
                </div>

                <div className="flex justify-between">
                  <span>Date &amp; Time:</span>
                  <span className="font-semibold text-[#29483c]">{selectedDate} at {selectedTimeSlot}</span>
                </div>

                <div className="flex justify-between">
                  <span>Location:</span>
                  <span className="font-semibold text-[#29483c]">{STUDIO_INFO.address}</span>
                </div>

                <div className="flex justify-between pt-2 border-t border-[#ded9ce] font-semibold text-[#29483c] text-sm">
                  <span>Due upon completion:</span>
                  <span className="serif text-base">${currentDurationPrice}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleDownloadCalendar}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-full bg-[#ded9ce] text-[#29483c] hover:bg-[#d0c8b9] transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Calendar (.ics)</span>
                </button>

                <button
                  onClick={resetState}
                  className="flex items-center gap-1.5 px-5 py-2 text-xs font-medium rounded-full bg-[#29483c] text-[#f3eee3] hover:bg-[#1f372e] transition-colors shadow-xs cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Book Another Appointment</span>
                </button>

                <button
                  onClick={handleCloseAndReset}
                  className="px-4 py-2 text-xs font-medium text-[#59675d] hover:text-[#29483c] cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation */}
        {step < 4 && (
          <div className="px-6 py-4 bg-[#ede8dc] border-t border-[#ded9ce] flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
                className="px-3 py-1.5 text-xs text-[#59675d] hover:text-[#29483c] flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s + 1) as 1 | 2 | 3)}
                className="px-5 py-2 text-xs font-medium text-[#f3eee3] bg-[#29483c] hover:bg-[#1f372e] rounded-full flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                form={formId}
                className="px-6 py-2 text-xs font-medium text-[#f3eee3] bg-[#29483c] hover:bg-[#1f372e] rounded-full flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>Reserve Appointment</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
