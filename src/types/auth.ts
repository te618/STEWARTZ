export interface User {
  id: string;
  name: string;
  email: string;
  nationalId: string;
  role: 'admin' | 'guest';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  nationalId: string;
  password: string;
}