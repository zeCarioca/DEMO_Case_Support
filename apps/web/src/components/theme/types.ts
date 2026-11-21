export type ThemeMode = 'dark' | 'light';

export type ThemeColor = 'red' | 'blue' | 'emerald' | 'amber';

export interface ColorOption {
  id: ThemeColor;
  label: string;
  hex: string;
  accentTextDark: string;
  accentTextLight: string;
}

export interface ThemeState {
  mode: ThemeMode;
  color: ThemeColor;
  highContrast: boolean;
}
