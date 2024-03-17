import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthUser = create(
  persist(
    (set) => ({
      isAuth: false,
      user: null,
      setAuth: (user) => set({ isAuth: true, user }),
      logout: () => set({ isAuth: false, user: null }),
    }),
    {
      name: "auth",
    }
  )
);
