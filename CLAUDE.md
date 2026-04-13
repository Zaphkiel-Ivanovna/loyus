# Loyus – Development Guidelines

## Stack
- Expo SDK 54, React Native 0.81.5, React 19
- NativeWind v4 (Tailwind CSS for RN) — `className` prop on all RN primitives
- Expo Router v6 (file-based routing)
- Zustand v5 + MMKV v4 (persist)
- react-hook-form + zod (forms/validation)
- @gorhom/bottom-sheet (sheets)
- expo-camera (barcode scanning)
- lucide-react-native (icons)

## Conventions
- All colors are hex strings (#RRGGBB) — no Tamagui tokens
- Use NativeWind className for styling (View, Text, Pressable from react-native)
- Dark mode via `dark:` prefix classes
- Haptics: use `@lib/haptics` utilities, they check settings automatically
- Path aliases: `@/*` → `src/*`, `@components/*`, `@features/*`, `@hooks/*`, `@stores/*`, `@lib/*`

## Commands
- `yarn start` — Start dev server (clears cache)
- `yarn ios` — Run on iOS
- `yarn android` — Run on Android
- `yarn tsc` — Type check
