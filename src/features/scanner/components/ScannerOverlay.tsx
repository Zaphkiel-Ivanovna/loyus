import { View, Text, StyleSheet } from 'react-native';
import { useAccentColor } from '@hooks/useAccentColor';

const SCAN_SIZE = 280;
const CORNER_LENGTH = 40;
const CORNER_WIDTH = 4;
const CORNER_RADIUS = 12;

function Corner({ style }: { style: object }) {
  return <View style={[{ position: 'absolute', width: CORNER_LENGTH, height: CORNER_LENGTH }, style]} />;
}

export function ScannerOverlay() {
  const { primary } = useAccentColor();

  return (
    <View style={StyleSheet.absoluteFillObject} className="items-center justify-center">
      <View
        style={StyleSheet.absoluteFillObject}
        className="bg-black/50"
        pointerEvents="none"
      />

      <View className="items-center gap-4" pointerEvents="none">
        <View style={{ width: SCAN_SIZE, height: SCAN_SIZE }}>
          <Corner
            style={{
              top: 0,
              left: 0,
              borderTopWidth: CORNER_WIDTH,
              borderLeftWidth: CORNER_WIDTH,
              borderTopLeftRadius: CORNER_RADIUS,
              borderColor: primary,
            }}
          />
          <Corner
            style={{
              top: 0,
              right: 0,
              borderTopWidth: CORNER_WIDTH,
              borderRightWidth: CORNER_WIDTH,
              borderTopRightRadius: CORNER_RADIUS,
              borderColor: primary,
            }}
          />
          <Corner
            style={{
              bottom: 0,
              left: 0,
              borderBottomWidth: CORNER_WIDTH,
              borderLeftWidth: CORNER_WIDTH,
              borderBottomLeftRadius: CORNER_RADIUS,
              borderColor: primary,
            }}
          />
          <Corner
            style={{
              bottom: 0,
              right: 0,
              borderBottomWidth: CORNER_WIDTH,
              borderRightWidth: CORNER_WIDTH,
              borderBottomRightRadius: CORNER_RADIUS,
              borderColor: primary,
            }}
          />
        </View>

        <Text className="text-base font-semibold text-white text-center">
          Point at a barcode or QR code
        </Text>
      </View>
    </View>
  );
}
