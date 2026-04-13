import { useCallback, useMemo } from 'react';
import { View, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Plus, CreditCard } from 'lucide-react-native';
import { router } from 'expo-router';

import { Screen } from '@components/ui/Screen';
import { EmptyState } from '@components/ui/EmptyState';
import { GlassIconButton } from '@components/ui/GlassButton';
import { LoyaltyCardItem } from '@features/wallet/components/LoyaltyCardItem';
import { useWalletStore } from '@stores/wallet.store';
import { useSettingsStore } from '@stores/settings.store';
import { useTabBarPadding } from '@hooks/useTabBarPadding';
import { useAccentColor } from '@hooks/useAccentColor';
import { lightHaptic } from '@lib/haptics';
import type { LoyaltyCard } from '@/types/card';

function sortCards(cards: LoyaltyCard[], order: string): LoyaltyCard[] {
  const sorted = [...cards];
  switch (order) {
    case 'name':
      return sorted.sort((a, b) => a.storeName.localeCompare(b.storeName));
    case 'recent':
      return sorted.sort((a, b) => (b.lastUsedAt ?? b.createdAt) - (a.lastUsedAt ?? a.createdAt));
    case 'created':
      return sorted.sort((a, b) => b.createdAt - a.createdAt);
    default:
      return sorted;
  }
}

export default function WalletScreen() {
  const cards = useWalletStore((s) => s.cards);
  const cardDisplayStyle = useSettingsStore((s) => s.cardDisplayStyle);
  const defaultSortOrder = useSettingsStore((s) => s.defaultSortOrder);

  const tabBarPadding = useTabBarPadding();
  const { primary } = useAccentColor();
  const sortedCards = useMemo(() => sortCards(cards, defaultSortOrder), [cards, defaultSortOrder]);

  const handleAddCard = useCallback(() => {
    lightHaptic();
    router.navigate('/(tabs)/scanner');
  }, []);

  const isGrid = cardDisplayStyle === 'grid';

  const renderCard = useCallback(
    ({ item }: { item: LoyaltyCard }) => (
      <View className={isGrid ? 'flex-1 px-1.5' : 'px-4'}>
        <LoyaltyCardItem
          card={item}
          displayStyle={cardDisplayStyle}
          onPress={() => router.push(`/card/${item.id}`)}
        />
      </View>
    ),
    [cardDisplayStyle, isGrid],
  );

  return (
    <Screen padded safeTop>
      <View className="flex-row justify-between items-center py-4">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white">
          Wallet
        </Text>

        <GlassIconButton
          onPress={handleAddCard}
          icon={<Plus size={22} color={primary} strokeWidth={2.5} />}
        />
      </View>

      {cards.length === 0 ? (
        <EmptyState
          icon={CreditCard}
          title="No Cards Yet"
          description="Add your first loyalty card to get started."
          actionLabel="Add a Card"
          onAction={handleAddCard}
        />
      ) : (
        <View className="flex-1">
          <FlashList
            data={sortedCards}
            renderItem={renderCard}
            numColumns={isGrid ? 2 : 1}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View className="h-3" />}
            contentContainerStyle={{ paddingBottom: 24 + tabBarPadding }}
          />
        </View>
      )}
    </Screen>
  );
}
