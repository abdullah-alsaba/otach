"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@heroui/react";
import { toast } from "@/lib/notify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { getAuthErrorMessage, isSafeInternalPath } from "@/lib/auth-errors";
import GoogleSignInButton from "@/components/GoogleSignInButton";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  const nextPath = isSafeInternalPath(searchParams.get("next")) ? searchParams.get("next") : "/";

  useEffect(() => {
    if (!authLoading && user) {
      router.replace(nextPath || "/");
    }
  }, [authLoading, user, router, nextPath]);

  const validate = () => {
    const errs = {};
    if (!name.trim()) {
      errs.name = "Full name is required.";
    }

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

    if (!confirmPassword) {
      errs.confirmPassword = "Confirm password is required.";
    } else if (password !== confirmPassword) {
      errs.confirmPassword = "Passwords do not match.";
    }

    if (!termsAccepted) {
      errs.terms = "You must accept the Terms of Service.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInfoMessage("");

    if (!validate()) {
      toast.warning("Please check the highlighted details.");
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(userCredential.user, { displayName: name.trim() });
      setInfoMessage("Account created. Redirecting…");
      toast.success("Your Otach account is ready.");
      router.replace(nextPath || "/");
    } catch (err) {
      const message = getAuthErrorMessage(err);
      setErrors({ form: message });
      toast.error(message);
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
              Create an Account
            </h1>
            <p className="text-xs text-[var(--text-secondary)] mt-1.5">
              Join the Otach client collective for order tracking and bespoke releases.
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

          {/* Google sign-in */}
          <GoogleSignInButton nextPath={nextPath || "/"} disabled={isLoading} />

          {/* Divider between Google and the email form */}
          <div className="flex items-center gap-3 my-6" aria-hidden="true">
            <span className="h-px flex-1 bg-[var(--border-light)]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              or
            </span>
            <span className="h-px flex-1 bg-[var(--border-light)]" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="register-name"
                className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2"
              >
                Full Name
              </label>
              <input
                id="register-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
                }}
                placeholder="Alexander Wright"
                className={`w-full h-11 px-3.5 rounded-xl border text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] bg-[var(--surface-white)] focus:outline-none focus:border-[var(--otach-teal)] focus:ring-2 focus:ring-[var(--otach-teal)]/15 transition-all ${
                  errors.name
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/15"
                    : "border-[var(--border-light)]"
                }`}
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "register-name-error" : undefined}
                disabled={isLoading}
              />
              {errors.name && (
                <p id="register-name-error" className="text-xs text-red-600 mt-1.5 font-medium">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="register-email"
                className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2"
              >
                Email Address
              </label>
              <input
                id="register-email"
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
                aria-describedby={errors.email ? "register-email-error" : undefined}
                disabled={isLoading}
              />
              {errors.email && (
                <p id="register-email-error" className="text-xs text-red-600 mt-1.5 font-medium">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="register-password"
                className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
                  }}
                  placeholder="At least 6 characters"
                  className={`w-full h-11 pl-3.5 pr-10 rounded-xl border text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] bg-[var(--surface-white)] focus:outline-none focus:border-[var(--otach-teal)] focus:ring-2 focus:ring-[var(--otach-teal)]/15 transition-all ${
                    errors.password
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/15"
                      : "border-[var(--border-light)]"
                  }`}
                  aria-invalid={errors.password ? "true" : "false"}
                  aria-describedby={errors.password ? "register-password-error" : undefined}
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
                <p id="register-password-error" className="text-xs text-red-600 mt-1.5 font-medium">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="register-confirm-password"
                className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="register-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword)
                      setErrors((prev) => ({ ...prev, confirmPassword: null }));
                  }}
                  placeholder="Repeat your password"
                  className={`w-full h-11 pl-3.5 pr-10 rounded-xl border text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] bg-[var(--surface-white)] focus:outline-none focus:border-[var(--otach-teal)] focus:ring-2 focus:ring-[var(--otach-teal)]/15 transition-all ${
                    errors.confirmPassword
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/15"
                      : "border-[var(--border-light)]"
                  }`}
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                  aria-describedby={errors.confirmPassword ? "register-confirm-error" : undefined}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 transition-colors focus:outline-none"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
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
              {errors.confirmPassword && (
                <p id="register-confirm-error" className="text-xs text-red-600 mt-1.5 font-medium">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms Agreement Checkbox */}
            <div className="pt-2">
              <div className="flex items-start gap-2.5">
                <input
                  id="register-terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => {
                    setTermsAccepted(e.target.checked);
                    if (errors.terms) setErrors((prev) => ({ ...prev, terms: null }));
                  }}
                  className="w-4 h-4 mt-0.5 rounded border-[var(--border-medium)] text-[var(--otach-teal)] focus:ring-[var(--otach-teal)] cursor-pointer"
                />
                <label htmlFor="register-terms" className="text-xs text-[var(--text-secondary)] leading-relaxed select-none cursor-pointer">
                  I agree to the{" "}
                  <a href="#" className="text-[var(--otach-teal)] underline underline-offset-2">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[var(--otach-teal)] underline underline-offset-2">
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>
              {errors.terms && (
                <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.terms}</p>
              )}
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
                    <span>Creating Account…</span>
                  </span>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>
          </form>

          {/* Switch to Login */}
          <div className="mt-8 pt-6 border-t border-[var(--border-light)] text-center">
            <p className="text-xs text-[var(--text-secondary)]">
              Already registered with Otach?{" "}
              <Link
                href={
                  nextPath && nextPath !== "/"
                    ? `/login?next=${encodeURIComponent(nextPath)}`
                    : "/login"
                }
                className="font-bold text-[var(--otach-teal)] hover:underline ml-1"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="container-otach min-h-[50vh] flex items-center justify-center py-20">
          <p className="text-sm text-[var(--text-muted)]">Loading registration…</p>
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
