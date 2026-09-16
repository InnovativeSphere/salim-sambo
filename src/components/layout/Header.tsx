// ============================================================
// src/components/layout/Header.tsx
// Sleek sticky header with Stack dropdown + premium mobile menu
// ============================================================

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { navLinks, navCta, stackRoutes } from "@/data/content";
import { stackAccents } from "@/data/theme";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [stackOpen, setStackOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Resolve hash links from any route
  const resolveHref = (href: string) => {
    if (isHome) return href;
    return href.startsWith("#") ? `/${href}` : href;
  };

  // Scroll detection + active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (!isHome) return;

      const sections = navLinks
        .map((link) => {
          const id = link.href.replace("#", "");
          const el = document.getElementById(id);
          return el ? { id, el } : null;
        })
        .filter(Boolean) as { id: string; el: HTMLElement }[];

      let current = "";
      for (const { id, el } of sections) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 150) current = id;
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setStackOpen(false);
  }, [pathname]);

  // Body scroll lock when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Detect if any stack route is currently active
  const activeStackSlug = stackRoutes.find(
    (s) => pathname === `/${s.slug}`
  )?.slug;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "backdrop-blur-xl border-b" : "border-b border-transparent"
        )}
        style={{
          backgroundColor: scrolled
            ? "color-mix(in srgb, var(--color-bg-primary) 88%, transparent)"
            : "transparent",
          borderColor: scrolled ? "var(--color-border)" : "transparent",
        }}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-6 h-16 md:h-[72px] flex items-center justify-between">
          <Logo size="md" showWordmark />

          {/* ==================== DESKTOP NAV ==================== */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = isHome && activeSection === id;
              return (
                <Link
                  key={link.href}
                  href={resolveHref(link.href)}
                  className="px-3.5 py-2 text-[13.5px] font-medium rounded-full transition-all duration-200"
                  style={{
                    color: isActive
                      ? "var(--color-text-primary)"
                      : "var(--color-text-secondary)",
                    backgroundColor: isActive
                      ? "var(--color-bg-subtle)"
                      : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--color-text-primary)";
                      e.currentTarget.style.backgroundColor =
                        "var(--color-bg-subtle)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color =
                        "var(--color-text-secondary)";
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* ==================== STACK DROPDOWN ==================== */}
            <div
              className="relative"
              onMouseEnter={() => setStackOpen(true)}
              onMouseLeave={() => setStackOpen(false)}
            >
              <button
                className="flex items-center gap-1 px-3.5 py-2 text-[13.5px] font-medium rounded-full transition-all duration-200"
                style={{
                  color: activeStackSlug
                    ? "var(--color-text-primary)"
                    : stackOpen
                    ? "var(--color-text-primary)"
                    : "var(--color-text-secondary)",
                  backgroundColor:
                    activeStackSlug || stackOpen
                      ? "var(--color-bg-subtle)"
                      : "transparent",
                }}
                aria-expanded={stackOpen}
                aria-haspopup="true"
              >
                Stack
                <ChevronDown
                  size={13}
                  className={cn(
                    "transition-transform duration-300",
                    stackOpen && "rotate-180"
                  )}
                />
              </button>

              {/* Dropdown panel */}
              <div
                className={cn(
                  "absolute top-full right-0 pt-3 transition-all duration-200",
                  stackOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-1 pointer-events-none"
                )}
              >
                <div
                  className="w-[320px] rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    backgroundColor: "var(--color-bg-primary)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <div className="p-2">
                    {stackRoutes.map((stack) => {
                      const accent =
                        stackAccents[stack.slug] ?? stackAccents.default;
                      const isActive = activeStackSlug === stack.slug;

                      return (
                        <Link
                          key={stack.slug}
                          href={`/${stack.slug}`}
                          className="group flex items-start gap-3 p-3 rounded-xl transition-colors duration-150"
                          style={{
                            backgroundColor: isActive
                              ? "var(--color-bg-subtle)"
                              : "transparent",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "var(--color-bg-subtle)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = isActive
                              ? "var(--color-bg-subtle)"
                              : "transparent";
                          }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                            style={{ backgroundColor: accent.accent }}
                          />
                          <div className="flex-1 min-w-0">
                            <p
                              className="text-sm font-medium leading-tight mb-0.5"
                              style={{ color: "var(--color-text-primary)" }}
                            >
                              {stack.label}
                            </p>
                            <p
                              className="text-xs leading-snug truncate"
                              style={{ color: "var(--color-text-muted)" }}
                            >
                              {stack.tagline}
                            </p>
                          </div>
                          <ArrowUpRight
                            size={14}
                            className="shrink-0 mt-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                            style={{ color: accent.accent }}
                          />
                        </Link>
                      );
                    })}
                  </div>

                  {/* Footer of dropdown */}
                  <div
                    className="px-4 py-3 flex items-center justify-between"
                    style={{
                      borderTop: "1px solid var(--color-border)",
                      backgroundColor: "var(--color-bg-subtle)",
                    }}
                  >
                    <span
                      className="text-[10px] font-mono uppercase tracking-widest"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      Explore by discipline
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button
              href={resolveHref(navCta.href)}
              variant="primary"
              size="sm"
            >
              {navCta.label}
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 -mr-2 rounded-lg transition-colors"
            style={{ color: "var(--color-text-primary)" }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* ==================== MOBILE MENU ==================== */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300 overflow-y-auto",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--color-bg-primary) 98%, transparent)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="min-h-screen pt-20 pb-10 px-5 flex flex-col">
          {/* Nav links (numbered) */}
          <nav className="flex flex-col">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={resolveHref(link.href)}
                className="flex items-baseline gap-4 py-3.5 group"
                style={{
                  transform: isMobileMenuOpen
                    ? "translateY(0)"
                    : "translateY(12px)",
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transition: `all 0.4s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 40}ms`,
                }}
              >
                <span
                  className="text-[10px] font-mono shrink-0 mt-1"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-xl font-medium tracking-tight transition-colors duration-200 group-hover:opacity-60"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <div
            className="my-6"
            style={{
              height: "1px",
              backgroundColor: "var(--color-border)",
              transform: isMobileMenuOpen ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition: "transform 0.5s ease 240ms",
            }}
          />

          {/* Stack section */}
          <div
            className="transition-all duration-500"
            style={{
              opacity: isMobileMenuOpen ? 1 : 0,
              transform: isMobileMenuOpen
                ? "translateY(0)"
                : "translateY(12px)",
              transitionDelay: "280ms",
            }}
          >
            <p
              className="text-[10px] font-mono uppercase tracking-widest mb-3"
              style={{ color: "var(--color-text-muted)" }}
            >
              Stack
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {stackRoutes.map((stack) => {
                const accent =
                  stackAccents[stack.slug] ?? stackAccents.default;
                const isActive = activeStackSlug === stack.slug;

                return (
                  <Link
                    key={stack.slug}
                    href={`/${stack.slug}`}
                    className="relative flex flex-col p-3.5 rounded-xl transition-all duration-200 active:scale-[0.98]"
                    style={{
                      backgroundColor: isActive
                        ? "var(--color-bg-subtle)"
                        : "var(--color-bg-primary)",
                      border: `1px solid ${
                        isActive ? accent.accent : "var(--color-border)"
                      }`,
                    }}
                  >
                    <span
                      className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl"
                      style={{ backgroundColor: accent.accent }}
                    />
                    <span
                      className="text-[10px] font-mono uppercase tracking-widest mb-1.5"
                      style={{ color: accent.accent }}
                    >
                      {stack.slug}
                    </span>
                    <span
                      className="text-sm font-semibold leading-tight"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {stack.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div
            className="mt-auto pt-8 transition-all duration-500"
            style={{
              opacity: isMobileMenuOpen ? 1 : 0,
              transform: isMobileMenuOpen
                ? "translateY(0)"
                : "translateY(12px)",
              transitionDelay: "360ms",
            }}
          >
            <Button
              href={resolveHref(navCta.href)}
              variant="primary"
              size="lg"
              className="w-full"
            >
              {navCta.label}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}