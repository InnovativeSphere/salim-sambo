// ============================================================
// src/app/robots.ts
// Generates /robots.txt — allows all crawlers, points to sitemap
// ============================================================

import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/content";

const BASE_URL = `https://${siteConfig.domain}`;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}