import { useCallback, useEffect, useMemo } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Image } from 'expo-image';
import { Check, X } from 'lucide-react-native';

import { CARD_COLORS } from '@/constants/colors';
import { ColorPicker } from '@components/ui/ColorPicker';
import { SheetModal, BottomSheetScrollView } from '@components/ui/SheetModal';
import { useWalletStore } from '@stores/wallet.store';
import { useBrandfetch } from '@hooks/useBrandfetch';
import { useAccentColor } from '@hooks/useAccentColor';
import { successHaptic } from '@lib/haptics';
import type { LoyaltyCard } from '@/types/card';

interface EditCardSheetProps {
  open: boolean;
  onClose: () => void;
  card: LoyaltyCard;
}

interface FormValues {
  storeName: string;
  color: string;
  notes: string;
}

export function EditCardSheet({ open, onClose, card }: EditCardSheetProps) {
  const { primary } = useAccentColor();
  const updateCard = useWalletStore((s) => s.updateCard);
  const {
    isSearching,
    selectedBrand,
    previewLogoUrl,
    brandColor,
    brandColors,
    isConfigured,
    onStoreNameChange,
    resetBrand,
  } = useBrandfetch();

  const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      storeName: card.storeName,
      color: card.color,
      notes: card.notes,
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        storeName: card.storeName,
        color: card.color,
        notes: card.notes,
      });
      resetBrand();
    }
  }, [open, card, reset, resetBrand]);

  useEffect(() => {
    if (brandColor) {
      setValue('color', brandColor);
    }
  }, [brandColor, setValue]);

  const colorOptions = useMemo(() => {
    const cardExtra = card.color.startsWith('#') && !(CARD_COLORS as readonly string[]).includes(card.color) ? [card.color] : [];
    const brandExtras = brandColors.filter((c) => !(CARD_COLORS as readonly string[]).includes(c) && c !== card.color);
    const extras = [...new Set([...brandExtras, ...cardExtra])];
    if (extras.length === 0) return CARD_COLORS as readonly string[];
    return [...extras, ...CARD_COLORS] as readonly string[];
  }, [brandColors, card.color]);

  const onSave = useCallback(
    (values: FormValues) => {
      updateCard(card.id, {
        storeName: values.storeName,
        color: values.color,
        notes: values.notes,
        logoUri: selectedBrand ? previewLogoUrl : card.logoUri,
        brandDomain: selectedBrand?.domain ?? card.brandDomain,
      });
      successHaptic();
      onClose();
    },
    [card.id, card.logoUri, card.brandDomain, selectedBrand, previewLogoUrl, updateCard, onClose],
  );

  return (
    <SheetModal open={open} onClose={onClose}>
      <View className="flex-row items-center px-4 pt-3 pb-2 gap-3">
        <Pressable className="p-1 active:opacity-60" onPress={onClose}>
          <X size={22} color="#9ca3af" strokeWidth={2} />
        </Pressable>
        <Text className="text-xl font-bold text-gray-900 dark:text-white flex-1">
          Edit Card
        </Text>
      </View>

      <BottomSheetScrollView style={{ paddingHorizontal: 16 }}>
        <View className="gap-4 pb-6">
          <View className="gap-2">
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">Store Name *</Text>
            <Controller
              control={control}
              name="storeName"
              rules={{ required: 'Store name is required' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`border rounded-xl px-4 py-3 text-base text-gray-900 dark:text-white bg-gray-50 dark:bg-white/10 ${
                    errors.storeName ? 'border-red-500' : 'border-gray-200 dark:border-white/20'
                  }`}
                  placeholder="e.g. Starbucks"
                  placeholderTextColor="#9ca3af"
                  value={value}
                  onChangeText={(text) => {
                    onChange(text);
                    onStoreNameChange(text);
                  }}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.storeName && (
              <Text className="text-xs text-red-500">{errors.storeName.message}</Text>
            )}
            {isConfigured && (
              <Text className="text-xs text-gray-400">
                Change the name to search for a new brand logo and colors
              </Text>
            )}
          </View>

          {(isSearching || selectedBrand) && (
            <View className="flex-row bg-gray-100 dark:bg-white/10 rounded-xl px-3 py-2.5 items-center gap-3">
              {isSearching ? (
                <>
                  <ActivityIndicator size="small" color="#6b7280" />
                  <Text className="text-sm text-gray-500">Searching brand...</Text>
                </>
              ) : selectedBrand ? (
                <Pressable
                  className="flex-1 flex-row items-center gap-3 active:opacity-70"
                  onPress={() => {
                    const name = selectedBrand.name ?? selectedBrand.domain;
                    setValue('storeName', name);
                  }}
                >
                  {previewLogoUrl && (
                    <Image
                      source={previewLogoUrl}
                      style={{ width: 32, height: 32, borderRadius: 6 }}
                    />
                  )}
                  <View className="flex-1 gap-0.5">
                    <Text className="text-base font-semibold text-gray-900 dark:text-white">
                      {selectedBrand.name ?? selectedBrand.domain}
                    </Text>
                    <Text className="text-xs text-gray-500">{selectedBrand.domain}</Text>
                  </View>
                </Pressable>
              ) : null}
            </View>
          )}

          <View className="gap-2">
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">Card Color</Text>
            <Controller
              control={control}
              name="color"
              render={({ field: { onChange, value } }) => (
                <ColorPicker colors={colorOptions} selected={value} onSelect={onChange} />
              )}
            />
          </View>

          <View className="gap-2">
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">Notes</Text>
            <Controller
              control={control}
              name="notes"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="border border-gray-200 dark:border-white/20 rounded-xl px-4 py-3 text-base text-gray-900 dark:text-white bg-gray-50 dark:bg-white/10"
                  placeholder="Optional notes..."
                  placeholderTextColor="#9ca3af"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
              )}
            />
          </View>
        </View>
      </BottomSheetScrollView>

      <View className="flex-row gap-3 px-4 pt-3 pb-6 border-t border-gray-200 dark:border-white/20">
        <Pressable
          className="flex-1 flex-row items-center justify-center gap-2 py-3 rounded-xl border border-gray-300 dark:border-white/15 active:opacity-80"
          onPress={onClose}
        >
          <X size={18} color="#6b7280" strokeWidth={2} />
          <Text className="text-base font-medium text-gray-700 dark:text-gray-300">Cancel</Text>
        </Pressable>
        <Pressable
          className="flex-1 flex-row items-center justify-center gap-2 py-3 rounded-xl active:opacity-80"
          style={{ backgroundColor: primary }}
          onPress={handleSubmit(onSave)}
        >
          <Check size={18} color="white" strokeWidth={2} />
          <Text className="text-base font-medium text-white">Save</Text>
        </Pressable>
      </View>
    </SheetModal>
  );
}
