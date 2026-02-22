import { Storage } from "expo-sqlite/kv-store";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { Theme } from "../schemas/theme";

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme) => set(() => ({ theme })),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => Storage),
    },
  ),
);
