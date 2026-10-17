import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import HeroCarousel from "@/components/HeroCarousel";
import { products } from "@/lib/products";

export const metadata = {
  title: "Otach — Premium Timepieces & Fine Horology",
  description:
    "Discover timeless elegance and precision craftsmanship at Otach — your destination for curated mechanical and connected timepieces.",
};

const categories = [
  {
    slug: "automatic",
    name: "Mechanical & Automatic",
    count: "Heritage Series",
    description: "Hand-finished calibers, exhibition casebacks, and timeless analog dials.",
    image: "/images/watch-classic.jpg",
    href: "/items?category=analog",
  },
  {
    slug: "smartwatch",
    name: "Modern Smartwatches",
    count: "Connected Series",
    description: "Vibrant AMOLED displays, multi-day battery life, and wellness telemetry.",
    image: "/images/watch-teal.jpg",
    href: "/items?category=smartwatch",
  },
  {
    slug: "sport",
    name: "Chronograph & Sport",
    count: "Endurance Line",
    description: "Rugged stainless steel casing, 200m water resistance, and tachymeter scales.",
    image: "/images/watch-sport.jpg",
    href: "/items?category=sport",
  },
];

const shoppingBenefits = [
  {
    id: "benefit-shipping",
    title: "Complimentary Insured Shipping",
    description:
      "All orders are dispatched via express courier in secure, tamper-evident presentation packaging.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    id: "benefit-warranty",
    title: "Two-Year Comprehensive Warranty",
    description:
      "Full coverage on movement calibers, precision regulation, and technical horological support.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    id: "benefit-returns",
    title: "30-Day Evaluation & Returns",
    description:
      "Try your timepiece with peace of mind. Complimentary return shipping with full authenticity guarantee.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
      </svg>
    ),
  },
];

/* ── Section 2: Hero ─────────────────────────────────────────── */
function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex items-center overflow-x-hidden overflow-y-visible bg-gradient-to-b from-[var(--surface-white)] via-[var(--otach-teal-pale)] to-[var(--surface-gray-50)] pt-8 pb-16 sm:pb-20 lg:pb-24"
      aria-label="Hero section"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[var(--otach-teal)] opacity-5 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full bg-[var(--otach-teal)] opacity-5 blur-2xl" />
      </div>

      <div className="container-otach relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column: Premium Shopping Headline & CTA */}
        <div className="flex flex-col items-start animate-fade-up">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--otach-teal)] block mb-3">
            Otach Horological Collection
          </span>

          <h1 className="text-[clamp(2rem,4.5vw,3.75rem)] font-bold leading-[1.12] tracking-tight text-[var(--text-primary)] mb-5">
            Precision in Motion.
            <span className="block text-[var(--otach-teal)] font-medium">
              Crafted for Eternity.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-[520px] mb-8">
            Explore meticulously designed timepieces bridging classical mechanical
            tradition and contemporary connected engineering. Every piece reflects
            unwavering standards of horology.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-10">
            <Link
              id="hero-cta-shop"
              href="/items"
              className="h-12 px-7 rounded-full btn-primary text-sm font-semibold shadow-xs hover:shadow-sm transition-all group inline-flex items-center justify-center gap-2 box-border"
            >
              <span>Explore Timepieces</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              id="hero-cta-heritage"
              href="/items?category=analog"
              className="h-12 px-7 rounded-full btn-secondary text-sm font-semibold inline-flex items-center justify-center box-border"
            >
              View Mechanical Line
            </Link>
          </div>

          {/* Horological Trust Badges */}
          <div className="w-full max-w-[520px] grid grid-cols-3 gap-6 text-left">
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">Swiss Regulation</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">Tested in-house</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">Sapphire Glass</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">Scratch resistant</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">2-Year Coverage</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">Full warranty</p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Watch Carousel */}
        <div className="w-full flex justify-center lg:justify-end animate-scale-in">
          <HeroCarousel />
        </div>
      </div>
    </section>
  );
}

/* ── Section 3: Featured Products ────────────────────────────── */
function FeaturedSection() {
  const featured = products.slice(0, 4);

  return (
    <section
      id="featured-products"
      className="section-spacing bg-white border-t border-[var(--border-light)]"
      aria-label="Featured timepieces"
    >
      <div className="container-otach">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--otach-teal)] block mb-2">
              Curated Picks
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-3">
              Featured Timepieces
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Select timepieces embodying our most acclaimed design philosophies.
            </p>
          </div>

          <Link
            id="featured-view-all"
            href="/items"
            className="text-sm font-semibold text-[var(--otach-teal)] hover:text-[var(--otach-teal-dark)] transition-colors inline-flex items-center gap-1.5"
          >
            <span>View Full Catalog</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Uniform Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section 4: Shop by Category ─────────────────────────────── */
function CategoriesSection() {
  return (
    <section
      id="shop-by-category"
      className="section-spacing bg-[var(--surface-gray-50)] border-t border-[var(--border-light)]"
      aria-label="Shop by category"
    >
      <div className="container-otach">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--otach-teal)] block mb-2">
            Collections
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-3">
            Shop by Category
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-[600px] mx-auto [text-wrap:balance]">
            Find the exact profile that matches your lifestyle, from handcrafted
            automatic calibers to rugged diver cases.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section 5: Why Otach (3 Concise Shopping Benefits) ──────── */
function WhyOtachSection() {
  return (
    <section
      id="why-otach"
      className="section-spacing bg-white border-t border-[var(--border-light)]"
      aria-label="Why choose Otach"
    >
      <div className="container-otach">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--otach-teal)] block mb-2">
            Customer Commitment
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-3">
            Why Otach
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-[540px] mx-auto [text-wrap:balance]">
            Every timepiece purchase is backed by our dedicated horological care.
          </p>
        </div>

        {/* 3 Concise Shopping Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shoppingBenefits.map(({ id, title, description, icon }) => (
            <div
              key={id}
              id={id}
              className="p-8 rounded-3xl border border-[var(--border-light)] bg-[var(--surface-white)] hover:border-[var(--otach-teal)] hover:shadow-sm transition-all duration-300 flex flex-col items-center text-center group h-full"
            >
              <div className="w-14 h-14 rounded-full bg-[var(--otach-teal-pale)] text-[var(--otach-teal)] flex items-center justify-center mb-4 group-hover:bg-[var(--otach-teal)] group-hover:text-white transition-all duration-300 shrink-0">
                {icon}
              </div>
              <h3 className="font-bold text-base sm:text-lg text-[var(--text-primary)] mb-2">
                {title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-[320px] mx-auto">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section 6: Promotional CTA ──────────────────────────────── */
function PromotionalCTASection() {
  return (
    <section
      id="promotional-cta"
      className="py-24 bg-[var(--surface-gray-50)] border-t border-[var(--border-light)]"
      aria-label="Explore catalog promotional banner"
    >
      <div className="container-otach">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[var(--otach-teal-dark)] to-[var(--otach-teal)] text-white p-8 sm:p-12 lg:p-16 shadow-md">
          {/* Subtle geometric pattern overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-white/80 block mb-3">
              Curated Catalog
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 tracking-tight">
              Find Your Defining Timepiece
            </h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-8 max-w-[560px]">
              Explore our full selection of hand-inspected automatic, dress,
              chronograph, and connected timepieces. Each watch includes an individual
              certificate of authenticity.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                id="cta-explore-catalog"
                href="/items"
                className="h-12 px-7 rounded-full bg-white text-[var(--otach-teal-dark)] font-bold text-sm hover:bg-[var(--otach-teal-pale)] transition-colors shadow-xs inline-flex items-center justify-center shrink-0 box-border whitespace-nowrap"
              >
                Explore All Products
              </Link>
              <Link
                id="cta-concierge"
                href="/contact"
                className="h-12 px-7 rounded-full border border-white/70 text-white font-semibold text-sm hover:bg-white/10 transition-colors inline-flex items-center justify-center shrink-0 box-border whitespace-nowrap"
              >
                Contact Concierge
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Page Composition (Sections 2–6, with 1 & 7 in RootLayout) ── */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedSection />
      <CategoriesSection />
      <WhyOtachSection />
      <PromotionalCTASection />
    </>
  );
}
