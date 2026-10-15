"use client";

export default function NewsletterForm() {
  return (
    <form
      id="newsletter-form"
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      onSubmit={(e) => e.preventDefault()}
      aria-label="Newsletter subscription form"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        placeholder="Your email address"
        required
        className="flex-1 px-5 py-3 rounded-full border border-[var(--border-medium)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--otach-teal)] focus:ring-2 focus:ring-[var(--otach-teal)]/20 transition"
      />
      <button
        id="newsletter-submit"
        type="submit"
        className="px-6 py-3 rounded-full bg-[var(--otach-teal)] text-white font-semibold text-sm hover:bg-[var(--otach-teal-light)] transition-all duration-200 whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
  );
}
