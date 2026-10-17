import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const shortDesc = product.tagline || product.description;

  return (
    <div
      id={`product-card-${product.id}`}
      className="group flex flex-col h-full bg-white rounded-2xl border border-[var(--border-light)] overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-md)] hover:-translate-y-1 hover:border-[var(--otach-teal)]/30 focus-within:ring-2 focus-within:ring-[var(--otach-teal)]"
    >
      {/* ── Product Image Container: Standardized Square Frame with Studio Light ── */}
      <Link
        href={`/items/${product.id}`}
        className="relative block bg-gradient-to-b from-[#FAFAFA] via-white to-[#F4F7F7] aspect-square overflow-hidden p-6 focus:outline-none"
        aria-label={`View ${product.name} details`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Understated Status Badge */}
        {product.badge && (
          <span className="absolute top-3.5 left-3.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/95 text-[var(--otach-teal-dark)] border border-[var(--border-light)] shadow-xs backdrop-blur-xs">
            {product.badge}
          </span>
        )}

        {/* Understated Savings Tag */}
        {discount && (
          <span className="absolute top-3.5 right-3.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/95 text-neutral-800 border border-[var(--border-light)] shadow-xs backdrop-blur-xs">
            -{discount}%
          </span>
        )}
      </Link>

      {/* ── Product Information ── */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {/* Category & Stock Indicator Row */}
        <div className="flex items-center justify-between mb-2 gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--otach-teal)] truncate">
            {product.category}
          </span>
          {product.inStock && (
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 flex items-center gap-1.5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              In Stock
            </span>
          )}
        </div>

        {/* Product Name with predictable 2-line height container */}
        <div className="min-h-[2.75rem] flex items-start mb-2">
          <Link href={`/items/${product.id}`} className="focus:outline-none">
            <h3 className="font-bold text-base text-[var(--text-primary)] leading-snug group-hover:text-[var(--otach-teal)] transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Short description with uniform 2-line height */}
        <p className="text-xs text-[var(--text-secondary)] line-clamp-2 min-h-[2.5rem] leading-relaxed mb-4">
          {shortDesc}
        </p>

        {/* ── Footer: Price & View Details Button strictly aligned to bottom ── */}
        <div className="mt-auto pt-4 border-t border-[var(--border-light)] flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">
              Price
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-[var(--text-primary)]">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[var(--text-muted)] line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>

          <Link
            href={`/items/${product.id}`}
            className="btn-outline btn-sm !py-2 !px-3.5 !text-xs group-hover:bg-[var(--otach-teal)] group-hover:text-white group-hover:border-[var(--otach-teal)] transition-all duration-200 inline-flex items-center gap-1.5 shrink-0 focus:outline-none"
            aria-label={`View details for ${product.name}`}
          >
            <span>View Details</span>
            <svg
              width="12"
              height="12"
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
      </div>
    </div>
  );
}
