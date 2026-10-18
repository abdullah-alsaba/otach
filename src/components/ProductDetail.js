"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@heroui/react";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";

export default function ProductDetail({ product, relatedProducts = [] }) {
  const router = useRouter();
  const { addItem, maxQuantityPerItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedType, setSelectedType] = useState(product.types?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  /* Shared feedback for any add-to-cart attempt, so success is only announced
     after the cart state actually changed. */
  const reportAddResult = (result) => {
    switch (result.status) {
      case "added":
        toast.success(`Added ${result.quantity} × ${product.name} to your bag.`);
        return true;
      case "merged":
        toast.success(`${product.name} is in your bag — quantity updated to ${result.totalQuantity}.`);
        return true;
      case "limit":
        toast.warning(
          `You already have the maximum of ${maxQuantityPerItem} of this timepiece in your bag.`
        );
        return false;
      case "out-of-stock":
        toast.danger(`${product.name} is currently out of stock.`);
        return false;
      default:
        toast.danger("This timepiece could not be added to your bag. Please try again.");
        return false;
    }
  };

  const handleAddToCart = () => {
    const result = addItem(product, quantity);

    if (!reportAddResult(result)) return;

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  /* "Buy Now" adds the current selection to the shared cart and hands the
     shopper straight to checkout — there is no instant-purchase backend. */
  const handleBuyNow = () => {
    const result = addItem(product, quantity);

    if (!reportAddResult(result)) return;

    setAddedToCart(true);
    router.push("/checkout");
  };

  return (
    <div className="bg-[var(--surface-white)] min-h-screen pb-20">
      {/* ── Breadcrumbs & Back Navigation ── */}
      <div className="border-b border-[var(--border-light)] bg-[var(--surface-gray-50)] py-4">
        <div className="container-otach flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--otach-teal)] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/items" className="hover:text-[var(--otach-teal)] transition-colors">
              Shop
            </Link>
            <span>/</span>
            <Link
              href={`/items?category=${product.category}`}
              className="capitalize hover:text-[var(--otach-teal)] transition-colors"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-[var(--text-primary)] font-semibold truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>

          <Link
            href="/items"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--otach-teal)] transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back to All Timepieces</span>
          </Link>
        </div>
      </div>

      {/* ── Main Product Section (Gallery + Info) ── */}
      <div className="container-otach pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* ── LEFT: Product Gallery (Desktop: 7 cols, Mobile: stacked above) ── */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main Stage Image */}
            <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square rounded-[var(--radius-2xl)] bg-[var(--surface-gray-50)] overflow-hidden border border-[var(--border-light)] shadow-[var(--shadow-sm)]">
              <Image
                src={images[selectedImage]}
                alt={`${product.name} — perspective ${selectedImage + 1}`}
                fill
                priority
                className="object-cover transition-opacity duration-300"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />

              {/* Status Badge */}
              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-[var(--otach-teal)] text-white shadow-xs">
                  {product.badge}
                </span>
              )}

              {/* Discount Tag */}
              {discount && (
                <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-bold bg-black/80 text-white shadow-xs">
                  Save {discount}%
                </span>
              )}

              {/* Gallery Arrow Controls */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-[var(--border-light)] shadow-[var(--shadow-md)] flex items-center justify-center text-[var(--text-primary)] hover:bg-white transition-all"
                    aria-label="Previous product image"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedImage((prev) => (prev + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-[var(--border-light)] shadow-[var(--shadow-md)] flex items-center justify-center text-[var(--text-primary)] hover:bg-white transition-all"
                    aria-label="Next product image"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Clickable Image Thumbnails */}
            {images.length > 1 && (
              <div
                className="flex gap-3 overflow-x-auto pb-2 pt-1"
                role="region"
                aria-label="Product thumbnail carousel"
              >
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(idx)}
                    aria-label={`View perspective ${idx + 1}`}
                    aria-pressed={selectedImage === idx}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === idx
                        ? "border-[var(--otach-teal)] shadow-[0_0_0_3px_var(--otach-teal-muted)] scale-102"
                        : "border-[var(--border-light)] hover:border-[var(--border-medium)] opacity-75 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: Product Information & Purchase Controls (Desktop: 5 cols) ── */}
          <div className="lg:col-span-5 flex flex-col">
            {/* Category & Stock Indicator */}
            <div className="flex items-center justify-between mb-2">
              <span className="badge-otach badge-teal text-xs">
                {product.category}
              </span>
              {product.inStock && (
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  In Stock & Ready to Ship
                </span>
              )}
            </div>

            {/* Title & Tagline */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text-primary)] leading-tight mb-2">
              {product.name}
            </h1>
            {product.tagline && (
              <p className="text-sm font-medium text-[var(--otach-teal)] mb-4">
                {product.tagline}
              </p>
            )}

            {/* Price Presentation */}
            <div className="flex items-baseline gap-3 pb-6 border-b border-[var(--border-light)] mb-6">
              <span className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-[var(--text-muted)] line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Full Product Description */}
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                About this Timepiece
              </h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Variant Selectors */}
            <div className="space-y-5 pt-4 border-t border-[var(--border-light)] mb-6">
              {/* Color / Finish Selector */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                      Finish:{" "}
                      <span className="font-semibold text-[var(--otach-teal)]">
                        {product.colorNames?.[selectedColor] || `Variant ${selectedColor + 1}`}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-3" role="radiogroup" aria-label="Color finish options">
                    {product.colors.map((color, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedColor(idx)}
                        aria-label={`Finish: ${product.colorNames?.[idx] || color}`}
                        aria-pressed={selectedColor === idx}
                        className={`w-9 h-9 rounded-full border-2 transition-all duration-200 relative ${
                          selectedColor === idx
                            ? "border-[var(--otach-teal)] scale-110 shadow-[0_0_0_3px_var(--otach-teal-muted)]"
                            : "border-[var(--border-medium)] hover:scale-105"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Strap / Model Type Selector */}
              {product.types && product.types.length > 0 && (
                <div>
                  <label
                    htmlFor="variant-type-select"
                    className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2"
                  >
                    Strap / Model Variant
                  </label>
                  <select
                    id="variant-type-select"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-light)] text-sm text-[var(--text-primary)] bg-white focus:outline-none focus:border-[var(--otach-teal)] focus:ring-2 focus:ring-[var(--otach-teal)]/15 transition-all"
                  >
                    {product.types.map((typeOption) => (
                      <option key={typeOption} value={typeOption}>
                        {typeOption} Edition
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Quantity Selector with Minimum 1 */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center border border-[var(--border-light)] rounded-full bg-[var(--surface-white)] overflow-hidden shadow-xs">
                    <button
                      type="button"
                      id="qty-minus"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                      className="w-10 h-10 flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--surface-gray-50)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>

                    <span
                      className="w-12 text-center text-sm font-bold text-[var(--text-primary)]"
                      aria-live="polite"
                    >
                      {quantity}
                    </span>

                    <button
                      type="button"
                      id="qty-plus"
                      onClick={() => setQuantity((q) => Math.min(maxQuantityPerItem, q + 1))}
                      disabled={quantity >= maxQuantityPerItem}
                      aria-label="Increase quantity"
                      className="w-10 h-10 flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--surface-gray-50)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                  </div>
                  <span className="text-xs text-[var(--text-muted)]">
                    Single purchase limits apply
                  </span>
                </div>
              </div>
            </div>

            {/* ── Action Buttons ── */}
            <div className="flex flex-col gap-3 pt-2">
              {/* Add to Cart */}
              <button
                type="button"
                id="add-to-cart-button"
                onClick={handleAddToCart}
                className={`w-full btn-outline btn-lg justify-center gap-2 transition-all duration-200 ${
                  addedToCart
                    ? "!bg-emerald-50 !border-emerald-500 !text-emerald-700"
                    : "!border-[var(--otach-teal)] !text-[var(--otach-teal)] hover:!bg-[var(--otach-teal-pale)]"
                }`}
                aria-live="polite"
              >
                {addedToCart ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                      <line x1="3" x2="21" y1="6" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              {/* Buy Now */}
              <button
                type="button"
                id="buy-now-button"
                onClick={handleBuyNow}
                className="w-full btn-primary btn-lg justify-center shadow-[var(--shadow-md)]"
              >
                Buy Now
              </button>
            </div>

            {/* Shopping Assurance Callouts */}
            <div className="mt-8 pt-6 border-t border-[var(--border-light)] grid grid-cols-2 gap-4 text-xs text-[var(--text-secondary)]">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--otach-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                <span>Insured Express Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--otach-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
                <span>2-Year Global Warranty</span>
              </div>
            </div>

            {/* Specifications Section */}
            {product.features && product.features.length > 0 && (
              <div className="mt-8 pt-6 border-t border-[var(--border-light)]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-4">
                  Technical Specifications & Features
                </h3>
                <ul className="space-y-2.5">
                  {product.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)]"
                    >
                      <svg
                        className="text-[var(--otach-teal)] mt-0.5 shrink-0"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* ── Related Products Section ── */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-14 border-t border-[var(--border-light)]">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="badge-otach badge-teal mb-2">Curated Pairing</span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                  You May Also Admire
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                  Complementary timepieces sharing similar craftsmanship and horological standards.
                </p>
              </div>

              <Link
                href="/items"
                className="text-xs sm:text-sm font-semibold text-[var(--otach-teal)] hover:underline inline-flex items-center gap-1"
              >
                <span>View Full Catalog</span>
                <svg
                  width="14"
                  height="14"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
