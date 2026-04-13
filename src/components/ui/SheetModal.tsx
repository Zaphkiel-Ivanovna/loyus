import { useCallback, useMemo, useRef, useEffect } from 'react';
import { View, useColorScheme, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { useAccentColor } from '@hooks/useAccentColor';

interface SheetModalProps {
  open: boolean;
  onClose: () => void;
  snapPoints?: (string | number)[];
  children: React.ReactNode;
}

export function SheetModal({ open, onClose, snapPoints: snapPointsProp, children }: SheetModalProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const isDark = useColorScheme() === 'dark';
  const { gradient } = useAccentColor();
  const snapPoints = useMemo(() => snapPointsProp ?? ['95%'], [snapPointsProp]);

  useEffect(() => {
    if (open) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [open]);

  const handleSheetChange = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose],
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.6} />
    ),
    [],
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={open ? 0 : -1}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      enableDynamicSizing={false}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      backgroundStyle={{ backgroundColor: isDark ? '#0a0a1a' : '#ffffff' }}
      handleIndicatorStyle={{ backgroundColor: isDark ? '#4b5563' : '#d1d5db' }}
    >
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {isDark && (
          <LinearGradient
            colors={gradient}
            start={{ x: 0.3, y: 0 }}
            end={{ x: 0.7, y: 0.6 }}
            style={StyleSheet.absoluteFill}
          />
        )}
      </View>
      <View className="flex-1">
        {children}
      </View>
    </BottomSheet>
  );
}

export { BottomSheetScrollView };
