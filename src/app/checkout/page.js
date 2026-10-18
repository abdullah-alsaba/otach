"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "@heroui/react";
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

export default function CheckoutPage() {
  const { user } = useAuth();
  const { items, itemCount, subtotal, hydrated } = useCart();
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [submissionNotice, setSubmissionNotice] = useState("");

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
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!values.phone.trim()) nextErrors.phone = "Phone number is required.";
    if (!values.address.trim()) nextErrors.address = "Street address is required.";
    if (!values.city.trim()) nextErrors.city = "City is required.";
    if (!values.postalCode.trim()) nextErrors.postalCode = "Postal code is required.";
    if (!values.country.trim()) nextErrors.country = "Country is required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmissionNotice("");

    if (items.length === 0) {
      toast.warning("Your bag is empty — add a timepiece before checking out.");
      return;
    }

    if (!validate()) {
      toast.warning("Please complete the highlighted delivery details.");
      return;
    }

    /* No order or payment service is configured for this project, so no order
       can genuinely be created here. We never report a false success and we
       never clear the bag for an order that was not accepted. */
    setSubmissionNotice(
      "Order submission is not available: this storefront has no order or payment service connected. " +
        "Firestore is only used for your own catalogue items, so nothing was charged and no order was recorded. " +
        "Your bag has been kept so you can complete the purchase once checkout is integrated."
    );
    toast.warning("Order placement is not available — no order or payment service is connected.");
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

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
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
                          aria-invalid={errors[name] ? "true" : "false"}
                          aria-describedby={errors[name] ? `checkout-${name}-error` : undefined}
                          className={`w-full h-11 px-3.5 rounded-xl border text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] bg-[var(--surface-white)] focus:outline-none focus:border-[var(--otach-teal)] focus:ring-2 focus:ring-[var(--otach-teal)]/15 transition-all ${
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

                  {/* Submission status */}
                  {submissionNotice && (
                    <div
                      className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 leading-relaxed flex items-start gap-2"
                      role="status"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="shrink-0 mt-0.5"
                        aria-hidden="true"
                      >
                        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                      <span>{submissionNotice}</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      id="place-order-button"
                      className="w-full btn-primary btn-lg justify-center"
                    >
                      Place Order
                    </button>
                    <p className="text-xs text-[var(--text-muted)] mt-3 leading-relaxed">
                      No payment is collected here. This storefront is not yet connected to an order
                      or payment provider, so placing an order is currently unavailable.
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
    </div>
  );
}
