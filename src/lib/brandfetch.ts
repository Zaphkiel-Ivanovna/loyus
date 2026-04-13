import { File, Directory, Paths } from 'expo-file-system';
import type {
  BrandfetchSearchResult,
  BrandfetchColor,
  BrandfetchBrandResponse,
} from '@/types/brandfetch';

const LOGO_DIR = 'brand-logos';

function getLogosDirectory(): Directory {
  return new Directory(Paths.document, LOGO_DIR);
}

/** Search brands — uses client ID (`?c=`) */
export async function searchBrands(
  query: string,
  clientId: string,
): Promise<BrandfetchSearchResult[]> {
  const res = await fetch(
    `https://api.brandfetch.io/v2/search/${encodeURIComponent(query)}?c=${clientId}`,
  );
  if (!res.ok) return [];
  return res.json();
}

/** Fetch brand colors — uses API key (Bearer) */
export async function fetchBrandDetails(
  domain: string,
  apiKey: string,
): Promise<{ colors: BrandfetchColor[] }> {
  const res = await fetch(`https://api.brandfetch.io/v2/brands/${domain}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!res.ok) return { colors: [] };
  const data: BrandfetchBrandResponse = await res.json();
  return { colors: data.colors ?? [] };
}

export function pickBrandColor(colors: BrandfetchColor[]): string | null {
  const priority: BrandfetchColor['type'][] = ['accent', 'brand', 'dark'];
  for (const type of priority) {
    const match = colors.find((c) => c.type === type);
    if (match) return match.hex;
  }
  return colors[0]?.hex ?? null;
}

/** Download a brand logo via the Logo API CDN and cache locally */
export async function downloadLogo(
  domain: string,
  clientId: string,
): Promise<string> {
  const dir = getLogosDirectory();
  if (!dir.exists) {
    dir.create();
  }

  const logoFile = new File(dir, `${domain}.webp`);
  if (logoFile.exists) {
    return logoFile.uri;
  }

  const cdnUrl = `https://cdn.brandfetch.io/${encodeURIComponent(domain)}?c=${clientId}&format=webp`;
  const downloaded = await File.downloadFileAsync(cdnUrl, logoFile, {
    idempotent: true,
  });
  return downloaded.uri;
}

export function deleteLogo(logoUri: string | null): void {
  if (!logoUri) return;
  try {
    const file = new File(logoUri);
    if (file.exists) {
      file.delete();
    }
  } catch {
    // File already removed or inaccessible — ignore
  }
}
