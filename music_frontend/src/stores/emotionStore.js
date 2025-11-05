import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useEmotionStore = create(
  persist(
    (set) => ({
      emotion: null,

      setEmotion: (emotion) => set({ emotion }),

      resetEmotion: () => set({ emotion: null }),
    }),
    {
      name: "emotion-storage",
    }
  )
);
