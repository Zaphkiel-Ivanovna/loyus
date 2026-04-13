import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { CameraView } from 'expo-camera';

import { useCameraPermission } from '@features/scanner/hooks/useCameraPermission';
import { useScanner } from '@features/scanner/hooks/useScanner';
import { CameraPermissionView } from '@features/scanner/components/CameraPermissionView';
import { ScannerOverlay } from '@features/scanner/components/ScannerOverlay';
import { AddCardSheet } from '@features/scanner/components/AddCardSheet';
import { successHaptic } from '@lib/haptics';

export default function ScannerScreen() {
  const { isGranted, canAskAgain, isLoaded, requestPermission } = useCameraPermission();
  const { scannedData, sheetOpen, setSheetOpen, handleBarCodeScanned, closeSheet } = useScanner();

  const handleScanned = (result: Parameters<typeof handleBarCodeScanned>[0]) => {
    handleBarCodeScanned(result);
    successHaptic();
  };

  if (!isLoaded) {
    return <View className="flex-1 bg-white dark:bg-gray-950" />;
  }

  if (!isGranted) {
    return (
      <View className="flex-1 bg-white dark:bg-gray-950">
        <CameraPermissionView canAskAgain={canAskAgain} onRequest={requestPermission} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: [
            'qr',
            'ean13',
            'ean8',
            'code128',
            'code39',
            'upc_a',
            'upc_e',
            'pdf417',
            'aztec',
            'datamatrix',
          ],
        }}
        onBarcodeScanned={handleScanned}
      />

      <ScannerOverlay />

      <AddCardSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        scannedData={scannedData}
        onClose={closeSheet}
      />
    </View>
  );
}
