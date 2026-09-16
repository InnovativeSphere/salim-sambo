// ============================================================
// src/components/ui/CommandPalette.tsx
// Cmd+K / Ctrl+K command palette — keyboard navigable
// ============================================================

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  Home,
  Mail,
  MessageCircle,
  ExternalLink,
  Code2,
  Server,
  Smartphone,
  Brain,
  CornerDownLeft,
} from "lucide-react";
import { stackAccents } from "@/data/theme";
import { siteConfig } from "@/data/content";

interface Command {
  id: string;
  label: string;
  hint?: string;
  icon: React.ReactNode;
  accent?: string;
  action: () => void;
  keywords: string[];
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // ==================== COMMAND LIST ====================
  const commands: Command[] = useMemo(() => {
    const goToHash = (hash: string) => {
      setOpen(false);
      if (pathname !== "/") {
        router.push(`/${hash}`);
      } else {
        document
          .querySelector(hash)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    return [
      // Navigate — Home sections
      {
        id: "home",
        label: "Home",
        hint: "Top of page",
        icon: <Home size={15} />,
        keywords: ["home", "top", "start", "hero"],
        action: () => {
          setOpen(false);
          if (pathname !== "/") router.push("/");
          else window.scrollTo({ top: 0, behavior: "smooth" });
        },
      },
      {
        id: "services",
        label: "Services",
        hint: "What I build",
        icon: <Code2 size={15} />,
        keywords: ["services", "work", "offer", "kyc", "automation"],
        action: () => goToHash("#services"),
      },
      {
        id: "process",
        label: "Process",
        hint: "How it works",
        icon: <ArrowRight size={15} />,
        keywords: ["process", "how", "works", "steps"],
        action: () => goToHash("#process"),
      },
      {
        id: "demo",
        label: "Live Demo",
        hint: "KYC walkthrough",
        icon: <ExternalLink size={15} />,
        keywords: ["demo", "kyc", "video", "live"],
        action: () => goToHash("#demo"),
      },
      {
        id: "case-studies",
        label: "Selected Work",
        hint: "Case studies",
        icon: <Code2 size={15} />,
        keywords: ["work", "projects", "case", "studies", "portfolio"],
        action: () => goToHash("#case-studies"),
      },
      {
        id: "about",
        label: "About",
        hint: "Who I am",
        icon: <ArrowRight size={15} />,
        keywords: ["about", "bio", "who", "me"],
        action: () => goToHash("#about"),
      },
      {
        id: "faq",
        label: "FAQ",
        hint: "Common questions",
        icon: <ArrowRight size={15} />,
        keywords: ["faq", "questions", "help"],
        action: () => goToHash("#faq"),
      },
      {
        id: "contact",
        label: "Get in Touch",
        hint: "Start a project",
        icon: <Mail size={15} />,
        keywords: ["contact", "touch", "email", "hire", "start"],
        action: () => goToHash("#contact"),
      },

      // Stack routes
      {
        id: "frontend",
        label: "Frontend",
        hint: "React · Next.js",
        icon: <Code2 size={15} />,
        accent: stackAccents.frontend.accent,
        keywords: ["frontend", "react", "nextjs", "ui", "web"],
        action: () => {
          setOpen(false);
          router.push("/frontend");
        },
      },
      {
        id: "backend",
        label: "Backend",
        hint: "NestJS · Express",
        icon: <Server size={15} />,
        accent: stackAccents.backend.accent,
        keywords: ["backend", "nestjs", "express", "api", "server"],
        action: () => {
          setOpen(false);
          router.push("/backend");
        },
      },
      {
        id: "mobile",
        label: "Mobile",
        hint: "Flutter · React Native",
        icon: <Smartphone size={15} />,
        accent: stackAccents.mobile.accent,
        keywords: ["mobile", "flutter", "react native", "app", "android", "ios"],
        action: () => {
          setOpen(false);
          router.push("/mobile");
        },
      },
      {
        id: "python",
        label: "Python & AI",
        hint: "Automation · ML · CV",
        icon: <Brain size={15} />,
        accent: stackAccents.python.accent,
        keywords: ["python", "ai", "ml", "opencv", "automation", "cv"],
        action: () => {
          setOpen(false);
          router.push("/python");
        },
      },

      // External
      {
        id: "email",
        label: "Email me",
        hint: siteConfig.email,
        icon: <Mail size={15} />,
        keywords: ["email", "mail", "gmail", "write"],
        action: () => {
          setOpen(false);
          window.location.href = `mailto:${siteConfig.email}`;
        },
      },
      {
        id: "whatsapp",
        label: "WhatsApp",
        hint: "Message directly",
        icon: <MessageCircle size={15} />,
        keywords: ["whatsapp", "chat", "message", "call", "phone"],
        action: () => {
          setOpen(false);
          window.open(
            `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`,
            "_blank"
          );
        },
      },
      {
        id: "kyc-demo",
        label: "Open KYC demo",
        hint: "Live project",
        icon: <ExternalLink size={15} />,
        keywords: ["kyc", "demo", "live", "project", "verify"],
        action: () => {
          setOpen(false);
          window.open(siteConfig.demoUrl, "_blank");
        },
      },
    ];
  }, [pathname, router]);

  // ==================== FILTER ====================
  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase().trim();
    return commands.filter((cmd) => {
      const haystack = [cmd.label, cmd.hint ?? "", ...cmd.keywords]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, commands]);

  // ==================== KEYBOARD SHORTCUT ====================
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Reset on open
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      // Focus after paint
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Keep selection in bounds when list changes
  useEffect(() => {
    setSelected(0);
  }, [query]);

  // ==================== ARROW NAVIGATION ====================
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selected]) filtered[selected].action();
    }
  };

  // Scroll selected item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(
      `[data-index="${selected}"]`
    ) as HTMLElement | null;
    el?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  return (
    <>
      {/* Trigger hint — a small floating pill in the corner */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 hidden md:inline-flex items-center gap-2 px-3.5 py-2 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-0.5"
        style={{
          backgroundColor: "var(--color-bg-primary)",
          border: "1px solid var(--color-border)",
          color: "var(--color-text-muted)",
          backdropFilter: "blur(8px)",
        }}
        aria-label="Open command palette"
      >
        <Search size={13} />
        <span className="text-xs font-medium">Command</span>
        <span
          className="text-[10px] font-mono px-1.5 py-0.5 rounded"
          style={{
            backgroundColor: "var(--color-bg-subtle)",
            color: "var(--color-text-muted)",
          }}
        >
          ⌘K
        </span>
      </button>

      {/* Palette */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4"
            style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                border: "1px solid var(--color-border)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search input */}
              <div
                className="flex items-center gap-3 px-4 py-3.5 border-b"
                style={{ borderColor: "var(--color-border)" }}
              >
                <Search
                  size={16}
                  style={{ color: "var(--color-text-muted)" }}
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search pages, sections, actions..."
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{
                    color: "var(--color-text-primary)",
                  }}
                />
                <span
                  className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: "var(--color-bg-subtle)",
                    color: "var(--color-text-muted)",
                  }}
                >
                  ESC
                </span>
              </div>

              {/* Results */}
              <div
                ref={listRef}
                className="max-h-[400px] overflow-y-auto p-2"
              >
                {filtered.length === 0 ? (
                  <div className="px-3 py-10 text-center">
                    <p
                      className="text-sm"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      No results for "{query}"
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    {filtered.map((cmd, i) => {
                      const isSelected = i === selected;
                      return (
                        <button
                          key={cmd.id}
                          data-index={i}
                          onClick={cmd.action}
                          onMouseEnter={() => setSelected(i)}
                          className="group flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg transition-colors duration-100"
                          style={{
                            backgroundColor: isSelected
                              ? "var(--color-bg-subtle)"
                              : "transparent",
                          }}
                        >
                          {/* Icon */}
                          <span
                            className="w-8 h-8 shrink-0 rounded-lg flex items-center justify-center transition-colors"
                            style={{
                              backgroundColor: isSelected
                                ? cmd.accent
                                  ? `color-mix(in srgb, ${cmd.accent} 15%, transparent)`
                                  : "var(--color-bg-primary)"
                                : "var(--color-bg-subtle)",
                              color: cmd.accent ?? "var(--color-text-secondary)",
                              border: isSelected
                                ? "1px solid transparent"
                                : "1px solid var(--color-border)",
                            }}
                          >
                            {cmd.icon}
                          </span>

                          {/* Label + hint */}
                          <div className="flex-1 min-w-0">
                            <p
                              className="text-sm font-medium leading-tight truncate"
                              style={{
                                color: "var(--color-text-primary)",
                              }}
                            >
                              {cmd.label}
                            </p>
                            {cmd.hint && (
                              <p
                                className="text-xs leading-tight truncate mt-0.5"
                                style={{ color: "var(--color-text-muted)" }}
                              >
                                {cmd.hint}
                              </p>
                            )}
                          </div>

                          {/* Enter hint when selected */}
                          {isSelected && (
                            <span
                              className="shrink-0 flex items-center gap-1 text-[10px] font-mono"
                              style={{ color: "var(--color-text-muted)" }}
                            >
                              <CornerDownLeft size={11} />
                              Enter
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div
                className="flex items-center justify-between px-4 py-2.5 border-t"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-bg-subtle)",
                }}
              >
                <div
                  className="flex items-center gap-4 text-[10px] font-mono"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <span className="flex items-center gap-1">
                    <span
                      className="px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: "var(--color-bg-primary)" }}
                    >
                      ↑↓
                    </span>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <span
                      className="px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: "var(--color-bg-primary)" }}
                    >
                      ↵
                    </span>
                    select
                  </span>
                </div>
                <span
                  className="text-[10px] font-mono"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {filtered.length} result{filtered.length === 1 ? "" : "s"}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}