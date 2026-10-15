import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Otach — Premium Timepieces",
    template: "%s | Otach",
  },
  description:
    "Discover timeless elegance and precision craftsmanship at Otach — your destination for premium, curated timepieces.",
  keywords: ["watches", "luxury watches", "smartwatches", "Otach", "timepieces"],
  authors: [{ name: "Otach" }],
  openGraph: {
    title: "Otach — Premium Timepieces",
    description: "Discover timeless elegance at Otach.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[var(--text-primary)]">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
