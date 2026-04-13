import { View, useColorScheme, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAccentColor } from '@hooks/useAccentColor';

interface ScreenProps {
  children: React.ReactNode;
  padded?: boolean;
  safeTop?: boolean;
  safeBottom?: boolean;
  className?: string;
}

export function Screen({ children, padded, safeTop = true, safeBottom = false, className = '' }: ScreenProps) {
  const insets = useSafeAreaInsets();
  const isDark = useColorScheme() === 'dark';
  const { gradient } = useAccentColor();

  return (
    <View
      className={`flex-1 ${padded ? 'px-4' : ''} ${className}`}
      style={{
        backgroundColor: isDark ? '#030712' : '#ffffff',
        paddingTop: safeTop ? insets.top : undefined,
        paddingBottom: safeBottom ? insets.bottom : undefined,
      }}
    >
      {isDark && (
        <LinearGradient
          colors={gradient}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 0.8, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      )}
      {children}
    </View>
  );
}
