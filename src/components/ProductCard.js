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
      className="group block bg-white rounded-[var(--radius-lg)] border border-[var(--border-light)] overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5"
      aria-label={`View ${product.name} — $${product.price}`}
    >
      {/* Image container */}
      <div className="relative bg-[var(--surface-gray-50)] aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-[var(--otach-teal)] text-white shadow-sm">
            {product.badge}
          </span>
        )}

        {/* Discount badge */}
        {discount && (
          <span className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold bg-black/80 text-white">
            -{discount}%
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-[var(--text-muted)] capitalize mb-1">
          {product.category}
        </p>
        <h3 className="font-semibold text-[var(--text-primary)] text-sm leading-snug mb-1 truncate">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3" aria-label={`Rating: ${product.rating} out of 5`}>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill={star <= Math.round(product.rating) ? "#f5a623" : "none"}
                stroke="#f5a623"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-[var(--text-muted)]">
            ({product.reviews})
          </span>
        </div>

        {/* Price row */}
        <div className="flex items-center justify-between">
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

          {/* Quick add arrow */}
          <span className="w-8 h-8 rounded-full bg-[var(--surface-gray-100)] group-hover:bg-[var(--otach-teal)] flex items-center justify-center transition-all duration-200">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="text-[var(--text-muted)] group-hover:text-white transition-colors"
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
