import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from '@lib/storage';
import { DEFAULT_ACCENT_THEME } from '@/constants/themes';

interface SettingsState {
  autoBrightness: boolean;
  hapticFeedback: boolean;
  themePreference: 'system' | 'light' | 'dark';
  accentTheme: string;
  cardDisplayStyle: 'grid' | 'list';
  defaultSortOrder: 'name' | 'recent' | 'created';
  setAutoBrightness: (value: boolean) => void;
  setHapticFeedback: (value: boolean) => void;
  setThemePreference: (value: 'system' | 'light' | 'dark') => void;
  setAccentTheme: (value: string) => void;
  setCardDisplayStyle: (value: 'grid' | 'list') => void;
  setDefaultSortOrder: (value: 'name' | 'recent' | 'created') => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      autoBrightness: true,
      hapticFeedback: true,
      themePreference: 'system',
      accentTheme: DEFAULT_ACCENT_THEME,
      cardDisplayStyle: 'grid',
      defaultSortOrder: 'recent',
      setAutoBrightness: (value) => set({ autoBrightness: value }),
      setHapticFeedback: (value) => set({ hapticFeedback: value }),
      setThemePreference: (value) => set({ themePreference: value }),
      setAccentTheme: (value) => set({ accentTheme: value }),
      setCardDisplayStyle: (value) => set({ cardDisplayStyle: value }),
      setDefaultSortOrder: (value) => set({ defaultSortOrder: value }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
