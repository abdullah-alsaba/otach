import Link from "next/link";
import Image from "next/image";

const footerNavigation = {
  Collections: [
    { href: "/items", label: "All Timepieces" },
    { href: "/items?category=automatic", label: "Automatic & Luxury" },
    { href: "/items?category=sport", label: "Chronograph & Sport" },
    { href: "/items?category=classic", label: "Classic & Minimalist" },
    { href: "/items?category=smartwatch", label: "Modern Smartwatches" },
  ],
  "Heritage & Journal": [
    { href: "/about", label: "Our Story & Heritage" },
    { href: "/editorial", label: "The Otach Journal" },
    { href: "/about#craftsmanship", label: "Precision Craftsmanship" },
    { href: "/about#sustainability", label: "Ethical Sourcing" },
  ],
  "Client Services": [
    { href: "/contact", label: "Contact Concierge" },
    { href: "/contact#shipping", label: "Shipping & Returns" },
    { href: "/about#authenticity", label: "Certificate of Authenticity" },
    { href: "/about#care", label: "Watch Maintenance & Care" },
  ],
  Account: [
    { href: "/login", label: "Sign In" },
    { href: "/register", label: "Register Account" },
    { href: "/items", label: "Curated Catalog" },
  ],
};

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "X (Twitter)",
    href: "https://x.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Pinterest",
    href: "https://pinterest.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0a12 12 0 0 0-4.37 23.18c-.07-.98-.13-2.48.03-3.55.15-.97.98-4.16.98-4.16s-.25-.5-.25-1.24c0-1.16.67-2.03 1.51-2.03.71 0 1.05.53 1.05 1.17 0 .71-.46 1.78-.69 2.77-.2.83.42 1.51 1.24 1.51 1.49 0 2.63-1.57 2.63-3.83 0-2-1.44-3.4-3.49-3.4-2.38 0-3.77 1.78-3.77 3.63 0 .72.28 1.49.62 1.91.07.08.08.16.06.25-.07.28-.21.87-.24 1-.04.16-.13.2-.3.12-1.11-.52-1.8-2.14-1.8-3.45 0-2.8 2.04-5.38 5.88-5.38 3.09 0 5.48 2.2 5.48 5.14 0 3.07-1.93 5.54-4.61 5.54-.9 0-1.75-.47-2.04-1.02l-.56 2.12c-.2 1.02-.75 2.3-1.12 3.12A12 12 0 1 0 12 0z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--surface-gray-50)] border-t border-[var(--border-light)] mt-auto text-[var(--text-secondary)]">
      <div className="container-otach py-14 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-4 lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 group"
              aria-label="Otach Timepieces Homepage"
            >
              <Image
                src="/images/otach-logo.png"
                alt="Otach"
                width={32}
                height={32}
                className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-xl font-bold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--otach-teal)] transition-colors duration-200">
                Otach
              </span>
            </Link>

            <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)] max-w-sm">
              Discover timeless elegance and precision craftsmanship. Otach curates exceptional
              timepieces designed for understated distinction and mechanical mastery.
            </p>

            {/* Social Placeholders */}
            <div className="mt-6 flex items-center gap-2.5" aria-label="Social media channels">
              {socialLinks.map(({ name, href, icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow Otach on ${name}`}
                  className="w-9 h-9 rounded-full bg-white border border-[var(--border-light)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--otach-teal)] hover:border-[var(--otach-teal)] hover:bg-[var(--otach-teal-pale)] transition-all duration-200 shadow-xs"
                >
                  {icon}
                </a>
              ))}
            </div>

            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[var(--border-light)] text-xs text-[var(--text-secondary)]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Concierge online & ready to assist</span>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="md:col-span-8 lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(footerNavigation).map(([category, links]) => (
              <div key={category} className="flex flex-col gap-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  {category}
                </h3>
                <ul className="space-y-2.5" role="list">
                  {links.map(({ href, label }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-sm text-[var(--text-secondary)] hover:text-[var(--otach-teal)] transition-colors duration-200 inline-block"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal, Region */}
        <div className="mt-14 pt-8 border-t border-[var(--border-light)] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <p>© 2026 Otach Timepieces. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[var(--text-secondary)]">
            <a href="#" className="hover:text-[var(--otach-teal)] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[var(--otach-teal)] transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[var(--otach-teal)] transition-colors">
              Cookie Preferences
            </a>
          </div>

          <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" x2="22" y1="12" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span>USD ($) • Global Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
