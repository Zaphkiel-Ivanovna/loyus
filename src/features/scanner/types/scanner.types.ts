import type { CodeType } from '@/types/card';

export interface ScannedData {
  value: string;
  type: CodeType;
}

const BARCODE_TYPE_MAP: Record<string, CodeType> = {
  qr: 'qr',
  'org.iso.QRCode': 'qr',
  ean13: 'ean13',
  'org.gs1.EAN-13': 'ean13',
  ean8: 'ean8',
  'org.gs1.EAN-8': 'ean8',
  code128: 'code128',
  'org.iso.Code128': 'code128',
  code39: 'code39',
  'org.iso.Code39': 'code39',
  upc_a: 'upc',
  upc_e: 'upc',
  'org.gs1.UPC-A': 'upc',
  'org.gs1.UPC-E': 'upc',
  pdf417: 'pdf417',
  'org.iso.PDF417': 'pdf417',
  aztec: 'aztec',
  'org.iso.Aztec': 'aztec',
  datamatrix: 'datamatrix',
  'org.iso.DataMatrix': 'datamatrix',
};

export function mapBarcodeType(platformType: string): CodeType {
  return BARCODE_TYPE_MAP[platformType] ?? 'code128';
}
