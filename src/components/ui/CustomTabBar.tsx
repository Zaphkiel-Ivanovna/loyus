import { View, Text, Pressable } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAccentColor } from '@hooks/useAccentColor';
import { lightHaptic } from '@lib/haptics';

function TabItems({ state, descriptors, navigation }: BottomTabBarProps) {
  const { primary } = useAccentColor();

  return (
    <>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title ?? route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            lightHaptic();
            navigation.navigate(route.name, route.params);
          }
        };

        const color = isFocused ? primary : '#9ca3af';

        return (
          <Pressable
            key={route.key}
            className="flex-1 items-center justify-center pt-2 pb-1 gap-0.5 active:opacity-70"
            onPress={onPress}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
          >
            {options.tabBarIcon?.({ color, size: 24, focused: isFocused })}
            <Text
              style={isFocused ? { color: primary } : undefined}
              className={`text-[10px] font-medium ${isFocused ? '' : 'text-gray-400'}`}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </>
  );
}

export function CustomTabBar(props: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-row bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800"
      style={{ paddingBottom: insets.bottom }}
    >
      <TabItems {...props} />
    </View>
  );
}
