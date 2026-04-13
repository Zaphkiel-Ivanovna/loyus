export const CARD_COLORS = [
  '#0d9488', // teal
  '#2563eb', // blue
  '#7c3aed', // purple
  '#db2777', // pink
  '#dc2626', // red
  '#ea580c', // orange
  '#ca8a04', // yellow
  '#16a34a', // green
  '#6b7280', // gray
] as const;

export type CardColor = (typeof CARD_COLORS)[number] | (string & {});

export const DEFAULT_CARD_COLOR: CardColor = '#2563eb';
