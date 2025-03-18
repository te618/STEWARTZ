export interface Booking {
  id: string;
  userId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  totalAmount: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  guestCount: number;
  specialRequests?: string;
}

export interface BookingFormData {
  checkIn: string;
  checkOut: string;
  guestCount: number;
  specialRequests?: string;
}