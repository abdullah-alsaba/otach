# Otach — Premium Timepieces

<p>
  <a href="https://otach.vercel.app/"><img src="https://img.shields.io/badge/-Live%20Demo-14b8a6?style=flat-square&logo=vercel&logoColor=white" alt="Live Demo" /></a><a href="https://nextjs.org"><img src="https://img.shields.io/badge/-Next.js%2016-000000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js" /></a><a href="https://react.dev"><img src="https://img.shields.io/badge/-React%2019-20232a?style=flat-square&logo=react&logoColor=61dafb" alt="React" /></a><a href="https://firebase.google.com"><img src="https://img.shields.io/badge/-Firebase-ffca28?style=flat-square&logo=firebase&logoColor=black" alt="Firebase" /></a><a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/-Tailwind%20CSS%204-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
</p>

Otach is a luxury watch storefront built with the Next.js App Router. It pairs a curated catalogue of mechanical, smart and sport timepieces with a complete shopping flow: catalogue browsing, filtering, product detail pages, a persistent bag, checkout, and Firebase-backed authentication. Signed-in members can also add and manage their own listings through a small owner-only catalogue manager.

The interface follows a restrained, editorial luxury-retail direction: a single teal accent, generous spacing, quiet animations, and a focus on product photography.

**[Live Demo](https://otach.vercel.app/)** · **[GitHub Repository](https://github.com/abdullah-alsaba/otach)**

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Firebase Setup](#firebase-setup)
- [Routes](#routes)
- [Authentication and Security](#authentication-and-security)
- [Data Model](#data-model)
- [Deployment](#deployment)
- [License](#license)

---

## Features

### Storefront

- Responsive landing page with hero, featured timepieces, category highlights, service guarantees, and a closing call to action
- Sticky, responsive navigation with a Shop menu, account menu, bag preview popover, and mobile drawer
- Catalogue of 26 timepieces rendered as consistent product cards

### Catalogue and Discovery

- **Search** across name, tagline, description, and category
- **Filters:** category (Analog / Smartwatch / Sport) and price range (under $200 / $200–$350 / over $350)
- **Sorting:** featured, price ascending, price descending, and name A–Z
- **Pagination** at 9 timepieces per page

### Product Detail

- Dynamic route at `/items/[id]` with static generation for the catalogue
- Image, description, price, category, stock status, and technical specifications
- Related timepieces from the same category, breadcrumbs, and back-to-catalogue navigation
- Owner-created Firestore items are loaded on demand; unresolved IDs render a branded 404 page

### Accounts and Catalogue Management

- Firebase Authentication with email/password and Google sign-in
- Single `AuthContext` listener for consistent user state across the app
- Protected routes with redirect to `/login` and return to the intended destination
- **Add Product** form with field-level validation, writing to Firestore with ownership bound to the authenticated UID
- **Manage Products** page listing only the member's own listings, with view and delete actions and loading, empty, and error states

### Bag and Checkout

- Cart context with quantity controls, per-item maximum, subtotal, and item count
- Per-user persistence in `localStorage`, namespaced by Firebase UID
- Out-of-stock timepieces cannot be added
- Validated delivery form and generated order reference in the `OT-YYYY-XXXXXX` format

### Interaction Quality

- Toast notifications for authentication, bag, and form outcomes
- Hover, focus, and disabled states across interactive elements
- Responsive layouts for mobile, tablet, and desktop

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16.4.1 (App Router, Turbopack, Cache Components, Partial Prefetching) |
| Language | JavaScript (ES modules) |
| UI | React 19.3.0 |
| Styling | Tailwind CSS v4, HeroUI (`@heroui/react` 3.2.6) |
| Animation | framer-motion 14.2.0, CSS keyframes |
| Authentication | Firebase Authentication (`firebase` 13.0.0) |
| Database | Cloud Firestore |
| Notifications | react-toastify 11.1.0 |
| Linting | ESLint 9 with `eslint-config-next` (`core-web-vitals`) |

---

## Getting Started

### Prerequisites

- Node.js 20.9 or newer, and npm
- A Firebase project with Email/Password authentication (and Google, optionally) and a Cloud Firestore database

### Installation

```bash
git clone https://github.com/abdullah-alsaba/otach.git
cd otach
npm install
```

### Environment Variables

Create a `.env.local` file in the project root. It is excluded from version control by `.gitignore`.

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

Find these values in **Firebase Console → Project settings → General → Your apps → SDK setup and configuration**. They are read in `src/lib/firebase.js`.

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

---

## Firebase Setup

1. **Create a project** in the [Firebase Console](https://console.firebase.google.com/) and register a web app to obtain the configuration values above.
2. **Enable Authentication:** Build → Authentication → Sign-in method. Enable **Email/Password**, and **Google** if you want Google sign-in.
3. **Create Firestore:** Build → Firestore Database → Create database.
4. **Publish security rules:** paste the contents of `firestore.rules` into Firestore Database → **Rules** and publish. The rules are scoped to the `items` collection, grant each member access only to records whose `userId` matches their UID, and deny all other collections by default.
5. **Authorized domains:** for deployed environments, add your production hostname under Authentication → Settings → Authorized domains.

> The storefront catalogue is served from `src/lib/products.js`, so browsing works without Firestore. Only product creation and management depend on the database.

---

## Routes

| Route | Access | Description |
| --- | --- | --- |
| `/` | Public | Landing page |
| `/items` | Public | Catalogue with search, filters, sorting, and pagination |
| `/items/[id]` | Public | Product detail; falls back to Firestore for owner-created records, then 404 |
| `/about` | Public | Brand story, values, and craftsmanship |
| `/editorial` | Public | Editorial journal |
| `/contact` | Public | Client-services information |
| `/login` | Public | Email/password and Google sign-in |
| `/register` | Public | Account creation |
| `/cart` | Public | Shopping bag with quantity management and subtotal |
| `/checkout` | Protected | Delivery form and order confirmation |
| `/items/add` | Protected | Create a timepiece |
| `/items/manage` | Protected | List, view, and delete your own timepieces |

---

## Authentication and Security

**Protected routes.** `/items/add`, `/items/manage`, and `/checkout` are wrapped in `RequireAuth`, which shows a session-checking state while Firebase resolves and then redirects signed-out visitors to `/login?next=<original path>`.

**Firebase configuration.**

- A single Firebase app is initialised in `src/lib/firebase.js`, and both Auth and Firestore derive from it.
- Configuration is injected at build time via `NEXT_PUBLIC_FIREBASE_*` variables. These are visible in the browser bundle, so only Firebase web configuration belongs there; never include server secrets.
- Firestore rules live in `firestore.rules` and must be published in the Firebase Console (or deployed via the Firebase CLI). Editing the file alone does not change the deployed database.

**Ownership.** `userId` is written from the authenticated user's UID and cannot be reassigned by the security rules. Listing queries filter explicitly with `where("userId", "==", uid)`, since Firestore rules are not query filters.

---

## Data Model

Timepieces created through the app are stored in the root `items` collection:

| Field | Type | Notes |
| --- | --- | --- |
| `title` | string | Display name |
| `shortDescription` | string | Card summary |
| `description` | string | Full detail-page copy |
| `price` | number | Must be greater than zero |
| `category` | string | One of `analog`, `smartwatch`, `sport` |
| `imageUrl` | string | Image source, or the bundled fallback |
| `userId` | string | Firebase Auth UID of the owner |
| `createdAt` | timestamp | Server timestamp |

---

## Deployment

The application is deployed on Vercel at [otach.vercel.app](https://otach.vercel.app/). To deploy your own copy:

1. Import the repository into Vercel.
2. Add the six `NEXT_PUBLIC_FIREBASE_*` environment variables in the project settings.
3. Add the deployment hostname to Firebase Authentication's authorized domains.

---

## License

No license file is included in this repository.
