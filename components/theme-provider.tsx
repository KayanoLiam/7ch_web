import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type ThemeVariant = 'classic' | 'claude' | 'scheme1';

const THEME_STORAGE_KEY = '7ch_theme';
const THEME_VARIANT_STORAGE_KEY = '7ch_theme_variant';
const SYSTEM_THEME_QUERY = '(prefers-color-scheme: dark)';

interface ThemeContextValue {
  theme: Theme;
  themeVariant: ThemeVariant;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  setThemeVariant: (themeVariant: ThemeVariant) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia(SYSTEM_THEME_QUERY).matches ? 'dark' : 'light';
};

const getStoredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'light';
};

const getStoredThemeVariant = (): ThemeVariant => {
  if (typeof window === 'undefined') return 'classic';
  const stored = window.localStorage.getItem(THEME_VARIANT_STORAGE_KEY);
  return stored === 'claude' || stored === 'classic' || stored === 'scheme1' ? stored : 'classic';
};

const applyTheme = (theme: Theme, themeVariant: ThemeVariant): 'light' | 'dark' => {
  const resolvedTheme = theme === 'system' ? getSystemTheme() : theme;
  const root = document.documentElement;
  root.classList.toggle('dark', resolvedTheme === 'dark');
  root.dataset.theme = theme;
  root.dataset.themeVariant = themeVariant;
  root.style.colorScheme = resolvedTheme;
  return resolvedTheme;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => getStoredTheme());
  const [themeVariant, setThemeVariantState] = useState<ThemeVariant>(() => getStoredThemeVariant());
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() =>
    theme === 'system' ? getSystemTheme() : theme
  );

  useEffect(() => {
    const nextResolvedTheme = applyTheme(theme, themeVariant);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    window.localStorage.setItem(THEME_VARIANT_STORAGE_KEY, themeVariant);
    setResolvedTheme(nextResolvedTheme);
  }, [theme, themeVariant]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(SYSTEM_THEME_QUERY);
    const handleChange = () => {
      if (theme !== 'system') return;
      setResolvedTheme(applyTheme('system', themeVariant));
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, themeVariant]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      themeVariant,
      resolvedTheme,
      setTheme: setThemeState,
      setThemeVariant: setThemeVariantState,
    }),
    [resolvedTheme, theme, themeVariant]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
