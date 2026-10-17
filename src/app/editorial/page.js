import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "The Otach Journal — Editorial, Horology & Craft",
  description:
    "Curated stories exploring fine horology, mechanical watch calibers, architectural design philosophies, and the culture of time.",
};

const articles = [
  {
    slug: "mechanical-calibers-modern-era",
    title: "The Architecture of Modern Automatic Calibers",
    category: "Horology",
    readTime: "5 min read",
    date: "October 2026",
    excerpt:
      "Why mechanical movements continue to capture the human imagination in a hyper-digital era: balance wheels, escapements, and the tactile romance of physical time.",
    image: "/images/watch-classic.jpg",
  },
  {
    slug: "sapphire-crystal-durability",
    title: "Second Only to Diamond: The Science of Synthetic Sapphire",
    category: "Materials",
    readTime: "4 min read",
    date: "September 2026",
    excerpt:
      "A deep dive into Verneuil crystal growth, anti-reflective coatings, and how modern crystalline engineering protects delicate watch dials.",
    image: "/images/watch-teal.jpg",
  },
  {
    slug: "restrained-minimalism-watch-design",
    title: "Restrained Minimalism: Designing for the Decades",
    category: "Design",
    readTime: "6 min read",
    date: "August 2026",
    excerpt:
      "How dial proportions, typography, and negative space dictate whether a timepiece transcends fleeting fashion trends or fades with the season.",
    image: "/images/watch-sport.jpg",
  },
];

export default function EditorialPage() {
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
            <span className="text-[var(--text-primary)] font-semibold">Editorial</span>
          </nav>
        </div>
      </div>

      {/* ── Header ── */}
      <section className="section-spacing border-b border-[var(--border-light)] bg-gradient-to-b from-[var(--surface-white)] to-[var(--surface-gray-50)]">
        <div className="container-otach">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <span className="badge-otach badge-teal mb-4">The Otach Journal</span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              Stories in Time & Craft
            </h1>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              Perspectives on independent watchmaking, mechanical innovation, and the subtle art of enduring design.
            </p>
          </div>
        </div>
      </section>

      {/* ── Articles Grid ── */}
      <section className="section-spacing">
        <div className="container-otach">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((art) => (
              <article
                key={art.slug}
                className="card-otach overflow-hidden bg-white group flex flex-col"
              >
                <div className="relative aspect-[16/10] bg-[var(--surface-gray-100)] overflow-hidden">
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="badge-otach badge-teal text-[10px]">
                      {art.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)] mb-2">
                    <span>{art.date}</span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h2 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--otach-teal)] transition-colors mb-3 leading-snug">
                    {art.title}
                  </h2>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6 flex-1">
                    {art.excerpt}
                  </p>

                  <Link
                    href="/items"
                    className="text-xs font-semibold text-[var(--otach-teal)] hover:text-[var(--otach-teal-dark)] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Explore Associated Timepieces</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/items" className="btn-primary">
              View All Timepieces in Catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
