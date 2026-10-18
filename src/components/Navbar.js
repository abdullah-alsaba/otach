"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "@heroui/react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/cart";

const shopCategories = [
  { href: "/items", label: "All Timepieces", badge: "Collection" },
  { href: "/items?category=automatic", label: "Automatic & Luxury", desc: "Mechanical precision" },
  { href: "/items?category=sport", label: "Chronograph & Sport", desc: "Engineered endurance" },
  { href: "/items?category=classic", label: "Classic & Minimalist", desc: "Understated elegance" },
  { href: "/items?category=smartwatch", label: "Modern Smartwatches", desc: "Connected craft" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading: authLoading, logout } = useAuth();
  const {
    items: cartItems,
    itemCount,
    subtotal,
    maxQuantityPerItem,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useCart();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  /* Close menus on route change during render */
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setShopDropdownOpen(false);
    setCartOpen(false);
    setAccountOpen(false);
  }

  const dropdownRef = useRef(null);
  const cartRef = useRef(null);
  const accountRef = useRef(null);
  const accountLabel = user?.displayName?.trim() || user?.email || "Account";

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
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setAccountOpen(false);
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
        setAccountOpen(false);
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

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      toast.success("You have been signed out.");
      setAccountOpen(false);
      setMobileOpen(false);
      router.push("/");
    } catch {
      toast.danger("We could not sign you out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const closeCart = () => setCartOpen(false);

  const handleIncreaseQuantity = (item) => {
    if (item.quantity >= maxQuantityPerItem) {
      toast.warning(`You can order up to ${maxQuantityPerItem} of the ${item.title}.`);
      return;
    }

    increaseQuantity(item.id);
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity <= 1) {
      handleRemoveItem(item);
      return;
    }

    decreaseQuantity(item.id);
  };

  const handleRemoveItem = (item) => {
    removeItem(item.id);
    toast.success(`Removed ${item.title} from your bag.`);
  };

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

          {/* ── Right Actions: Account, Cart, and Mobile Menu Toggle ── */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Account */}
            {!authLoading && user ? (
              <div ref={accountRef} className="relative hidden md:block">
                <button
                  type="button"
                  onClick={() => setAccountOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--otach-teal)] transition-colors duration-200 px-3 py-1.5 rounded-full hover:bg-[var(--surface-gray-50)]"
                  aria-haspopup="menu"
                  aria-expanded={accountOpen}
                  aria-label="Account menu"
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
                  <span className="max-w-[9rem] truncate">{accountLabel}</span>
                </button>
                {accountOpen && (
                  <div
                    role="menu"
                    aria-label="Account menu"
                    className="absolute right-0 top-full mt-2 w-56 bg-white border border-[var(--border-light)] rounded-2xl shadow-[var(--shadow-lg)] p-2 z-50 animate-fade-in"
                  >
                    <p className="px-3 py-2 text-xs text-[var(--text-muted)] truncate">
                      {user.email}
                    </p>
                    <Link
                      href="/items/add"
                      role="menuitem"
                      className="block px-3 py-2 rounded-xl text-sm text-[var(--text-primary)] hover:bg-[var(--surface-gray-50)] hover:text-[var(--otach-teal)]"
                    >
                      Add Timepiece
                    </Link>
                    <Link
                      href="/items/manage"
                      role="menuitem"
                      className="block px-3 py-2 rounded-xl text-sm text-[var(--text-primary)] hover:bg-[var(--surface-gray-50)] hover:text-[var(--otach-teal)]"
                    >
                      Manage Products
                    </Link>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="w-full text-left px-3 py-2 rounded-xl text-sm text-red-600 hover:bg-red-50 disabled:opacity-60"
                    >
                      {isLoggingOut ? "Signing out…" : "Sign Out"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
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
            )}

            {/* Cart */}
            <div ref={cartRef} className="relative">
              <button
                type="button"
                onClick={() => setCartOpen((prev) => !prev)}
                className="flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--otach-teal)] transition-colors duration-200 px-3 py-1.5 rounded-full hover:bg-[var(--surface-gray-50)]"
                aria-haspopup="dialog"
                aria-expanded={cartOpen}
                aria-label={`View shopping bag, currently ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
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
                <span className="font-semibold text-xs sm:text-sm" aria-live="polite">
                  Cart ({itemCount})
                </span>
              </button>

              {/* Cart Popover */}
              {cartOpen && (
                <div
                  role="dialog"
                  aria-label="Shopping bag preview"
                  className="absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] max-w-80 bg-white border border-[var(--border-light)] rounded-2xl shadow-[var(--shadow-lg)] p-5 z-50 animate-fade-in"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--border-light)] mb-4">
                    <h3 className="font-semibold text-sm text-[var(--text-primary)]">
                      Your Shopping Bag
                    </h3>
                    <button
                      type="button"
                      onClick={closeCart}
                      aria-label="Close cart popup"
                      className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1"
                    >
                      ✕
                    </button>
                  </div>

                  {cartItems.length === 0 ? (
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
                        onClick={closeCart}
                        className="btn-primary btn-sm !w-full justify-center"
                      >
                        Browse Timepieces
                      </Link>
                    </div>
                  ) : (
                    <>
                      <ul className="max-h-72 overflow-y-auto space-y-3 pr-1">
                        {cartItems.map((item) => (
                          <li key={item.id} className="flex items-start gap-3">
                            <Link
                              href={`/items/${item.id}`}
                              onClick={closeCart}
                              className="relative w-14 h-14 shrink-0 rounded-xl overflow-hidden border border-[var(--border-light)] bg-[var(--surface-gray-50)]"
                              aria-label={`View ${item.title}`}
                            >
                              <Image
                                src={item.image || "/images/watch-classic.jpg"}
                                alt={item.title}
                                fill
                                className="object-cover"
                                sizes="56px"
                              />
                            </Link>

                            <div className="flex-1 min-w-0">
                              <Link
                                href={`/items/${item.id}`}
                                onClick={closeCart}
                                className="block text-xs font-semibold text-[var(--text-primary)] truncate hover:text-[var(--otach-teal)] transition-colors"
                              >
                                {item.title}
                              </Link>
                              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                                {formatPrice(item.price)} each
                              </p>
                              <div className="flex items-center justify-between gap-2 mt-2">
                                <div className="inline-flex items-center border border-[var(--border-light)] rounded-full overflow-hidden">
                                  <button
                                    type="button"
                                    onClick={() => handleDecreaseQuantity(item)}
                                    aria-label={`Decrease quantity of ${item.title}`}
                                    className="w-7 h-7 flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--surface-gray-50)] transition-colors"
                                  >
                                    −
                                  </button>
                                  <span className="w-7 text-center text-xs font-bold text-[var(--text-primary)]">
                                    {item.quantity}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => handleIncreaseQuantity(item)}
                                    disabled={item.quantity >= maxQuantityPerItem}
                                    aria-label={`Increase quantity of ${item.title}`}
                                    className="w-7 h-7 flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--surface-gray-50)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                  >
                                    +
                                  </button>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveItem(item)}
                                  className="text-xs font-semibold text-red-600 hover:underline focus:outline-none"
                                  aria-label={`Remove ${item.title} from bag`}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>

                            <span className="text-xs font-bold text-[var(--text-primary)] shrink-0">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4 pt-3 border-t border-[var(--border-light)] flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                          Subtotal
                        </span>
                        <span className="text-sm font-extrabold text-[var(--text-primary)]">
                          {formatPrice(subtotal)}
                        </span>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <Link
                          href="/cart"
                          onClick={closeCart}
                          className="btn-outline btn-sm !w-full justify-center"
                        >
                          View Bag
                        </Link>
                        <Link
                          href="/checkout"
                          onClick={closeCart}
                          className="btn-primary btn-sm !w-full justify-center"
                        >
                          Checkout
                        </Link>
                      </div>
                    </>
                  )}
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
              {!authLoading && user ? (
                <>
                  <p className="text-xs text-[var(--text-muted)] px-1 truncate">{accountLabel}</p>
                  <Link href="/items/add" className="btn-outline justify-center !w-full">
                    Add Timepiece
                  </Link>
                  <Link href="/items/manage" className="btn-outline justify-center !w-full">
                    Manage Products
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="btn-ghost justify-center !w-full !text-red-600"
                  >
                    {isLoggingOut ? "Signing out…" : "Sign Out"}
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="btn-outline justify-center !w-full"
                >
                  Sign In / Account
                </Link>
              )}
              <Link
                href="/cart"
                onClick={() => setMobileOpen(false)}
                className="btn-primary justify-center !w-full"
              >
                View Bag ({itemCount} {itemCount === 1 ? "item" : "items"})
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
