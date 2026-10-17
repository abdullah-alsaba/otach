"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";

const CATEGORY_OPTIONS = [
  { value: "analog", label: "Mechanical & Analog" },
  { value: "smartwatch", label: "Smartwatches" },
  { value: "sport", label: "Chronograph & Sport" },
];

export default function AddProductPage() {
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("analog");
  const [imageUrl, setImageUrl] = useState("");

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const validate = () => {
    const errs = {};

    if (!title.trim()) {
      errs.title = "Product title is required.";
    } else if (title.trim().length < 3) {
      errs.title = "Title must be at least 3 characters.";
    }

    if (!shortDesc.trim()) {
      errs.shortDesc = "Short description is required.";
    } else if (shortDesc.trim().length < 5) {
      errs.shortDesc = "Short description must be at least 5 characters.";
    }

    if (!fullDesc.trim()) {
      errs.fullDesc = "Full description is required.";
    } else if (fullDesc.trim().length < 20) {
      errs.fullDesc = "Full description must be at least 20 characters.";
    }

    if (!price) {
      errs.price = "Price is required.";
    } else {
      const numPrice = parseFloat(price);
      if (isNaN(numPrice) || numPrice <= 0) {
        errs.price = "Price must be a valid positive number.";
      }
    }

    if (!category) {
      errs.category = "Category is required.";
    }

    if (imageUrl.trim()) {
      try {
        new URL(imageUrl.trim());
      } catch {
        errs.imageUrl = "Please enter a valid absolute URL (e.g., https://...).";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // ─────────────────────────────────────────────────────────────
      // FIRESTORE PERSISTENCE INTEGRATION POINT:
      // Replace this block with your Firestore collection call:
      //
      // import { collection, addDoc, serverTimestamp } from "firebase/firestore";
      // import { db } from "@/lib/firebase";
      //
      // const docRef = await addDoc(collection(db, "products"), {
      //   name: title.trim(),
      //   tagline: shortDesc.trim(),
      //   description: fullDesc.trim(),
      //   price: parseFloat(price),
      //   category: category,
      //   image: imageUrl.trim() || "/images/watch-classic.jpg",
      //   createdAt: serverTimestamp(),
      // });
      // ─────────────────────────────────────────────────────────────

      // Simulating validation / UI cycle without claiming database persistence
      await new Promise((resolve) => setTimeout(resolve, 700));

      setSubmissionStatus({
        type: "success",
        title: "Validation Passed — Ready for Firestore",
        message:
          "Form data is valid and structured for persistence. No database is currently connected, so this item has not been saved permanently.",
      });
    } catch (err) {
      setSubmissionStatus({
        type: "error",
        title: "Submission Error",
        message: err.message || "An unexpected error occurred during form submission.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setTitle("");
    setShortDesc("");
    setFullDesc("");
    setPrice("");
    setCategory("analog");
    setImageUrl("");
    setErrors({});
    setSubmissionStatus(null);
  };

  return (
    <div className="bg-[var(--surface-gray-50)] min-h-[calc(100vh-4rem)] pb-20">
      {/* ── Breadcrumb & Navigation Header ── */}
      <div className="border-b border-[var(--border-light)] bg-white py-6">
        <div className="container-otach flex flex-wrap items-center justify-between gap-4">
          <div>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-1">
              <Link href="/" className="hover:text-[var(--otach-teal)] transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/items" className="hover:text-[var(--otach-teal)] transition-colors">
                Shop
              </Link>
              <span>/</span>
              <Link href="/items/manage" className="hover:text-[var(--otach-teal)] transition-colors">
                Manage
              </Link>
              <span>/</span>
              <span className="text-[var(--text-primary)] font-semibold">Add Timepiece</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Add New Timepiece
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/items/manage" className="btn-outline btn-sm">
              Manage Products
            </Link>
            <Link href="/items" className="btn-ghost btn-sm">
              View Catalog
            </Link>
          </div>
        </div>
      </div>

      <div className="container-otach pt-8 sm:pt-10 max-w-3xl">
        {/* Status Callout Banner */}
        {submissionStatus && (
          <div
            className={`p-4 sm:p-5 rounded-2xl mb-8 border animate-fade-in ${
              submissionStatus.type === "success"
                ? "bg-[var(--otach-teal-pale)] border-[var(--otach-teal)]/30 text-[var(--otach-teal-dark)]"
                : "bg-red-50 border-red-200 text-red-700"
            }`}
            role="status"
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  submissionStatus.type === "success"
                    ? "bg-[var(--otach-teal)] text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {submissionStatus.type === "success" ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm mb-1">{submissionStatus.title}</h3>
                <p className="text-xs leading-relaxed opacity-90">{submissionStatus.message}</p>
                {submissionStatus.type === "success" && (
                  <div className="mt-3 flex gap-3">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="text-xs font-bold underline hover:opacity-80"
                    >
                      Clear & Add Another
                    </button>
                    <Link
                      href="/items/manage"
                      className="text-xs font-bold underline hover:opacity-80"
                    >
                      Return to Product Management →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Add Product Form ── */}
        <div className="card-otach p-6 sm:p-10 bg-white shadow-[var(--shadow-sm)]">
          <div className="border-b border-[var(--border-light)] pb-5 mb-6">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Timepiece Information
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Provide authentic specifications for the timepiece. Form submission is configured ready for Firestore.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Title / Name */}
            <div>
              <label
                htmlFor="product-title"
                className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-1.5"
              >
                Product Title <span className="text-red-500">*</span>
              </label>
              <input
                id="product-title"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
                }}
                placeholder="e.g. Celestial Chronometer"
                className={`input-otach ${
                  errors.title ? "!border-red-500 focus:!ring-red-500/20" : ""
                }`}
                aria-invalid={errors.title ? "true" : "false"}
                aria-describedby={errors.title ? "title-error" : undefined}
                disabled={isSubmitting}
              />
              {errors.title && (
                <p id="title-error" className="text-xs text-red-600 mt-1 font-medium">
                  {errors.title}
                </p>
              )}
            </div>

            {/* Short Description */}
            <div>
              <label
                htmlFor="product-short-desc"
                className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-1.5"
              >
                Short Description / Tagline <span className="text-red-500">*</span>
              </label>
              <input
                id="product-short-desc"
                type="text"
                value={shortDesc}
                onChange={(e) => {
                  setShortDesc(e.target.value);
                  if (errors.shortDesc) setErrors((prev) => ({ ...prev, shortDesc: null }));
                }}
                placeholder="e.g. Precision Swiss mechanical caliber with sapphire back"
                className={`input-otach ${
                  errors.shortDesc ? "!border-red-500 focus:!ring-red-500/20" : ""
                }`}
                aria-invalid={errors.shortDesc ? "true" : "false"}
                aria-describedby={errors.shortDesc ? "short-desc-error" : undefined}
                disabled={isSubmitting}
              />
              {errors.shortDesc && (
                <p id="short-desc-error" className="text-xs text-red-600 mt-1 font-medium">
                  {errors.shortDesc}
                </p>
              )}
            </div>

            {/* Price & Category in 2 Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Price */}
              <div>
                <label
                  htmlFor="product-price"
                  className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-1.5"
                >
                  Price (USD) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[var(--text-muted)] font-bold">
                    $
                  </span>
                  <input
                    id="product-price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                      if (errors.price) setErrors((prev) => ({ ...prev, price: null }));
                    }}
                    placeholder="295.00"
                    className={`input-otach pl-8 ${
                      errors.price ? "!border-red-500 focus:!ring-red-500/20" : ""
                    }`}
                    aria-invalid={errors.price ? "true" : "false"}
                    aria-describedby={errors.price ? "price-error" : undefined}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.price && (
                  <p id="price-error" className="text-xs text-red-600 mt-1 font-medium">
                    {errors.price}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="product-category"
                  className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-1.5"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="product-category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    if (errors.category) setErrors((prev) => ({ ...prev, category: null }));
                  }}
                  className={`input-otach bg-white ${
                    errors.category ? "!border-red-500" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  {CATEGORY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-xs text-red-600 mt-1 font-medium">
                    {errors.category}
                  </p>
                )}
              </div>
            </div>

            {/* Full Description */}
            <div>
              <label
                htmlFor="product-full-desc"
                className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-1.5"
              >
                Full Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="product-full-desc"
                rows={4}
                value={fullDesc}
                onChange={(e) => {
                  setFullDesc(e.target.value);
                  if (errors.fullDesc) setErrors((prev) => ({ ...prev, fullDesc: null }));
                }}
                placeholder="Provide detailed information regarding the movement, case dimensions, crystal, water resistance, and craftsmanship..."
                className={`input-otach resize-y ${
                  errors.fullDesc ? "!border-red-500 focus:!ring-red-500/20" : ""
                }`}
                aria-invalid={errors.fullDesc ? "true" : "false"}
                aria-describedby={errors.fullDesc ? "full-desc-error" : undefined}
                disabled={isSubmitting}
              />
              {errors.fullDesc && (
                <p id="full-desc-error" className="text-xs text-red-600 mt-1 font-medium">
                  {errors.fullDesc}
                </p>
              )}
            </div>

            {/* Optional Image URL */}
            <div>
              <label
                htmlFor="product-image-url"
                className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-1.5"
              >
                Image URL <span className="text-xs font-normal text-[var(--text-muted)]">(Optional)</span>
              </label>
              <input
                id="product-image-url"
                type="url"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  if (errors.imageUrl) setErrors((prev) => ({ ...prev, imageUrl: null }));
                }}
                placeholder="https://example.com/watch-photo.jpg"
                className={`input-otach ${
                  errors.imageUrl ? "!border-red-500 focus:!ring-red-500/20" : ""
                }`}
                aria-invalid={errors.imageUrl ? "true" : "false"}
                aria-describedby={errors.imageUrl ? "image-url-error" : undefined}
                disabled={isSubmitting}
              />
              {errors.imageUrl ? (
                <p id="image-url-error" className="text-xs text-red-600 mt-1 font-medium">
                  {errors.imageUrl}
                </p>
              ) : (
                <p className="text-[11px] text-[var(--text-muted)] mt-1">
                  Leave blank to use the standard Otach collection default photograph.
                </p>
              )}
            </div>

            {/* Submit Action Buttons */}
            <div className="pt-4 border-t border-[var(--border-light)] flex flex-wrap items-center justify-between gap-4">
              <Link href="/items/manage" className="btn-ghost btn-sm">
                Cancel
              </Link>

              <div className="flex items-center gap-3">
                <Button
                  type="submit"
                  isDisabled={isSubmitting}
                  className="btn-primary btn-lg"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      <span>Validating Form…</span>
                    </span>
                  ) : (
                    "Add Product (Ready for Firestore)"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
