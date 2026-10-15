"use client";

import Link from "next/link";

const footerLinks = {
  Shop: [
    { href: "/items", label: "All Products" },
    { href: "/items?category=smartwatch", label: "Smartwatches" },
    { href: "/items?category=analog", label: "Analog" },
    { href: "/items?category=sport", label: "Sport" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/about#story", label: "Our Story" },
    { href: "/about#mission", label: "Mission" },
  ],
  Account: [
    { href: "/login", label: "Sign In" },
    { href: "/register", label: "Register" },
    { href: "/items/manage", label: "Manage Products" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[var(--surface-gray-50)] border-t border-[var(--border-light)] mt-auto">
      <div className="container-otach py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="text-xl font-semibold text-[var(--text-primary)] hover:text-[var(--otach-teal)] transition-colors"
            >
              Otach
            </Link>
            <p className="mt-3 text-sm text-[var(--text-muted)] leading-relaxed max-w-xs">
              Premium timepieces crafted for those who appreciate the art of
              precision and understated elegance.
            </p>
            {/* Social icons */}
            <div className="mt-5 flex gap-3" aria-label="Social media links">
              {[
                {
                  label: "Instagram",
                  path: "M16 3H8C5.24 3 3 5.24 3 8v8c0 2.76 2.24 5 5 5h8c2.76 0 5-2.24 5-5V8c0-2.76-2.24-5-5-5zm3 13c0 1.65-1.35 3-3 3H8c-1.65 0-3-1.35-3-3V8c0-1.65 1.35-3 3-3h8c1.65 0 3 1.35 3 3v8zm-7-9a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm4.5-6.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
                },
                {
                  label: "Twitter/X",
                  path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                },
              ].map(({ label, path }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-[var(--border-light)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--otach-teal)] hover:border-[var(--otach-teal)] transition-all duration-200"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-4">
                {section}
              </h3>
              <ul className="space-y-2.5">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-[var(--text-muted)] hover:text-[var(--otach-teal)] transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[var(--border-light)] flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[var(--text-muted)]">
          <p>© 2026 Otach. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-[var(--otach-teal)] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--otach-teal)] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
