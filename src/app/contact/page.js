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
            <span className="badge-otach badge-teal mb-4">Dedicated Client Care</span>
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left Column: Atelier Information */}
            <div className="lg:col-span-5 space-y-6">
              <div className="card-otach p-6 sm:p-8 bg-white">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">
                  Atelier & Client Services
                </h2>

                <div className="space-y-6 text-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--otach-teal-pale)] text-[var(--otach-teal)] flex items-center justify-center shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)]">Email Inquiries</h3>
                      <p className="text-[var(--text-secondary)] mt-0.5">
                        concierge@otach.com
                      </p>
                      <p className="text-xs text-[var(--text-muted)] mt-1">Average response within 4 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--otach-teal-pale)] text-[var(--otach-teal)] flex items-center justify-center shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              </div>
            </div>

            {/* Right Column: Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="card-otach p-6 sm:p-8 bg-white">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                  Send a Message
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mb-6">
                  Complete the form below to connect with an Otach horological specialist.
                </p>

                {submitted ? (
                  <div className="p-6 rounded-2xl bg-[var(--otach-teal-pale)] border border-[var(--otach-teal)]/30 text-center animate-fade-in">
                    <div className="w-12 h-12 rounded-full bg-[var(--otach-teal)] text-white flex items-center justify-center mx-auto mb-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-base text-[var(--text-primary)] mb-1">
                      Inquiry Received
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mb-4">
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
                      className="btn-outline btn-sm"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                          Your Name <span className="text-[var(--status-error)]">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g., Julien Beaumont"
                          className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-light)] bg-white text-sm focus:outline-none focus:border-[var(--otach-teal)] transition-colors"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                          Email Address <span className="text-[var(--status-error)]">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="julien@example.com"
                          className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-light)] bg-white text-sm focus:outline-none focus:border-[var(--otach-teal)] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                        Inquiry Subject
                      </label>
                      <select
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-light)] bg-white text-sm focus:outline-none focus:border-[var(--otach-teal)] transition-colors"
                      >
                        <option value="concierge">Timepiece Consultation & Sourcing</option>
                        <option value="order">Order Tracking & Delivery Status</option>
                        <option value="service">Service, Regulation & Maintenance</option>
                        <option value="general">General Inquiries</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                        Message <span className="text-[var(--status-error)]">*</span>
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us how we can assist you with your timepiece..."
                        className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-light)] bg-white text-sm focus:outline-none focus:border-[var(--otach-teal)] transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary w-full justify-center !py-3"
                    >
                      Submit Concierge Request
                    </button>
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
            <span className="badge-otach badge-gray mb-2">Policy & Logistics</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Shipping & Return Protocols
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[var(--border-light)]">
              <h3 className="font-bold text-base text-[var(--text-primary)] mb-2">
                Insured Global Dispatch
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                All timepieces are dispatched with signature-required express courier tracking. Complimentary insured shipping is included on all domestic and international orders.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[var(--border-light)]">
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
