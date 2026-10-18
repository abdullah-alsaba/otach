"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductDetail from "@/components/ProductDetail";
import { useAuth } from "@/context/AuthContext";
import { getOwnedItem } from "@/lib/items";
import { getFirestoreErrorMessage, logFirestoreError } from "@/lib/auth-errors";

export default function OwnedItemDetail({ id }) {
  const { user, loading: authLoading } = useAuth();
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

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
      } catch (error) {
        if (!cancelled) {
          setItem(null);
          /* The page itself explains the failure below, so the reason is stated
             once instead of also being raised as a transient notification. The
             real Firebase code goes to the console in development. */
          logFirestoreError("Timepiece Detail — getOwnedItem()", error);
          setErrorMessage(getFirestoreErrorMessage(error));
          setStatus("error");
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

  if (status === "missing" || status === "error" || !item) {
    const isError = status === "error";

    return (
      <div className="container-otach min-h-[60vh] flex flex-col items-center justify-center text-center py-20">
        <span className="badge-otach badge-teal mb-4">{isError ? "Unavailable" : "404 Error"}</span>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--text-primary)] mb-4">
          {isError ? "Timepiece Unavailable" : "Timepiece Not Found"}
        </h1>
        <p className="text-[var(--text-secondary)] max-w-md mb-8">
          {isError
            ? errorMessage
            : "The page or timepiece you are looking for may have been moved, archived, or does not exist."}
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
