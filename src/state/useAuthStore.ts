import { create } from 'zustand';
import { getSessionStaff, login as loginService, logout as logoutService } from '../services/authService';
import type { Staff } from '../types';

interface AuthState {
  user: Staff | undefined;
  lastStaff: Staff | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initializeSession: () => Promise<void>;
  setLastStaff: (staff: Staff) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: undefined,
  lastStaff: undefined,
  isAuthenticated: false,
  isLoading: true,
  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const user = await loginService(email, password);
      set({ user, lastStaff: user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  logout: async () => {
    await logoutService();
    set({ user: undefined, lastStaff: get().user, isAuthenticated: false });
  },
  initializeSession: async () => {
    try {
      const user = await getSessionStaff();
      set({ user, lastStaff: user, isAuthenticated: user !== undefined, isLoading: false });
    } catch {
      set({ user: undefined, isAuthenticated: false, isLoading: false });
    }
  },
  setLastStaff: (staff) => set({ lastStaff: staff }),
}));
