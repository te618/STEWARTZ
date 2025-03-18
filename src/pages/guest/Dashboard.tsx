import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Room } from '../../types/room';
import { Booking } from '../../types/booking';
import { roomService } from '../../services/room';
import { bookingService } from '../../services/booking';
import { useAuth } from '../../context/AuthContext';
import { 
  Calendar,
  Clock,
  CreditCard,
  Users,
  CheckCircle,
  BedDouble,
  Wifi,
  Tv,
  Wind,
  Wine,
  Mountain,
  Home
} from 'lucide-react';

const amenityIcons: Record<string, React.ElementType> = {
  'Wi-Fi': Wifi,
  'TV': Tv,
  'Air Conditioning': Wind,
  'Mini Bar': Wine,
  'Ocean View': Mountain,
  'Balcony': Home,
};

export function GuestDashboard() {
  const { user } = useAuth();
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookingInProgress, setBookingInProgress] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rooms, booking] = await Promise.all([
          roomService.getRooms(),
          user ? bookingService.getCurrentBooking(user.id) : null
        ]);
        setAvailableRooms(rooms.filter(room => room.status === 'available'));
        setCurrentBooking(booking);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleBookRoom = async (room: Room) => {
    setSelectedRoom(room);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-md p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-blue-100">Enjoy your luxurious stay with us</p>
      </div>

      {/* Current Booking Status */}
      {currentBooking && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <h2 className="text-xl font-semibold text-gray-900">Current Booking</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Check-in</p>
                <p className="text-lg font-semibold text-gray-900">
                  {format(new Date(currentBooking.checkIn), 'MMM dd, yyyy')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Check-out</p>
                <p className="text-lg font-semibold text-gray-900">
                  {format(new Date(currentBooking.checkOut), 'MMM dd, yyyy')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Guests</p>
                <p className="text-lg font-semibold text-gray-900">
                  {currentBooking.guestCount} {currentBooking.guestCount === 1 ? 'Person' : 'People'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BedDouble className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-900">Booking Status</span>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {currentBooking.status.charAt(0).toUpperCase() + currentBooking.status.slice(1)}
              </span>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-blue-700">Total Amount</span>
              <span className="text-xl font-bold text-blue-900">${currentBooking.totalAmount}</span>
            </div>
          </div>
        </div>
      )}

      {/* Available Rooms */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Rooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availableRooms.map(room => (
            <div key={room.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <img 
                src={room.image} 
                alt={`Room ${room.number}`}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Room {room.number}</h3>
                    <p className="text-gray-600">{room.type.charAt(0).toUpperCase() + room.type.slice(1)} Room</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">${room.price}</p>
                    <p className="text-sm text-gray-500">per night</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">Amenities:</p>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((amenity) => {
                        const Icon = amenityIcons[amenity];
                        return (
                          <div
                            key={amenity}
                            className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md text-sm text-gray-600"
                          >
                            {Icon && <Icon className="h-4 w-4" />}
                            {amenity}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    onClick={() => handleBookRoom(room)}
                    disabled={bookingInProgress}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Calendar className="h-5 w-5" />
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}