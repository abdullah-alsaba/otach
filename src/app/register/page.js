"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  const validate = () => {
    const errs = {};

    if (!name.trim()) {
      errs.name = "Full name is required.";
    } else if (name.trim().length < 2) {
      errs.name = "Name must be at least 2 characters.";
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
      errs.terms = "You must agree to the Terms of Service.";
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
      // FIREBASE REGISTRATION INTEGRATION POINT:
      // Replace this block with your Firebase authentication method:
      //
      // import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
      // import { auth } from "@/lib/firebase";
      //
      // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // await updateProfile(userCredential.user, { displayName: name });
      // ─────────────────────────────────────────────────────────────

      // Simulating response to verify UI loading state
      await new Promise((resolve) => setTimeout(resolve, 800));

      setInfoMessage(
        "Form validation successful. Firebase registration integration is ready to be connected."
      );
    } catch (err) {
      setErrors({ form: err.message || "An unexpected error occurred during account creation." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[var(--surface-gray-50)] min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="card-otach p-8 sm:p-10 bg-white shadow-[var(--shadow-md)]">
          {/* Brand header */}
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-3 group"
              aria-label="Otach Home"
            >
              <span className="w-8 h-8 rounded-full bg-[var(--otach-teal-muted)] border border-[var(--otach-teal)] flex items-center justify-center text-[var(--otach-teal)] transition-transform duration-300 group-hover:scale-105">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
              <span className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                Otach
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">
              Create an Account
            </h1>
            <p className="text-xs text-[var(--text-secondary)] mt-1.5">
              Join the Otach client collective for order tracking and exclusive releases.
            </p>
          </div>

          {/* Form error banner */}
          {errors.form && (
            <div
              className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2"
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
              className="mb-6 p-3.5 rounded-xl bg-[var(--otach-teal-pale)] border border-[var(--otach-teal)]/30 text-xs text-[var(--otach-teal-dark)] flex items-start gap-2 animate-fade-in"
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
            {/* Full Name */}
            <div>
              <label
                htmlFor="register-name"
                className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-1.5"
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
                className={`input-otach ${
                  errors.name ? "!border-red-500 focus:!ring-red-500/20" : ""
                }`}
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "register-name-error" : undefined}
                disabled={isLoading}
              />
              {errors.name && (
                <p id="register-name-error" className="text-xs text-red-600 mt-1 font-medium">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="register-email"
                className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-1.5"
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
                className={`input-otach ${
                  errors.email ? "!border-red-500 focus:!ring-red-500/20" : ""
                }`}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "register-email-error" : undefined}
                disabled={isLoading}
              />
              {errors.email && (
                <p id="register-email-error" className="text-xs text-red-600 mt-1 font-medium">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="register-password"
                  className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-xs text-[var(--text-muted)] hover:text-[var(--otach-teal)]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
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
                className={`input-otach ${
                  errors.password ? "!border-red-500 focus:!ring-red-500/20" : ""
                }`}
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby={errors.password ? "register-password-error" : undefined}
                disabled={isLoading}
              />
              {errors.password && (
                <p id="register-password-error" className="text-xs text-red-600 mt-1 font-medium">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="register-confirm-password"
                className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-1.5"
              >
                Confirm Password
              </label>
              <input
                id="register-confirm-password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword)
                    setErrors((prev) => ({ ...prev, confirmPassword: null }));
                }}
                placeholder="Repeat your password"
                className={`input-otach ${
                  errors.confirmPassword ? "!border-red-500 focus:!ring-red-500/20" : ""
                }`}
                aria-invalid={errors.confirmPassword ? "true" : "false"}
                aria-describedby={errors.confirmPassword ? "register-confirm-error" : undefined}
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <p id="register-confirm-error" className="text-xs text-red-600 mt-1 font-medium">
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
                  className="w-4 h-4 mt-0.5 rounded border-[var(--border-medium)] text-[var(--otach-teal)] focus:ring-[var(--otach-teal)]"
                />
                <label htmlFor="register-terms" className="text-xs text-[var(--text-secondary)] leading-relaxed select-none">
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
                <p className="text-xs text-red-600 mt-1 font-medium">{errors.terms}</p>
              )}
            </div>

            {/* Submit Button (HeroUI Button component) */}
            <Button
              type="submit"
              isDisabled={isLoading}
              className="w-full btn-primary btn-lg !w-full justify-center text-sm font-semibold mt-4"
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
          </form>

          {/* Switch to Login */}
          <div className="mt-8 pt-6 border-t border-[var(--border-light)] text-center">
            <p className="text-xs text-[var(--text-secondary)]">
              Already registered with Otach?{" "}
              <Link
                href="/login"
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
