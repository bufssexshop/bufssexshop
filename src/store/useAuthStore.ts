import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  name: string; // this is an alias from controller
  email: string;
  role: 'admin' | 'client';
  city: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false, // Estado inicial

      setAuth: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false
        }),
    }),
    {
      name: 'auth-storage',
    }
  )
);