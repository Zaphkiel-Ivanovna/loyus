import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from '@lib/storage';
import { deleteLogo } from '@lib/brandfetch';
import type { LoyaltyCard } from '@/types/card';

// Tamagui token → hex migration map
const TOKEN_TO_HEX: Record<string, string> = {
  teal9: '#0d9488',
  blue9: '#2563eb',
  purple9: '#7c3aed',
  pink9: '#db2777',
  red9: '#dc2626',
  orange9: '#ea580c',
  yellow9: '#ca8a04',
  green9: '#16a34a',
  gray9: '#6b7280',
  '$teal9': '#0d9488',
  '$blue9': '#2563eb',
  '$purple9': '#7c3aed',
  '$pink9': '#db2777',
  '$red9': '#dc2626',
  '$orange9': '#ea580c',
  '$yellow9': '#ca8a04',
  '$green9': '#16a34a',
  '$gray9': '#6b7280',
};

function migrateColor(color: string): string {
  if (color.startsWith('#')) return color;
  return TOKEN_TO_HEX[color] ?? '#0d9488';
}

interface WalletState {
  cards: LoyaltyCard[];
  addCard: (card: Omit<LoyaltyCard, 'id' | 'createdAt' | 'updatedAt' | 'lastUsedAt'>) => void;
  removeCard: (id: string) => void;
  updateCard: (id: string, updates: Partial<Omit<LoyaltyCard, 'id' | 'createdAt'>>) => void;
  markCardUsed: (id: string) => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      cards: [],

      addCard: (card) =>
        set((state) => ({
          cards: [
            ...state.cards,
            {
              ...card,
              id: Date.now().toString(36) + Math.random().toString(36).slice(2),
              createdAt: Date.now(),
              updatedAt: Date.now(),
              lastUsedAt: null,
            },
          ],
        })),

      removeCard: (id) =>
        set((state) => {
          const card = state.cards.find((c) => c.id === id);
          if (card) deleteLogo(card.logoUri);
          return { cards: state.cards.filter((c) => c.id !== id) };
        }),

      updateCard: (id, updates) =>
        set((state) => ({
          cards: state.cards.map((c) =>
            c.id === id ? { ...c, ...updates, updatedAt: Date.now() } : c,
          ),
        })),

      markCardUsed: (id) =>
        set((state) => ({
          cards: state.cards.map((c) =>
            c.id === id ? { ...c, lastUsedAt: Date.now() } : c,
          ),
        })),
    }),
    {
      name: 'wallet-storage',
      storage: createJSONStorage(() => zustandStorage),
      version: 2,
      migrate: (persisted, version) => {
        const state = persisted as { cards: LoyaltyCard[] };
        if (version < 1) {
          state.cards = state.cards.map((card) => ({
            ...card,
            logoUri: card.logoUri ?? null,
            brandDomain: card.brandDomain ?? null,
          }));
        }
        if (version < 2) {
          // Migrate Tamagui token colors to hex
          state.cards = state.cards.map((card) => ({
            ...card,
            color: migrateColor(card.color),
          }));
        }
        return state;
      },
    },
  ),
);
