# 🛵 Advanced MERN Delivery Platform — Chowly

> A Deliveroo-style food delivery platform: a customer app, a rider app, and admin backoffice, on a single Node.js + MongoDB API.

> This code, whether in parts or whole, is licensed for commercial use **only with a license**. It is **free for personal use**.
> 👉 [Click here to obtain license](https://techwithemma.gumroad.com/l/huytmd) and 👉 [here to learn more](https://github.com/TechWithEmmaYT/Advanced-MERN-Delivery-Mobile-and-Admin-Platform/blob/main/TECHWITHEMMA-LICENSE.md)

---

## 📚 Project Documentation

| Document | Purpose |
| :--- | :--- |
| 🔌 [**API Guide (`api/README.md`)**](./api/README.md) | Express 5 TypeScript API, routes, services, Mongoose models, seeds, and Stripe webhooks. |
| 🖥️ [**Admin Guide (`admin/README.md`)**](./admin/README.md) | Vite React 19 backoffice portal, live queue, analytics charts, and catalog CRUD. |
| 📱 [**Mobile Guide (`mobile/README.md`)**](./mobile/README.md) | Expo SDK 57 app with dual Customer and Driver flows, Uniwind theming, and web preview. |
| 🏛️ [**System Architecture (`ARCHITECTURE.md`)**](./ARCHITECTURE.md) | Deep dive into data models, order state machines, zero-float math, and concurrency locks. |

---

## 📦 What's Inside

| Folder | What it is | Stack | Documentation |
| :--- | :--- | :--- | :--- |
| [`api/`](./api) | REST API for all clients | Express 5, TypeScript 7, MongoDB, Passport JWT, Zod | [API README](./api/README.md) |
| [`mobile/`](./mobile) | Customer **and** Driver app | Expo SDK 57, Expo Router, React Native 0.86, Uniwind | [Mobile README](./mobile/README.md) |
| [`admin/`](./admin) | Backoffice dashboard | Vite 8, React 19, Tailwind v4, TanStack Query, Radix UI | [Admin README](./admin/README.md) |

One unified account model, three dynamic roles: `customer`, `driver`, `admin`.

---

## 🖥️ Admin Backoffice Previews

| Executive Dashboard & Analytics | Live Operations & Order Queue |
| :---: | :---: |
| ![Admin Dashboard](./_designs/admin/dashboard-screen.png) | ![Admin Orders](./_designs/admin/orders-screen.png) |

| Restaurant & Menu Catalog | Categories Drag & Drop Reordering |
| :---: | :---: |
| ![Restaurants Screen](./_designs/admin/restaurants-screen.png) | ![Categories Screen](./_designs/admin/categories-screen.png) |

| Driver Fleet Management | Customer Accounts & Spend |
| :---: | :---: |
| ![Riders Screen](./_designs/admin/riders-screen.png) | ![Customers Screen](./_designs/admin/customer-screen.png) |

---

## ⚡ Quick Dev Preview (No Database or API Keys Required!)

You can explore all three applications right now in dev mode without setting up MongoDB, Stripe, or Cloudinary:

| App | Development URL | Mock Credentials | Experience |
| :--- | :--- | :--- | :--- |
| **Admin Backoffice** | `http://localhost:5173` | `admin@chowly.app`<br/>*(any password)* | Live metrics, analytics charts, order queue, restaurant & dish management, categories, fleet riders, and settings. |
| **Mobile Customer** | `http://localhost:8081` *(or native)* | `customer@chowly.app`<br/>*(any password)* | Food discovery, restaurant menus, dish customizer, basket sheet, checkout, and live order tracking. |
| **Mobile Driver** | `http://localhost:8081` *(or native)* | `driver@chowly.app`<br/>*(any password)* | Availability toggle (Online/Offline), open delivery queue, guaranteed payouts, and delivery handover with 4-digit PIN. |

*Note: The login interfaces remain 100% clean and authentic—no demo buttons or test banners are displayed on screen.*

---

## 🗝️ Key Features

### 📱 Customer App
* 🔐 Authentication (Email + Password with JWT)
* 📍 Location Permission & GPS Reverse Geocoding Address Capture
* 🏠 Home Discovery & Category Filters
* 🖼️ Promo Banner Carousel
* 🔎 Search Restaurants & Dishes
* 🍕 Dish Customizer with Option Groups (radios/checkboxes) & Notes
* 🧺 Modal Basket with Single-Restaurant Conflict Prompt
* 💳 Card Checkout (Stripe PaymentSheet on mobile, web-safe preview)
* 📦 Orders History & Live Order Tracking
* 🔢 Doorstep 4-Digit Delivery Confirmation PIN
* ♻️ One-Tap Reorder
* ⭐ Saved Addresses & Saved Favourites
* 🌙 Light / Dark Theme

### 🛵 Rider App
* 🟢 Go Online / Offline availability toggle
* 📥 Open Ready Delivery Queue
* 💷 Guaranteed Pay Per Delivery (`Base Pay + Km Distance`)
* ✋ Atomic Single-Driver Order Claiming
* 📦 Step-by-Step Pickup & Handover
* 🔐 4-Digit Delivery PIN Verification
* 💰 Daily Earnings Summary & Trip Counter

### 🖥️ Admin Dashboard
* 🔐 Admin Authentication & Route Protection
* 📈 Advanced Analytics (MongoDB Aggregation Pipelines)
* 📊 Revenue Charts & Orders by Status Distribution
* 🔴 Live Operations Event Stream
* 🧾 Orders Management & Status Updates (`confirmed` $\rightarrow$ `preparing` $\rightarrow$ `ready`)
* 💵 Order Payout & Commission Splits
* 🏪 Restaurants CRUD & Hours Configuration
* 🍔 Menu Dishes with Option Groups
* 🗂️ Categories with Drag & Drop Ordering (`@dnd-kit`)
* 👥 Customer Accounts & Status Controls
* 🚴 Rider Fleet Approval & Suspension
* 🖼️ Promotional Banners Scheduling
* ⚙️ Platform Commission, Service Fee, and Rider Pay Settings
* 🧑‍💼 Image CDN Uploads (Cloudinary)

### 🔌 API
* 🧱 Layered Architecture (`Route` $\rightarrow$ `Controller` $\rightarrow$ `Service` $\rightarrow$ `Model`)
* ✅ Strict Zod Request Validation
* 🍪 Dual JWT Transport: HTTP-only Cookie for Admin & Bearer Token for Mobile
* 🛡️ Role-Based Access Control (`customer`, `driver`, `admin`)
* 💵 Server-Side Integer Minor Unit Financial Math (Zero floating-point errors)
* 🪝 Stripe Webhooks with Replay Protection & Idempotency
* 🖼️ Cloudinary Uploads with Server-Signed Signatures
* 🌱 Database Seed Scripts for Fast Bootstrapping

---

## 🚀 Running the Full Stack (With MongoDB & Real Services)

### 1. API
```bash
cd api
npm install
cp .env.example .env      # Configure MONGODB_URI and JWT_SECRET
npm run dev               # Starts on http://localhost:8000
```
Seed catalog and test accounts:
```bash
npm run seed:categories
npm run seed:restaurants
npm run seed:banners
npm run seed:admin
npm run seed:driver
```

### 2. Admin Dashboard
```bash
cd admin
npm install
npm run dev               # Starts Vite on http://localhost:5173
```

### 3. Mobile App
```bash
cd mobile
npm install
cp .env.example .env
npm start                 # Starts Expo Metro bundler
```
- Press **`w`** for Web Browser (`http://localhost:8081`).
- Press **`a`** for Android Emulator / Device.
- Press **`i`** for iOS Simulator.

---

## 📜 License Information

A paid license is required for commercial use. To obtain a commercial license, please visit 👉 [Here](https://techwithemma.gumroad.com/l/huytmd)

For more details about the license, please refer to [TECHWITHEMMA-LICENSE.md](./TECHWITHEMMA-LICENSE.md).

---

## ❤️ Support the Channel

* ☕ [Buy Me a Coffee](https://buymeacoffee.com/techwithemmaofficial)
* 🌟 Star this repo
* 🎥 [Subscribe on YouTube](https://tinyurl.com/subcribe-to-techwithEmma)
