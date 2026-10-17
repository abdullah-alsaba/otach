import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About Otach — Heritage, Craftsmanship & Horological Purpose",
  description:
    "Learn about the Otach philosophy, our commitment to mechanical precision, and our mission to curate timepieces of enduring distinction.",
};

const pillars = [
  {
    number: "01",
    title: "Mechanical Integrity",
    subtitle: "Caliber Standards",
    description:
      "Every mechanical timepiece in our collection features hand-regulated calibers, robust power reserves, and anti-magnetic architectures tested to withstand the demands of daily wear.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Understated Distinction",
    subtitle: "Architectural Proportions",
    description:
      "We believe true luxury never shouts. Our dials balance negative space, applied indices, and satin-brushed steel to achieve silhouettes that outlive seasonal trends.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Enduring Materials",
    subtitle: "Uncompromising Build",
    description:
      "316L marine-grade stainless steel, synthetic sapphire crystals with multi-layer anti-reflective coatings, and ethically sourced leathers ensure a lifetime of ownership.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
];

const standards = [
  { label: "Sapphire Crystal", desc: "Hardness rating second only to diamond" },
  { label: "2-Year Coverage", desc: "Comprehensive global mechanical warranty" },
  { label: "Inspected in House", desc: "Every watch regulated prior to dispatch" },
  { label: "Sustainable Casing", desc: "FSC-certified presentation boxes" },
];

export default function AboutPage() {
  return (
    <div className="bg-[var(--surface-white)] min-h-screen">
      {/* ── Breadcrumb ── */}
      <div className="border-b border-[var(--border-light)] bg-[var(--surface-gray-50)] py-4">
        <div className="container-otach">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--otach-teal)] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[var(--text-primary)] font-semibold">About Otach</span>
          </nav>
        </div>
      </div>

      {/* ── Hero Section ── */}
      <section className="section-spacing border-b border-[var(--border-light)] bg-gradient-to-b from-[var(--surface-white)] to-[var(--surface-gray-50)]">
        <div className="container-otach">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <span className="badge-otach badge-teal mb-4">Our Heritage & Purpose</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.12] mb-6">
              Precision as an Artform.
              <span className="block text-[var(--otach-teal)] font-medium">Time as a Statement.</span>
            </h1>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
              Founded on the belief that a timepiece is more than an instrument to measure hours,
              Otach was born to celebrate mechanical artistry, tactile honesty, and intentional design.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/items" className="btn-primary">
                Explore The Collection
              </Link>
              <Link href="/contact" className="btn-outline">
                Contact Our Concierge
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Brand Narrative & Image Split ── */}
      <section className="section-spacing border-b border-[var(--border-light)]">
        <div className="container-otach">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] rounded-[var(--radius-2xl)] overflow-hidden border border-[var(--border-light)] shadow-[var(--shadow-md)]">
                <Image
                  src="/images/watch-classic.jpg"
                  alt="Otach mechanical watch movement and dial"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 sm:bottom-6 sm:-right-6 bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-[var(--shadow-lg)] border border-[var(--border-light)] max-w-xs hidden sm:block">
                <p className="text-xs font-bold text-[var(--text-primary)] mb-1">
                  Hand-Regulated Horology
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  Every automatic piece is monitored for 48 hours to ensure chronometric accuracy before shipment.
                </p>
              </div>
            </div>

            {/* Narrative */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <span className="badge-otach badge-gray mb-3">Our Origin</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6 leading-tight">
                Crafted for Those Who Value the Unseen Details
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                <p>
                  In a digital world that demands constant attention, the mechanical ticking of a watch
                  is an anchor. It connects the wearer to centuries of physical human ingenuity.
                </p>
                <p>
                  At Otach, our mission is to eliminate superficial markups and excessive ornament. We
                  partner with master ateliers who honor classical watchmaking techniques, pairing them
                  with contemporary engineering standards.
                </p>
                <p>
                  From our dress automatics with sapphire exhibition backs to our rugged 200-meter
                  chronographs, each timepiece is assembled with zero compromise on durability or proportion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Three Pillars ── */}
      <section className="section-spacing bg-[var(--surface-gray-50)] border-b border-[var(--border-light)]">
        <div className="container-otach">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="badge-otach badge-teal mb-3">Core Pillars</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-3">
              The Otach Philosophy
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Three immutable principles that govern every collection we curate and produce.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map(({ number, title, subtitle, description, icon }) => (
              <div
                key={number}
                className="card-otach p-8 flex flex-col justify-between group hover:border-[var(--otach-teal)] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-black text-[var(--otach-teal)]/40 group-hover:text-[var(--otach-teal)] transition-colors">
                      {number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[var(--otach-teal-pale)] text-[var(--otach-teal)] flex items-center justify-center group-hover:bg-[var(--otach-teal)] group-hover:text-white transition-colors duration-300">
                      {icon}
                    </div>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--otach-teal)] mb-1">
                    {subtitle}
                  </p>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                    {title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Horological Standards ── */}
      <section className="section-spacing border-b border-[var(--border-light)]">
        <div className="container-otach">
          <div className="rounded-[var(--radius-2xl)] bg-[var(--surface-gray-100)] border border-[var(--border-light)] p-8 sm:p-12 lg:p-16">
            <div className="max-w-2xl mb-10">
              <span className="badge-otach badge-gray mb-2">Standards of Execution</span>
              <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-3">
                Built to Transcend Generations
              </h2>
              <p className="text-sm text-[var(--text-secondary)]">
                Every Otach piece undergoes multi-axis pressure and timing assessments before receiving its unique serial register.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {standards.map(({ label, desc }) => (
                <div
                  key={label}
                  className="bg-white p-6 rounded-2xl border border-[var(--border-light)] shadow-xs"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--otach-teal)] mb-4" />
                  <h3 className="font-bold text-sm text-[var(--text-primary)] mb-1">{label}</h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-16 sm:py-20 bg-[var(--surface-gray-50)] text-center">
        <div className="container-otach max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-4">
            Discover Your Signature Piece
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-8">
            Browse our full catalog of automatic, sport, and modern connected timepieces.
          </p>
          <Link href="/items" className="btn-primary btn-lg">
            View All Products
          </Link>
        </div>
      </section>
    </div>
  );
}
