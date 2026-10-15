"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function ProductDetail({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedType, setSelectedType] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  function handleAddToCart() {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  return (
    <>
      <div className="bg-white min-h-screen">
        <div className="container-otach py-8">
          {/* ── Breadcrumb ────────────────────────────── */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mb-8"
          >
            <Link href="/" className="hover:text-[var(--otach-teal)] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/items" className="hover:text-[var(--otach-teal)] transition-colors">
              Shop
            </Link>
            <span>/</span>
            <span className="text-[var(--text-primary)] font-medium truncate max-w-[180px]">
              {product.name}
            </span>
          </nav>

          {/* ── Main layout: gallery + info ──────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* ─── LEFT: Gallery ───────────────────────── */}
            <div>
              {/* Main image */}
              <div className="relative aspect-square rounded-[var(--radius-xl)] bg-[var(--surface-gray-50)] overflow-hidden border border-[var(--border-light)] mb-4 shadow-[var(--shadow-sm)]">
                <Image
                  src={product.images[selectedImage]}
                  alt={`${product.name} — view ${selectedImage + 1}`}
                  fill
                  className="object-cover transition-opacity duration-300"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Nav arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      id="gallery-prev"
                      onClick={() =>
                        setSelectedImage((i) =>
                          (i - 1 + product.images.length) % product.images.length
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-[var(--shadow-md)] border border-[var(--border-light)] flex items-center justify-center hover:bg-[var(--surface-gray-50)] transition"
                      aria-label="Previous image"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>
                    <button
                      id="gallery-next"
                      onClick={() =>
                        setSelectedImage((i) => (i + 1) % product.images.length)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-[var(--shadow-md)] border border-[var(--border-light)] flex items-center justify-center hover:bg-[var(--surface-gray-50)] transition"
                      aria-label="Next image"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-1" role="list" aria-label="Product image thumbnails">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    id={`thumb-${idx}`}
                    onClick={() => setSelectedImage(idx)}
                    role="listitem"
                    className={`relative flex-shrink-0 w-20 h-20 rounded-[var(--radius-md)] overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === idx
                        ? "border-[var(--otach-teal)] shadow-[0_0_0_3px_var(--otach-teal-muted)]"
                        : "border-[var(--border-light)] hover:border-[var(--border-medium)]"
                    }`}
                    aria-label={`View image ${idx + 1}`}
                    aria-current={selectedImage === idx}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                    {idx === 4 && product.images.length <= 5 ? null : idx >= 4 ? (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-white text-xs font-semibold">
                          +{product.images.length - 4}
                        </span>
                      </div>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>

            {/* ─── RIGHT: Product info ──────────────────── */}
            <div className="flex flex-col">
              {/* Name & tagline */}
              <div className="mb-5">
                <p className="text-xs text-[var(--text-muted)] capitalize mb-1">
                  {product.category}
                </p>
                <h1 className="text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] leading-tight mb-2">
                  {product.name}
                </h1>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Rating & sold */}
              <div className="flex flex-wrap items-center gap-3 mb-5 pb-5 border-b border-[var(--border-light)]">
                <span className="text-sm font-semibold text-[var(--text-secondary)]">
                  {product.sold} Sold
                </span>
                <span className="text-[var(--border-medium)]">·</span>
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-0.5" aria-hidden="true">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg
                        key={s}
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill={s <= Math.round(product.rating) ? "#f5a623" : "none"}
                        stroke="#f5a623"
                        strokeWidth="1.5"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <span
                    className="text-sm text-[var(--text-secondary)]"
                    aria-label={`${product.rating} out of 5, ${product.reviews} reviews`}
                  >
                    ({product.rating} from {product.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-[var(--text-primary)]">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-[var(--text-muted)] line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    {discount && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                        Save {discount}%
                      </span>
                    )}
                  </>
                )}
              </div>

              <div className="border-t border-[var(--border-light)] pt-5 space-y-5">
                {/* Color selection */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="text-sm font-semibold text-[var(--text-primary)]">
                      Color:{" "}
                      <span className="font-normal text-[var(--text-secondary)]">
                        {product.colorNames[selectedColor]}
                      </span>
                    </label>
                  </div>
                  <div className="flex gap-2.5" role="group" aria-label="Color selection">
                    {product.colors.map((color, idx) => (
                      <button
                        key={idx}
                        id={`color-${idx}`}
                        onClick={() => setSelectedColor(idx)}
                        title={product.colorNames[idx]}
                        aria-label={`Color: ${product.colorNames[idx]}`}
                        aria-pressed={selectedColor === idx}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                          selectedColor === idx
                            ? "border-[var(--otach-teal)] scale-110 shadow-[0_0_0_3px_var(--otach-teal-muted)]"
                            : "border-[var(--border-medium)] hover:scale-105"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Type selection */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <label htmlFor="product-type" className="text-sm font-semibold text-[var(--text-primary)]">
                      Type
                    </label>
                    <button
                      id="size-guide-btn"
                      className="text-xs text-[var(--text-muted)] underline underline-offset-2 hover:text-[var(--otach-teal)] transition-colors"
                    >
                      Size Guide
                    </button>
                  </div>
                  <select
                    id="product-type"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-[var(--radius-sm)] border border-[var(--border-light)] text-sm text-[var(--text-primary)] bg-white focus:outline-none focus:border-[var(--otach-teal)] focus:ring-2 focus:ring-[var(--otach-teal)]/15 transition"
                  >
                    <option value="">Select Type</option>
                    {product.types.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="text-sm font-semibold text-[var(--text-primary)] mb-2.5 block">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-[var(--border-light)] rounded-full overflow-hidden">
                      <button
                        id="qty-decrease"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        aria-label="Decrease quantity"
                        className="w-10 h-10 flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--surface-gray-50)] disabled:opacity-40 disabled:cursor-not-allowed transition"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </button>
                      <span
                        className="w-10 text-center text-sm font-semibold text-[var(--text-primary)]"
                        aria-live="polite"
                        aria-label={`Quantity: ${quantity}`}
                      >
                        {String(quantity).padStart(2, "0")}
                      </span>
                      <button
                        id="qty-increase"
                        onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                        aria-label="Increase quantity"
                        className="w-10 h-10 flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--surface-gray-50)] transition"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-6 flex flex-col gap-3">
                <button
                  id="add-to-cart-btn"
                  onClick={handleAddToCart}
                  className={`w-full py-3.5 rounded-full border-2 font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                    addedToCart
                      ? "border-green-500 text-green-600 bg-green-50"
                      : "border-[var(--border-medium)] text-[var(--text-primary)] hover:border-[var(--otach-teal)] hover:text-[var(--otach-teal)]"
                  }`}
                  aria-live="polite"
                >
                  {addedToCart ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      Add to Cart
                      <span className="w-5 h-5 rounded-full bg-[var(--otach-teal)] text-white flex items-center justify-center text-xs font-bold" aria-hidden="true">
                        +
                      </span>
                    </>
                  )}
                </button>

                <button
                  id="buy-now-btn"
                  className="w-full py-3.5 rounded-full bg-[var(--otach-teal)] text-white font-semibold text-sm hover:bg-[var(--otach-teal-light)] transition-all duration-200 shadow-[0_4px_14px_0_rgba(45,122,122,0.35)] hover:shadow-[0_6px_20px_0_rgba(45,122,122,0.45)] hover:-translate-y-0.5"
                >
                  Buy Now
                </button>
              </div>

              {/* Features list */}
              {product.features && (
                <div className="mt-6 pt-6 border-t border-[var(--border-light)]">
                  <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">
                    Key Features
                  </p>
                  <ul className="space-y-2">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--otach-teal)" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
