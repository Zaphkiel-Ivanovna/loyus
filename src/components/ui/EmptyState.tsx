import { View, Text, Pressable } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useAccentColor } from '@hooks/useAccentColor';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const { primary } = useAccentColor();

  return (
    <View className="flex-1 items-center justify-center px-6 gap-3">
      <Icon size={64} color="#9ca3af" strokeWidth={1.5} />

      <Text className="text-xl font-bold text-center text-gray-900 dark:text-white">
        {title}
      </Text>

      <Text className="text-base text-center text-gray-500 dark:text-gray-400">
        {description}
      </Text>

      {actionLabel && onAction && (
        <Pressable
          className="mt-4 px-6 py-3 rounded-full active:opacity-80"
          style={{ backgroundColor: primary }}
          onPress={onAction}
        >
          <Text className="text-white font-semibold text-base">{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}
