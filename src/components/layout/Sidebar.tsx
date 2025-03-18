import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, 
  Home, 
  BookOpen, 
  BarChart3, 
  UserCircle, 
  BedDouble, 
  LogOut 
} from 'lucide-react';

export function Sidebar() {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'admin';

  const adminLinks = [
    { to: '/admin', icon: Home, label: 'Dashboard' },
    { to: '/admin/users', icon: Users, label: 'User Management' },
    { to: '/admin/rooms', icon: BedDouble, label: 'Room Management' },
    { to: '/admin/bookings', icon: BookOpen, label: 'View Bookings' },
    { to: '/admin/reports', icon: BarChart3, label: 'Reports' },
  ];

  const guestLinks = [
    { to: '/guest', icon: Home, label: 'Dashboard' },
    { to: '/guest/profile', icon: UserCircle, label: 'My Profile' },
    { to: '/guest/room', icon: BedDouble, label: 'My Room' },
    { to: '/guest/book', icon: BookOpen, label: 'Book Room' },
  ];

  const links = isAdmin ? adminLinks : guestLinks;

  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-4 flex flex-col">
      <div className="flex items-center gap-3 mb-8 px-2">
        <BedDouble className="h-8 w-8" />
        <h1 className="text-xl font-bold">Hotel Manager</h1>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`
                }
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-3 px-4 py-2 mt-4 w-full text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
      >
        <LogOut className="h-5 w-5" />
        Logout
      </button>
    </div>
  );
}