"use client";

import { useState, useMemo, Suspense } from "react";
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

function resolveCategory(param) {
  if (!param) return "All";
  const match = CATEGORIES.find(
    (c) => c.value.toLowerCase() === param.toLowerCase()
  );
  if (match) return match.value;
  if (
    param.toLowerCase() === "automatic" ||
    param.toLowerCase() === "classic"
  ) {
    return "analog";
  }
  return "All";
}

function ProductListingContent() {
  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams.get("category");

  const [search, setSearch] = useState("");
  const [userCategory, setUserCategory] = useState(null);
  const [prevParam, setPrevParam] = useState(initialCategoryParam);
  const [priceRangeIndex, setPriceRangeIndex] = useState(0);
  const [sort, setSort] = useState("featured");

  /* Reset manual category selection if URL category param changes */
  if (prevParam !== initialCategoryParam) {
    setPrevParam(initialCategoryParam);
    setUserCategory(null);
  }

  const category = userCategory ?? resolveCategory(initialCategoryParam);
  const setCategory = (val) => setUserCategory(val);

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
    setUserCategory("All");
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
        {/* ── Search & Filter Control Panel ── */}
        <div className="bg-white rounded-2xl border border-[var(--border-light)] p-5 sm:p-7 mb-8 shadow-xs">
          {/* Top Row: Search and Sort */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            {/* Search Input */}
            <div className="md:col-span-7 lg:col-span-8">
              <label
                htmlFor="items-search-input"
                className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2"
              >
                Search Collection
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none"
                  width="18"
                  height="18"
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
                  placeholder="Search timepieces by name, collection, or style..."
                  className="w-full h-11 pl-11 pr-10 rounded-xl border border-[var(--border-light)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] bg-[var(--surface-white)] focus:outline-none focus:border-[var(--otach-teal)] focus:ring-2 focus:ring-[var(--otach-teal)]/15 transition-all"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search input"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 text-xs font-bold transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Sort Order */}
            <div className="md:col-span-5 lg:col-span-4">
              <label
                htmlFor="items-sort-select"
                className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2"
              >
                Sort Order
              </label>
              <div className="relative">
                <select
                  id="items-sort-select"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full h-11 pl-3.5 pr-9 rounded-xl border border-[var(--border-light)] text-sm text-[var(--text-primary)] bg-[var(--surface-white)] focus:outline-none focus:border-[var(--otach-teal)] focus:ring-2 focus:ring-[var(--otach-teal)]/15 transition-all appearance-none cursor-pointer"
                >
                  {SORT_OPTIONS.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                <svg
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none"
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
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom Row: Category Quick Pills + Price Range Filter */}
          <div className="mt-5 pt-5 border-t border-[var(--border-light)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="w-full lg:w-auto">
              <span className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                Category
              </span>
              <div
                className="flex flex-wrap items-center gap-2"
                role="group"
                aria-label="Category filters"
              >
                {CATEGORIES.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    id={`filter-pill-${value}`}
                    onClick={() => setCategory(value)}
                    className={`h-9 px-3.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                      category === value
                        ? "bg-[var(--otach-teal)] text-white border-[var(--otach-teal)] shadow-xs"
                        : "bg-white text-[var(--text-secondary)] border-[var(--border-light)] hover:border-[var(--otach-teal)] hover:text-[var(--otach-teal)] hover:bg-[var(--otach-teal-pale)]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="w-full sm:w-auto lg:min-w-[220px]">
              <label
                htmlFor="items-price-select"
                className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2"
              >
                Price Range
              </label>
              <div className="relative">
                <select
                  id="items-price-select"
                  value={priceRangeIndex}
                  onChange={(e) => setPriceRangeIndex(Number(e.target.value))}
                  className="w-full h-9 pl-3.5 pr-8 rounded-full border border-[var(--border-light)] text-xs font-semibold text-[var(--text-primary)] bg-white focus:outline-none focus:border-[var(--otach-teal)] focus:ring-2 focus:ring-[var(--otach-teal)]/15 transition-all appearance-none cursor-pointer"
                >
                  {PRICE_RANGES.map((r, i) => (
                    <option key={r.label} value={i}>
                      {r.label}
                    </option>
                  ))}
                </select>
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none"
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
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* ── Results Count & Active Filter Pills Bar ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 px-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-medium text-[var(--text-secondary)]">
              Showing <span className="font-bold text-[var(--text-primary)]">{filtered.length}</span>{" "}
              of <span className="font-bold text-[var(--text-primary)]">{products.length}</span> timepieces
            </p>

            {/* Active category chip */}
            {category !== "All" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--otach-teal-pale)] text-[var(--otach-teal-dark)] border border-[var(--otach-teal)]/30">
                <span>{CATEGORIES.find((c) => c.value === category)?.label}</span>
                <button
                  type="button"
                  onClick={() => setCategory("All")}
                  className="hover:text-black font-bold p-0.5 focus:outline-none"
                  aria-label="Remove category filter"
                >
                  ✕
                </button>
              </span>
            )}

            {/* Active price range chip */}
            {priceRangeIndex !== 0 && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--otach-teal-pale)] text-[var(--otach-teal-dark)] border border-[var(--otach-teal)]/30">
                <span>{PRICE_RANGES[priceRangeIndex].label}</span>
                <button
                  type="button"
                  onClick={() => setPriceRangeIndex(0)}
                  className="hover:text-black font-bold p-0.5 focus:outline-none"
                  aria-label="Remove price filter"
                >
                  ✕
                </button>
              </span>
            )}

            {/* Active search chip */}
            {search.trim() && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--otach-teal-pale)] text-[var(--otach-teal-dark)] border border-[var(--otach-teal)]/30">
                <span>&ldquo;{search.trim()}&rdquo;</span>
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="hover:text-black font-bold p-0.5 focus:outline-none"
                  aria-label="Remove search query"
                >
                  ✕
                </button>
              </span>
            )}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              id="items-clear-all"
              onClick={handleResetFilters}
              className="text-xs font-semibold text-[var(--otach-teal)] hover:text-[var(--otach-teal-dark)] hover:underline inline-flex items-center gap-1 transition-colors focus:outline-none"
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
              <span>Reset All Filters</span>
            </button>
          )}
        </div>

        {/* ── Product Grid or Empty State ── */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[var(--border-light)] p-12 text-center my-8 shadow-xs">
            <div className="w-14 h-14 rounded-full bg-[var(--otach-teal-pale)] text-[var(--otach-teal)] flex items-center justify-center mx-auto mb-4">
              <svg
                width="24"
                height="24"
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
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
              No Timepieces Match Your Search
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto mb-6 leading-relaxed">
              We could not find any timepieces matching your current filter criteria. Try adjusting your search query, price range, or category.
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
