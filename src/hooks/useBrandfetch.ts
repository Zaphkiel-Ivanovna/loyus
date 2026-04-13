import { useState, useRef, useCallback } from 'react';
import {
  searchBrands,
  fetchBrandDetails,
  pickBrandColor,
  downloadLogo,
} from '@lib/brandfetch';
import { findBrandByName } from '@/constants/brands';
import type { BrandfetchSearchResult } from '@/types/brandfetch';

const DEBOUNCE_MS = 600;

interface UseBrandfetchReturn {
  isSearching: boolean;
  selectedBrand: BrandfetchSearchResult | null;
  previewLogoUrl: string | null;
  brandColor: string | null;
  brandColors: string[];
  isConfigured: boolean;
  onStoreNameChange: (text: string) => void;
  resetBrand: () => void;
}

export function useBrandfetch(): UseBrandfetchReturn {
  const apiKey = process.env.EXPO_PUBLIC_BRANDFETCH_API_KEY ?? '';
  const clientId = process.env.EXPO_PUBLIC_BRANDFETCH_CLIENT_ID ?? '';
  const isConfigured = apiKey.length > 0 && clientId.length > 0;

  const [isSearching, setIsSearching] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<BrandfetchSearchResult | null>(null);
  const [previewLogoUrl, setPreviewLogoUrl] = useState<string | null>(null);
  const [brandColor, setBrandColor] = useState<string | null>(null);
  const [brandColors, setBrandColors] = useState<string[]>([]);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetBrand = useCallback(() => {
    setSelectedBrand(null);
    setPreviewLogoUrl(null);
    setBrandColor(null);
    setBrandColors([]);
  }, []);

  const onStoreNameChange = useCallback(
    (text: string) => {
      if (timerRef.current) clearTimeout(timerRef.current);

      if (!isConfigured || text.trim().length < 2) {
        resetBrand();
        setIsSearching(false);
        return;
      }

      // Check local brands first for instant match
      const localBrand = findBrandByName(text.trim());
      if (localBrand) {
        setBrandColor(localBrand.color);
        setBrandColors([localBrand.color]);
      }

      setIsSearching(true);

      timerRef.current = setTimeout(async () => {
        try {
          const results = await searchBrands(text.trim(), clientId);
          const topResult = results[0] ?? null;

          setSelectedBrand(topResult);

          if (topResult) {
            const { colors } = await fetchBrandDetails(topResult.domain, apiKey);

            try {
              const localUri = await downloadLogo(topResult.domain, clientId);
              setPreviewLogoUrl(localUri);
            } catch {
              setPreviewLogoUrl(null);
            }

            const allHexes = [...new Set(colors.map((c) => c.hex))];
            setBrandColors(allHexes);
            const hex = pickBrandColor(colors);
            setBrandColor(hex);
          } else {
            setPreviewLogoUrl(null);
            setBrandColor(localBrand?.color ?? null);
            setBrandColors(localBrand ? [localBrand.color] : []);
          }
        } catch {
          resetBrand();
        } finally {
          setIsSearching(false);
        }
      }, DEBOUNCE_MS);
    },
    [apiKey, clientId, isConfigured, resetBrand],
  );

  return {
    isSearching,
    selectedBrand,
    previewLogoUrl,
    brandColor,
    brandColors,
    isConfigured,
    onStoreNameChange,
    resetBrand,
  };
}
