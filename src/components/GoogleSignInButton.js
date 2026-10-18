"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "@/lib/notify";
import { getAuthErrorMessage, isAuthCancellation } from "@/lib/auth-errors";

/* One shared provider instance for the whole app. Keeping the account chooser
   visible is what shoppers expect when more than one Google account is signed in. */
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

/* The official multicolor Google "G" mark, drawn inline so no icon package is needed. */
function GoogleMark({ className = "" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" className={className} aria-hidden="true" focusable="false">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"
      />
    </svg>
  );
}

/**
 * Real Google authentication through the shared Firebase Auth instance.
 * `nextPath` is the page the shopper was heading for before signing in.
 */
export default function GoogleSignInButton({ nextPath = "/", disabled = false }) {
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleGoogleSignIn = async () => {
    if (isConnecting) return;
    setIsConnecting(true);

    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Welcome back. It's good to have you here.");
      router.replace(nextPath || "/");
    } catch (error) {
      /* Dismissing the account chooser is a decision, not a failure. */
      if (!isAuthCancellation(error)) {
        toast.error(getAuthErrorMessage(error));
      }
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      disabled={disabled || isConnecting}
      className="w-full btn-outline btn-lg !w-full justify-center"
      aria-label="Continue with Google"
    >
      <span className="flex items-center justify-center gap-2.5">
        {isConnecting ? (
          <svg className="animate-spin h-4 w-4 text-[var(--text-secondary)]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        ) : (
          <GoogleMark />
        )}
        <span className="text-sm font-semibold">
          {isConnecting ? "Connecting…" : "Continue with Google"}
        </span>
      </span>
    </button>
  );
}
