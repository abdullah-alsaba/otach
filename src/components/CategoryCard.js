import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({ category }) {
  return (
    <Link
      href={category.href}
      id={`category-card-${category.slug}`}
      className="group relative block rounded-[var(--radius-xl)] overflow-hidden border border-[var(--border-light)] bg-white shadow-[var(--shadow-xs)] hover:shadow-[var(--shadow-md)] transition-all duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-[var(--otach-teal)]"
      aria-label={`Explore ${category.name} collection`}
    >
      {/* Background Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--surface-gray-100)]">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Card Content Overlay */}
      <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--otach-teal-muted)] bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full inline-block mb-2">
          {category.count}
        </span>
        <h3 className="text-xl font-bold leading-tight mb-1 group-hover:text-[var(--otach-teal-muted)] transition-colors">
          {category.name}
        </h3>
        <p className="text-xs text-white/80 line-clamp-2 mb-3">
          {category.description}
        </p>

        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-[var(--otach-teal-light)] transition-colors">
          <span>Explore Category</span>
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
    </Link>
  );
}
