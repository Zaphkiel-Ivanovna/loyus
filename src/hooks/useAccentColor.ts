import { useSettingsStore } from '@stores/settings.store';
import { getAccentTheme } from '@/constants/themes';
import type { AccentTheme } from '@/constants/themes';

export function useAccentColor(): AccentTheme {
  const accentTheme = useSettingsStore((s) => s.accentTheme);
  return getAccentTheme(accentTheme);
}
