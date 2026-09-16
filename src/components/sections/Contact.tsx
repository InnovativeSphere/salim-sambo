// ============================================================
// src/components/sections/Contact.tsx
// "Get in Touch" — email + WhatsApp + response time
// ============================================================

"use client";

import { Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { contactSection, siteConfig } from "@/data/content";

export default function Contact() {
  const emailHref = `mailto:${siteConfig.email}?subject=Project%20Inquiry`;
  const whatsappHref = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`;

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Heading — centered */}
        <div className="text-center">
          <SectionHeading
            eyebrow="Contact"
            title={contactSection.heading}
            description={contactSection.subheading}
            align="center"
          />
        </div>

        {/* Two contact cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email */}
          <a
            href={emailHref}
            className="group flex items-center justify-between gap-4 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
            style={{
              backgroundColor: "var(--color-bg-subtle)",
              border: "1px solid var(--color-border)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-accent)";
              e.currentTarget.style.backgroundColor = "var(--color-accent-light)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border)";
              e.currentTarget.style.backgroundColor = "var(--color-bg-subtle)";
            }}
          >
            <div className="flex items-center gap-4">
              <span
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: "var(--color-bg-primary)",
                  color: "var(--color-accent)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <Mail size={18} />
              </span>
              <div className="text-left">
                <p
                  className="text-[10px] font-mono uppercase tracking-widest mb-0.5"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Email
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {siteConfig.email}
                </p>
              </div>
            </div>
            <ArrowUpRight
              size={18}
              className="shrink-0 transition-transform duration-300 group-hover:rotate-45"
              style={{ color: "var(--color-text-muted)" }}
            />
          </a>

          {/* WhatsApp */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
            style={{
              backgroundColor: "var(--color-bg-subtle)",
              border: "1px solid var(--color-border)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-accent)";
              e.currentTarget.style.backgroundColor = "var(--color-accent-light)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border)";
              e.currentTarget.style.backgroundColor = "var(--color-bg-subtle)";
            }}
          >
            <div className="flex items-center gap-4">
              <span
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: "var(--color-bg-primary)",
                  color: "var(--color-accent)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <MessageCircle size={18} />
              </span>
              <div className="text-left">
                <p
                  className="text-[10px] font-mono uppercase tracking-widest mb-0.5"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  WhatsApp
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Message directly
                </p>
              </div>
            </div>
            <ArrowUpRight
              size={18}
              className="shrink-0 transition-transform duration-300 group-hover:rotate-45"
              style={{ color: "var(--color-text-muted)" }}
            />
          </a>
        </div>

        {/* Response time note */}
        <div className="mt-12 flex justify-center">
          <div
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full"
            style={{
              backgroundColor: "var(--color-bg-subtle)",
              border: "1px solid var(--color-border)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full pulse-dot"
              style={{ backgroundColor: "var(--color-accent)" }}
            />
            <span
              className="text-xs font-medium"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {contactSection.responseTime}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}