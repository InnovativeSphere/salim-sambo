// ============================================================
// src/components/ui/StatusBadge.tsx
// Status indicator: live / in-progress / archived / client / personal
// ============================================================

import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/data/stack";

interface StatusBadgeProps {
  status: ProjectStatus;
  size?: "sm" | "md";
  className?: string;
}

// Status → color mapping (all muted, minimal)
const statusConfig: Record<
  ProjectStatus,
  { label: string; color: string; bg: string }
> = {
  live: {
    label: "Live",
    color: "#16A34A",       // emerald
    bg: "rgba(22, 163, 74, 0.1)",
  },
  "in-progress": {
    label: "In Progress",
    color: "#E8A020",       // amber
    bg: "rgba(232, 160, 32, 0.1)",
  },
  archived: {
    label: "Archived",
    color: "#9A9A9A",       // grey
    bg: "rgba(154, 154, 154, 0.1)",
  },
  client: {
    label: "Client Work",
    color: "#3B7DD8",       // blue
    bg: "rgba(59, 125, 216, 0.1)",
  },
  personal: {
    label: "Personal",
    color: "#7D3C98",       // purple
    bg: "rgba(125, 60, 152, 0.1)",
  },
};

export default function StatusBadge({
  status,
  size = "md",
  className = "",
}: StatusBadgeProps) {
  const config = statusConfig[status];
  if (!config) return null;

  const isSmall = size === "sm";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium tracking-wide whitespace-nowrap",
        isSmall ? "px-2.5 py-1 text-[10px]" : "px-3 py-1.5 text-xs",
        className
      )}
      style={{
        backgroundColor: config.bg,
        color: config.color,
        border: `1px solid ${config.color}30`,
      }}
    >
      <span
        className={cn(
          "rounded-full shrink-0",
          isSmall ? "w-1 h-1" : "w-1.5 h-1.5",
          status === "live" && "pulse-dot"
        )}
        style={{ backgroundColor: config.color }}
      />
      {config.label}
    </span>
  );
}