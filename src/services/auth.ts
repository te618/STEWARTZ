import { LoginCredentials, SignupData, User } from '../types/auth';

// Simulated API calls - replace with actual API endpoints
export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email === 'admin@hotel.com') {
          resolve({
            id: '1',
            name: 'Admin User',
            email: credentials.email,
            nationalId: 'ADMIN123',
            role: 'admin'
          });
        } else {
          resolve({
            id: '2',
            name: 'Guest User',
            email: credentials.email,
            nationalId: 'GUEST123',
            role: 'guest'
          });
        }
      }, 1000);
    });
  },

  async signup(data: SignupData): Promise<void> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  },

  async logout(): Promise<void> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  }
};