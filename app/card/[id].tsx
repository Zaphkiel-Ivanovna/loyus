import { useCallback, useEffect, useState } from 'react';
import { Alert, View, Text, Pressable, useColorScheme, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react-native';

import { Screen } from '@components/ui/Screen';
import { GlassIconButton } from '@components/ui/GlassButton';
import { BarcodeDisplay } from '@features/wallet/components/BarcodeDisplay';
import { EditCardSheet } from '@features/wallet/components/EditCardSheet';
import { useWalletStore } from '@stores/wallet.store';
import { useBrightness } from '@hooks/useBrightness';
import { adjustColor } from '@lib/color';
import { mediumHaptic, errorHaptic } from '@lib/haptics';

export default function CardDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const card = useWalletStore((s) => s.cards.find((c) => c.id === id));
  const removeCard = useWalletStore((s) => s.removeCard);
  const markCardUsed = useWalletStore((s) => s.markCardUsed);
  const { width } = useWindowDimensions();
  const isDark = useColorScheme() === 'dark';
  const iconColor = isDark ? '#d1d5db' : '#374151';
  const [editOpen, setEditOpen] = useState(false);

  const handleDelete = useCallback(() => {
    Alert.alert('Delete Card', `Remove "${card?.storeName}" from your wallet?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          if (id) removeCard(id);
          errorHaptic();
          router.back();
        },
      },
    ]);
  }, [card?.storeName, id, removeCard]);

  useBrightness(true);

  useEffect(() => {
    if (id) {
      markCardUsed(id);
    }
  }, [id, markCardUsed]);

  if (!card) {
    return (
      <Screen padded safeTop>
        <View className="flex-1 items-center justify-center">
          <Text className="text-base text-gray-500 dark:text-gray-400">
            Card not found
          </Text>
        </View>
      </Screen>
    );
  }

  const barcodeSize = Math.min(width - 96, 300);

  return (
    <Screen safeTop safeBottom>
      <View className="flex-1">
        <View className="flex-row items-center px-3 pt-2 pb-3 gap-2">
          <GlassIconButton
            onPress={() => router.back()}
            icon={<ArrowLeft size={22} color={iconColor} strokeWidth={2} />}
          />
          <View className="flex-1" />
          <GlassIconButton
            onPress={() => {
              mediumHaptic();
              setEditOpen(true);
            }}
            icon={<Pencil size={20} color={iconColor} strokeWidth={2} />}
          />
          <GlassIconButton
            onPress={handleDelete}
            icon={<Trash2 size={20} color={iconColor} strokeWidth={2} />}
          />
        </View>

        <View className="flex-1 items-center justify-center px-5">
          <View className="rounded-2xl overflow-hidden w-full max-w-[400px] shadow-lg">
            <LinearGradient
              colors={[adjustColor(card.color, 18), card.color, adjustColor(card.color, -22)]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 16, paddingHorizontal: 16, gap: 8 }}
            >
              {card.logoUri && (
                <Image
                  source={card.logoUri}
                  style={{ width: 40, height: 40 }}
                  contentFit="contain"
                />
              )}
              <Text className="text-lg font-bold text-white" numberOfLines={1}>
                {card.storeName}
              </Text>
            </LinearGradient>

            <View className="bg-white items-center pt-5 pb-4 px-5 gap-4">
              <BarcodeDisplay
                value={card.codeValue}
                type={card.codeType}
                size={barcodeSize}
              />
              <Text
                className="text-xl font-semibold text-gray-900"
                style={{ letterSpacing: 3 }}
              >
                {card.codeValue}
              </Text>
            </View>
          </View>

          {card.notes ? (
            <Text className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4 px-4">
              {card.notes}
            </Text>
          ) : null}
        </View>
      </View>

      <EditCardSheet
        open={editOpen}
        onClose={() => setEditOpen(false)}
        card={card}
      />
    </Screen>
  );
}
