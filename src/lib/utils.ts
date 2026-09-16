// ============================================================
// src/lib/utils.ts
// Utility helpers for class merging and general purpose functions
// ============================================================

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes intelligently.
 * Combines clsx (conditional classes) + tailwind-merge (dedupes conflicts).
 * 
 * Usage:
 *   cn("px-4 py-2", isActive && "bg-blue-500", "px-6")
 *   → "py-2 bg-blue-500 px-6" (later px wins)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}