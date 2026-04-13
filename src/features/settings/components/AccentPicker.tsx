import { View, Text, Pressable } from 'react-native';
import { Check } from 'lucide-react-native';
import { ACCENT_THEMES } from '@/constants/themes';
import { useSettingsStore } from '@stores/settings.store';
import { lightHaptic } from '@lib/haptics';

export function AccentPicker() {
  const accentTheme = useSettingsStore((s) => s.accentTheme);
  const setAccentTheme = useSettingsStore((s) => s.setAccentTheme);

  return (
    <View className="py-3 gap-1">
      <Text className="text-base font-medium text-gray-900 dark:text-white">
        Accent Color
      </Text>
      <Text className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        Customize the app's primary color
      </Text>
      <View className="flex-row gap-3 flex-wrap">
        {ACCENT_THEMES.map((theme) => {
          const selected = accentTheme === theme.id;
          return (
            <Pressable
              key={theme.id}
              className="items-center gap-1.5"
              onPress={() => {
                lightHaptic();
                setAccentTheme(theme.id);
              }}
            >
              <View
                className="w-10 h-10 rounded-full items-center justify-center"
                style={{ backgroundColor: theme.primary }}
              >
                {selected && <Check size={18} color="white" strokeWidth={3} />}
              </View>
              <Text className={`text-xs ${selected ? 'font-semibold text-white' : 'text-gray-400'}`}>
                {theme.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
