import { useCallback, useRef, useState } from 'react';
import type { BarcodeScanningResult } from 'expo-camera';
import { mapBarcodeType } from '../types/scanner.types';
import type { ScannedData } from '../types/scanner.types';

const SCAN_COOLDOWN_MS = 2000;

export function useScanner() {
  const [scannedData, setScannedData] = useState<ScannedData | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const lastScanRef = useRef(0);

  const handleBarCodeScanned = useCallback((result: BarcodeScanningResult) => {
    const now = Date.now();
    if (now - lastScanRef.current < SCAN_COOLDOWN_MS) return;
    lastScanRef.current = now;

    setScannedData({
      value: result.data,
      type: mapBarcodeType(result.type),
    });
    setSheetOpen(true);
  }, []);

  const closeSheet = useCallback(() => {
    setSheetOpen(false);
    setScannedData(null);
  }, []);

  return {
    scannedData,
    sheetOpen,
    setSheetOpen,
    handleBarCodeScanned,
    closeSheet,
  };
}
