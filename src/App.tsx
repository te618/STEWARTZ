import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { AdminDashboard } from './pages/admin/Dashboard';
import { RoomManagement } from './pages/admin/RoomManagement';
import { GuestDashboard } from './pages/guest/Dashboard';
import { useAuth } from './context/AuthContext';

function PrivateRoute({ children, allowedRole }: { children: React.ReactNode; allowedRole: 'admin' | 'guest' }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user?.role !== allowedRole) {
    return <Navigate to={`/${user?.role}`} />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <PrivateRoute allowedRole="admin">
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="rooms" element={<RoomManagement />} />
          </Route>

          {/* Guest routes */}
          <Route
            path="/guest"
            element={
              <PrivateRoute allowedRole="guest">
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<GuestDashboard />} />
          </Route>

          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;