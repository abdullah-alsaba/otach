"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/items", label: "Shop" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount] = useState(0);

  /* Shadow on scroll */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b transition-all duration-300 ${
          scrolled
            ? "border-[var(--border-light)] shadow-[var(--shadow-sm)]"
            : "border-transparent"
        }`}
      >
        <div className="container-otach h-16 flex items-center justify-between gap-6">
          {/* ── Left nav ────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors duration-200 relative group ${
                  pathname === href
                    ? "text-[var(--otach-teal)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-[var(--otach-teal)] transition-all duration-200 ${
                    pathname === href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* ── Logo (centered) ──────────────────────────── */}
          <Link
            href="/"
            className="text-xl font-semibold tracking-tight text-[var(--text-primary)] hover:text-[var(--otach-teal)] transition-colors duration-200 md:absolute md:left-1/2 md:-translate-x-1/2"
            aria-label="Otach home"
          >
            Otach
          </Link>

          {/* ── Right actions ────────────────────────────── */}
          <div className="flex items-center gap-4">
            {/* Account */}
            <Link
              href="/login"
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
              aria-label="Account"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
              Account
            </Link>

            {/* Cart */}
            <Link
              href="/items"
              className="flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 relative"
              aria-label={`Cart, ${cartCount} items`}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <line x1="3" x2="21" y1="6" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="hidden md:inline">Cart ({cartCount})</span>
              {cartCount > 0 && (
                <span className="md:hidden absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[var(--otach-teal)] text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile hamburger */}
            <button
              id="mobile-menu-toggle"
              className="md:hidden p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ─────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Panel */}
          <nav className="absolute top-16 inset-x-0 bg-white border-b border-[var(--border-light)] shadow-[var(--shadow-lg)] px-6 py-6 flex flex-col gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`py-3 text-base font-medium border-b border-[var(--border-light)] last:border-0 transition-colors ${
                  pathname === href
                    ? "text-[var(--otach-teal)]"
                    : "text-[var(--text-primary)]"
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-[var(--border-light)] flex flex-col gap-1">
              <Link
                href="/login"
                className="py-3 text-base font-medium text-[var(--text-secondary)]"
              >
                Account
              </Link>
              <Link
                href="/items"
                className="py-3 text-base font-medium text-[var(--text-secondary)]"
              >
                Cart ({cartCount})
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
