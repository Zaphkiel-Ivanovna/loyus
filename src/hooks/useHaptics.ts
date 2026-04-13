import { useCallback } from 'react';
import { useSettingsStore } from '@stores/settings.store';
import * as Haptics from 'expo-haptics';

export function useHaptics() {
  const hapticFeedback = useSettingsStore((s) => s.hapticFeedback);

  const light = useCallback(() => {
    if (hapticFeedback) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [hapticFeedback]);

  const medium = useCallback(() => {
    if (hapticFeedback) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, [hapticFeedback]);

  const heavy = useCallback(() => {
    if (hapticFeedback) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }, [hapticFeedback]);

  const success = useCallback(() => {
    if (hapticFeedback) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, [hapticFeedback]);

  const error = useCallback(() => {
    if (hapticFeedback) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }, [hapticFeedback]);

  return { light, medium, heavy, success, error };
}
