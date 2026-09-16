// ============================================================
// src/lib/og.tsx
// Shared OG image template — used by all opengraph-image routes
// ============================================================

import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/content";

interface OGTemplateProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  accentColor: string;
}

export function renderOG({
  eyebrow,
  title,
  subtitle,
  accentColor,
}: OGTemplateProps) {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#FAFAFA",
          padding: "72px",
          position: "relative",
        }}
      >
        {/* Top accent strip */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "10px",
            backgroundColor: accentColor,
          }}
        />

        {/* Dot grid background */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle, #E5E5E5 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            opacity: 0.5,
          }}
        />

        {/* Top row — brand + domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: 18,
                backgroundColor: "#1A1A1A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 20,
              }}
            >
              <span
                style={{
                  fontSize: 38,
                  fontWeight: 700,
                  color: "#FFFFFF",
                  fontFamily: "monospace",
                }}
              >
                S
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#1A1A1A",
                  letterSpacing: "-0.01em",
                }}
              >
                {siteConfig.name}
              </span>
              <span
                style={{
                  fontSize: 15,
                  color: "#6B6B6B",
                  fontFamily: "monospace",
                }}
              >
                {siteConfig.role}
              </span>
            </div>
          </div>

          {/* Domain */}
          <span
            style={{
              fontSize: 15,
              color: "#9A9A9A",
              fontFamily: "monospace",
            }}
          >
            {siteConfig.domain}
          </span>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Bottom content block */}
        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 32,
                height: 3,
                backgroundColor: accentColor,
                marginRight: 14,
              }}
            />
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: accentColor,
                fontFamily: "monospace",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
              }}
            >
              {eyebrow}
            </span>
          </div>

          {/* Title */}
          <span
            style={{
              fontSize: title.length > 40 ? 60 : 72,
              fontWeight: 700,
              color: "#1A1A1A",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: 24,
            }}
          >
            {title}
          </span>

          {/* Subtitle */}
          <span
            style={{
              fontSize: 26,
              color: "#4A4A4A",
              lineHeight: 1.4,
              maxWidth: 950,
            }}
          >
            {subtitle}
          </span>

          {/* Bottom accent line */}
          <div
            style={{
              marginTop: 40,
              width: 120,
              height: 4,
              backgroundColor: accentColor,
              borderRadius: 2,
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}