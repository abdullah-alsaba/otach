"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "@/lib/notify";
import RequireAuth from "@/components/RequireAuth";
import { useAuth } from "@/context/AuthContext";
import { deleteOwnedItem, getOwnedItems } from "@/lib/items";
import { getFirestoreErrorMessage } from "@/lib/auth-errors";

function ManageItemImage({ src, alt }) {
  const isRemote = typeof src === "string" && /^https?:\/\//.test(src);

  if (isRemote) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
    );
  }

  return <Image src={src} alt={alt} fill className="object-cover" sizes="56px" />;
}

function ManageProductsContent() {
  const { user } = useAuth();
  const [productList, setProductList] = useState([]);
  const [notification, setNotification] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loadState, setLoadState] = useState("loading");
  const [loadError, setLoadError] = useState("");
  const [reloadToken, setReloadToken] = useState(0);

  /* Loads the signed-in member's own catalog. State is only written from inside
     the promise callbacks, which keeps the effect free of cascading renders. */
  useEffect(() => {
    if (!user?.uid) return;

    let ignore = false;

    getOwnedItems(user.uid)
      .then((items) => {
        if (ignore) return;
        setProductList(items);
        setLoadState("ready");
      })
      .catch((err) => {
        if (ignore) return;
        const message = getFirestoreErrorMessage(err);
        setLoadError(message);
        setLoadState("error");
        toast.error(message);
      });

    return () => {
      ignore = true;
    };
  }, [user?.uid, reloadToken]);

  const handleRetry = () => {
    setLoadState("loading");
    setLoadError("");
    setReloadToken((token) => token + 1);
  };

  const handleDelete = async (id, name) => {
    if (!user?.uid || isDeleting) return;

    setIsDeleting(true);

    try {
      await deleteOwnedItem(id, user.uid);
      setProductList((prev) => prev.filter((p) => p.id !== id));
      setDeleteCandidate(null);
      const message = `"${name}" has been removed from your catalog.`;
      setNotification(message);
      toast.success(message);
    } catch (err) {
      const message = getFirestoreErrorMessage(err);
      setNotification(message);
      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
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
                Your Catalog
              </p>
              <p className="text-xs text-[var(--text-secondary)]">
                {loadState === "loading"
                  ? "Loading your timepieces…"
                  : `Showing ${productList.length} timepiece${productList.length === 1 ? "" : "s"} you own.`}
              </p>
            </div>
          </div>
        </div>

        {loadState === "loading" ? (
          <div className="card-otach p-12 text-center bg-white shadow-xs">
            <p className="text-sm text-[var(--text-muted)]">Loading your timepieces…</p>
          </div>
        ) : loadState === "error" ? (
          <div className="card-otach p-12 text-center bg-white shadow-xs">
            <p className="text-sm font-bold text-[var(--text-primary)] mb-2">
              Unable to load your catalog
            </p>
            <p className="text-xs text-[var(--text-secondary)] mb-6">{loadError}</p>
            <button type="button" onClick={handleRetry} className="btn-primary btn-sm">
              Try Again
            </button>
          </div>
        ) : productList.length === 0 ? (
          <div className="card-otach p-12 text-center bg-white shadow-xs">
            <p className="text-sm font-bold text-[var(--text-primary)] mb-2">
              No timepieces in your catalog yet
            </p>
            <p className="text-xs text-[var(--text-secondary)] mb-6">
              Add a timepiece to start managing your collection.
            </p>
            <Link href="/items/add" className="btn-primary btn-sm">
              Add New Timepiece
            </Link>
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
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3.5">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[var(--surface-gray-100)] border border-[var(--border-light)] shrink-0">
                            <ManageItemImage src={product.image} alt={product.name} />
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

                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="badge-otach badge-gray capitalize text-[10px]">
                          {product.category}
                        </span>
                      </td>

                      <td className="py-4 px-6 whitespace-nowrap font-bold text-[var(--text-primary)]">
                        ${product.price.toFixed(2)}
                      </td>

                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="text-xs text-emerald-600 font-medium flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      </td>

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
                            aria-label={`Delete ${product.name}`}
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
                      <ManageItemImage src={product.image} alt={product.name} />
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
              Remove Timepiece?
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6">
              You are permanently removing <strong>&quot;{deleteCandidate.name}&quot;</strong> from your catalog.
              This cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteCandidate(null)}
                className="btn-ghost btn-sm"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteCandidate.id, deleteCandidate.name)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-full bg-red-600 text-white font-semibold text-xs hover:bg-red-700 transition disabled:opacity-60"
              >
                {isDeleting ? "Removing…" : "Confirm Removal"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ManageProductsPage() {
  return (
    <RequireAuth>
      <ManageProductsContent />
    </RequireAuth>
  );
}
