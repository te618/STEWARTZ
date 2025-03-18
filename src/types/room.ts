export interface Room {
  id: string;
  number: string;
  type: 'single' | 'double' | 'suite';
  price: number;
  status: 'available' | 'occupied' | 'maintenance';
  amenities: string[];
  image: string;
}

export interface RoomStats {
  total: number;
  available: number;
  occupied: number;
  maintenance: number;
  revenue: number;
}