export type CodeType = 'qr' | 'ean13' | 'ean8' | 'code128' | 'code39' | 'upc' | 'pdf417' | 'aztec' | 'datamatrix';

export interface LoyaltyCard {
  id: string;
  storeName: string;
  codeValue: string;
  codeType: CodeType;
  color: string;
  logoUri: string | null;
  brandDomain: string | null;
  notes: string;
  createdAt: number;
  updatedAt: number;
  lastUsedAt: number | null;
}
