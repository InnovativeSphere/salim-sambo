// ============================================================
// src/app/sitemap.ts
// Generates /sitemap.xml for search engines
// ============================================================

import type { MetadataRoute } from "next";
import { projects, stacks } from "@/data/stack";
import { siteConfig } from "@/data/content";

const BASE_URL = `https://${siteConfig.domain}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Home page
  const home: MetadataRoute.Sitemap[number] = {
    url: BASE_URL,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 1.0,
  };

  // Stack routes
  const stackRoutes: MetadataRoute.Sitemap = Object.values(stacks).map(
    (stack) => ({
      url: `${BASE_URL}/${stack.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    })
  );

  // Project detail routes
  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${BASE_URL}/${project.stack}/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [home, ...stackRoutes, ...projectRoutes];
}