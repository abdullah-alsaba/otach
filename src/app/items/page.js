"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

const CATEGORIES = [
  { value: "All", label: "All Timepieces" },
  { value: "analog", label: "Mechanical & Analog" },
  { value: "smartwatch", label: "Smartwatches" },
  { value: "sport", label: "Chronograph & Sport" },
];

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $200", min: 0, max: 200 },
  { label: "$200 – $350", min: 200, max: 350 },
  { label: "Over $350", min: 350, max: Infinity },
];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Alphabetical: A to Z" },
];

function ProductListingContent() {
  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams.get("category");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRangeIndex, setPriceRangeIndex] = useState(0);
  const [sort, setSort] = useState("featured");

  /* Sync category from URL query param if present */
  useEffect(() => {
    if (initialCategoryParam) {
      const match = CATEGORIES.find(
        (c) => c.value.toLowerCase() === initialCategoryParam.toLowerCase()
      );
      if (match) {
        setCategory(match.value);
      } else if (
        initialCategoryParam.toLowerCase() === "automatic" ||
        initialCategoryParam.toLowerCase() === "classic"
      ) {
        setCategory("analog");
      }
    }
  }, [initialCategoryParam]);

  /* Filter and Sort logic */
  const filtered = useMemo(() => {
    let list = [...products];

    // Search filter (name, tagline, description, category)
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline?.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (category !== "All") {
      list = list.filter(
        (p) =>
          p.category.toLowerCase() === category.toLowerCase() ||
          p.types?.some((t) => t.toLowerCase() === category.toLowerCase())
      );
    }

    // Price range filter
    const { min, max } = PRICE_RANGES[priceRangeIndex];
    list = list.filter((p) => p.price >= min && p.price <= max);

    // Sorting
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break; // default featured order
    }

    return list;
  }, [search, category, priceRangeIndex, sort]);

  const hasActiveFilters =
    search.trim() !== "" || category !== "All" || priceRangeIndex !== 0 || sort !== "featured";

  const handleResetFilters = () => {
    setSearch("");
    setCategory("All");
    setPriceRangeIndex(0);
    setSort("featured");
  };

  return (
    <div className="bg-[var(--surface-gray-50)] min-h-screen pb-20">
      {/* ── Page Header ── */}
      <div className="border-b border-[var(--border-light)] bg-white py-12 md:py-16">
        <div className="container-otach">
          <span className="badge-otach badge-teal mb-3">Otach Catalog</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-3">
            The Complete Collection
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Explore our curated horological lineup. Each timepiece is hand-assembled,
            rigorously regulated, and packaged with a certificate of authenticity.
          </p>
        </div>
      </div>

      <div className="container-otach pt-8 sm:pt-10">
        {/* ── Search & Filter Panel ── */}
        <div className="bg-white rounded-2xl border border-[var(--border-light)] p-5 sm:p-6 mb-8 shadow-[var(--shadow-xs)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
            {/* Search Input */}
            <div className="lg:col-span-5">
              <label
                htmlFor="items-search-input"
                className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5"
              >
                Search by Product Name
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  id="items-search-input"
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search timepieces, e.g. Celestial, Diver, Gold..."
                  className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-[var(--border-light)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] bg-[var(--surface-white)] focus:outline-none focus:border-[var(--otach-teal)] focus:ring-2 focus:ring-[var(--otach-teal)]/15 transition-all"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search input"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] p-0.5 text-xs font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Category Dropdown */}
            <div className="lg:col-span-3">
              <label
                htmlFor="items-category-select"
                className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5"
              >
                Category
              </label>
              <select
                id="items-category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-light)] text-sm text-[var(--text-primary)] bg-[var(--surface-white)] focus:outline-none focus:border-[var(--otach-teal)] focus:ring-2 focus:ring-[var(--otach-teal)]/15 transition-all"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Dropdown */}
            <div className="lg:col-span-2">
              <label
                htmlFor="items-price-select"
                className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5"
              >
                Price Range
              </label>
              <select
                id="items-price-select"
                value={priceRangeIndex}
                onChange={(e) => setPriceRangeIndex(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-light)] text-sm text-[var(--text-primary)] bg-[var(--surface-white)] focus:outline-none focus:border-[var(--otach-teal)] focus:ring-2 focus:ring-[var(--otach-teal)]/15 transition-all"
              >
                {PRICE_RANGES.map((r, i) => (
                  <option key={r.label} value={i}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div className="lg:col-span-2">
              <label
                htmlFor="items-sort-select"
                className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5"
              >
                Sort By
              </label>
              <select
                id="items-sort-select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-light)] text-sm text-[var(--text-primary)] bg-[var(--surface-white)] focus:outline-none focus:border-[var(--otach-teal)] focus:ring-2 focus:ring-[var(--otach-teal)]/15 transition-all"
              >
                {SORT_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Category Filter Pills */}
          <div className="mt-5 pt-4 border-t border-[var(--border-light)] flex flex-wrap items-center justify-between gap-3">
            <div
              className="flex flex-wrap items-center gap-2"
              role="group"
              aria-label="Category quick filters"
            >
              <span className="text-xs font-medium text-[var(--text-muted)] mr-1">
                Filter:
              </span>
              {CATEGORIES.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  id={`filter-pill-${value}`}
                  onClick={() => setCategory(value)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                    category === value
                      ? "bg-[var(--otach-teal)] text-white border-[var(--otach-teal)] shadow-xs"
                      : "bg-[var(--surface-white)] text-[var(--text-secondary)] border-[var(--border-light)] hover:border-[var(--otach-teal)] hover:text-[var(--otach-teal)]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                id="items-clear-all"
                onClick={handleResetFilters}
                className="text-xs font-semibold text-[var(--otach-teal)] hover:underline inline-flex items-center gap-1"
              >
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
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                <span>Clear All Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* ── Results Count Bar ── */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-medium text-[var(--text-secondary)]">
            Showing <span className="font-bold text-[var(--text-primary)]">{filtered.length}</span>{" "}
            of <span className="font-bold text-[var(--text-primary)]">{products.length}</span> timepieces
          </p>

          {category !== "All" && (
            <span className="badge-otach badge-teal">
              Active: {CATEGORIES.find((c) => c.value === category)?.label}
            </span>
          )}
        </div>

        {/* ── Product Grid or Empty State ── */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[var(--border-light)] p-12 sm:p-16 text-center max-w-xl mx-auto shadow-[var(--shadow-xs)] my-8">
            <div className="w-16 h-16 rounded-full bg-[var(--surface-gray-100)] text-[var(--otach-teal)] flex items-center justify-center mx-auto mb-4 border border-[var(--border-light)]">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
              No Timepieces Found
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
              We couldn&apos;t find any watches matching your search term or current filter criteria.
              Please adjust your filters or reset to view our full collection.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="btn-primary btn-sm"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ItemsPage() {
  return (
    <Suspense
      fallback={
        <div className="container-otach py-20 text-center text-sm text-[var(--text-muted)]">
          Loading timepiece collection…
        </div>
      }
    >
      <ProductListingContent />
    </Suspense>
  );
}
