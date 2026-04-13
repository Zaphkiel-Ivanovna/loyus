import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TAB_BAR_HEIGHT = 49;

/**
 * Returns the bottom padding needed to keep content above the tab bar.
 * On iOS 26+ (NativeTabs), the tab bar floats over content so we need explicit padding.
 * On older iOS / Android, the classic tab bar is inline so this returns 0.
 */
export function useTabBarPadding(): number {
  const insets = useSafeAreaInsets();
  const isIOS26 = Platform.OS === 'ios' && Number(Platform.Version) >= 26;

  return isIOS26 ? TAB_BAR_HEIGHT + insets.bottom : 0;
}
