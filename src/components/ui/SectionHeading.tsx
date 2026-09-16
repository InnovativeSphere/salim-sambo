// ============================================================
// src/components/ui/SectionHeading.tsx
// Consistent section header — eyebrow + title + description
// ============================================================

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  titleAccent,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={cn("max-w-2xl", alignment, className)}>
      {eyebrow && (
        <div
          className={cn(
            "flex items-center gap-2 mb-4",
            align === "center" && "justify-center"
          )}
        >
          <span
            className="w-6 h-px"
            style={{ backgroundColor: "var(--color-accent)" }}
          />
          <span
            className="text-xs font-mono uppercase tracking-widest"
            style={{ color: "var(--color-accent)" }}
          >
            {eyebrow}
          </span>
        </div>
      )}

      <h2
        className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight"
        style={{ color: "var(--color-text-primary)" }}
      >
        {title}
        {titleAccent && (
          <>
            {" "}
            <span style={{ color: "var(--color-accent)" }}>{titleAccent}</span>
          </>
        )}
      </h2>

      {description && (
        <p
          className="mt-5 text-base md:text-lg leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {description}
        </p>
      )}
    </div>
  );
}