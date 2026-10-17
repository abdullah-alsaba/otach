"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const heroSlides = [
  {
    id: "heritage-automatic",
    name: "Heritage Automatic",
    category: "Swiss Caliber",
    tagline: "Swiss Automatic Movement • Sapphire Crystal Glass",
    price: "$325",
    image: "/images/watch-classic.jpg",
    feature: "Hand-regulated 28,800 vph caliber with exhibition caseback",
    href: "/items/heritage-automatic",
  },
  {
    id: "celestial-timekeeper",
    name: "Celestial Timekeeper",
    category: "Connected Series",
    tagline: "Vibrant AMOLED Display • 7-Day Battery Life",
    price: "$178",
    image: "/images/watch-teal.jpg",
    feature: "Titanium-reinforced bezel with comprehensive wellness telemetry",
    href: "/items/celestial-timekeeper",
  },
  {
    id: "gilded-horizon",
    name: "Gilded Horizon",
    category: "Masterpiece Edition",
    tagline: "18K Gold Plated • Milanese Stainless Mesh",
    price: "$480",
    image: "/images/watch-gold.jpg",
    feature: "Sunburst champagne dial with anti-reflective sapphire crystal",
    href: "/items/gilded-horizon",
  },
  {
    id: "vanguard-diver",
    name: "Vanguard Diver Chronograph",
    category: "Endurance Line",
    tagline: "200M Water Resistance • Ceramic Tachymeter",
    price: "$389",
    image: "/images/watch-sport.jpg",
    feature: "Dual-locking screw-down crown with high-contrast luminescence",
    href: "/items/vanguard-diver",
  },
  {
    id: "aurora-blush",
    name: "Aurora Blush",
    category: "Contemporary Atelier",
    tagline: "Rose Gold Accent • Velvet-Touch Silicone",
    price: "$219",
    image: "/images/watch-rose.jpg",
    feature: "Sculpted silhouette with precision quartz caliber & smart telemetry",
    href: "/items/aurora-blush",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goToNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  // Subtle auto-advance every 6 seconds when not paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(goToNext, 6000);
    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goToPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goToNext();
    }
  };

  // Touch gesture support
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) goToNext();
      else goToPrev();
    }
  };

  const currentSlide = heroSlides[current];

  return (
    <div
      className="relative w-full mx-auto flex flex-col focus:outline-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Featured timepieces showcase"
      aria-roledescription="carousel"
    >
      {/* ── Outer Showcase Card ── */}
      <div className="relative w-full rounded-3xl overflow-hidden border border-[var(--border-light)] bg-white shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-300">
        {/* ── Product Photography Frame ── */}
        <div
          className="relative w-full aspect-[4/3] sm:aspect-square bg-gradient-to-b from-[#FAFAFA] via-[#FCFDFD] to-[#F3F6F6] flex items-center justify-center p-6 select-none group"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Subtle Ambient Vignette */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_50%_50%,rgba(45,122,122,0.1),transparent_70%)]"
            aria-hidden="true"
          />

          {/* ── Slide Watch Images ── */}
          <div className="relative w-full h-full flex items-center justify-center">
            {heroSlides.map((slide, index) => {
              const isActive = index === current;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 flex items-center justify-center p-6 transition-all duration-700 ease-out ${
                    isActive
                      ? "opacity-100 scale-100 pointer-events-auto"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                  aria-hidden={!isActive}
                >
                  <Link
                    href={slide.href}
                    className="relative w-full h-full block focus:outline-none"
                    tabIndex={isActive ? 0 : -1}
                    aria-label={`View ${slide.name}`}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.name}
                      fill
                      priority={index === 0}
                      className="object-contain drop-shadow-md transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 640px) 340px, (max-width: 1024px) 440px, 500px"
                    />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* ── Left / Right Minimal Navigation Arrows ── */}
          <button
            type="button"
            onClick={goToPrev}
            aria-label="Previous timepiece slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white text-[var(--text-primary)] hover:text-[var(--otach-teal)] border border-[var(--border-light)] shadow-xs hover:shadow-sm flex items-center justify-center transition-all duration-200 z-10 focus:outline-none focus:ring-2 focus:ring-[var(--otach-teal)] cursor-pointer"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={goToNext}
            aria-label="Next timepiece slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white text-[var(--text-primary)] hover:text-[var(--otach-teal)] border border-[var(--border-light)] shadow-xs hover:shadow-sm flex items-center justify-center transition-all duration-200 z-10 focus:outline-none focus:ring-2 focus:ring-[var(--otach-teal)] cursor-pointer"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* ── Product Information Beneath Image ── */}
        <div className="px-6 pt-6 pb-4 border-t border-[var(--border-light)] bg-white flex flex-col">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--otach-teal)] block mb-1.5">
              {currentSlide.category}
            </span>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] tracking-tight truncate">
                <Link
                  href={currentSlide.href}
                  className="hover:text-[var(--otach-teal)] transition-colors"
                >
                  {currentSlide.name}
                </Link>
              </h3>
              <span className="text-lg sm:text-xl font-bold text-[var(--text-primary)] shrink-0">
                {currentSlide.price}
              </span>
            </div>
          </div>

          <p className="text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed mt-2">
            {currentSlide.feature}
          </p>

          {/* Refined Navigation Bar: Slim indicator dashes and CTA link */}
          <div className="pt-4 mt-4 border-t border-[var(--border-light)] flex items-center justify-between gap-4">
            {/* Slim Dash Indicators */}
            <div
              className="flex items-center gap-1.5"
              role="tablist"
              aria-label="Timepiece slide indicators"
            >
              {heroSlides.map((slide, i) => {
                const isActive = i === current;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Show ${slide.name}`}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[var(--otach-teal)] ${
                      isActive
                        ? "w-6 bg-[var(--otach-teal)]"
                        : "w-2 bg-neutral-200 hover:bg-neutral-300"
                    }`}
                  />
                );
              })}
            </div>

            {/* Direct CTA Link */}
            <Link
              href={currentSlide.href}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--otach-teal)] hover:text-[var(--otach-teal-dark)] transition-colors group"
            >
              <span>View Timepiece</span>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
