import { Pressable, View, Platform, StyleSheet } from 'react-native';
import type { ReactNode } from 'react';
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import { lightHaptic } from '@lib/haptics';

const useGlass = Platform.OS === 'ios' && isLiquidGlassAvailable();

interface GlassButtonProps {
  onPress: () => void;
  children: ReactNode;
  className?: string;
}

export function GlassButton({ onPress, children, className = '' }: GlassButtonProps) {
  const handlePress = () => {
    lightHaptic();
    onPress();
  };

  if (useGlass) {
    return (
      <Pressable onPress={handlePress} style={({ pressed }) => pressed && { opacity: 0.7 }}>
        <GlassView
          isInteractive
          glassEffectStyle="clear"
          style={styles.glassContainer}
        >
          {children}
        </GlassView>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={handlePress}
      className={`bg-white/90 dark:bg-gray-800/90 rounded-full p-2.5 shadow-sm active:opacity-70 ${className}`}
    >
      {children}
    </Pressable>
  );
}

interface GlassIconButtonProps {
  onPress: () => void;
  icon: ReactNode;
}

export function GlassIconButton({ onPress, icon }: GlassIconButtonProps) {
  return (
    <GlassButton onPress={onPress}>
      <View className="items-center justify-center w-6 h-6">
        {icon}
      </View>
    </GlassButton>
  );
}

const styles = StyleSheet.create({
  glassContainer: {
    borderRadius: 9999,
    padding: 10,
  },
});
