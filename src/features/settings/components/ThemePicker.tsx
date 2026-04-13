import { SettingsRow } from '@components/ui/SettingsRow';
import { useSettingsStore } from '@stores/settings.store';

export function ThemePicker() {
  const themePreference = useSettingsStore((s) => s.themePreference);
  const setThemePreference = useSettingsStore((s) => s.setThemePreference);

  return (
    <SettingsRow
      type="picker"
      title="Theme"
      description="Choose your preferred appearance"
      value={themePreference}
      options={[
        { label: 'System', value: 'system' },
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
      ]}
      onValueChange={(v) => setThemePreference(v as 'system' | 'light' | 'dark')}
    />
  );
}
