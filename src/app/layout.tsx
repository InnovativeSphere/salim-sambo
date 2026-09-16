// ============================================================
// src/app/layout.tsx
// Root layout — fonts, metadata, global UI, analytics
// ============================================================

import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

import { siteConfig } from "@/data/content";
import { themeToCssVarsObject } from "@/data/theme";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CommandPalette from "@/components/ui/CommandPalette";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Python developer",
    "KYC automation",
    "document verification",
    "fintech Nigeria",
    "OpenCV",
    "computer vision",
    "Salim Sambo",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
    url: siteConfig.domain,
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: "/images/headshot.jpg",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
    images: ["/images/headshot.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body
        className="antialiased"
        style={themeToCssVarsObject("default")}
      >
        {/* Global overlays */}
        <ScrollProgress />
        <CommandPalette />

        {children}

        {/* Vercel Analytics — tracks page views + Web Vitals */}
        <Analytics />
      </body>
    </html>
  );
}