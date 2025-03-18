import { Room, RoomStats } from '../types/room';

const ROOMS_DATA: Room[] = [
  {
    id: '1',
    number: '101',
    type: 'single',
    price: 100,
    status: 'available',
    amenities: ['Wi-Fi', 'TV', 'Air Conditioning'],
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800',
  },
  {
    id: '2',
    number: '102',
    type: 'double',
    price: 150,
    status: 'occupied',
    amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar'],
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800',
  },
  {
    id: '3',
    number: '103',
    type: 'suite',
    price: 300,
    status: 'available',
    amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Ocean View', 'Balcony'],
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800',
  },
];

export const roomService = {
  async getRooms(): Promise<Room[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(ROOMS_DATA), 1000);
    });
  },

  async getRoomStats(): Promise<RoomStats> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          total: ROOMS_DATA.length,
          available: ROOMS_DATA.filter(room => room.status === 'available').length,
          occupied: ROOMS_DATA.filter(room => room.status === 'occupied').length,
          maintenance: ROOMS_DATA.filter(room => room.status === 'maintenance').length,
          revenue: ROOMS_DATA.reduce((acc, room) => room.status === 'occupied' ? acc + room.price : acc, 0),
        });
      }, 1000);
    });
  },
};