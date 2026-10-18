# Otach — Premium Timepieces

[![Next.js](https://img.shields.io/badge/Next.js-16.4.1-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.3.0-087ea4?logo=react)](https://react.dev)
[![Firebase](https://img.shields.io/badge/Firebase-Auth%20%2B%20Firestore-ffca28?logo=firebase)](https://firebase.google.com)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-otach.vercel.app-000000?logo=vercel)](https://otach.vercel.app/)

Otach is a luxury watch storefront built with the **Next.js App Router**. It pairs a curated
catalogue of mechanical, smart and sport timepieces with a complete client-side shopping
flow — catalogue browsing, filtering, product detail pages, a persistent bag, checkout, and
Firebase-backed authentication — plus a small owner-only catalogue manager so signed-in
members can add and manage their own listings.

The interface follows a restrained, editorial luxury-retail direction: a single teal accent,
generous spacing, quiet animations and a focus on the product photography.

This project was built for the **Remontada Next.js Assessment**.

---

## Live Demo and Repository

| Resource | URL |
| --- | --- |
| Live Demo | https://otach.vercel.app/ |
| GitHub Repository | https://github.com/abdullah-alsaba/otach |

---

## Screenshots

**No project screenshots are committed to this repository.**

The files under `public/images/` (`hero_watch.jpg`, `otach-logo.png`, `watch-classic.jpg`,
`watch-gold.jpg`, `watch-rose.jpg`, `watch-sport.jpg`, `watch-teal.jpg`) are the product and
hero photography used by the storefront itself — they are not application screenshots, and
they are deliberately not presented as such here. To add screenshots, capture the running
app locally or on the live deployment, place the files under a `docs/` or `screenshots/`
folder, and link them from this section.

---

## Key Features

### Storefront

- **Responsive landing page** with a headline, supporting copy and a primary call to action.
- **Five content sections** on the home page: hero, featured timepieces, category highlights,
  service guarantees and a closing promotional call to action.
- **Sticky, responsive navigation** with a centred logo, a Shop menu, an account menu, a bag
  preview popover and a mobile drawer.
- **Catalogue of 26 timepieces** rendered as consistent product cards.

### Catalogue and discovery

- **Search** across name, tagline, description and category.
- **Two independent filters**: category (Analog / Smartwatch / Sport) and price range
  (under $200 / $200–$350 / over $350).
- **Sorting**: featured, price ascending, price descending and name A–Z.
- **Pagination** at 9 timepieces per page, with Previous/Next controls and a reset action.

### Product detail

- **App Router dynamic route** at `/items/[id]` with static generation for the catalogue.
- Title, image, full description, price, category, stock status and technical specifications.
- **Related timepieces** from the same category.
- **Back-to-catalogue** navigation and a breadcrumb trail.
- **Graceful handling of unknown IDs**: timepieces created in Firestore by the signed-in owner
  are loaded from the database, and anything still unresolved renders the branded 404 page.

### Accounts and catalogue management

- **Firebase Authentication** with email/password registration and sign-in.
- **Google sign-in** via `GoogleAuthProvider` (implemented in code — see
  [Assessment Coverage](#assessment-coverage) for verification status).
- **Consistent user state** across the app through a single `AuthContext` listener.
- **Protected routes** for `/items/add`, `/items/manage` and `/checkout`; signed-out visitors
  are redirected to `/login` and returned to their intended destination afterwards.
- **Add Product** form that writes a real document to the `items` Firestore collection, with
  field-level validation and ownership bound to the authenticated UID.
- **Manage Products** page listing only the signed-in user's own listings, with view and
  delete actions, plus loading, empty and error states.

### Shopping bag and checkout

- **Cart context** with quantity controls, per-item maximum, subtotal and item count.
- **Per-user persistence** in `localStorage`, namespaced by Firebase UID.
- **Out-of-stock timepieces cannot be added** to the bag.
- **Checkout** with a validated delivery form (name, email, phone, street, city, postcode,
  country) and a generated order reference in the `OT-YYYY-XXXXXX` format.

### Interaction quality

- **Toast notifications** (`react-toastify`) for authentication, bag and form outcomes.
- Hover, focus and disabled states on buttons, cards and form controls.
- Responsive layouts across mobile, tablet and desktop breakpoints.

---

## Technology Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16.4.1 (App Router, Turbopack, Cache Components, Partial Prefetching) |
| Language | JavaScript (ES modules) |
| UI runtime | React 19.3.0 / React DOM 19.3.0 |
| Styling | Tailwind CSS v4 via `@tailwindcss/turbopack`, plus global utility classes in `globals.css` |
| Component library | HeroUI `@heroui/react` 3.2.6 / `@heroui/styles` 3.2.6 |
| Animation | `framer-motion` 14.2.0, plus CSS keyframe utilities |
| Authentication | Firebase Authentication (`firebase` 13.0.0) — email/password and Google |
| Database | Cloud Firestore (`firebase` 13.0.0) |
| Notifications | `react-toastify` 11.1.0 |
| Linting | ESLint 9 with `eslint-config-next` 16.4.1 (`core-web-vitals`) |
| Package manager | npm (`package-lock.json`) |

---

## Getting Started

### Prerequisites

- **Node.js 20.9 or newer** and npm.
- A **Firebase project** with:
  - Authentication enabled for the **Email/Password** provider (and **Google** if you want
    the Google sign-in button to work).
  - A **Cloud Firestore** database created.
  - This repository's `firestore.rules` published (see
    [Firebase configuration](#firebase-configuration)).

### Clone

```bash
git clone https://github.com/abdullah-alsaba/otach.git
cd otach
```

### Install dependencies

This repository ships a `package-lock.json`, so use npm:

```bash
npm install
```

### Environment variables

Create a `.env.local` file in the project root (the repository's `.gitignore` excludes
`.env*`, so it will never be committed). Only variable **names** are listed here — supply
your own values from your Firebase project settings:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

These six values are read in `src/lib/firebase.js` and come from **Firebase Console →
Project settings → General → Your apps → SDK setup and configuration**. Never commit real
keys, OAuth secrets or passwords.

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint over the project |

### Firebase configuration

1. **Create the project** in the [Firebase Console](https://console.firebase.google.com/) and
   register a web app to obtain the six configuration values above.
2. **Enable Authentication**: Build → Authentication → Sign-in method. Turn on
   **Email/Password**, and **Google** if you want Google sign-in.
3. **Create Firestore**: Build → Firestore Database → Create database.
4. **Publish the security rules**: open the contents of `firestore.rules` in this repository
   and paste them into Firestore Database → **Rules**, then press **Publish**. The rules are
   scoped to the `items` collection, grant each signed-in member access only to records whose
   `userId` matches their own UID, and deny every other collection by default.
5. **Authorized domains**: for deployed environments, add your production hostname under
   Authentication → Settings → Authorized domains.

---

## Route Summary

Every route below exists in `src/app` and was verified against the source.

| Route | Rendering | Access | Description |
| --- | --- | --- | --- |
| `/` | Static | Public | Landing page: hero, featured timepieces, categories, service guarantees, closing CTA |
| `/items` | Static | Public | Catalogue with search, category and price filters, sorting and pagination |
| `/items/[id]` | Static + dynamic | Public | Product detail; falls back to Firestore for owner-created records, then to a 404 |
| `/about` | Static | Public | Brand story, values and craftsmanship content |
| `/editorial` | Static | Public | Editorial journal with article entries |
| `/contact` | Static | Public | Contact and client-services information |
| `/login` | Static | Public | Email/password sign-in and Google sign-in |
| `/register` | Static | Public | Email/password account creation and Google sign-up |
| `/cart` | Static | Public | Shopping bag with quantity management and subtotal |
| `/checkout` | Static | Protected | Delivery form and order confirmation |
| `/items/add` | Static | Protected | Create a timepiece; writes to the `items` collection |
| `/items/manage` | Static | Protected | List, view and delete the signed-in member's own timepieces |

---

## Authentication and Security

### Protected routes

The following routes are wrapped in `RequireAuth`, which shows a session-checking state while
Firebase resolves, then redirects signed-out visitors to `/login?next=<original path>`:

- `/items/add`
- `/items/manage`
- `/checkout`

Bag actions that require an identity also redirect to `/login` rather than failing silently.

### Firebase configuration requirements

- The app initialises a single Firebase app in `src/lib/firebase.js` and derives both Auth and
  Firestore from it, so authentication and database access always target the same project.
- All configuration is injected at build time through the six `NEXT_PUBLIC_FIREBASE_*`
  variables. Because `NEXT_PUBLIC_*` values are visible in the browser bundle, only the
  Firebase web configuration belongs there — no server secrets.
- Firestore security rules live in `firestore.rules` and must be published in the Firebase
  Console (or deployed through a configured Firebase CLI workflow). Editing the file alone
  does not change the deployed database.

### Data model and ownership

Timepieces created through the app are stored in the root `items` collection with this shape:

| Field | Type | Notes |
| --- | --- | --- |
| `title` | string | Display name |
| `shortDescription` | string | Card summary |
| `description` | string | Full detail-page copy |
| `price` | number | Must be greater than zero |
| `category` | string | One of `analog`, `smartwatch`, `sport` |
| `imageUrl` | string | Image source, or the bundled fallback |
| `userId` | string | Firebase Auth UID of the owner — the canonical ownership field |
| `createdAt` | timestamp | Server timestamp |

`userId` is written from the authenticated user's UID and can never be rewritten to another
account by the security rules. Listing queries explicitly filter on
`where("userId", "==", uid)`, because Firestore security rules are not query filters — a query
must already be constrained to the rows it is allowed to return.

---

## Assessment Coverage

Statuses record what has been verified against the source and the local toolchain. Anything
that depends on the live Firebase project or a browser session is marked as needing manual
verification rather than being claimed as passing.

| # | Requirement | Where | Status |
| --- | --- | --- | --- |
| A | Navbar with logo and at least four routes | `src/components/Navbar.js` | Pass — Home, Shop, Editorial, Contact |
| A | Login/register controls for signed-out users | `src/components/Navbar.js` | Pass |
| A | Account dropdown with user info, Add Product, Manage Products | `src/components/Navbar.js` | Pass |
| A | Sticky, responsive navigation | `src/components/Navbar.js` | Pass |
| A | Hero with headline, subtitle and primary CTA | `src/app/page.js` | Pass |
| A | At least four content sections beyond navbar/hero/footer | `src/app/page.js` | Pass — featured, categories, guarantees, closing CTA |
| A | Consistent cards, spacing, hover/focus states | `src/components/ProductCard.js`, `globals.css` | Pass |
| A | Footer with navigation and copyright | `src/components/Footer.js` | Pass — note the placeholder links below |
| B | Working search bar | `src/app/items/page.js` | Pass — matches name, tagline, description, category |
| B | Two independent filters | `src/app/items/page.js` | Pass — category and price range |
| B | At least six items from real data or fallback | `src/lib/products.js` | Pass — 26 items |
| B | Responsive grid | `src/app/items/page.js` | Pass |
| B | Cards with image, title, description, View Details | `src/components/ProductCard.js` | Pass |
| C | Correct dynamic App Router route | `src/app/items/[id]/page.js` | Pass |
| C | Title, image, description, price, category, specs | `src/components/ProductDetail.js` | Pass |
| C | Related items | `src/components/ProductDetail.js` | Pass |
| C | Back-to-catalog navigation | `src/components/ProductDetail.js` | Pass |
| C | Valid handling of invalid or missing IDs | `not-found.js`, `OwnedItemDetail.js` | Pass |
| C | No broken images or avoidable runtime warnings | local build | Pass — clean production build |
| D | About page with title and description | `src/app/about/page.js` | Pass |
| D | Consistent design and optional imagery | `src/app/about/page.js` | Pass |
| E | Email/password registration and login | `src/app/login/page.js`, `src/app/register/page.js` | Pass in code — needs manual verification against the live project |
| E | Google login | `src/components/GoogleSignInButton.js` | Needs manual test — provider must be enabled in Firebase Console |
| E | Consistent user state | `src/context/AuthContext.js` | Pass |
| E | Login redirects appropriately | `src/app/login/page.js`, `RequireAuth.js` | Pass |
| E | Signed-out users blocked from protected routes | `src/components/RequireAuth.js` | Pass |
| E | Logout works | `src/components/Navbar.js` | Pass |
| E | Loading and auth error states | `src/app/login/page.js`, `src/app/register/page.js`, `auth-errors.js` | Pass |
| F | Signed-out users redirected to `/login` | `src/app/items/add/page.js` | Pass |
| F | Required-field validation | `src/app/items/add/page.js` | Pass |
| F | Valid submissions create real Firestore documents | `src/lib/items.js` | Needs manual test — depends on the published rules |
| F | Truthful success notification | `src/app/items/add/page.js` | Pass — success is only shown after the write resolves |
| F | Failures surface the actual relevant error | `src/lib/auth-errors.js` | Pass — the real Firebase code is logged in development |
| F | Ownership uses the authenticated UID | `src/app/items/add/page.js`, `src/lib/items.js` | Pass |
| G | Protected route | `src/app/items/manage/page.js` | Pass |
| G | Lists the current user's products | `src/lib/items.js` | Pass in code — needs manual verification |
| G | View and delete actions | `src/app/items/manage/page.js` | Pass in code — delete needs manual verification |
| G | Ownership restrictions enforced | `firestore.rules` | Needs manual test — rules must be published |
| G | Empty and loading states | `src/app/items/manage/page.js` | Pass |
| G | Usable on mobile | `src/app/items/manage/page.js` | Pass |
| H | Responsive layout classes | all routes | Pass |
| H | Accessibility basics (semantics, focus, labels, alt text) | components and routes | Pass, with the caveats noted below |
| H | No placeholder link or button functionality | `src/components/Footer.js` | **Fail** — see known gaps |
| H | Lint and production build | `npm run lint`, `npm run build` | Pass — see [Toolchain checks](#toolchain-checks) |

### Known gaps to resolve before submission

- **Footer anchor links.** `src/components/Footer.js` links to `/about#craftsmanship`,
  `/about#sustainability`, `/about#authenticity` and `/about#care`, but `src/app/about/page.js`
  defines no matching `id` anchors, so those links land at the top of the page.
- **Footer legal links.** Privacy Policy, Terms of Service and Cookie Preferences are `href="#"`
  placeholders.
- **Footer social links.** The Instagram, X, Pinterest and YouTube links point at bare domain
  roots rather than Otach profiles.
- **Not applicable outside this project:** the storefront catalogue is served from
  `src/lib/products.js`, so browsing works even before the Firestore rules are published;
  only product creation and management depend on the database.

### Toolchain checks

Recorded from an actual local run of the repository's own scripts:

| Check | Command | Result |
| --- | --- | --- |
| Lint | `npm run lint` | Pass — exits with no findings |
| Production build | `npm run build` | Pass — compiles successfully and generates all routes |

These results cover the local build only. They are not a statement about the live deployment,
which is served from Vercel and depends on the Firebase Console state described above.

---

## Deployment

The application is deployed on Vercel at https://otach.vercel.app/. To deploy it yourself,
import the repository into Vercel, add the six `NEXT_PUBLIC_FIREBASE_*` environment variables
in the project settings, and add the deployment hostname to Firebase Authentication's
authorized domains.

---

## License

No license file is included in this repository.
