export interface ConfirmedBooking {
  id: string;
  refCode: string;
  serviceId: string;
  serviceTitle: string;
  tierLabel?: string;
  durationMinutes: number;
  price: number;
  date: string;
  timeSlot: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  locationType?: 'home' | 'hotel' | 'office';
  deliveryAddress?: string;
  sydneySuburb?: string;
  pressurePreference?: string;
  focusAreas?: string[];
  notes?: string;
  createdAt: string;
  status: 'confirmed' | 'cancelled';
}

export interface BookingDraft {
  serviceId?: string;
  durationMinutes?: number;
  locationType?: 'home' | 'hotel' | 'office';
  sydneySuburb?: string;
  deliveryAddress?: string;
  selectedDate?: string;
  selectedTimeSlot?: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  pressurePreference?: string;
  focusAreas?: string[];
  notes?: string;
  updatedAt?: string;
}

const STORAGE_KEY = 'mmc_user_confirmed_bookings_v2';
const DRAFT_KEY = 'mmc_user_booking_draft_v2';
const PROFILE_KEY = 'mmc_saved_client_profile_v2';
const MAX_BOOKINGS_CAPACITY = 250;

// High-capacity in-memory cache for sandboxed / privacy environments
let memoryBookingsCache: ConfirmedBooking[] | null = null;
let memoryDraftCache: BookingDraft | null = null;

// Safe wrapper to test if Web Storage is accessible
function isStorageAvailable(type: 'localStorage' | 'sessionStorage'): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const storage = window[type];
    const testKey = '__storage_test__';
    storage.setItem(testKey, testKey);
    storage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

const hasLocalStorage = isStorageAvailable('localStorage');
const hasSessionStorage = isStorageAvailable('sessionStorage');

export function getStoredBookings(): ConfirmedBooking[] {
  if (memoryBookingsCache !== null) {
    return memoryBookingsCache;
  }

  let parsed: ConfirmedBooking[] = [];

  if (hasLocalStorage) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) parsed = JSON.parse(raw);
    } catch {
      // Fallback to session storage if localStorage fails
    }
  }

  if (parsed.length === 0 && hasSessionStorage) {
    try {
      const rawSession = sessionStorage.getItem(STORAGE_KEY);
      if (rawSession) parsed = JSON.parse(rawSession);
    } catch {
      // ignore
    }
  }

  memoryBookingsCache = Array.isArray(parsed) ? parsed : [];
  return memoryBookingsCache;
}

export function saveStoredBooking(booking: ConfirmedBooking): ConfirmedBooking[] {
  const current = getStoredBookings();
  // Filter out any duplicates and cap storage at MAX_BOOKINGS_CAPACITY
  const filtered = current.filter((b) => b.id !== booking.id);
  const updated = [booking, ...filtered].slice(0, MAX_BOOKINGS_CAPACITY);
  memoryBookingsCache = updated;

  const payload = JSON.stringify(updated);

  if (hasLocalStorage) {
    try {
      localStorage.setItem(STORAGE_KEY, payload);
    } catch (e) {
      console.warn('LocalStorage write failed, falling back to session storage', e);
    }
  }

  if (hasSessionStorage) {
    try {
      sessionStorage.setItem(STORAGE_KEY, payload);
    } catch {
      // ignore
    }
  }

  // Also cache client profile for subsequent quick fills
  saveClientProfile({
    name: booking.clientName,
    email: booking.clientEmail,
    phone: booking.clientPhone,
    suburb: booking.sydneySuburb,
    address: booking.deliveryAddress,
    locationType: booking.locationType,
  });

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('mmc_booking_updated', { detail: updated }));
  }

  return updated;
}

export function cancelStoredBooking(id: string): ConfirmedBooking[] {
  const current = getStoredBookings();
  const updated = current.map((b) => (b.id === id ? { ...b, status: 'cancelled' as const } : b));
  memoryBookingsCache = updated;

  const payload = JSON.stringify(updated);
  if (hasLocalStorage) {
    try {
      localStorage.setItem(STORAGE_KEY, payload);
    } catch {
      // ignore
    }
  }
  if (hasSessionStorage) {
    try {
      sessionStorage.setItem(STORAGE_KEY, payload);
    } catch {
      // ignore
    }
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('mmc_booking_updated', { detail: updated }));
  }
  return updated;
}

// Persistent Draft Management: prevents data loss when user switches apps or reloads
export function saveBookingDraft(draft: BookingDraft): void {
  const draftWithTimestamp = { ...draft, updatedAt: new Date().toISOString() };
  memoryDraftCache = draftWithTimestamp;

  const payload = JSON.stringify(draftWithTimestamp);
  if (hasLocalStorage) {
    try {
      localStorage.setItem(DRAFT_KEY, payload);
    } catch {
      // ignore
    }
  }
  if (hasSessionStorage) {
    try {
      sessionStorage.setItem(DRAFT_KEY, payload);
    } catch {
      // ignore
    }
  }
}

export function getBookingDraft(): BookingDraft | null {
  if (memoryDraftCache) return memoryDraftCache;

  if (hasLocalStorage) {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        memoryDraftCache = JSON.parse(raw);
        return memoryDraftCache;
      }
    } catch {
      // ignore
    }
  }

  if (hasSessionStorage) {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (raw) {
        memoryDraftCache = JSON.parse(raw);
        return memoryDraftCache;
      }
    } catch {
      // ignore
    }
  }

  return null;
}

export function clearBookingDraft(): void {
  memoryDraftCache = null;
  if (hasLocalStorage) {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      // ignore
    }
  }
  if (hasSessionStorage) {
    try {
      sessionStorage.removeItem(DRAFT_KEY);
    } catch {
      // ignore
    }
  }
}

// Client Profile caching for seamless re-bookings
export function saveClientProfile(profile: {
  name?: string;
  email?: string;
  phone?: string;
  suburb?: string;
  address?: string;
  locationType?: 'home' | 'hotel' | 'office';
}): void {
  if (hasLocalStorage) {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch {
      // ignore
    }
  }
}

export function getSavedClientProfile(): {
  name?: string;
  email?: string;
  phone?: string;
  suburb?: string;
  address?: string;
  locationType?: 'home' | 'hotel' | 'office';
} | null {
  if (hasLocalStorage) {
    try {
      const raw = localStorage.getItem(PROFILE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
  }
  return null;
}

// Storage Diagnostics for Production Ready Quality
export function getStorageCapacityInfo() {
  const bookings = getStoredBookings();
  return {
    totalBookingsStored: bookings.length,
    maxCapacity: MAX_BOOKINGS_CAPACITY,
    hasLocalStorage,
    hasSessionStorage,
    storageHealthy: true,
  };
}

