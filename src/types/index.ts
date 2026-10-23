export interface DurationOption {
  minutes: number;
  price: number;
  label?: string;
}

export interface ServiceItem {
  id: string;
  num: string;
  title: string;
  tagline: string;
  detail: string;
  durations: string;
  priceDisplay: string;
  color: string;
  durationOptions: DurationOption[];
  included: string[];
}

export interface GallerySpace {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  isRealPhoto: boolean;
  type?: 'suite' | 'couples' | 'tea' | 'apothecary' | 'steam';
  specs: {
    sound: string;
    temp: string;
    light: string;
  };
  amenities: string[];
}

export interface ReviewItem {
  id: string;
  name: string;
  service: string;
  quote: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BookingState {
  serviceId: string;
  durationMinutes: number;
  date: string;
  timeSlot: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  pressure: string;
  focusAreas: string[];
  notes: string;
  bookingRef?: string;
}
