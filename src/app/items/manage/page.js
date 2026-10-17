"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";

export default function ManageProductsPage() {
  const [productList, setProductList] = useState(products);
  const [notification, setNotification] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);

  const handleDelete = (id, name) => {
    // ─────────────────────────────────────────────────────────────
    // FIRESTORE DELETE INTEGRATION POINT:
    // Replace this local state mutation with your Firestore delete call:
    //
    // import { doc, deleteDoc } from "firebase/firestore";
    // import { db } from "@/lib/firebase";
    //
    // await deleteDoc(doc(db, "products", id));
    // ─────────────────────────────────────────────────────────────

    setProductList((prev) => prev.filter((p) => p.id !== id));
    setDeleteCandidate(null);
    setNotification(
      `"${name}" removed from temporary session state. Because no database is connected yet, this deletion is not permanent.`
    );
  };

  const handleResetCatalog = () => {
    setProductList(products);
    setNotification("Demo catalog restored to initial static dataset.");
  };

  return (
    <div className="bg-[var(--surface-gray-50)] min-h-[calc(100vh-4rem)] pb-20">
      {/* ── Breadcrumb & Page Header ── */}
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
              <span className="text-[var(--text-primary)] font-semibold">Product Management</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Manage Products
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/items/add" className="btn-primary btn-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span>Add New Timepiece</span>
            </Link>

            <Link href="/items" className="btn-outline btn-sm">
              Public Catalog
            </Link>
          </div>
        </div>
      </div>

      <div className="container-otach pt-8 sm:pt-10">
        {/* Temporary State Notification */}
        {notification && (
          <div
            className="p-4 rounded-2xl bg-[var(--otach-teal-pale)] border border-[var(--otach-teal)]/30 text-xs text-[var(--otach-teal-dark)] flex items-center justify-between gap-3 mb-6 animate-fade-in"
            role="status"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[var(--otach-teal)]" />
              <span>{notification}</span>
            </div>
            <button
              type="button"
              onClick={() => setNotification(null)}
              className="font-bold text-xs hover:opacity-75 p-1"
              aria-label="Dismiss message"
            >
              ✕
            </button>
          </div>
        )}

        {/* Database Notice Header Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[var(--border-light)] mb-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[var(--surface-gray-100)] flex items-center justify-center text-[var(--text-secondary)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--text-primary)]">
                Firestore Integration Standby
              </p>
              <p className="text-xs text-[var(--text-secondary)]">
                Viewing static dataset ({productList.length} items). Deletions update temporary local UI state.
              </p>
            </div>
          </div>

          {productList.length < products.length && (
            <button
              type="button"
              onClick={handleResetCatalog}
              className="text-xs font-bold text-[var(--otach-teal)] hover:underline whitespace-nowrap self-end sm:self-auto"
            >
              Reset Demo Dataset
            </button>
          )}
        </div>

        {/* ── Table Container (Desktop) / Cards (Mobile) ── */}
        {productList.length === 0 ? (
          <div className="card-otach p-12 text-center bg-white shadow-xs">
            <p className="text-sm font-bold text-[var(--text-primary)] mb-2">
              All items removed from temporary view
            </p>
            <p className="text-xs text-[var(--text-secondary)] mb-6">
              Because no database is connected, no permanent deletion occurred.
            </p>
            <button
              type="button"
              onClick={handleResetCatalog}
              className="btn-primary btn-sm"
            >
              Restore Product List
            </button>
          </div>
        ) : (
          <div className="card-otach overflow-hidden bg-white shadow-[var(--shadow-xs)] border border-[var(--border-light)]">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse" aria-label="Product management inventory">
                <thead>
                  <tr className="border-b border-[var(--border-light)] bg-[var(--surface-gray-50)] text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    <th scope="col" className="py-3.5 px-6">Product</th>
                    <th scope="col" className="py-3.5 px-6">Category</th>
                    <th scope="col" className="py-3.5 px-6">Price</th>
                    <th scope="col" className="py-3.5 px-6">Status</th>
                    <th scope="col" className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-light)] text-sm">
                  {productList.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-[var(--surface-gray-50)] transition-colors group"
                    >
                      {/* Product Thumbnail & Name */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3.5">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[var(--surface-gray-100)] border border-[var(--border-light)] shrink-0">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div>
                            <Link
                              href={`/items/${product.id}`}
                              className="font-bold text-[var(--text-primary)] hover:text-[var(--otach-teal)] transition-colors line-clamp-1"
                            >
                              {product.name}
                            </Link>
                            <p className="text-xs text-[var(--text-muted)] line-clamp-1">
                              {product.tagline || product.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category Badge */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="badge-otach badge-gray capitalize text-[10px]">
                          {product.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-6 whitespace-nowrap font-bold text-[var(--text-primary)]">
                        ${product.price.toFixed(2)}
                      </td>

                      {/* Availability */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="text-xs text-emerald-600 font-medium flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/items/${product.id}`}
                            className="btn-outline btn-sm !py-1.5 !px-3 !text-xs"
                            aria-label={`View public page for ${product.name}`}
                          >
                            View
                          </Link>

                          <button
                            type="button"
                            onClick={() => setDeleteCandidate(product)}
                            className="btn-ghost btn-sm !py-1.5 !px-3 !text-xs !text-red-600 hover:!bg-red-50"
                            aria-label={`Delete ${product.name} from temporary view`}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="md:hidden divide-y divide-[var(--border-light)]">
              {productList.map((product) => (
                <div key={product.id} className="p-4 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[var(--surface-gray-100)] border border-[var(--border-light)] shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="badge-otach badge-gray text-[10px] capitalize">
                          {product.category}
                        </span>
                        <span className="font-bold text-sm text-[var(--text-primary)]">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                      <Link
                        href={`/items/${product.id}`}
                        className="font-bold text-sm text-[var(--text-primary)] truncate block mt-0.5"
                      >
                        {product.name}
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--border-light)]">
                    <Link
                      href={`/items/${product.id}`}
                      className="btn-outline btn-sm !py-1.5 !px-3 !text-xs"
                    >
                      View
                    </Link>
                    <button
                      type="button"
                      onClick={() => setDeleteCandidate(product)}
                      className="btn-ghost btn-sm !py-1.5 !px-3 !text-xs !text-red-600 hover:!bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Confirm Deletion Modal ── */}
      {deleteCandidate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="card-otach p-6 sm:p-8 bg-white max-w-md w-full shadow-[var(--shadow-lg)] animate-scale-in">
            <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </div>
            <h3 id="modal-title" className="text-lg font-bold text-[var(--text-primary)] mb-2">
              Remove Timepiece from View?
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6">
              You are removing <strong>&quot;{deleteCandidate.name}&quot;</strong> from this session view.
              Because no database is connected yet, this operation modifies local UI state only and will not permanently affect Firestore.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteCandidate(null)}
                className="btn-ghost btn-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteCandidate.id, deleteCandidate.name)}
                className="px-4 py-2 rounded-full bg-red-600 text-white font-semibold text-xs hover:bg-red-700 transition"
              >
                Confirm Removal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
