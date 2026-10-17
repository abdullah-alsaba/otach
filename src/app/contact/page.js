"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("concierge");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-[var(--surface-white)] min-h-screen">
      {/* ── Breadcrumb ── */}
      <div className="border-b border-[var(--border-light)] bg-[var(--surface-gray-50)] py-4">
        <div className="container-otach">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--otach-teal)] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[var(--text-primary)] font-semibold">Contact Concierge</span>
          </nav>
        </div>
      </div>

      {/* ── Header ── */}
      <section className="section-spacing border-b border-[var(--border-light)] bg-gradient-to-b from-[var(--surface-white)] to-[var(--surface-gray-50)]">
        <div className="container-otach">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--otach-teal)] block mb-3">
              Dedicated Client Care
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              Otach Concierge Service
            </h1>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              Whether you seek bespoke timepiece guidance, order verification, or horological maintenance,
              our specialists are at your disposal.
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact Details & Form Grid ── */}
      <section className="section-spacing">
        <div className="container-otach">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Atelier Information */}
            <div className="lg:col-span-5 space-y-6">
              <div className="card-otach p-7 sm:p-9 bg-white border border-[var(--border-light)] rounded-3xl shadow-[var(--shadow-sm)]">
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--otach-teal)] block mb-2">
                  Heritage Atelier
                </span>
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6 tracking-tight">
                  Atelier & Client Services
                </h2>

                <div className="space-y-6 text-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--otach-teal-pale)] text-[var(--otach-teal)] flex items-center justify-center shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)]">Horological Atelier</h3>
                      <p className="text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                        42 Rue du Rhône, 1204 Geneva, Switzerland
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--otach-teal-pale)] text-[var(--otach-teal)] flex items-center justify-center shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)]">Email Inquiries</h3>
                      <p className="text-[var(--text-secondary)] mt-0.5 font-medium">
                        concierge@otach.com
                      </p>
                      <p className="text-xs text-[var(--text-muted)] mt-1">Average response within 4 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--otach-teal-pale)] text-[var(--otach-teal)] flex items-center justify-center shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)]">Hours of Operation</h3>
                      <p className="text-[var(--text-secondary)] mt-0.5">
                        Monday – Friday: 09:00 – 19:00 CET
                      </p>
                      <p className="text-xs text-[var(--text-muted)] mt-1">Saturday: 10:00 – 16:00 CET</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[var(--border-light)] flex items-center gap-2.5 text-xs text-[var(--text-secondary)]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Senior horologists available for private consult</span>
                </div>
              </div>
            </div>

            {/* Right Column: Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="card-otach p-7 sm:p-9 bg-white border border-[var(--border-light)] rounded-3xl shadow-[var(--shadow-sm)]">
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--otach-teal)] block mb-2">
                  Direct Inquiries
                </span>
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2 tracking-tight">
                  Send a Message
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mb-6">
                  Complete the form below to connect with an Otach horological specialist.
                </p>

                {submitted ? (
                  <div className="p-8 rounded-2xl bg-[var(--otach-teal-pale)] border border-[var(--otach-teal)]/30 text-center animate-fade-in">
                    <div className="w-12 h-12 rounded-full bg-[var(--otach-teal)] text-white flex items-center justify-center mx-auto mb-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-base text-[var(--text-primary)] mb-1">
                      Inquiry Received
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mb-5 max-w-sm mx-auto">
                      Thank you, {name}. An Otach concierge representative has received your request and will reach out shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setName("");
                        setEmail("");
                        setMessage("");
                      }}
                      className="btn-outline btn-sm cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g., Julien Beaumont"
                          className="w-full h-11 px-3.5 rounded-xl border border-[var(--border-light)] bg-white text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--otach-teal)] focus:ring-2 focus:ring-[var(--otach-teal)]/15 transition-all"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="julien@example.com"
                          className="w-full h-11 px-3.5 rounded-xl border border-[var(--border-light)] bg-white text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--otach-teal)] focus:ring-2 focus:ring-[var(--otach-teal)]/15 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                        Inquiry Subject
                      </label>
                      <div className="relative">
                        <select
                          id="subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full h-11 pl-3.5 pr-10 rounded-xl border border-[var(--border-light)] bg-white text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--otach-teal)] focus:ring-2 focus:ring-[var(--otach-teal)]/15 transition-all appearance-none cursor-pointer"
                        >
                          <option value="concierge">Timepiece Consultation & Sourcing</option>
                          <option value="order">Order Tracking & Delivery Status</option>
                          <option value="service">Service, Regulation & Maintenance</option>
                          <option value="general">General Inquiries</option>
                        </select>
                        <svg
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us how we can assist you with your timepiece selection or service..."
                        className="w-full p-3.5 rounded-xl border border-[var(--border-light)] bg-white text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--otach-teal)] focus:ring-2 focus:ring-[var(--otach-teal)]/15 transition-all resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="btn-primary btn-lg w-full justify-center !w-full text-sm font-semibold cursor-pointer"
                      >
                        Submit Concierge Request
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Shipping & Returns Section (#shipping anchor) ── */}
      <section id="shipping" className="section-spacing border-t border-[var(--border-light)] bg-[var(--surface-gray-50)]">
        <div className="container-otach max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--otach-teal)] block mb-2">
              Policy & Logistics
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Shipping & Return Protocols
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-7 rounded-2xl bg-white border border-[var(--border-light)] shadow-2xs">
              <h3 className="font-bold text-base text-[var(--text-primary)] mb-2">
                Insured Global Dispatch
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                All timepieces are dispatched with signature-required express courier tracking. Complimentary insured shipping is included on all domestic and international orders.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white border border-[var(--border-light)] shadow-2xs">
              <h3 className="font-bold text-base text-[var(--text-primary)] mb-2">
                30-Day Evaluation Period
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                We provide a 30-day evaluation window. Items must remain in unworn condition with original seals, serial cards, and presentation cases intact for full refunds.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
