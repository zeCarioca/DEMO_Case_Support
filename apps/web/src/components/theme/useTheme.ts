import { useState, useEffect } from 'react';
import { ThemeColor, ThemeMode } from './types.js';
import {
  THEME_MODE_STORAGE_KEY,
  THEME_COLOR_STORAGE_KEY,
  THEME_CONTRAST_STORAGE_KEY,
  applyTheme
} from './themeConfig.js';

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(THEME_MODE_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    // Auto-detect OS system preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  const [color, setColor] = useState<ThemeColor>(() => {
    const saved = localStorage.getItem(THEME_COLOR_STORAGE_KEY);
    if (saved === 'red' || saved === 'blue' || saved === 'emerald' || saved === 'amber') {
      return saved;
    }
    return 'red';
  });

  const [highContrast, setHighContrast] = useState<boolean>(() => {
    return localStorage.getItem(THEME_CONTRAST_STORAGE_KEY) === 'true';
  });

  // Listen to OS system theme changes if no manual override was stored
  useEffect(() => {
    if (!window.matchMedia) return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e: MediaQueryListEvent) => {
      const hasSavedMode = localStorage.getItem(THEME_MODE_STORAGE_KEY);
      if (!hasSavedMode) {
        setMode(e.matches ? 'dark' : 'light');
      }
    };
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    applyTheme(mode, color, highContrast);
    localStorage.setItem(THEME_MODE_STORAGE_KEY, mode);
    localStorage.setItem(THEME_COLOR_STORAGE_KEY, color);
    localStorage.setItem(THEME_CONTRAST_STORAGE_KEY, String(highContrast));
  }, [mode, color, highContrast]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleHighContrast = () => {
    setHighContrast((prev) => !prev);
  };

  return {
    mode,
    color,
    highContrast,
    toggleMode,
    setColor,
    toggleHighContrast
  };
}
