<p align="center">
  <img src="assets/icon.png" alt="Loyus" width="120" height="120" style="border-radius: 24px;" />
</p>

<h1 align="center">Loyus</h1>

<p align="center">
  <strong>Your loyalty cards, always in your pocket.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Expo_SDK-54-000020?logo=expo" alt="Expo SDK 54" />
  <img src="https://img.shields.io/badge/React_Native-0.81-61DAFB?logo=react" alt="React Native" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Platform-iOS%20%7C%20Android-lightgrey?logo=apple" alt="Platform" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License" />
</p>

## About

Loyus is a mobile loyalty card wallet that lets you scan, store, and display all your loyalty cards from a single app. No more digging through your physical wallet — just open Loyus, tap your card, and show the barcode at checkout.

## Features

- **Barcode Scanner** — Scan any loyalty card barcode or QR code with your camera
- **Brand Detection** — Automatic brand recognition with logo and colors via Brandfetch API
- **Full Barcode Support** — QR, EAN-13, EAN-8, Code128, Code39, UPC-A, UPC-E, PDF417, Aztec, DataMatrix
- **Auto Brightness** — Screen brightness maximized when displaying a card
- **Dark Mode** — Full light/dark theme with system preference support
- **Accent Themes** — 6 color schemes (Ocean, Nebula, Sakura, Mint, Ember, Ruby)
- **Grid & List Views** — Switch between compact grid and detailed list layout
- **Haptic Feedback** — Tactile responses on interactions (configurable)
- **Offline First** — All data stored locally with MMKV, no account required

## Tech Stack

| Layer     | Technology                                                                                                                                          |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework | [Expo SDK 54](https://expo.dev) + [React Native](https://reactnative.dev) 0.81                                                                      |
| Language  | [TypeScript](https://typescriptlang.org) 5.9                                                                                                        |
| Routing   | [Expo Router](https://docs.expo.dev/router/introduction/) v6 (file-based)                                                                           |
| Styling   | [NativeWind](https://nativewind.dev) v4 (Tailwind CSS for RN)                                                                                       |
| State     | [Zustand](https://zustand.docs.pmnd.rs/) v5 + [MMKV](https://github.com/mrousavy/react-native-mmkv) v4                                              |
| Forms     | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) v4                                                                          |
| Camera    | [expo-camera](https://docs.expo.dev/versions/latest/sdk/camera/)                                                                                    |
| Icons     | [Lucide](https://lucide.dev)                                                                                                                        |
| Lists     | [FlashList](https://shopify.github.io/flash-list/) v2                                                                                               |
| UI        | [@gorhom/bottom-sheet](https://gorhom.dev/react-native-bottom-sheet/), [expo-glass-effect](https://docs.expo.dev/versions/latest/sdk/glass-effect/) |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [Yarn](https://yarnpkg.com/) (v1 classic)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npx expo`)
- iOS Simulator (Xcode) or Android Emulator (Android Studio)

### Installation

```bash
# Clone the repository
git clone https://github.com/Zaphkiel-Ivanovna/loyus.git
cd loyus

# Install dependencies
yarn install
```

### Environment Variables

Create a `.env.local` file at the project root:

```env
EXPO_PUBLIC_BRANDFETCH_API_KEY=your_api_key
EXPO_PUBLIC_BRANDFETCH_CLIENT_ID=your_client_id
```

> Get your API keys at [brandfetch.com/developers](https://brandfetch.com/developers). The app works without them — brand detection will fall back to the local database of 30+ brands.

### Run the App

```bash
# Start Expo dev server
yarn start

# Run on iOS
yarn ios

# Run on Android
yarn android
```

## Project Structure

```
loyus/
├── app/                          # Expo Router screens
│   ├── _layout.tsx               # Root layout
│   ├── (tabs)/                   # Tab navigation
│   │   ├── index.tsx             # Wallet screen
│   │   ├── scanner.tsx           # Barcode scanner
│   │   └── settings.tsx          # Settings screen
│   └── card/
│       └── [id].tsx              # Card detail (dynamic route)
│
├── src/
│   ├── components/ui/            # Reusable UI components
│   │   ├── Screen.tsx            # Safe area screen wrapper
│   │   ├── GlassButton.tsx       # Glass morphism button
│   │   ├── ColorPicker.tsx       # Color selection grid
│   │   ├── SheetModal.tsx        # Bottom sheet wrapper
│   │   └── ...
│   │
│   ├── features/                 # Feature modules
│   │   ├── scanner/              # Camera & barcode scanning
│   │   │   ├── components/       # AddCardSheet, ScannerOverlay
│   │   │   ├── hooks/            # useScanner, useCameraPermission
│   │   │   └── types/            # Barcode type mappings
│   │   ├── wallet/               # Card display & management
│   │   │   └── components/       # LoyaltyCardItem, BarcodeDisplay, EditCardSheet
│   │   └── settings/             # Theme & accent pickers
│   │       └── components/       # ThemePicker, AccentPicker
│   │
│   ├── stores/                   # Zustand stores (MMKV-persisted)
│   │   ├── wallet.store.ts       # Cards CRUD & state
│   │   └── settings.store.ts     # App preferences
│   │
│   ├── hooks/                    # Shared hooks
│   ├── lib/                      # Utilities (storage, colors, haptics, brandfetch)
│   ├── constants/                # Colors, themes, brand database
│   └── types/                    # TypeScript definitions
│
├── app.json                      # Expo configuration
├── tailwind.config.js            # NativeWind / Tailwind config
└── tsconfig.json                 # TypeScript with path aliases
```

## Architecture

### Data Flow

```
Scan barcode ──► AddCardSheet form ──► Brandfetch API (optional)
                                            │
                                            ▼
                                    wallet.store.ts
                                     (Zustand + MMKV)
                                            │
                                            ▼
                                    Wallet screen re-renders
                                     (FlashList grid/list)
```

### State Management

All app state is managed through two Zustand stores, both persisted to MMKV for instant cold starts:

- **`wallet.store`** — Loyalty cards array with CRUD operations
- **`settings.store`** — Theme, accent color, display preferences, haptics

### Path Aliases

| Alias           | Path               |
| --------------- | ------------------ |
| `@/*`           | `src/*`            |
| `@components/*` | `src/components/*` |
| `@features/*`   | `src/features/*`   |
| `@hooks/*`      | `src/hooks/*`      |
| `@stores/*`     | `src/stores/*`     |
| `@lib/*`        | `src/lib/*`        |

## Scripts

| Command        | Description                           |
| -------------- | ------------------------------------- |
| `yarn start`   | Start Expo dev server (cache cleared) |
| `yarn ios`     | Build and run on iOS                  |
| `yarn android` | Build and run on Android              |
| `yarn tsc`     | Run TypeScript type checking          |
| `yarn lint`    | Run Expo linter                       |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with <a href="https://expo.dev">Expo</a> and <a href="https://reactnative.dev">React Native</a>
</p>
