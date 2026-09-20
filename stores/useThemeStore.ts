import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "warm-light" | "motion-black";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "warm-light",
      setTheme: (theme: Theme) => {
        set({ theme });
        if (typeof window !== "undefined") {
          const root = document.documentElement;
          if (theme === "motion-black") {
            root.classList.add("dark");
            root.setAttribute("data-theme", "motion-black");
          } else {
            root.classList.remove("dark");
            root.setAttribute("data-theme", "warm-light");
          }
        }
      },
      toggleTheme: () => {
        const current = get().theme;
        const next = current === "motion-black" ? "warm-light" : "motion-black";
        get().setTheme(next);
      },
    }),
    {
      name: "slotsync_theme",
      migrate: (persistedState: any) => {
        if (persistedState && persistedState.theme) {
          if (persistedState.theme === "dark") {
            persistedState.theme = "motion-black";
          } else if (persistedState.theme === "light" || persistedState.theme === "system") {
            persistedState.theme = "warm-light";
          }
        }
        return persistedState as ThemeState;
      },
      version: 2,
    }
  )
);
