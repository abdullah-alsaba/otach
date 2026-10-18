"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading || user) return;

    const nextPath = pathname && pathname.startsWith("/") ? pathname : "/";
    router.replace(`/login?next=${encodeURIComponent(nextPath)}`);
  }, [loading, user, pathname, router]);

  if (loading || !user) {
    return (
      <div className="container-otach min-h-[50vh] flex items-center justify-center py-20">
        <p className="text-sm text-[var(--text-muted)]">Checking your session…</p>
      </div>
    );
  }

  return children;
}
