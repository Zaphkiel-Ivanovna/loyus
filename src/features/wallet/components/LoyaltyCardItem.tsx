import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { adjustColor } from '@lib/color';
import type { LoyaltyCard } from '@/types/card';

interface LoyaltyCardItemProps {
  card: LoyaltyCard;
  onPress?: () => void;
  displayStyle?: 'grid' | 'list';
}

export function LoyaltyCardItem({ card, onPress, displayStyle = 'grid' }: LoyaltyCardItemProps) {
  const gradientColors = [
    adjustColor(card.color, 18),
    card.color,
    adjustColor(card.color, -22),
  ] as const;

  if (displayStyle === 'list') {
    return (
      <Pressable className="rounded-2xl overflow-hidden active:opacity-80" onPress={onPress}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.listGradient}
        >
          {card.logoUri ? (
            <Image
              source={card.logoUri}
              style={{ width: 36, height: 36 }}
              contentFit="contain"
            />
          ) : (
            <View className="w-9 h-9" />
          )}
          <Text className="text-white font-bold text-base ml-3 flex-1" numberOfLines={1}>
            {card.storeName}
          </Text>
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <Pressable
      className="rounded-2xl overflow-hidden active:scale-[0.96] active:opacity-90"
      style={{ aspectRatio: 3 / 2 }}
      onPress={onPress}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gridGradient}
      >
        {card.logoUri ? (
          <Image
            source={card.logoUri}
            style={{ width: 64, height: 64 }}
            contentFit="contain"
          />
        ) : null}
        <Text
          className="text-lg font-bold text-white px-3"
          numberOfLines={1}
        >
          {card.storeName}
        </Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  listGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  gridGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
});
