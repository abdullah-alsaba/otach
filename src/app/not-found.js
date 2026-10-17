import Link from "next/link";

export const metadata = {
  title: "Page Not Found — Otach",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="container-otach min-h-[60vh] flex flex-col items-center justify-center text-center py-20">
      <span className="badge-otach badge-teal mb-4">404 Error</span>
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--text-primary)] mb-4">
        Timepiece Not Found
      </h1>
      <p className="text-[var(--text-secondary)] max-w-md mb-8">
        The page or timepiece you are looking for may have been moved, archived, or does not exist.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className="btn-primary">
          Return to Home
        </Link>
        <Link href="/items" className="btn-outline">
          Explore Collection
        </Link>
      </div>
    </div>
  );
}
