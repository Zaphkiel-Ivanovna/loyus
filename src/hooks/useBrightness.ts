import { useEffect, useRef } from 'react';
import * as Brightness from 'expo-brightness';
import { useSettingsStore } from '@stores/settings.store';

export function useBrightness(active: boolean) {
  const autoBrightness = useSettingsStore((s) => s.autoBrightness);
  const previousBrightness = useRef<number | null>(null);

  useEffect(() => {
    if (!active || !autoBrightness) return;

    let mounted = true;

    const boost = async () => {
      const current = await Brightness.getBrightnessAsync();
      if (mounted) {
        previousBrightness.current = current;
        await Brightness.setBrightnessAsync(1);
      }
    };

    boost();

    return () => {
      mounted = false;
      if (previousBrightness.current !== null) {
        Brightness.setBrightnessAsync(previousBrightness.current);
      }
    };
  }, [active, autoBrightness]);
}
