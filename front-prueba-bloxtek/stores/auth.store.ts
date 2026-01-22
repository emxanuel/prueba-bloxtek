import { User } from "@/features/auth/types/user.types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
  user: User | null;
  token: string | null;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthStore>()(persist((set) => ({
  user: null,
  token: null,
  setUser: (user: User) => set({ user }),
  setToken: (token: string) => set({ token }),
}), {
  name: "auth-store",
  storage: createJSONStorage(() => localStorage),
}));