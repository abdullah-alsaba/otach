"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const shopCategories = [
  { href: "/items", label: "All Timepieces", badge: "Collection" },
  { href: "/items?category=automatic", label: "Automatic & Luxury", desc: "Mechanical precision" },
  { href: "/items?category=sport", label: "Chronograph & Sport", desc: "Engineered endurance" },
  { href: "/items?category=classic", label: "Classic & Minimalist", desc: "Understated elegance" },
  { href: "/items?category=smartwatch", label: "Modern Smartwatches", desc: "Connected craft" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  /* Close menus on route change during render */
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setShopDropdownOpen(false);
    setCartOpen(false);
  }

  const dropdownRef = useRef(null);
  const cartRef = useRef(null);

  /* Elevation and surface shadow on scroll */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close dropdowns on outside click */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShopDropdownOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Keyboard escape to dismiss open overlays */
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShopDropdownOpen(false);
        setCartOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  /* Prevent background scroll when mobile menu is active */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 transition-all duration-300 mt-4 mb-2">
      <div className="container-otach">
        {/* Rounded container with light neutral surface */}
        <div
          className={`min-h-16 px-6 py-3 rounded-2xl md:rounded-full flex items-center justify-between gap-4 relative transition-all duration-300 ${
            scrolled
              ? "bg-white/95 backdrop-blur-md border border-[var(--border-light)] shadow-[var(--shadow-sm)]"
              : "bg-white/90 backdrop-blur-sm border border-[var(--border-light)] shadow-[var(--shadow-xs)]"
          }`}
        >
          {/* ── Left Navigation: Home, Shop dropdown, Editorial, Contact ── */}
          <nav
            className="hidden md:flex items-center gap-7"
            aria-label="Main primary navigation"
          >
            {/* Home */}
            <Link
              href="/"
              className={`text-sm font-medium transition-colors duration-200 relative py-1 ${
                pathname === "/"
                  ? "text-[var(--otach-teal)] font-semibold"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Home
              {pathname === "/" && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--otach-teal)] rounded-full" />
              )}
            </Link>

            {/* Shop with Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setShopDropdownOpen(true)}
              onMouseLeave={() => setShopDropdownOpen(false)}
            >
              <div className="flex items-center gap-1">
                <Link
                  href="/items"
                  className={`text-sm font-medium transition-colors duration-200 py-1 ${
                    pathname.startsWith("/items")
                      ? "text-[var(--otach-teal)] font-semibold"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                  aria-label="Shop timepieces"
                >
                  Shop
                </Link>
                <button
                  type="button"
                  onClick={() => setShopDropdownOpen((prev) => !prev)}
                  aria-haspopup="menu"
                  aria-expanded={shopDropdownOpen}
                  aria-label="Toggle shop categories dropdown"
                  className="p-1 text-[var(--text-muted)] hover:text-[var(--otach-teal)] transition-colors rounded-full"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-200 ${
                      shopDropdownOpen ? "rotate-180 text-[var(--otach-teal)]" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </div>

              {/* Shop Dropdown Menu */}
              {shopDropdownOpen && (
                <div
                  role="menu"
                  aria-label="Shop categories menu"
                  className="absolute top-full left-0 mt-2 w-72 bg-white border border-[var(--border-light)] rounded-2xl shadow-[var(--shadow-lg)] p-2 z-50 animate-fade-in"
                >
                  <div className="px-3 py-2 border-b border-[var(--border-light)] mb-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      Explore Collections
                    </p>
                  </div>
                  <ul className="space-y-0.5">
                    {shopCategories.map(({ href, label, badge, desc }) => (
                      <li key={href} role="none">
                        <Link
                          href={href}
                          role="menuitem"
                          className="flex flex-col px-3 py-2 rounded-xl text-sm hover:bg-[var(--surface-gray-50)] text-[var(--text-primary)] transition-colors group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium group-hover:text-[var(--otach-teal)] transition-colors">
                              {label}
                            </span>
                            {badge && (
                              <span className="badge-otach badge-teal">
                                {badge}
                              </span>
                            )}
                          </div>
                          {desc && (
                            <span className="text-xs text-[var(--text-muted)] mt-0.5">
                              {desc}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 pt-2 border-t border-[var(--border-light)] px-1">
                    <Link
                      href="/items"
                      className="w-full btn-secondary btn-sm !py-2 !text-xs !w-full justify-center"
                    >
                      View All Products
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Editorial */}
            <Link
              href="/editorial"
              className={`text-sm font-medium transition-colors duration-200 relative py-1 ${
                pathname === "/editorial"
                  ? "text-[var(--otach-teal)] font-semibold"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Editorial
              {pathname === "/editorial" && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--otach-teal)] rounded-full" />
              )}
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors duration-200 relative py-1 ${
                pathname === "/contact"
                  ? "text-[var(--otach-teal)] font-semibold"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Contact
              {pathname === "/contact" && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--otach-teal)] rounded-full" />
              )}
            </Link>
          </nav>

          {/* ── Center: Separate Brand Symbol Image and Text "Otach" ── */}
          <Link
            href="/"
            className="flex items-center gap-1.5 group md:absolute md:left-1/2 md:-translate-x-1/2 focus:outline-none"
            aria-label="Otach Timepieces Homepage"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 overflow-hidden flex items-center justify-center shrink-0">
              <Image
                src="/images/otach-logo.png"
                alt="Otach"
                width={48}
                height={48}
                className="w-[130%] h-[130%] max-w-none object-contain translate-x-[4%] translate-y-[2%] transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--otach-teal)] transition-colors duration-200">
              Otach
            </span>
          </Link>

          {/* ── Right Actions: Account, Cart (0), and Mobile Menu Toggle ── */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Account -> /login */}
            <Link
              href="/login"
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--otach-teal)] transition-colors duration-200 px-3 py-1.5 rounded-full hover:bg-[var(--surface-gray-50)]"
              aria-label="Account sign in"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
              <span>Account</span>
            </Link>

            {/* Cart (0) -> UI placeholder */}
            <div ref={cartRef} className="relative">
              <button
                type="button"
                onClick={() => setCartOpen((prev) => !prev)}
                className="flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--otach-teal)] transition-colors duration-200 px-3 py-1.5 rounded-full hover:bg-[var(--surface-gray-50)]"
                aria-haspopup="dialog"
                aria-expanded={cartOpen}
                aria-label="View shopping cart, currently 0 items"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span className="font-semibold text-xs sm:text-sm">Cart (0)</span>
              </button>

              {/* Cart UI Placeholder Popover */}
              {cartOpen && (
                <div
                  role="dialog"
                  aria-label="Shopping Cart preview"
                  className="absolute right-0 top-full mt-2 w-80 bg-white border border-[var(--border-light)] rounded-2xl shadow-[var(--shadow-lg)] p-5 z-50 animate-fade-in"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--border-light)] mb-4">
                    <h3 className="font-semibold text-sm text-[var(--text-primary)]">
                      Your Shopping Bag
                    </h3>
                    <button
                      type="button"
                      onClick={() => setCartOpen(false)}
                      aria-label="Close cart popup"
                      className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="py-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-[var(--surface-gray-100)] flex items-center justify-center mx-auto mb-3 text-[var(--text-muted)]">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                        <line x1="3" x2="21" y1="6" y2="6" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-[var(--text-primary)] mb-1">
                      Your cart is empty
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mb-5">
                      Explore our curated horological timepieces and fine accessories.
                    </p>
                    <Link
                      href="/items"
                      onClick={() => setCartOpen(false)}
                      className="btn-primary btn-sm !w-full justify-center"
                    >
                      Browse Timepieces
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              id="mobile-nav-toggle"
              type="button"
              className="md:hidden p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-gray-100)] transition-colors"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              {mobileOpen ? (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
      </div>

      {/* ── Mobile Navigation Drawer ── */}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden fixed inset-0 z-40"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="absolute top-20 inset-x-4 bg-white border border-[var(--border-light)] rounded-3xl shadow-[var(--shadow-lg)] p-6 max-h-[calc(100vh-6rem)] overflow-y-auto animate-fade-up">
            <nav className="flex flex-col gap-2" aria-label="Mobile menu links">
              {/* Home */}
              <Link
                href="/"
                className={`py-3 px-4 rounded-xl text-base font-medium transition-colors ${
                  pathname === "/"
                    ? "bg-[var(--otach-teal-pale)] text-[var(--otach-teal)] font-semibold"
                    : "text-[var(--text-primary)] hover:bg-[var(--surface-gray-50)]"
                }`}
              >
                Home
              </Link>

              {/* Shop Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileShopOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between py-3 px-4 rounded-xl text-base font-medium text-[var(--text-primary)] hover:bg-[var(--surface-gray-50)] transition-colors"
                  aria-expanded={mobileShopOpen}
                >
                  <span>Shop</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-200 ${
                      mobileShopOpen ? "rotate-180 text-[var(--otach-teal)]" : ""
                    }`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {mobileShopOpen && (
                  <div className="pl-4 pr-2 py-2 flex flex-col gap-1 border-l-2 border-[var(--border-light)] ml-4 mt-1">
                    {shopCategories.map(({ href, label }) => (
                      <Link
                        key={href}
                        href={href}
                        className="py-2 px-3 text-sm rounded-lg text-[var(--text-secondary)] hover:text-[var(--otach-teal)] hover:bg-[var(--surface-gray-50)] transition-colors"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Editorial */}
              <Link
                href="/editorial"
                className={`py-3 px-4 rounded-xl text-base font-medium transition-colors ${
                  pathname === "/editorial"
                    ? "bg-[var(--otach-teal-pale)] text-[var(--otach-teal)] font-semibold"
                    : "text-[var(--text-primary)] hover:bg-[var(--surface-gray-50)]"
                }`}
              >
                Editorial
              </Link>

              {/* Contact */}
              <Link
                href="/contact"
                className={`py-3 px-4 rounded-xl text-base font-medium transition-colors ${
                  pathname === "/contact"
                    ? "bg-[var(--otach-teal-pale)] text-[var(--otach-teal)] font-semibold"
                    : "text-[var(--text-primary)] hover:bg-[var(--surface-gray-50)]"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Mobile Footer Actions */}
            <div className="mt-6 pt-5 border-t border-[var(--border-light)] flex flex-col gap-3">
              <Link
                href="/login"
                className="btn-outline justify-center !w-full"
              >
                Sign In / Account
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  setCartOpen(true);
                }}
                className="btn-primary justify-center !w-full"
              >
                View Cart (0 items)
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
