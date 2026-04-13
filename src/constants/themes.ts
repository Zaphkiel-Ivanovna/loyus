export interface AccentTheme {
  id: string;
  label: string;
  primary: string;
  gradient: [string, string, string];
}

export const ACCENT_THEMES: AccentTheme[] = [
  {
    id: 'blue',
    label: 'Ocean',
    primary: '#2563eb',
    gradient: ['#1e2a78', '#0c1445', '#030712'],
  },
  {
    id: 'purple',
    label: 'Nebula',
    primary: '#7c3aed',
    gradient: ['#1e1145', '#0c0a2a', '#030712'],
  },
  {
    id: 'pink',
    label: 'Sakura',
    primary: '#db2777',
    gradient: ['#3b1130', '#1a0a1e', '#030712'],
  },
  {
    id: 'teal',
    label: 'Mint',
    primary: '#0d9488',
    gradient: ['#0a2e2b', '#061a1d', '#030712'],
  },
  {
    id: 'orange',
    label: 'Ember',
    primary: '#ea580c',
    gradient: ['#3b1a08', '#1a0e06', '#030712'],
  },
  {
    id: 'red',
    label: 'Ruby',
    primary: '#dc2626',
    gradient: ['#3b0e0e', '#1a0808', '#030712'],
  },
];

export const DEFAULT_ACCENT_THEME = 'blue';

export function getAccentTheme(id: string): AccentTheme {
  return ACCENT_THEMES.find((t) => t.id === id) ?? ACCENT_THEMES[0];
}
