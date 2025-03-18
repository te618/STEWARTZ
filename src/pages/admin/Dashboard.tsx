import React, { useEffect, useState } from 'react';
import { RoomStats } from '../../types/room';
import { roomService } from '../../services/room';
import { Hotel, Users, Wallet, PenTool as Tool } from 'lucide-react';

export function AdminDashboard() {
  const [stats, setStats] = useState<RoomStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await roomService.getRoomStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const statCards = [
    { title: 'Total Rooms', value: stats?.total || 0, icon: Hotel, color: 'bg-blue-500' },
    { title: 'Available', value: stats?.available || 0, icon: Users, color: 'bg-green-500' },
    { title: 'Occupied', value: stats?.occupied || 0, icon: Wallet, color: 'bg-yellow-500' },
    { title: 'Maintenance', value: stats?.maintenance || 0, icon: Tool, color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div key={card.title} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
          <p className="text-2xl font-bold text-green-600">${stats?.revenue || 0}</p>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className="h-2 bg-green-500 rounded-full" 
            style={{ width: `${((stats?.occupied || 0) / (stats?.total || 1)) * 100}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Occupancy Rate: {((stats?.occupied || 0) / (stats?.total || 1) * 100).toFixed(1)}%
        </p>
      </div>
    </div>
  );
}