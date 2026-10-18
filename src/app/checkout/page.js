"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "@/lib/notify";
import RequireAuth from "@/components/RequireAuth";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/cart";

const REQUIRED_FIELDS = [
  { name: "fullName", label: "Full Name", autoComplete: "name", placeholder: "Alexander Wright" },
  { name: "email", label: "Email Address", type: "email", autoComplete: "email", placeholder: "name@example.com" },
  { name: "phone", label: "Phone Number", type: "tel", autoComplete: "tel", placeholder: "+1 555 0100" },
  { name: "address", label: "Street Address", autoComplete: "street-address", placeholder: "12 Rue de la Paix" },
  { name: "city", label: "City", autoComplete: "address-level2", placeholder: "Paris" },
  { name: "postalCode", label: "Postal Code", autoComplete: "postal-code", placeholder: "75002" },
  { name: "country", label: "Country", autoComplete: "country-name", placeholder: "France" },
];

const EMPTY_FORM = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  country: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[\d\s().-]{7,24}$/;

/* Short, deliberate processing window so the button state and the
   "Placing Your Order…" label are genuinely visible to the customer. */
const PLACE_ORDER_DELAY_MS = 900;

/* Human-readable, non-sequential purchase reference, e.g. OT-2026-K7Q4XM.
   Ambiguous characters (I, O, 0, 1) are left out so it is easy to read back. */
function createOrderReference() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(6);

  if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
    window.crypto.getRandomValues(bytes);
  } else {
    for (let index = 0; index < bytes.length; index += 1) {
      bytes[index] = Math.floor(Math.random() * 256);
    }
  }

  let suffix = "";
  for (const byte of bytes) suffix += alphabet[byte % alphabet.length];

  return `OT-${new Date().getFullYear()}-${suffix}`;
}

function OrderSuccessModal({ order, onClose }) {
  const closeButtonRef = useRef(null);

  /* Escape closes the confirmation, focus moves into the dialog, and the page
     behind it is locked so the popup behaves like a real modal. */
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const rows = [
    { label: "Customer", value: order.customerName },
    { label: "Order Reference", value: order.reference, mono: true },
    {
      label: "Items",
      value: `${order.itemCount} timepiece${order.itemCount === 1 ? "" : "s"}`,
    },
    { label: "Order Total", value: formatPrice(order.total), emphasis: true },
  ];

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-success-title"
        aria-describedby="order-success-message"
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-3xl border border-[var(--border-light)] shadow-[var(--shadow-lg)] p-6 sm:p-8 animate-scale-in"
      >
        <button
          type="button"
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close this order confirmation"
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-[var(--text-muted)] bg-[var(--surface-gray-50)] border border-[var(--border-light)] hover:text-[var(--otach-teal)] hover:border-[var(--otach-teal)]/40 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--otach-teal)]"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--otach-teal-pale)] text-[var(--otach-teal)] flex items-center justify-center mb-5 animate-scale-in">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>

          <h2
            id="order-success-title"
            className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]"
          >
            Thank You for Your Order
          </h2>
          <p
            id="order-success-message"
            className="text-xs sm:text-sm text-[var(--text-secondary)] mt-3 leading-relaxed max-w-md"
          >
            Thank you for choosing Otach. Your order details are ready, and we appreciate your
            trust in our craftsmanship.
          </p>
        </div>

        <dl className="mt-7 rounded-2xl border border-[var(--border-light)] bg-[var(--surface-gray-50)] overflow-hidden divide-y divide-[var(--border-light)]">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-4 px-4 py-3">
              <dt className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                {row.label}
              </dt>
              <dd
                className={`text-right ${
                  row.emphasis
                    ? "text-base font-extrabold text-[var(--text-primary)]"
                    : "text-sm font-semibold text-[var(--text-primary)]"
                } ${row.mono ? "tracking-[0.12em]" : ""}`}
              >
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        <p className="text-xs text-[var(--text-secondary)] mt-5 leading-relaxed text-center">
          Keep your order reference safe — quote it whenever you contact Otach about this order.
        </p>

        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/items" onClick={onClose} className="btn-primary justify-center">
            Continue Shopping
          </Link>
          <Link href="/" onClick={onClose} className="btn-outline justify-center">
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

function CheckoutContent() {
  const { user } = useAuth();
  const { items, itemCount, subtotal, hydrated, clearCart } = useCart();
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [order, setOrder] = useState(null);

  /* Guards against a second submission reaching the completion step, even if
     two click events land in the same tick. */
  const isPlacingRef = useRef(false);

  /* Fields the visitor has not typed into yet fall back to the signed-in Otach
     account details, so no state-syncing effect is needed. */
  const values = {
    ...EMPTY_FORM,
    ...(user?.displayName ? { fullName: user.displayName } : null),
    ...(user?.email ? { email: user.email } : null),
    ...form,
  };

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!values.fullName.trim()) nextErrors.fullName = "Full name is required.";

    if (!values.email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!EMAIL_PATTERN.test(values.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!values.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    } else if (
      !PHONE_PATTERN.test(values.phone.trim()) ||
      values.phone.replace(/\D/g, "").length < 7
    ) {
      nextErrors.phone = "Please enter a valid phone number.";
    }

    if (!values.address.trim()) nextErrors.address = "Street address is required.";
    if (!values.city.trim()) nextErrors.city = "City is required.";
    if (!values.postalCode.trim()) nextErrors.postalCode = "Postal code is required.";
    if (!values.country.trim()) nextErrors.country = "Country is required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleCloseSuccess = useCallback(() => setOrder(null), []);

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    if (isPlacingRef.current) return;

    /* Nothing is submitted without a bag — the entered details are kept as they
       are, so the customer only has to add a timepiece. */
    if (items.length === 0) {
      toast.warning("Your bag is empty. Add a timepiece to continue.");
      return;
    }

    if (!validate()) {
      toast.warning("Please check the highlighted delivery details.");
      return;
    }

    isPlacingRef.current = true;
    setIsProcessing(true);

    /* The order is captured before the bag is emptied, so the confirmation
       always describes the purchase that was actually placed. */
    const placedOrder = {
      reference: createOrderReference(),
      customerName: values.fullName.trim(),
      itemCount,
      total: subtotal,
    };

    await new Promise((resolve) => {
      setTimeout(resolve, PLACE_ORDER_DELAY_MS);
    });

    setOrder(placedOrder);
    clearCart();
    setIsProcessing(false);
    isPlacingRef.current = false;

    toast.success("Your order has been placed successfully. Thank you for choosing Otach!");
  };

  return (
    <div className="bg-[var(--surface-gray-50)] min-h-screen">
      {/* ── Page Header ── */}
      <div className="border-b border-[var(--border-light)] bg-white pt-14 pb-16">
        <div className="container-otach">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-3">
            <Link href="/items" className="hover:text-[var(--otach-teal)] transition-colors">
              Shop
            </Link>
            <span>/</span>
            <Link href="/cart" className="hover:text-[var(--otach-teal)] transition-colors">
              Bag
            </Link>
            <span>/</span>
            <span className="text-[var(--text-primary)] font-semibold">Checkout</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-3">
            Checkout
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-[640px] leading-relaxed">
            Confirm your delivery details and review your order summary before placing the order.
          </p>
        </div>
      </div>

      <div className="container-otach pt-16 pb-24">
        {!hydrated ? (
          <div className="bg-white rounded-3xl border border-[var(--border-light)] p-12 text-center shadow-xs">
            <p className="text-sm text-[var(--text-muted)]">Loading your bag…</p>
          </div>
        ) : items.length === 0 ? (
          /* ── Empty Bag State: checkout is blocked ── */
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
              Your Bag Is Empty
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto mb-6 leading-relaxed">
              Add a timepiece to your bag before proceeding to checkout.
            </p>
            <Link href="/items" className="btn-primary btn-sm">
              Browse Timepieces
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* ── Left: Delivery Details Form ── */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-[var(--border-light)] shadow-xs p-6 sm:p-8">
                <h2 className="text-sm font-bold text-[var(--text-primary)] mb-1">
                  Delivery Details
                </h2>
                <p className="text-xs text-[var(--text-muted)] mb-6">
                  All fields are required.
                </p>

                <form onSubmit={handlePlaceOrder} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {REQUIRED_FIELDS.map(({ name, label, type = "text", autoComplete, placeholder }) => (
                      <div
                        key={name}
                        className={name === "address" ? "sm:col-span-2" : ""}
                      >
                        <label
                          htmlFor={`checkout-${name}`}
                          className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2"
                        >
                          {label}
                        </label>
                        <input
                          id={`checkout-${name}`}
                          name={name}
                          type={type}
                          autoComplete={autoComplete}
                          value={values[name]}
                          onChange={(e) => handleChange(name, e.target.value)}
                          placeholder={placeholder}
                          disabled={isProcessing}
                          aria-invalid={errors[name] ? "true" : "false"}
                          aria-describedby={errors[name] ? `checkout-${name}-error` : undefined}
                          className={`w-full h-11 px-3.5 rounded-xl border text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] bg-[var(--surface-white)] focus:outline-none focus:border-[var(--otach-teal)] focus:ring-2 focus:ring-[var(--otach-teal)]/15 transition-all disabled:opacity-60 ${
                            errors[name]
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500/15"
                              : "border-[var(--border-light)]"
                          }`}
                        />
                        {errors[name] && (
                          <p
                            id={`checkout-${name}-error`}
                            className="text-xs text-red-600 mt-1.5 font-medium"
                          >
                            {errors[name]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      id="place-order-button"
                      disabled={isProcessing}
                      aria-busy={isProcessing}
                      className="w-full btn-primary btn-lg justify-center"
                    >
                      {isProcessing ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Placing Your Order…
                        </>
                      ) : (
                        "Place Order"
                      )}
                    </button>
                    <p className="text-xs text-[var(--text-muted)] mt-3 leading-relaxed">
                      Your details are used only to arrange delivery of this order.
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* ── Right: Order Summary ── */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl border border-[var(--border-light)] shadow-xs p-6 lg:sticky lg:top-28">
                <h2 className="text-sm font-bold text-[var(--text-primary)] mb-4">
                  Order Summary
                </h2>

                <ul className="divide-y divide-[var(--border-light)] max-h-72 overflow-y-auto">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-center gap-3 py-3">
                      <div className="relative w-14 h-14 shrink-0 rounded-xl overflow-hidden border border-[var(--border-light)] bg-[var(--surface-gray-50)]">
                        <Image
                          src={item.image || "/images/watch-classic.jpg"}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[var(--text-primary)] truncate">
                          {item.title}
                        </p>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">
                          {item.quantity} × {formatPrice(item.price)}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-[var(--text-primary)] shrink-0">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>

                <dl className="space-y-3 text-sm pt-4 border-t border-[var(--border-light)]">
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

                <Link href="/cart" className="btn-outline !w-full justify-center mt-5">
                  Back to Bag
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {order && <OrderSuccessModal order={order} onClose={handleCloseSuccess} />}
    </div>
  );
}

/* Checkout is a protected shopping flow: signed-out visitors are sent to sign
   in (returning here afterwards) before any delivery details are collected. */
export default function CheckoutPage() {
  return (
    <RequireAuth>
      <CheckoutContent />
    </RequireAuth>
  );
}
