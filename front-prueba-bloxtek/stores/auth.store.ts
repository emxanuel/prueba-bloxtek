import { User } from "@/features/auth/types/user.types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { setCookie, deleteCookie } from "@/utils/cookies";

interface AuthStore {
  user: User | null;
  token: string | null;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(persist((set) => ({
  user: null,
  token: null,
  setUser: (user: User) => set({ user }),
  setToken: (token: string) => {
    if (token) {
      setCookie("auth-token", token);
    } else {
      deleteCookie("auth-token");
    }
    set({ token });
  },
  clearAuth: () => {
    deleteCookie("auth-token");
    set({ user: null, token: null });
  },
}), {
  name: "auth-store",
  storage: createJSONStorage(() => localStorage),
  onRehydrateStorage: () => (state) => {
    // Sync cookie when store is rehydrated from localStorage
    if (state?.token) {
      setCookie("auth-token", state.token);
    }
  },
}));