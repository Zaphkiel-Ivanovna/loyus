import { useCallback, useEffect, useMemo } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Image } from 'expo-image';
import { Check, X } from 'lucide-react-native';
import { router } from 'expo-router';

import { CARD_COLORS, DEFAULT_CARD_COLOR } from '@/constants/colors';
import { ColorPicker } from '@components/ui/ColorPicker';
import { SheetModal, BottomSheetScrollView } from '@components/ui/SheetModal';
import { useWalletStore } from '@stores/wallet.store';
import { useBrandfetch } from '@hooks/useBrandfetch';
import { useAccentColor } from '@hooks/useAccentColor';
import { successHaptic } from '@lib/haptics';
import type { ScannedData } from '../types/scanner.types';

interface AddCardSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scannedData: ScannedData | null;
  onClose: () => void;
}

interface FormValues {
  storeName: string;
  color: string;
  notes: string;
}

export function AddCardSheet({ open, onOpenChange, scannedData, onClose }: AddCardSheetProps) {
  const { primary } = useAccentColor();
  const addCard = useWalletStore((s) => s.addCard);
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
      storeName: '',
      color: DEFAULT_CARD_COLOR,
      notes: '',
    },
  });

  useEffect(() => {
    if (brandColor) {
      setValue('color', brandColor);
    }
  }, [brandColor, setValue]);

  const colorOptions = useMemo(() => {
    const extras = brandColors.filter((c) => !(CARD_COLORS as readonly string[]).includes(c));
    if (extras.length === 0) return CARD_COLORS as readonly string[];
    return [...extras, ...CARD_COLORS] as readonly string[];
  }, [brandColors]);

  const onSave = useCallback(
    (values: FormValues) => {
      if (!scannedData) return;

      addCard({
        storeName: values.storeName,
        codeValue: scannedData.value,
        codeType: scannedData.type,
        color: values.color,
        logoUri: previewLogoUrl,
        brandDomain: selectedBrand?.domain ?? null,
        notes: values.notes,
      });

      successHaptic();
      reset();
      resetBrand();
      onClose();
      router.navigate('/(tabs)');
    },
    [scannedData, addCard, reset, resetBrand, onClose, selectedBrand, previewLogoUrl],
  );

  const handleCancel = useCallback(() => {
    reset();
    resetBrand();
    onClose();
  }, [reset, resetBrand, onClose]);

  const handleSheetClose = useCallback(() => {
    handleCancel();
  }, [handleCancel]);

  return (
    <SheetModal open={open} onClose={handleSheetClose}>
      <View className="flex-row items-center px-4 pt-3 pb-2 gap-3">
        <Pressable className="p-1 active:opacity-60" onPress={handleCancel}>
          <X size={22} color="#9ca3af" strokeWidth={2} />
        </Pressable>
        <Text className="text-xl font-bold text-gray-900 dark:text-white flex-1">
          Add Card
        </Text>
      </View>

      <BottomSheetScrollView style={{ paddingHorizontal: 16 }}>
        <View className="gap-4 pb-6">
          {scannedData && (
            <View className="bg-gray-100 dark:bg-white/10 rounded-xl px-3 py-2">
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                Scanned: {scannedData.type.toUpperCase()} — {scannedData.value}
              </Text>
            </View>
          )}

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
                Type the brand name to auto-fetch logo and colors
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
          onPress={handleCancel}
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
          <Text className="text-base font-medium text-white">Save Card</Text>
        </Pressable>
      </View>
    </SheetModal>
  );
}
