import { Booking, BookingFormData } from '../types/booking';

const MOCK_BOOKING: Booking = {
  id: '1',
  userId: '2',
  roomId: '1',
  checkIn: '2025-03-15',
  checkOut: '2025-03-18',
  totalAmount: 450,
  status: 'confirmed',
  guestCount: 2,
  specialRequests: 'Early check-in requested'
};

export const bookingService = {
  async getCurrentBooking(userId: string): Promise<Booking | null> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_BOOKING), 1000);
    });
  },

  async createBooking(roomId: string, bookingData: BookingFormData): Promise<Booking> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Math.random().toString(36).substr(2, 9),
          userId: '2',
          roomId,
          ...bookingData,
          status: 'confirmed',
          totalAmount: 450
        });
      }, 1000);
    });
  }
};