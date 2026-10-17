"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    if (!password) {
      errs.password = "Password is required.";
    } else if (password.length < 6) {
      errs.password = "Password must be at least 6 characters.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInfoMessage("");

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      // ─────────────────────────────────────────────────────────────
      // FIREBASE AUTHENTICATION INTEGRATION POINT:
      // Replace this block with your Firebase authentication method:
      //
      // import { signInWithEmailAndPassword } from "firebase/auth";
      // import { auth } from "@/lib/firebase";
      //
      // const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // const user = userCredential.user;
      // ─────────────────────────────────────────────────────────────

      // Simulating network response to verify UI loading & submission state
      await new Promise((resolve) => setTimeout(resolve, 800));

      setInfoMessage(
        "Form validation successful. Firebase authentication integration is ready to be connected."
      );
    } catch (err) {
      setErrors({ form: err.message || "An unexpected error occurred during sign in." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[var(--surface-gray-50)] min-h-[calc(100vh-5rem)] flex items-center justify-center py-10 sm:py-16 px-4 sm:px-6">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="card-otach p-7 sm:p-9 bg-white shadow-[var(--shadow-sm)] border border-[var(--border-light)] rounded-3xl">
          {/* Brand header */}
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 mb-4 group focus:outline-none"
              aria-label="Otach Home"
            >
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 overflow-hidden flex items-center justify-center shrink-0">
                <Image
                  src="/images/otach-logo.png"
                  alt="Otach"
                  width={48}
                  height={48}
                  className="w-[130%] h-[130%] max-w-none object-contain translate-x-[4%] translate-y-[2%]"
                  priority
                />
              </div>
              <span className="text-2xl font-bold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--otach-teal)] transition-colors">
                Otach
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">
              Sign In to Your Account
            </h1>
            <p className="text-xs text-[var(--text-secondary)] mt-1.5">
              Access your saved timepieces, orders, and horological profile.
            </p>
          </div>

          {/* Form error banner */}
          {errors.form && (
            <div
              className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2"
              role="alert"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="shrink-0 mt-0.5"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{errors.form}</span>
            </div>
          )}

          {/* Integration readiness banner */}
          {infoMessage && (
            <div
              className="mb-5 p-3.5 rounded-xl bg-[var(--otach-teal-pale)] border border-[var(--otach-teal)]/30 text-xs text-[var(--otach-teal-dark)] flex items-start gap-2 animate-fade-in"
              role="status"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="shrink-0 mt-0.5 text-[var(--otach-teal)]"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{infoMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Email Field */}
            <div>
              <label
                htmlFor="login-email"
                className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2"
              >
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                }}
                placeholder="name@example.com"
                className={`w-full h-11 px-3.5 rounded-xl border text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] bg-[var(--surface-white)] focus:outline-none focus:border-[var(--otach-teal)] focus:ring-2 focus:ring-[var(--otach-teal)]/15 transition-all ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/15"
                    : "border-[var(--border-light)]"
                }`}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "login-email-error" : undefined}
                disabled={isLoading}
              />
              {errors.email && (
                <p id="login-email-error" className="text-xs text-red-600 mt-1.5 font-medium">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="login-password"
                  className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert("Password recovery placeholder ready for Firebase integration.")}
                  className="text-xs text-[var(--otach-teal)] hover:underline focus:outline-none"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
                  }}
                  placeholder="••••••••"
                  className={`w-full h-11 pl-3.5 pr-10 rounded-xl border text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] bg-[var(--surface-white)] focus:outline-none focus:border-[var(--otach-teal)] focus:ring-2 focus:ring-[var(--otach-teal)]/15 transition-all ${
                    errors.password
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/15"
                      : "border-[var(--border-light)]"
                  }`}
                  aria-invalid={errors.password ? "true" : "false"}
                  aria-describedby={errors.password ? "login-password-error" : undefined}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p id="login-password-error" className="text-xs text-red-600 mt-1.5 font-medium">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember me checkbox */}
            <div className="flex items-center gap-2.5 pt-1">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-[var(--border-medium)] text-[var(--otach-teal)] focus:ring-[var(--otach-teal)] cursor-pointer"
              />
              <label htmlFor="remember-me" className="text-xs text-[var(--text-secondary)] select-none cursor-pointer">
                Remember this device for 30 days
              </label>
            </div>

            {/* Submit Button (HeroUI Button component) */}
            <div className="pt-2">
              <Button
                type="submit"
                isDisabled={isLoading}
                className="w-full btn-primary btn-lg !w-full justify-center text-sm font-semibold"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>Authenticating…</span>
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>
          </form>

          {/* Switch to Register */}
          <div className="mt-8 pt-6 border-t border-[var(--border-light)] text-center">
            <p className="text-xs text-[var(--text-secondary)]">
              Don&apos;t have an Otach client account?{" "}
              <Link
                href="/register"
                className="font-bold text-[var(--otach-teal)] hover:underline ml-1"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
