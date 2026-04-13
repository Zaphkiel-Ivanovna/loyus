import * as Haptics from 'expo-haptics';
import { useSettingsStore } from '@stores/settings.store';

function isEnabled(): boolean {
  return useSettingsStore.getState().hapticFeedback;
}

export function lightHaptic() {
  if (isEnabled()) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }
}

export function mediumHaptic() {
  if (isEnabled()) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }
}

export function heavyHaptic() {
  if (isEnabled()) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }
}

export function successHaptic() {
  if (isEnabled()) {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }
}

export function errorHaptic() {
  if (isEnabled()) {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }
}
