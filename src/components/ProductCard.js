import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <Link
      href={`/items/${product.id}`}
      id={`product-card-${product.id}`}
      className="group block bg-white rounded-[var(--radius-lg)] border border-[var(--border-light)] overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-[var(--otach-teal)]"
      aria-label={`View ${product.name} — $${product.price}`}
    >
      {/* Image container */}
      <div className="relative bg-[var(--surface-gray-50)] aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Status Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-[var(--otach-teal)] text-white shadow-xs">
            {product.badge}
          </span>
        )}

        {/* Savings Badge */}
        {discount && (
          <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[11px] font-bold bg-black/75 text-white">
            -{discount}%
          </span>
        )}
      </div>

      {/* Info container */}
      <div className="p-4">
        <p className="text-xs font-medium text-[var(--text-muted)] capitalize mb-1">
          {product.category}
        </p>
        <h3 className="font-semibold text-[var(--text-primary)] text-sm leading-snug mb-2 group-hover:text-[var(--otach-teal)] transition-colors truncate">
          {product.name}
        </h3>

        {/* Price row */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-[var(--text-primary)]">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[var(--text-muted)] line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <span className="text-xs font-semibold text-[var(--otach-teal)] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform duration-200">
            View
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
          </span>
        </div>
      </div>
    </Link>
  );
}
