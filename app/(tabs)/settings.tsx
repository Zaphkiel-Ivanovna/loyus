import { View, Text } from 'react-native';
import Constants from 'expo-constants';

import { Screen } from '@components/ui/Screen';
import { SettingsRow } from '@components/ui/SettingsRow';
import { ThemePicker } from '@features/settings/components/ThemePicker';
import { AccentPicker } from '@features/settings/components/AccentPicker';
import { useSettingsStore } from '@stores/settings.store';
import { useTabBarPadding } from '@hooks/useTabBarPadding';

export default function SettingsScreen() {
  const autoBrightness = useSettingsStore((s) => s.autoBrightness);
  const hapticFeedback = useSettingsStore((s) => s.hapticFeedback);
  const cardDisplayStyle = useSettingsStore((s) => s.cardDisplayStyle);
  const defaultSortOrder = useSettingsStore((s) => s.defaultSortOrder);
  const setAutoBrightness = useSettingsStore((s) => s.setAutoBrightness);
  const setHapticFeedback = useSettingsStore((s) => s.setHapticFeedback);
  const setCardDisplayStyle = useSettingsStore((s) => s.setCardDisplayStyle);
  const setDefaultSortOrder = useSettingsStore((s) => s.setDefaultSortOrder);

  const tabBarPadding = useTabBarPadding();
  const appVersion = Constants.expoConfig?.version ?? '1.0.0';

  return (
    <Screen padded safeTop>
      <Text className="text-3xl font-bold text-gray-900 dark:text-white py-4">
        Settings
      </Text>

      <View className="gap-2 mt-2">
        <SettingsRow
          type="toggle"
          title="Auto Brightness"
          description="Max brightness when displaying a card"
          value={autoBrightness}
          onValueChange={setAutoBrightness}
        />

        <View className="h-px bg-gray-200 dark:bg-gray-800" />

        <SettingsRow
          type="toggle"
          title="Haptic Feedback"
          description="Vibrate on interactions"
          value={hapticFeedback}
          onValueChange={setHapticFeedback}
        />

        <View className="h-px bg-gray-200 dark:bg-gray-800" />

        <ThemePicker />

        <View className="h-px bg-gray-200 dark:bg-gray-800" />

        <AccentPicker />

        <View className="h-px bg-gray-200 dark:bg-gray-800" />

        <SettingsRow
          type="picker"
          title="Card Display"
          description="How cards are shown in your wallet"
          value={cardDisplayStyle}
          options={[
            { label: 'Grid', value: 'grid' },
            { label: 'List', value: 'list' },
          ]}
          onValueChange={(v) => setCardDisplayStyle(v as 'grid' | 'list')}
        />

        <View className="h-px bg-gray-200 dark:bg-gray-800" />

        <SettingsRow
          type="picker"
          title="Default Sort"
          description="Default order for cards in your wallet"
          value={defaultSortOrder}
          options={[
            { label: 'Name', value: 'name' },
            { label: 'Recent', value: 'recent' },
            { label: 'Created', value: 'created' },
          ]}
          onValueChange={(v) => setDefaultSortOrder(v as 'name' | 'recent' | 'created')}
        />
      </View>

      <View className="flex-1 justify-end items-center" style={{ paddingBottom: 16 + tabBarPadding }}>
        <Text className="text-xs text-gray-400">
          Loyus v{appVersion}
        </Text>
      </View>
    </Screen>
  );
}
