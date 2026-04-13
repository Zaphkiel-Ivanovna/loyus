export interface BrandfetchSearchResult {
  icon: string | null;
  name: string | null;
  domain: string;
  claimed: boolean;
  brandId: string;
}

export interface BrandfetchColor {
  hex: string;
  type: 'accent' | 'dark' | 'light' | 'brand';
  brightness: number;
}

export interface BrandfetchLogoFormat {
  src: string;
  format: string;
  size?: number;
}

export interface BrandfetchLogo {
  type: string;
  theme: string;
  formats: BrandfetchLogoFormat[];
}

export interface BrandfetchBrandResponse {
  name: string;
  domain: string;
  colors: BrandfetchColor[];
  logos: BrandfetchLogo[];
}
