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
      className="group flex flex-col h-full bg-white rounded-2xl border border-[var(--border-light)] overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-md)] hover:-translate-y-1 focus-within:ring-2 focus-within:ring-[var(--otach-teal)]"
    >
      {/* Product Image Container */}
      <Link
        href={`/items/${product.id}`}
        className="relative block bg-[var(--surface-gray-50)] aspect-[4/3] sm:aspect-square overflow-hidden"
        aria-label={`View ${product.name} details`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Status Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--otach-teal)] text-white shadow-xs">
            {product.badge}
          </span>
        )}

        {/* Savings Badge */}
        {discount && (
          <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[11px] font-bold bg-black/75 text-white">
            -{discount}%
          </span>
        )}
      </Link>

      {/* Product Information */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--otach-teal)]">
              {product.category}
            </span>
            {product.inStock && (
              <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                In Stock
              </span>
            )}
          </div>

          <Link href={`/items/${product.id}`}>
            <h3 className="font-bold text-base text-[var(--text-primary)] leading-snug group-hover:text-[var(--otach-teal)] transition-colors line-clamp-1 mb-1.5">
              {product.name}
            </h3>
          </Link>

          {/* Short description */}
          <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
            {shortDesc}
          </p>
        </div>

        {/* Footer: Price & View Details Button */}
        <div className="pt-3 border-t border-[var(--border-light)] flex items-center justify-between gap-3 mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-semibold text-[var(--text-muted)] tracking-wider">
              Price
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-[var(--text-primary)]">
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
            className="btn-outline btn-sm !py-2 !px-3.5 !text-xs group-hover:bg-[var(--otach-teal)] group-hover:text-white group-hover:border-[var(--otach-teal)] transition-all duration-200"
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
