"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductDetail from "@/components/ProductDetail";
import { useAuth } from "@/context/AuthContext";
import { getOwnedItem } from "@/lib/items";

export default function OwnedItemDetail({ id }) {
  const { user, loading: authLoading } = useAuth();
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    async function loadItem() {
      if (authLoading) return;

      if (!user) {
        if (!cancelled) {
          setItem(null);
          setStatus("missing");
        }
        return;
      }

      setStatus("loading");

      try {
        const nextItem = await getOwnedItem(id, user.uid);
        if (cancelled) return;

        if (!nextItem) {
          setItem(null);
          setStatus("missing");
          return;
        }

        setItem(nextItem);
        setStatus("ready");
      } catch {
        if (!cancelled) {
          setItem(null);
          setStatus("missing");
        }
      }
    }

    loadItem();

    return () => {
      cancelled = true;
    };
  }, [authLoading, user, id]);

  if (authLoading || status === "loading") {
    return (
      <div className="container-otach min-h-[50vh] flex items-center justify-center py-20">
        <p className="text-sm text-[var(--text-muted)]">Loading timepiece…</p>
      </div>
    );
  }

  if (status === "missing" || !item) {
    return (
      <div className="container-otach min-h-[60vh] flex flex-col items-center justify-center text-center py-20">
        <span className="badge-otach badge-teal mb-4">404 Error</span>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--text-primary)] mb-4">
          Timepiece Not Found
        </h1>
        <p className="text-[var(--text-secondary)] max-w-md mb-8">
          The page or timepiece you are looking for may have been moved, archived, or does not exist.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            Return to Home
          </Link>
          <Link href="/items" className="btn-outline">
            Explore Collection
          </Link>
        </div>
      </div>
    );
  }

  return <ProductDetail product={item} relatedProducts={[]} />;
}
