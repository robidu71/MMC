export interface ConfirmedBooking {
  id: string;
  refCode: string;
  serviceId: string;
  serviceTitle: string;
  durationMinutes: number;
  price: number;
  date: string;
  timeSlot: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  pressurePreference?: string;
  focusAreas?: string[];
  notes?: string;
  createdAt: string;
  status: 'confirmed' | 'cancelled';
}

const STORAGE_KEY = 'mmc_user_confirmed_bookings_v1';

export function getStoredBookings(): ConfirmedBooking[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveStoredBooking(booking: ConfirmedBooking): ConfirmedBooking[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getStoredBookings();
    const updated = [booking, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('mmc_booking_updated', { detail: updated }));
    return updated;
  } catch {
    return [];
  }
}

export function cancelStoredBooking(id: string): ConfirmedBooking[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getStoredBookings();
    const updated = current.map((b) => (b.id === id ? { ...b, status: 'cancelled' as const } : b));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('mmc_booking_updated', { detail: updated }));
    return updated;
  } catch {
    return [];
  }
}
