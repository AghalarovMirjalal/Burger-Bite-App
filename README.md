# Burger Bite

Mobile app for a burger restaurant, built with Expo (SDK 58), React Native and Expo Router.

## Features

- Launch screen, sign up and log in (users are stored in AsyncStorage, passwords are hashed)
- Forms built with react-hook-form
- Main screen with tabs: Locations, Menu, Deals
- Shared `BurgerCatalog` component on FlatList
- Product details, cart with promo codes and checkout
- Profile with photo, order history and notifications
- Light and dark theme via the `useTheme` hook

## Run

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go, or press `a` for the Android emulator and `w` for the web version.

## Scripts

```bash
npx tsc --noEmit   # typecheck
npm run lint       # lint
```
