// ============================================================
// src/components/ui/Logo.tsx
// The "S" monogram — used in header, footer, and as favicon mark
// ============================================================

import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  href?: string;
  className?: string;
}

const sizeMap = {
  sm: { box: 28, text: "text-base", gap: "gap-2" },
  md: { box: 36, text: "text-lg", gap: "gap-2.5" },
  lg: { box: 48, text: "text-2xl", gap: "gap-3" },
};

export default function Logo({
  size = "md",
  showWordmark = true,
  href = "/",
  className = "",
}: LogoProps) {
  const dims = sizeMap[size];

  const content = (
    <div className={`flex items-center ${dims.gap} ${className}`}>
      {/* Monogram mark */}
      <div
        className="relative flex items-center justify-center rounded-lg overflow-hidden shrink-0 transition-transform duration-300 group-hover:scale-105"
        style={{
          width: dims.box,
          height: dims.box,
          backgroundColor: "var(--color-text-primary)",
        }}
      >
        <span
          className="font-mono font-bold"
          style={{
            color: "var(--color-bg-primary)",
            fontSize: dims.box * 0.5,
            lineHeight: 1,
          }}
        >
          S
        </span>
        {/* Subtle accent dot in corner */}
        <span
          className="absolute bottom-1 right-1 w-1 h-1 rounded-full"
          style={{ backgroundColor: "var(--color-accent)" }}
        />
      </div>

      {/* Wordmark */}
      {showWordmark && (
        <span
          className={`font-semibold tracking-tight ${dims.text}`}
          style={{ color: "var(--color-text-primary)" }}
        >
          Salim Sambo
        </span>
      )}
    </div>
  );

  return (
    <Link href={href} className="group inline-block">
      {content}
    </Link>
  );
}