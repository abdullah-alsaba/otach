import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import NewsletterForm from "@/components/NewsletterForm";
import { products } from "@/lib/products";

export const metadata = {
  title: "Otach — Premium Timepieces",
  description:
    "Discover timeless elegance and precision craftsmanship at Otach — your destination for curated premium watches.",
};

/* ── Section 1: Hero ─────────────────────────────────────────── */
function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[88vh] flex items-center overflow-hidden bg-gradient-to-br from-white via-[var(--otach-teal-pale)] to-[var(--surface-gray-100)]"
      aria-label="Hero banner"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[var(--otach-teal)] opacity-5 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-[var(--otach-teal)] opacity-5 blur-2xl" />
      </div>

      <div className="container-otach relative z-10 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Text content */}
        <div className="animate-fade-up">
          <span className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--otach-teal-muted)] text-[var(--otach-teal)] mb-5 tracking-wide uppercase">
            New Collection 2026
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.15] tracking-tight text-[var(--text-primary)] mb-6">
            Timeless
            <span className="block text-[var(--otach-teal)]">Precision.</span>
            Refined.
          </h1>

          <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-md mb-8">
            Discover curated timepieces where every detail tells a story —
            from Swiss automatic movements to cutting-edge smartwatches.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              id="hero-shop-now"
              href="/items"
              className="px-7 py-3.5 rounded-full bg-[var(--otach-teal)] text-white font-semibold text-sm hover:bg-[var(--otach-teal-light)] transition-all duration-200 shadow-[0_4px_14px_0_rgba(45,122,122,0.35)] hover:shadow-[0_6px_20px_0_rgba(45,122,122,0.45)] hover:-translate-y-0.5"
            >
              Shop Now
            </Link>
            <Link
              id="hero-explore"
              href="/about"
              className="px-7 py-3.5 rounded-full border border-[var(--border-medium)] text-[var(--text-primary)] font-semibold text-sm hover:border-[var(--otach-teal)] hover:text-[var(--otach-teal)] transition-all duration-200"
            >
              Our Story
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-10 pt-8 border-t border-[var(--border-light)]">
            {[
              { value: "20k+", label: "Happy Clients" },
              { value: "150+", label: "Collections" },
              { value: "4.9★", label: "Avg. Rating" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-xl font-bold text-[var(--text-primary)]">{value}</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hero image */}
        <div className="animate-scale-in delay-200 relative">
          <div className="relative aspect-[4/3] rounded-[var(--radius-2xl)] overflow-hidden shadow-[var(--shadow-lg)]">
            <Image
              src="/images/hero_watch.jpg"
              alt="Premium watch hero collection"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {/* Floating card */}
          <div className="absolute -bottom-4 -left-4 bg-white rounded-[var(--radius-md)] p-4 shadow-[var(--shadow-md)] border border-[var(--border-light)] flex items-center gap-3 animate-fade-up delay-400">
            <div className="w-10 h-10 rounded-full bg-[var(--otach-teal-muted)] flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--otach-teal)" strokeWidth="2" aria-hidden="true">
                <path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--text-primary)]">Free Express Shipping</p>
              <p className="text-xs text-[var(--text-muted)]">On orders over $150</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Section 2: Featured Products ────────────────────────────── */
function FeaturedSection() {
  const featured = products.slice(0, 4);
  return (
    <section id="featured" className="py-20 bg-white" aria-label="Featured products">
      <div className="container-otach">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold text-[var(--otach-teal)] uppercase tracking-widest mb-2">
              Curated Picks
            </p>
            <h2 className="text-3xl font-semibold text-[var(--text-primary)] leading-tight">
              Featured Collection
            </h2>
          </div>
          <Link
            id="featured-view-all"
            href="/items"
            className="text-sm font-semibold text-[var(--otach-teal)] hover:underline underline-offset-4 flex items-center gap-1"
          >
            View all
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section 3: Brand Story / Banner ─────────────────────────── */
function BrandBanner() {
  return (
    <section
      id="brand-story"
      className="py-20 bg-[var(--surface-gray-50)]"
      aria-label="About Otach"
    >
      <div className="container-otach">
        <div className="rounded-[var(--radius-xl)] overflow-hidden bg-[var(--otach-teal)] text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Text */}
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--otach-teal-muted)] mb-3">
                Since 2018
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-5">
                Crafted with Purpose,<br />Worn with Pride
              </h2>
              <p className="text-[var(--otach-teal-muted)] text-sm leading-relaxed mb-8 max-w-sm">
                We believe a watch is more than a timekeeping device — it is an
                extension of your identity. Every Otach piece is hand-selected
                for its balance of aesthetics and engineering.
              </p>
              <Link
                id="brand-story-cta"
                href="/about"
                className="self-start px-6 py-3 rounded-full bg-white text-[var(--otach-teal)] font-semibold text-sm hover:bg-[var(--otach-teal-muted)] transition-colors duration-200"
              >
                Discover Our Story
              </Link>
            </div>

            {/* Image */}
            <div className="relative min-h-64 lg:min-h-0">
              <Image
                src="/images/hero_watch.jpg"
                alt="Otach brand story — elegance in craftsmanship"
                fill
                className="object-cover object-center opacity-80 mix-blend-multiply"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Section 4: Why Choose Us ────────────────────────────────── */
function WhyUsSection() {
  const perks = [
    {
      id: "perk-quality",
      icon: (
        <path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10zm-1-6l7-7-1.5-1.5L11 13l-2.5-2.5L7 12l4 4z" />
      ),
      title: "Premium Quality",
      desc: "Every piece is rigorously vetted for materials, movement accuracy, and finishing.",
    },
    {
      id: "perk-shipping",
      icon: (
        <path d="M5 12H3l4-8h10l4 8h-2M3 12l2 6h14l2-6M3 12h18M10 12v6m4-6v6" />
      ),
      title: "Free Express Delivery",
      desc: "Complimentary insured shipping on all orders above $150, delivered in 2–4 days.",
    },
    {
      id: "perk-returns",
      icon: (
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16M3 21v-5h5" />
      ),
      title: "30-Day Returns",
      desc: "Not satisfied? Return your timepiece within 30 days for a full refund, no questions asked.",
    },
    {
      id: "perk-warranty",
      icon: (
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      ),
      title: "2-Year Warranty",
      desc: "Every Otach watch comes with a full manufacturer warranty and dedicated support.",
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-white" aria-label="Why choose Otach">
      <div className="container-otach">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-[var(--otach-teal)] uppercase tracking-widest mb-2">
            Why Otach
          </p>
          <h2 className="text-3xl font-semibold text-[var(--text-primary)]">
            Built on Trust
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map(({ id, icon, title, desc }) => (
            <div
              key={id}
              id={id}
              className="p-6 rounded-[var(--radius-lg)] border border-[var(--border-light)] hover:border-[var(--otach-teal)] hover:shadow-[var(--shadow-sm)] transition-all duration-200 group"
            >
              <div className="w-11 h-11 rounded-[var(--radius-md)] bg-[var(--otach-teal-pale)] group-hover:bg-[var(--otach-teal-muted)] flex items-center justify-center mb-4 transition-colors">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--otach-teal)"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {icon}
                </svg>
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] text-sm mb-1.5">
                {title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section 5: Newsletter ────────────────────────────────────── */
function NewsletterSection() {
  return (
    <section
      id="newsletter"
      className="py-20 bg-[var(--surface-gray-50)] border-t border-[var(--border-light)]"
      aria-label="Newsletter signup"
    >
      <div className="container-otach max-w-2xl text-center">
        <p className="text-xs font-semibold text-[var(--otach-teal)] uppercase tracking-widest mb-3">
          Stay Updated
        </p>
        <h2 className="text-3xl font-semibold text-[var(--text-primary)] mb-4">
          Join the Otach Community
        </h2>
        <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
          Get first access to new arrivals, exclusive offers, and watchmaking
          insights delivered straight to your inbox.
        </p>
        <NewsletterForm />
        <p className="text-xs text-[var(--text-muted)] mt-4">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

/* ── Page composition ────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedSection />
      <BrandBanner />
      <WhyUsSection />
      <NewsletterSection />
    </>
  );
}
