# 🔌 Chowly API

> TypeScript Express 5 REST API powering the Chowly food delivery platform.

The API serves both client apps ([`mobile/`](../mobile) and [`admin/`](../admin)) through a unified `/api/v1` namespace with role-based access control, atomic order claiming, server-calculated pricing, and Stripe payment processing.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js 20+
- **Framework:** Express 5.2 (with TypeScript 7 & `tsx` dev runner)
- **Database:** MongoDB & Mongoose 9
- **Authentication:** Passport JWT (Dual transport: HTTP-only cookies for admin, Bearer tokens for mobile)
- **Validation:** Zod request schema validation
- **Payments:** Stripe (PaymentIntents, PaymentSheet & idempotent webhook handler)
- **Media CDN:** Cloudinary signed uploads
- **Logging:** Winston logger with structured formatting
- **Security:** Helmet, CORS, and Express Rate Limiter

---

## 📁 Directory Architecture

```
api/src/
├── config/             # DB connection, environment schema, Passport JWT strategy
├── controllers/        # Thin route controllers unwrapping HTTP requests
├── middlewares/        # Auth guards (requireAuth, requireRole), rate limiters, error handler
├── models/             # Mongoose schemas & TypeScript Document types
├── routes/v1/          # Modular API v1 routers
├── scripts/            # Database seed scripts (admin, drivers, categories, restaurants, banners)
├── services/           # Domain business logic, money calculations, atomic queries
├── types/              # Domain and API response interfaces
├── utils/              # AppError hierarchy, logger, cookie helpers, bcrypt
└── validators/         # Zod schemas for request params, bodies, and queries
```

---

## 🚀 Getting Started

### 1. Installation

```bash
cd api
npm install
```

### 2. Environment Variables

Create `.env` based on `.env.example`:

```bash
cp .env.example .env
```

| Variable | Description | Required | Example |
| :--- | :--- | :--- | :--- |
| `PORT` | API listen port | No (Default: `8000`) | `8000` |
| `NODE_ENV` | Environment mode | No (Default: `development`) | `development` |
| `MONGODB_URI` | MongoDB connection string | **Yes** | `mongodb://localhost:27017/chowly` |
| `JWT_SECRET` | Secret key for signing JWT tokens | **Yes** | `your_secret_key_here` |
| `JWT_EXPIRES_IN` | Token validity duration | No (Default: `7d`) | `7d` |
| `CORS_ORIGIN` | Allowed client origins | No | `http://localhost:5173` |
| `STRIPE_SECRET_KEY` | Stripe secret API key | For checkout | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | For webhooks | `whsec_...` |
| `CLOUDINARY_CLOUD_NAME`| Cloudinary cloud name | For uploads | `mycloud` |
| `CLOUDINARY_API_KEY`   | Cloudinary API key | For uploads | `123456789` |
| `CLOUDINARY_API_SECRET`| Cloudinary API secret | For uploads | `secret` |

### 3. Start Development Server

```bash
npm run dev
```
The API boots with hot reload on [`http://localhost:8000`](http://localhost:8000). Health check endpoint: `GET /health`.

---

## 🌱 Database Seeding

Populate the database with demo catalog data and accounts:

```bash
npm run seed:categories     # Categories & icons
npm run seed:restaurants    # Restaurants, cuisines & menu dishes
npm run seed:banners        # Promotional home banners
npm run seed:admin          # Default admin (admin@chowly.app / chowly12345)
npm run seed:driver         # Default rider (driver@chowly.app / chowly12345)
```

---

## 🔐 Authentication & Roles

The API enforces role-based authorization:

| Role | Access Scope |
| :--- | :--- |
| `customer` | Browse catalog, manage own addresses & basket, checkout, track own orders. |
| `driver` | Toggle availability, view unassigned ready delivery queue, claim & advance delivery statuses, view own payouts. |
| `admin` | Full platform operations, metrics & analytics, order management, restaurant & menu CRUD, driver approvals, commission rates. |

- **Dual Transport:**
  - **Admin:** Authenticates via HTTP-only cookie (`auth_token`), safe from client-side XSS.
  - **Mobile:** Authenticates via header `Authorization: Bearer <token>`, stored in hardware keystore.

---

## 💳 Stripe Webhook Testing

To test the payment lifecycle locally with the Stripe CLI:

```bash
stripe listen --forward-to localhost:8000/api/v1/webhooks/stripe
```
Copy the webhook signing secret output by Stripe CLI into your `STRIPE_WEBHOOK_SECRET` in `api/.env`.

---

## 📦 Production Build

```bash
npm run build     # Typechecks with tsc and bundles via tsup
npm start         # Runs dist/index.js
```
In production (`NODE_ENV=production`), the API automatically serves the compiled admin dashboard from `../admin/dist` on the root origin.
