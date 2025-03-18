import React, { useEffect, useState } from 'react';
import { Room } from '../../types/room';
import { roomService } from '../../services/room';
import { Wifi, Tv, Wind, Wine, Mountain, Home } from 'lucide-react';

const amenityIcons: Record<string, React.ElementType> = {
  'Wi-Fi': Wifi,
  'TV': Tv,
  'Air Conditioning': Wind,
  'Mini Bar': Wine,
  'Ocean View': Mountain,
  'Balcony': Home,
};

export function RoomManagement() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await roomService.getRooms();
        setRooms(data);
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Room Management</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add New Room
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src={room.image} 
              alt={`Room ${room.number}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Room {room.number}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  room.status === 'available' ? 'bg-green-100 text-green-800' :
                  room.status === 'occupied' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-gray-600">{room.type.charAt(0).toUpperCase() + room.type.slice(1)} Room</p>
                <p className="text-2xl font-bold text-gray-900">${room.price}/night</p>
              </div>

              <div className="border-t pt-4">
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

              <div className="flex gap-2 mt-4">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Edit
                </button>
                <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}