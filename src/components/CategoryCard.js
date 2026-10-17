import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({ category }) {
  return (
    <Link
      href={category.href}
      id={`category-card-${category.slug}`}
      className="group relative flex flex-col justify-end h-[440px] sm:h-[480px] rounded-3xl overflow-hidden border border-[var(--border-light)] bg-neutral-900 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-[var(--otach-teal)]"
      aria-label={`Explore ${category.name} collection`}
    >
      {/* ── Background Photography in Dedicated Safe Framing ── */}
      <Image
        src={category.image}
        alt={category.name}
        fill
        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Subtle Dark Gradient Overlay for Maximum Readability in Lower Half */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 via-50% to-transparent transition-opacity duration-300 group-hover:opacity-95"
        aria-hidden="true"
      />

      {/* ── Card Content with 24-28px Inner Padding ── */}
      <div className="relative z-10 p-6 sm:p-7 flex flex-col text-white">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--otach-teal-pale)] mb-2 block">
          {category.count}
        </span>
        <h3 className="text-xl sm:text-2xl font-bold leading-tight mb-2 group-hover:text-[var(--otach-teal-pale)] transition-colors">
          {category.name}
        </h3>
        <p className="text-xs sm:text-sm text-neutral-200 line-clamp-2 mb-5 leading-relaxed">
          {category.description}
        </p>

        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-[var(--otach-teal-pale)] transition-colors">
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
      </div>
    </Link>
  );
}
