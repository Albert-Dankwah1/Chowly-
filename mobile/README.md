# 📱 Chowly Mobile App (Customer & Driver)

> Unified mobile application serving both **Customers** and **Drivers**, routed dynamically by user role.

Built with **Expo SDK 57**, **React Native 0.86**, **Expo Router**, and **Uniwind** (Tailwind CSS v4 for native).

---

## 🎭 Two Personas in One App

The app dynamically adapts based on the logged-in user:

### 🛍️ Customer Journey
- **Splash & Onboarding:** Location permission capture and reverse-geocoded default delivery address.
- **Home Discovery:** Current address switcher, promo banner carousel, category ribbon, and restaurant feeds.
- **Menu & Customization:** Restaurant profile, searchable dishes, customizable option groups (radios/checkboxes), and dietary allergen notes.
- **Cart & Checkout:** Single-restaurant conflict prompt, fee breakdown, and in-app card payments.
- **Live Order Tracking:** Status tracker, delivery route visualization, customer 4-digit confirmation PIN, and real-time status updates.
- **Profile & Favourites:** Saved addresses, saved favourite spots, and theme preferences.

### 🛵 Driver Journey
- **Go Online / Offline:** Real-time availability toggle.
- **Available Deliveries Queue:** Open pool of kitchen-ready orders showing guaranteed pay (`Base + Km rate`).
- **Atomic Claiming:** Race-condition protected single-driver job claims.
- **Step-by-Step Fulfilment:** Navigation to restaurant, pickup verification, and doorstep delivery requiring customer PIN verification.
- **Earnings Tracker:** Live daily summary of completed trips and earnings.

---

## 🛠️ Tech Stack

- **Framework:** Expo SDK 57 (React Native 0.86)
- **Routing:** Expo Router 57 (File-based typed routing)
- **Styling & Theming:** Uniwind (Tailwind CSS v4) with light/dark adaptive theme bridge
- **Data Fetching:** TanStack Query v5 & Axios
- **State Management:** Zustand
- **Payments:** `@stripe/stripe-react-native` (with web-safe fallback bridge)
- **Maps:** `react-native-maps` (with web-safe route preview)
- **Animations:** React Native Reanimated & Motion primitives
- **Storage:** `expo-secure-store` (with `localStorage` web fallback)
- **Toasts:** Sonner Native

---

## 🚀 Getting Started

### 1. Installation

```bash
cd mobile
npm install
```

### 2. Environment Variables

Create `.env` based on `.env.example`:

```bash
cp .env.example .env
```

| Variable | Description | Default |
| :--- | :--- | :--- |
| `EXPO_PUBLIC_API_URL` | Base URL of the Chowly API | `http://localhost:8000/api/v1` |
| `ANDROID_MAPS_KEY` | Google Maps API key for Android native | `""` |
| `IOS_MAPS_KEY` | Google Maps API key for iOS native | `""` |

*(Note: On an Android emulator, forward port 8000 using `adb reverse tcp:8000 tcp:8000` so localhost reaches your host machine).*

### 3. Running the App

```bash
npm start            # Starts the Expo Metro bundler
```

From the terminal menu:
- Press **`w`** to open in **Web Browser** (`http://localhost:8081`).
- Press **`a`** to open on an **Android Emulator / Device**.
- Press **`i`** to open on an **iOS Simulator**.

---

## 🔑 Dev Mock Logins (No Backend Required)

You can explore either user flow immediately using the built-in mock mode:

| Role | Email | Password | Landing Page |
| :--- | :--- | :--- | :--- |
| **Customer** | `customer@chowly.app` | `customer123` *(or any)* | `(customer)/home` (Customer dashboard) |
| **Driver**   | `driver@chowly.app`   | `driver123` *(or any)*   | `(driver)/driver-home` (Rider dashboard) |

*The login UI remains clean and authentic without demo badges or buttons.*

---

## 📁 Directory Architecture

```
mobile/src/
├── app/                  # Expo Router file-based screens
│   ├── (auth)/           # Splash, welcome, sign-in, sign-up
│   ├── (customer)/       # Customer tabs (home, search, orders, profile)
│   ├── (driver)/         # Driver screens (driver-home, active delivery)
│   ├── (onboarding)/     # Geolocation & address capture
│   ├── basket.tsx        # Modal basket sheet
│   ├── checkout.tsx      # Checkout & payment flow
│   ├── dish/[id].tsx     # Dish customization modal
│   ├── restaurant/[slug] # Restaurant menu screen
│   └── track/[id].tsx    # Order tracking & confirmation PIN
├── components/           # UI elements (cards, skeletons, sheets, banners, route map)
├── features/             # Business queries & mutations (auth, basket, driver, location, orders)
├── lib/                  # Axios client, dev mock adapter, query client, formatters
└── global.css            # Tailwind CSS v4 root stylesheet
```

---

## 📱 Native Dev Builds (EAS)

Because `@stripe/stripe-react-native` and `react-native-maps` use native iOS and Android code, standalone native builds use EAS:

```bash
# Build Android preview APK
npx eas build --platform android --profile preview

# Build iOS preview
npx eas build --platform ios --profile preview
```
