import { View, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Barcode from 'react-native-barcode-svg';
import type { CodeType } from '@/types/card';

interface BarcodeDisplayProps {
  value: string;
  type: CodeType;
  size?: number;
}

const QR_TYPES: ReadonlySet<CodeType> = new Set(['qr', 'aztec', 'datamatrix']);

const LINEAR_FORMAT_MAP: Record<string, string> = {
  ean13: 'EAN13',
  ean8: 'EAN8',
  code128: 'CODE128',
  code39: 'CODE39',
  upc: 'UPC',
  pdf417: 'CODE128',
};

export function BarcodeDisplay({ value, type, size = 250 }: BarcodeDisplayProps) {
  if (QR_TYPES.has(type)) {
    return (
      <View className="items-center">
        <QRCode value={value} size={size} backgroundColor="transparent" />
      </View>
    );
  }

  const format = LINEAR_FORMAT_MAP[type];

  if (!format) {
    return (
      <View className="items-center p-4">
        <Text className="text-red-500">Unsupported barcode type: {type}</Text>
      </View>
    );
  }

  return (
    <View className="items-center">
      <Barcode
        value={value}
        format={format}
        singleBarWidth={2}
        maxWidth={size}
        height={Math.round(size * 0.4)}
        lineColor="#000"
        backgroundColor="transparent"
      />
    </View>
  );
}
