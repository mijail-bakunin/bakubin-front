import { create } from "zustand";

export type AuthUser = {
  id: string;
  name: string | null;
  email: string;
};

type AuthState = {
  user: AuthUser | null;
  setUser: (user: AuthUser) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  setUser: (user) => {
    set({ user });
  },

  logout: () => {
    set({ user: null });
    localStorage.removeItem("auth_user");
  },
}));
