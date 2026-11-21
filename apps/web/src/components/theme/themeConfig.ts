import { ColorOption, ThemeColor, ThemeMode } from './types.js';

export const THEME_COLOR_OPTIONS: ColorOption[] = [
  {
    id: 'red',
    label: 'Swiss Red',
    hex: '#C8102E',
    accentTextDark: '#ff6b81',
    accentTextLight: '#9f0c23'
  },
  {
    id: 'blue',
    label: 'Cobalt Blue',
    hex: '#0055D4',
    accentTextDark: '#60a5fa',
    accentTextLight: '#0044ab'
  },
  {
    id: 'emerald',
    label: 'Alpine Emerald',
    hex: '#00875A',
    accentTextDark: '#34d399',
    accentTextLight: '#006644'
  },
  {
    id: 'amber',
    label: 'Zurich Amber',
    hex: '#D97706',
    accentTextDark: '#fbbf24',
    accentTextLight: '#92400e'
  }
];

export const THEME_MODE_STORAGE_KEY = 'apex_theme_mode';
export const THEME_COLOR_STORAGE_KEY = 'apex_theme_color';
export const THEME_CONTRAST_STORAGE_KEY = 'apex_theme_contrast';

export function applyTheme(mode: ThemeMode, color: ThemeColor, highContrast: boolean = false) {
  const root = document.documentElement;
  root.setAttribute('data-theme', mode);
  root.setAttribute('data-color', color);
  if (highContrast) {
    root.setAttribute('data-contrast', 'high');
  } else {
    root.removeAttribute('data-contrast');
  }
}
