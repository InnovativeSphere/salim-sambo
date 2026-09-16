// ============================================================
// src/components/layout/Footer.tsx
// Site footer with brand, navigate, stack, and contact
// ============================================================

"use client";

import Link from "next/link";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import Logo from "@/components/ui/Logo";
import {
  footerData,
  siteConfig,
  contactSection,
  stackRoutes,
} from "@/data/content";
import { stackAccents } from "@/data/theme";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-24 border-t"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-bg-subtle)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Top: Brand + Navigate + Stack + Contact */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <Logo size="md" showWordmark />
            <p
              className="mt-5 text-sm leading-relaxed max-w-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {footerData.tagline}
            </p>

            <div
              className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-secondary)",
              }}
            >
              <MapPin size={12} />
              {siteConfig.location}
            </div>
          </div>

          {/* Navigate */}
          <div className="md:col-span-2">
            <h4
              className="text-[10px] font-mono uppercase tracking-widest mb-5"
              style={{ color: "var(--color-text-muted)" }}
            >
              Navigate
            </h4>
            <ul className="space-y-2.5">
              {footerData.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "var(--color-text-secondary)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--color-accent)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color =
                        "var(--color-text-secondary)";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stack */}
          <div className="md:col-span-3">
            <h4
              className="text-[10px] font-mono uppercase tracking-widest mb-5"
              style={{ color: "var(--color-text-muted)" }}
            >
              Stack
            </h4>
            <ul className="space-y-2.5">
              {stackRoutes.map((stack) => {
                const accent =
                  stackAccents[stack.slug] ?? stackAccents.default;
                return (
                  <li key={stack.slug}>
                    <Link
                      href={`/${stack.slug}`}
                      className="group inline-flex items-center gap-2.5 text-sm transition-colors duration-200"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0 transition-transform duration-200 group-hover:scale-125"
                        style={{ backgroundColor: accent.accent }}
                      />
                      <span className="transition-colors duration-200 group-hover:opacity-70">
                        {stack.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4
              className="text-[10px] font-mono uppercase tracking-widest mb-5"
              style={{ color: "var(--color-text-muted)" }}
            >
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group inline-flex items-center gap-3 text-sm transition-colors duration-200"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-105 shrink-0"
                    style={{
                      backgroundColor: "var(--color-bg-primary)",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-accent)",
                    }}
                  >
                    <Mail size={14} />
                  </span>
                  <span className="truncate">{siteConfig.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-sm transition-colors duration-200"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-105 shrink-0"
                    style={{
                      backgroundColor: "var(--color-bg-primary)",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-accent)",
                    }}
                  >
                    <MessageCircle size={14} />
                  </span>
                  WhatsApp
                </a>
              </li>
            </ul>

            <p
              className="mt-6 text-xs leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              {contactSection.responseTime}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div
          className="my-12 border-t"
          style={{ borderColor: "var(--color-border)" }}
        />

        {/* Legal */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p
            className="text-xs leading-relaxed max-w-xl"
            style={{ color: "var(--color-text-muted)" }}
          >
            {footerData.legalLine}
          </p>
          <p
            className="text-xs font-mono whitespace-nowrap"
            style={{ color: "var(--color-text-muted)" }}
          >
            © {year} {siteConfig.name}
          </p>
        </div>
      </div>
    </footer>
  );
}