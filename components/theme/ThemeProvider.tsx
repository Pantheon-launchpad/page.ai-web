"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Theme = "light" | "soft" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
} | null>(null);

const STORAGE_KEY = "pageai-theme";
const CLASS_MAP: Record<Theme, string | null> = {
  light: null,
  soft: "soft",
  dark: "dark",
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // The inline script in layout.tsx already set the class before hydration;
  // read it back so React state matches the DOM from the first render.
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const root = document.documentElement;
    const initial: Theme = root.classList.contains("dark")
      ? "dark"
      : root.classList.contains("soft")
        ? "soft"
        : "light";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThemeState(initial);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "soft");
    const cls = CLASS_MAP[theme];
    if (cls) root.classList.add(cls);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // localStorage may be unavailable (private mode, etc.) - theme still
      // works for the session, it just won't persist.
    }
  }, [theme]);

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}

// Runs synchronously before paint via a blocking <script> in the root layout,
// so the correct theme is applied immediately and there's no flash of the
// wrong theme on load. "soft" is never chosen automatically - it's an
// explicit, opt-in low-glare mode for people sensitive to bright light who
// also can't tolerate a fully dark UI, so it only appears once someone picks
// it themselves.
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('${STORAGE_KEY}');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (theme === 'dark' || theme === 'soft') document.documentElement.classList.add(theme);
  } catch (e) {}
})();
`;
