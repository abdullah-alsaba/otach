"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/products";

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
  { value: "rating", label: "Top Rated" },
];

export default function ItemsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(0); // index into PRICE_RANGES
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    let list = [...products];

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }

    // Price filter
    const { min, max } = PRICE_RANGES[priceRange];
    list = list.filter((p) => p.price >= min && p.price <= max);

    // Sort
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break; // keep original order (featured)
    }

    return list;
  }, [search, category, priceRange, sort]);

  return (
    <>
      <div className="bg-[var(--surface-gray-50)] min-h-screen">
        {/* ── Page header ───────────────────────────────── */}
        <div className="border-b border-[var(--border-light)] bg-white">
          <div className="container-otach py-10">
            <p className="text-xs font-semibold text-[var(--otach-teal)] uppercase tracking-widest mb-1">
              All Products
            </p>
            <h1 className="text-3xl font-semibold text-[var(--text-primary)]">
              Shop Collection
            </h1>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              {filtered.length} timepiece{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="container-otach py-8">
          {/* ── Filters & search bar ────────────────────── */}
          <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--border-light)] p-5 mb-8 flex flex-wrap gap-4 items-end shadow-[var(--shadow-xs)]">
            {/* Search */}
            <div className="flex-1 min-w-48">
              <label
                htmlFor="items-search"
                className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5"
              >
                Search
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  id="items-search"
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search watches…"
                  className="w-full pl-9 pr-4 py-2.5 rounded-[var(--radius-sm)] border border-[var(--border-light)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--otach-teal)] focus:ring-2 focus:ring-[var(--otach-teal)]/15 transition"
                />
              </div>
            </div>

            {/* Category filter */}
            <div className="min-w-36">
              <label
                htmlFor="items-category"
                className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5"
              >
                Category
              </label>
              <select
                id="items-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-[var(--radius-sm)] border border-[var(--border-light)] text-sm text-[var(--text-primary)] bg-white focus:outline-none focus:border-[var(--otach-teal)] focus:ring-2 focus:ring-[var(--otach-teal)]/15 transition capitalize"
              >
                {categories.map((c) => (
                  <option key={c} value={c} className="capitalize">
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Price filter */}
            <div className="min-w-40">
              <label
                htmlFor="items-price"
                className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5"
              >
                Price Range
              </label>
              <select
                id="items-price"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-[var(--radius-sm)] border border-[var(--border-light)] text-sm text-[var(--text-primary)] bg-white focus:outline-none focus:border-[var(--otach-teal)] focus:ring-2 focus:ring-[var(--otach-teal)]/15 transition"
              >
                {PRICE_RANGES.map((r, i) => (
                  <option key={r.label} value={i}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="min-w-40">
              <label
                htmlFor="items-sort"
                className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5"
              >
                Sort By
              </label>
              <select
                id="items-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full px-3 py-2.5 rounded-[var(--radius-sm)] border border-[var(--border-light)] text-sm text-[var(--text-primary)] bg-white focus:outline-none focus:border-[var(--otach-teal)] focus:ring-2 focus:ring-[var(--otach-teal)]/15 transition"
              >
                {SORT_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Active filters / clear */}
            {(search || category !== "All" || priceRange !== 0) && (
              <button
                id="items-clear-filters"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setPriceRange(0);
                  setSort("featured");
                }}
                className="px-4 py-2.5 rounded-[var(--radius-sm)] border border-[var(--border-light)] text-sm text-[var(--text-secondary)] hover:border-[var(--otach-teal)] hover:text-[var(--otach-teal)] transition self-end"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* ── Category pills (secondary filter) ───────── */}
          <div className="flex gap-2 flex-wrap mb-8" role="group" aria-label="Category quick filters">
            {categories.map((c) => (
              <button
                key={c}
                id={`cat-pill-${c}`}
                onClick={() => setCategory(c)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 capitalize ${
                  category === c
                    ? "bg-[var(--otach-teal)] text-white border-[var(--otach-teal)]"
                    : "bg-white text-[var(--text-secondary)] border-[var(--border-light)] hover:border-[var(--otach-teal)] hover:text-[var(--otach-teal)]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* ── Product grid ────────────────────────────── */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🕐</p>
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                No watches found
              </h2>
              <p className="text-sm text-[var(--text-muted)]">
                Try adjusting your filters or search term.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
