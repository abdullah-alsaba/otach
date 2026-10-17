import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({ category }) {
  return (
    <Link
      href={category.href}
      id={`category-card-${category.slug}`}
      className="group relative flex flex-col h-full min-h-[480px] rounded-3xl overflow-hidden border border-[var(--border-light)] bg-white shadow-xs hover:shadow-md hover:border-[var(--otach-teal)]/30 transition-all duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-[var(--otach-teal)]"
      aria-label={`Explore ${category.name} collection`}
    >
      {/* ── Text block at top so eyebrow never clips ── */}
      <div className="relative z-10 p-7 flex flex-col shrink-0">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--otach-teal)] mb-2 block">
          {category.count}
        </span>
        <h3 className="text-xl sm:text-2xl font-bold leading-tight mb-3 text-[var(--text-primary)] group-hover:text-[var(--otach-teal)] transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
          {category.description}
        </p>

        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--otach-teal)] group-hover:text-[var(--otach-teal-dark)] transition-colors">
          <span>Explore Collection</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>

      {/* ── Watch image in its own lower area; never overlaps text ── */}
      <div className="relative flex-1 min-h-[220px] mx-7 mb-7 rounded-2xl overflow-hidden bg-gradient-to-b from-[#FAFAFA] via-white to-[#F4F7F7] border border-[var(--border-light)]">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-contain object-center p-4 transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
    </Link>
  );
}
