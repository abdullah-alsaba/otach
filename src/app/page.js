import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
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
      className="relative min-h-[82vh] flex items-center overflow-hidden bg-gradient-to-b from-[var(--surface-white)] via-[var(--otach-teal-pale)] to-[var(--surface-gray-50)] py-14 sm:py-20"
      aria-label="Hero section"
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[var(--otach-teal)] opacity-5 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full bg-[var(--otach-teal)] opacity-5 blur-2xl" />
      </div>

      <div className="container-otach relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Premium Shopping Headline & CTA */}
        <div className="lg:col-span-7 flex flex-col items-start animate-fade-up">
          <span className="badge-otach badge-teal mb-5">
            Otach Horological Collection
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.12] tracking-tight text-[var(--text-primary)] mb-6">
            Precision in Motion.
            <span className="block text-[var(--otach-teal)] font-medium">
              Crafted for Eternity.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl mb-8">
            Explore meticulously designed timepieces bridging classical mechanical
            tradition and contemporary connected engineering. Every piece reflects
            unwavering standards of horology.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              id="hero-cta-shop"
              href="/items"
              className="btn-primary btn-lg"
            >
              Explore Timepieces
            </Link>
            <Link
              id="hero-cta-heritage"
              href="/items?category=analog"
              className="btn-outline btn-lg"
            >
              View Mechanical Line
            </Link>
          </div>
        </div>

        {/* Right Column: Polished Product Visual */}
        <div className="lg:col-span-5 relative animate-scale-in">
          <div className="relative aspect-[4/3] sm:aspect-square rounded-[var(--radius-2xl)] overflow-hidden border border-[var(--border-light)] shadow-[var(--shadow-lg)] bg-[var(--surface-white)]">
            <Image
              src="/images/hero_watch.jpg"
              alt="Otach signature timepiece"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>

          {/* Product Feature Callout Badge */}
          <div className="absolute -bottom-4 -left-4 sm:bottom-4 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-[var(--shadow-md)] border border-[var(--border-light)] flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--otach-teal-muted)] flex items-center justify-center text-[var(--otach-teal)]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--text-primary)]">
                Sapphire Crystal Glass
              </p>
              <p className="text-[11px] text-[var(--text-muted)]">
                Hand-regulated Swiss movement
              </p>
            </div>
          </div>
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
          <div>
            <span className="badge-otach badge-teal mb-2">Curated Picks</span>
            <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Featured Timepieces
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
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
          <span className="badge-otach badge-gray mb-2">Collections</span>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-3">
            Shop by Category
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Find the exact profile that matches your lifestyle, from handcrafted
            automatic calibers to rugged diver cases.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
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
          <span className="badge-otach badge-teal mb-2">Customer Commitment</span>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-3">
            Why Otach
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Every timepiece purchase is backed by our dedicated horological care.
          </p>
        </div>

        {/* 3 Concise Shopping Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {shoppingBenefits.map(({ id, title, description, icon }) => (
            <div
              key={id}
              id={id}
              className="p-8 rounded-[var(--radius-xl)] border border-[var(--border-light)] bg-[var(--surface-white)] hover:border-[var(--otach-teal)] hover:shadow-[var(--shadow-sm)] transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className="w-14 h-14 rounded-2xl bg-[var(--otach-teal-pale)] text-[var(--otach-teal)] flex items-center justify-center mb-6 group-hover:bg-[var(--otach-teal)] group-hover:text-white transition-all duration-300">
                {icon}
              </div>
              <h3 className="font-bold text-base text-[var(--text-primary)] mb-2.5">
                {title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
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
      className="py-16 sm:py-20 bg-[var(--surface-gray-50)] border-t border-[var(--border-light)]"
      aria-label="Explore catalog promotional banner"
    >
      <div className="container-otach">
        <div className="relative rounded-[var(--radius-2xl)] overflow-hidden bg-gradient-to-r from-[var(--otach-teal-dark)] to-[var(--otach-teal)] text-white p-8 sm:p-14 lg:p-16 shadow-[var(--shadow-md)]">
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
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-xs uppercase tracking-wider mb-4">
              Curated Catalog
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 tracking-tight">
              Find Your Defining Timepiece
            </h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-8 max-w-lg">
              Explore our full selection of hand-inspected automatic, dress,
              chronograph, and connected timepieces. Each watch includes an individual
              certificate of authenticity.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                id="cta-explore-catalog"
                href="/items"
                className="px-8 py-3.5 rounded-full bg-white text-[var(--otach-teal-dark)] font-bold text-sm hover:bg-[var(--otach-teal-pale)] transition-colors shadow-sm"
              >
                Explore All Products
              </Link>
              <Link
                id="cta-concierge"
                href="/contact"
                className="px-7 py-3.5 rounded-full border border-white/60 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
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
