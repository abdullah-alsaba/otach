"use client";

import { useState, useEffect, useRef } from "react";
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
    feature: "Hand-regulated 28,800 vph caliber",
    href: "/items/heritage-automatic",
  },
  {
    id: "celestial-timekeeper",
    name: "Celestial Timekeeper",
    category: "Connected Series",
    tagline: "Vibrant AMOLED Display • 7-Day Battery Life",
    price: "$178",
    image: "/images/watch-teal.jpg",
    feature: "Titanium-reinforced bezel with health telemetry",
    href: "/items/celestial-timekeeper",
  },
  {
    id: "gilded-horizon",
    name: "Gilded Horizon",
    category: "Masterpiece Edition",
    tagline: "18K Gold Plated • Milanese Stainless Mesh",
    price: "$480",
    image: "/images/watch-gold.jpg",
    feature: "Sunburst champagne dial with sapphire crystal",
    href: "/items/gilded-horizon",
  },
  {
    id: "vanguard-diver",
    name: "Vanguard Diver Chronograph",
    category: "Endurance Line",
    tagline: "200M Water Resistance • Ceramic Tachymeter",
    price: "$389",
    image: "/images/watch-sport.jpg",
    feature: "Dual-locking crown with high-contrast dial",
    href: "/items/vanguard-diver",
  },
  {
    id: "aurora-blush",
    name: "Aurora Blush",
    category: "Contemporary Atelier",
    tagline: "Rose Gold Accent • Velvet-Touch Silicone",
    price: "$219",
    image: "/images/watch-rose.jpg",
    feature: "Delicate feminine silhouette & biometric tracking",
    href: "/items/aurora-blush",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Autoplay cycle every 5 seconds (pauses on hover/focus)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const goToPrev = () => {
    setCurrent((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      goToPrev();
    } else if (e.key === "ArrowRight") {
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
      className="relative w-full max-w-[480px] lg:max-w-none mx-auto flex flex-col items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Featured timepieces carousel"
      aria-roledescription="carousel"
    >
      {/* ── Visual Frame ── */}
      <div
        className="relative w-full aspect-square rounded-3xl overflow-hidden border border-[var(--border-light)] bg-gradient-to-br from-white via-[#FAFBFB] to-[#F1F6F6] shadow-[var(--shadow-lg)] flex items-center justify-center p-6 sm:p-10 select-none group"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Subtle Ambient Radial Lighting */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_50%_50%,rgba(45,122,122,0.12),transparent_70%)]"
          aria-hidden="true"
        />

        {/* Top-Left Category Badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="badge-otach badge-teal text-[11px] font-bold shadow-xs backdrop-blur-xs">
            {currentSlide.category}
          </span>
        </div>

        {/* Top-Right Slide Counter */}
        <div className="absolute top-4 right-4 z-20 text-[11px] font-semibold text-[var(--text-muted)] bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-full border border-[var(--border-light)]">
          <span className="text-[var(--text-primary)] font-bold">{current + 1}</span> / {heroSlides.length}
        </div>

        {/* ── Slide Watch Images ── */}
        <div className="relative w-full h-full flex items-center justify-center">
          {heroSlides.map((slide, index) => {
            const isActive = index === current;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 flex items-center justify-center p-4 transition-all duration-700 ease-out ${
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
                    sizes="(max-width: 640px) 320px, (max-width: 1024px) 440px, 480px"
                  />
                </Link>
              </div>
            );
          })}
        </div>

        {/* ── Previous / Next Navigation Arrows ── */}
        <button
          type="button"
          onClick={goToPrev}
          aria-label="Previous timepiece slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[var(--text-primary)] hover:text-[var(--otach-teal)] border border-[var(--border-light)] shadow-sm backdrop-blur-md flex items-center justify-center transition-all duration-200 z-20 opacity-80 group-hover:opacity-100 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--otach-teal)]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          type="button"
          onClick={goToNext}
          aria-label="Next timepiece slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[var(--text-primary)] hover:text-[var(--otach-teal)] border border-[var(--border-light)] shadow-sm backdrop-blur-md flex items-center justify-center transition-all duration-200 z-20 opacity-80 group-hover:opacity-100 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--otach-teal)]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* ── Bottom Floating Info Banner ── */}
        <Link
          href={currentSlide.href}
          className="absolute bottom-3 inset-x-3 sm:inset-x-5 z-20 bg-white/95 backdrop-blur-md border border-[var(--border-light)] rounded-2xl p-3 shadow-md flex items-center justify-between gap-3 group/banner hover:border-[var(--otach-teal)] transition-all duration-200"
          aria-label={`View details for ${currentSlide.name}`}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] truncate group-hover/banner:text-[var(--otach-teal)] transition-colors">
                {currentSlide.name}
              </h3>
              <span className="text-[11px] font-bold text-[var(--otach-teal)]">
                {currentSlide.price}
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] truncate mt-0.5">
              {currentSlide.feature}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-1 text-[11px] font-semibold text-[var(--otach-teal)] group-hover/banner:translate-x-0.5 transition-transform">
            <span className="hidden sm:inline">Details</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </div>

      {/* ── Subtle Pagination Indicators ── */}
      <div
        className="flex items-center justify-center gap-2 mt-4"
        role="tablist"
        aria-label="Carousel slide buttons"
      >
        {heroSlides.map((slide, i) => {
          const isActive = i === current;
          return (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to slide ${i + 1}: ${slide.name}`}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--otach-teal)] ${
                isActive
                  ? "w-7 bg-[var(--otach-teal)] shadow-xs"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
