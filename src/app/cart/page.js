"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "@/lib/notify";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/cart";

export default function CartPage() {
  const {
    items,
    itemCount,
    subtotal,
    hydrated,
    maxQuantityPerItem,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const handleIncrease = (item) => {
    if (item.quantity >= maxQuantityPerItem) {
      toast.warning(`You can keep up to ${maxQuantityPerItem} of this timepiece in your bag.`);
      return;
    }

    increaseQuantity(item.id);
  };

  const handleDecrease = (item) => {
    if (item.quantity <= 1) {
      handleRemove(item);
      return;
    }

    decreaseQuantity(item.id);
  };

  const handleQuantityInput = (item, value) => {
    const numeric = Number(value);

    if (!Number.isFinite(numeric) || numeric < 1) {
      handleRemove(item);
      return;
    }

    if (numeric > maxQuantityPerItem) {
      updateQuantity(item.id, maxQuantityPerItem);
      toast.warning(`You can keep up to ${maxQuantityPerItem} of this timepiece in your bag.`);
      return;
    }

    updateQuantity(item.id, numeric);
  };

  const handleRemove = (item) => {
    removeItem(item.id);
    toast.success(`${item.title} has been removed from your bag.`);
  };

  const handleClear = () => {
    clearCart();
    toast.success("Your shopping bag is now empty.");
  };

  return (
    <div className="bg-[var(--surface-gray-50)] min-h-screen">
      {/* ── Page Header ── */}
      <div className="border-b border-[var(--border-light)] bg-white pt-14 pb-16">
        <div className="container-otach">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--otach-teal)] block mb-2">
            Your Selection
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-3">
            Shopping Bag
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-[640px] leading-relaxed">
            Review your selected timepieces, adjust quantities, and continue to checkout when
            you are ready.
          </p>
        </div>
      </div>

      <div className="container-otach pt-16 pb-24">
        {!hydrated ? (
          <div className="bg-white rounded-3xl border border-[var(--border-light)] p-12 text-center shadow-xs">
            <p className="text-sm text-[var(--text-muted)]">Loading your bag…</p>
          </div>
        ) : items.length === 0 ? (
          /* ── Empty Bag State ── */
          <div className="bg-white rounded-3xl border border-[var(--border-light)] p-12 text-center my-8 shadow-xs">
            <div className="w-14 h-14 rounded-full bg-[var(--otach-teal-pale)] text-[var(--otach-teal)] flex items-center justify-center mx-auto mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <line x1="3" x2="21" y1="6" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">
              Your Shopping Bag Is Empty
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto mb-6 leading-relaxed">
              Explore our curated horological timepieces and add a piece you admire to begin your
              order.
            </p>
            <Link href="/items" className="btn-primary btn-sm">
              Browse Timepieces
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* ── Left: Cart Lines ── */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-3xl border border-[var(--border-light)] shadow-xs overflow-hidden">
                <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 border-b border-[var(--border-light)]">
                  <h2 className="text-sm font-bold text-[var(--text-primary)]">
                    {itemCount} {itemCount === 1 ? "Item" : "Items"}
                  </h2>
                  <button
                    type="button"
                    onClick={handleClear}
                    className="text-xs font-semibold text-red-600 hover:underline focus:outline-none"
                  >
                    Clear Bag
                  </button>
                </div>

                <ul className="divide-y divide-[var(--border-light)]">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 sm:p-6"
                    >
                      <Link
                        href={`/items/${item.id}`}
                        className="relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden border border-[var(--border-light)] bg-[var(--surface-gray-50)]"
                        aria-label={`View ${item.title}`}
                      >
                        <Image
                          src={item.image || "/images/watch-classic.jpg"}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </Link>

                      <div className="flex-1 min-w-0">
                        {item.category && (
                          <span className="text-xs font-bold uppercase tracking-wider text-[var(--otach-teal)]">
                            {item.category}
                          </span>
                        )}
                        <Link
                          href={`/items/${item.id}`}
                          className="block text-base font-bold text-[var(--text-primary)] hover:text-[var(--otach-teal)] transition-colors truncate"
                        >
                          {item.title}
                        </Link>
                        <p className="text-xs text-[var(--text-muted)] mt-1">
                          {formatPrice(item.price)} each
                        </p>

                        <div className="flex flex-wrap items-center gap-4 mt-3">
                          <div className="inline-flex items-center border border-[var(--border-light)] rounded-full overflow-hidden bg-[var(--surface-white)] shadow-xs">
                            <button
                              type="button"
                              onClick={() => handleDecrease(item)}
                              aria-label={`Decrease quantity of ${item.title}`}
                              className="w-9 h-9 flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--surface-gray-50)] transition-colors"
                            >
                              −
                            </button>
                            <input
                              type="number"
                              min="1"
                              max={maxQuantityPerItem}
                              value={item.quantity}
                              onChange={(e) => handleQuantityInput(item, e.target.value)}
                              aria-label={`Quantity of ${item.title}`}
                              className="w-12 h-9 text-center text-sm font-bold text-[var(--text-primary)] bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            />
                            <button
                              type="button"
                              onClick={() => handleIncrease(item)}
                              disabled={item.quantity >= maxQuantityPerItem}
                              aria-label={`Increase quantity of ${item.title}`}
                              className="w-9 h-9 flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--surface-gray-50)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemove(item)}
                            className="text-xs font-semibold text-red-600 hover:underline focus:outline-none"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="sm:text-right shrink-0">
                        <span className="block text-xs uppercase font-bold text-[var(--text-muted)] tracking-wider">
                          Line Total
                        </span>
                        <span className="text-lg font-extrabold text-[var(--text-primary)]">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/items"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--otach-teal)] hover:underline mt-6 focus:outline-none"
              >
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
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                <span>Continue Shopping</span>
              </Link>
            </div>

            {/* ── Right: Order Summary ── */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-3xl border border-[var(--border-light)] shadow-xs p-6 lg:sticky lg:top-28">
                <h2 className="text-sm font-bold text-[var(--text-primary)] mb-4">
                  Order Summary
                </h2>

                <dl className="space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-[var(--text-secondary)]">Items</dt>
                    <dd className="font-semibold text-[var(--text-primary)]">{itemCount}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-[var(--text-secondary)]">Subtotal</dt>
                    <dd className="font-semibold text-[var(--text-primary)]">
                      {formatPrice(subtotal)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 pt-3 border-t border-[var(--border-light)]">
                    <dt className="text-sm font-bold text-[var(--text-primary)]">Order Total</dt>
                    <dd className="text-lg font-extrabold text-[var(--text-primary)]">
                      {formatPrice(subtotal)}
                    </dd>
                  </div>
                </dl>

                <p className="text-xs text-[var(--text-muted)] leading-relaxed mt-4">
                  Shipping and taxes are not calculated — this storefront has no payment or order
                  service connected yet.
                </p>

                <Link
                  href="/checkout"
                  className="btn-primary btn-lg !w-full justify-center mt-5"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  href="/items"
                  className="btn-outline !w-full justify-center mt-3"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
