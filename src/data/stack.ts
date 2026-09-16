// ============================================================
// src/data/stack.ts
// MASTER STACK FILE — all stacks, all projects, all cross-links
//
// This file powers the four stack routes (/frontend, /backend,
// /mobile, /python) and every project detail page under them.
//
// Single source of truth. Components consume it. No hardcoded copy.
// ============================================================

// ==========================================
// TYPES
// ==========================================

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectOverview {
  problem: string;
  solution: string;
  story: string;
  outcome: string;
}

export interface ProjectTechnical {
  languages: string[];
  frameworks: string[];
  database: string[];
  packages: string[];
  architecture: string;
  notes?: string;
}

export type StackSlug = "python" | "frontend" | "backend" | "mobile";

export type ProjectStatus =
  | "live"
  | "in-progress"
  | "archived"
  | "client"
  | "personal";

export interface Project {
  slug: string;
  stack: StackSlug;
  name: string;
  pitch: string;
  pills: string[];
  overview: ProjectOverview;
  technical: ProjectTechnical;
  metrics: ProjectMetric[];
  status: ProjectStatus;
  crossStack?: StackSlug[];
  externalUrl?: string;
}

export interface Stack {
  slug: StackSlug;
  label: string;
  tagline: string;
  description: string;
  skills: string[];
}

// ==========================================
// STACKS — the four disciplines
// ==========================================

export const stacks: Record<StackSlug, Stack> = {
  python: {
    slug: "python",
    label: "Python & AI",
    tagline: "Automation, ML, and computer vision.",
    description:
      "The core of my work. Python systems for automation, machine learning pipelines, and OpenCV-driven computer vision — including the KYC engine running on this site.",
    skills: [
      "Python",
      "FastAPI",
      "scikit-learn",
      "OpenCV",
      "EasyOCR",
      "Pandas",
      "NumPy",
      "PostgreSQL",
      "Pydantic",
      "PyTorch",
    ],
  },
  frontend: {
    slug: "frontend",
    label: "Frontend",
    tagline: "Interfaces that feel like products.",
    description:
      "React and Next.js applications built with attention to detail — clean component architecture, smooth interactions, and designs that don't get in the way of the work.",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Redux",
      "Zustand",
    ],
  },
  backend: {
    slug: "backend",
    label: "Backend",
    tagline: "APIs that hold up under pressure.",
    description:
      "RESTful and real-time backends built with NestJS and Express, backed by PostgreSQL, MySQL, or MongoDB. Designed for clarity, testability, and scale.",
    skills: [
      "NestJS",
      "Express",
      "Prisma",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "JWT",
      "Swagger",
    ],
  },
  mobile: {
    slug: "mobile",
    label: "Mobile",
    tagline: "Apps that feel native, ship fast.",
    description:
      "Cross-platform mobile applications built with Flutter and React Native — one codebase, two platforms, no compromise on feel.",
    skills: [
      "Flutter",
      "Dart",
      "React Native",
      "Provider",
      "Firebase",
      "Geolocator",
    ],
  },
};

// ==========================================
// PROJECTS
// ==========================================

export const projects: Project[] = [
  // ==========================================
  // PYTHON & AI
  // ==========================================

  {
    slug: "kyc",
    stack: "python",
    name: "Nigerian ID Verification System",
    pitch: "Automated KYC with fraud detection",
    pills: ["Python", "OpenCV", "EasyOCR", "PostgreSQL"],
    status: "live",
    crossStack: ["frontend"],
    externalUrl: "https://kyc-demo-cyan.vercel.app",

    overview: {
      problem:
        "Nigerian banks, fintechs, and microfinance institutions still verify identity documents manually — slow, expensive, and prone to missing tampered documents. Existing verification services either charge per check or don't handle the five common Nigerian ID formats cleanly.",

      solution:
        "An automated verification pipeline that accepts an ID image or live webcam feed, detects the document, classifies which of the five Nigerian ID types it is, extracts every identity field, runs three independent fraud checks, and stores the result in a structured database. Every fraud flag comes with a plain-English explanation — never a bare true/false.",

      story:
        "The original goal was simple: prove that the fraud-detection capability used by banks and fintechs could run on a laptop, without a cloud vendor, and for a fraction of the cost. That constraint shaped every design decision — modular pipeline, no external OCR services, and self-referential fraud analysis instead of fixed templates.",

      outcome:
        "Handles five document types end-to-end, produces a trust score from 0–100, assigns a tiered verdict (CLEAN / FLAGGED / SUSPICIOUS), and tracks repeat fraud attempts per ID number. Every verification is logged with full reasoning, and a live demo portal runs on top of the engine.",
    },

    technical: {
      languages: ["Python"],
      frameworks: ["OpenCV", "EasyOCR", "PyTorch", "Pydantic"],
      database: ["PostgreSQL"],
      packages: [
        "opencv-python",
        "easyocr",
        "torch",
        "psycopg2-binary",
        "scikit-image",
        "Pillow",
        "NumPy",
        "python-dotenv",
      ],
      architecture:
        "Five-stage pipeline: (1) Contour-based document detection with perspective correction. (2) Two-stage classification using aspect ratio + OCR keyword scoring. (3) Keyword-based field extraction with auto-retry on failure. (4) Face photo extraction via Haar cascade. (5) V2 fraud engine running three independent checks — font consistency, photo splice detection, and ID-format validation — then combining them into a weighted trust score and tiered verdict.",
      notes:
        "The fraud engine requires at least two of three signals to agree before flagging a photo splice, which keeps false positives low. Every decision writes a human-readable reason into the database so an auditor can understand exactly why a document was flagged. Two usage modes: single-image processing, or a real-time webcam mode that waits for a stable frame before running the pipeline.",
    },

    metrics: [
      { label: "ID types supported", value: "5" },
      { label: "Fraud checks (V2)", value: "3 independent" },
      { label: "Trust score range", value: "0–100" },
      { label: "Verdict tiers", value: "3" },
    ],
  },

  {
    slug: "ted",
    stack: "python",
    name: "TED / TGNSpot",
    pitch: "Autonomous AI gaming publication",
    pills: ["Python", "DeepSeek API", "PostgreSQL", "Next.js"],
    status: "live",
    crossStack: ["frontend"],
    externalUrl: "https://tgnspot-frontend.vercel.app",

    overview: {
      problem:
        "Running an editorial site solo doesn't scale — research, writing, editing, SEO, and publishing are all full-time jobs. Generic AI automation produces voiceless, duplicate content that readers and search engines both ignore.",

      solution:
        "A fully autonomous publishing pipeline powered by TED — a personality-driven AI author with a defined voice, beliefs, humor, and writing style. TED researches trending gaming news from major RSS feeds, filters by niche and SEO value, writes original posts in his own voice, and publishes to a live Next.js site three times a day.",

      story:
        "An experiment in what happens when you give an AI a personality rather than just a prompt, and let it run on a schedule. The goal was never to flood the internet with content — it was to see if a system could produce work that reads like a person wrote it, stays on-topic, and gets smarter over time.",

      outcome:
        "100+ original posts published, running autonomously three times daily since July 2026. Zero duplicate posts since the multi-layer deduplication system launched. Every post carries structured metadata — categories, moods, verdicts, catchphrases — that will enable future fine-tuning based on performance.",
    },

    technical: {
      languages: ["Python", "TypeScript"],
      frameworks: ["DeepSeek API", "Next.js"],
      database: ["PostgreSQL"],
      packages: [
        "openai (DeepSeek compatible)",
        "feedparser",
        "psycopg2",
        "python-dotenv",
      ],
      architecture:
        "Long-running pipeline with distinct stages: (1) RSS fetch from IGN, Kotaku, Eurogamer, Nintendo Life, RPS, Push Square, and Pure Xbox. (2) Relevance filter narrowing to a niche (RPGs, retro, indie, story-driven). (3) Multi-layer deduplication — URL tracking, trigram similarity on headlines, TED self-check against the last 3 posts, and full-text search on bodies. (4) SEO layer extracting keywords and generating meta descriptions. (5) DeepSeek API generates the post in TED's voice, with JSON repair and fail-closed error handling. (6) PostgreSQL stores the post plus structured metadata. (7) Render Cron triggers the pipeline three times daily; the frontend is a Next.js site on Vercel.",
      notes:
        "Two things make this more than a ChatGPT wrapper. First, TED isn't a prompt — he's a personality bible: a defined voice, set of beliefs, sense of humor, and writing style that stays consistent across every post. Second, the system is self-improving: the catchphrase engine extracts cultural references and queues candidates for TED's vocabulary. When DeepSeek deprecated deepseek-chat, migrating to deepseek-v4-flash was a one-line change — proof that the modular architecture held up under a real production event.",
    },

    metrics: [
      { label: "Posts published", value: "100+" },
      { label: "Publishing frequency", value: "3x daily" },
      { label: "Duplicate posts (post-launch)", value: "0" },
      { label: "Deduplication layers", value: "5" },
      { label: "Live since", value: "July 2026" },
    ],
  },

  {
    slug: "meridian",
    stack: "python",
    name: "Meridian",
    pitch: "Economic resilience forecaster for Nigerian households",
    pills: ["Python", "scikit-learn", "PostgreSQL", "Pandas"],
    status: "personal",

    overview: {
      problem:
        "Food insecurity in Nigeria isn't a snapshot — it's a trajectory. Households don't suddenly become vulnerable; they slide into it as prices climb. But the tools that assess vulnerability treat it as a static label, disconnected from the price movements that actually drive it. Aid organizations end up reacting to crises instead of predicting them.",

      solution:
        "A dual-model system that forecasts staple food prices across Nigerian markets at three time horizons, classifies household economic vulnerability into tiers, and connects the two. Forward-looking price risk feeds directly into household vulnerability scoring, so a family can be flagged as at-risk before their situation deteriorates.",

      story:
        "Built with real data — WFP food price surveys and raw NLSS household survey data decoded from a 240,000-line XML codebook. No pre-cleaned Kaggle datasets, no shortcuts. The point was to prove that classical machine learning, applied carefully, can produce something genuinely useful for the people who need it most.",

      outcome:
        "Three Random Forest regressors forecast prices at 1-month, 6-month, and 1-year horizons per market. Every household receives two parallel vulnerability scores (poverty/consumption and risk/shock exposure) that combine into a final Low/Medium/High tier. Each assessment produces a PDF report with tables, a written summary, and a score-breakdown chart. Predictions and assessments are persisted in PostgreSQL.",
    },

    technical: {
      languages: ["Python"],
      frameworks: ["scikit-learn", "Pydantic"],
      database: ["PostgreSQL"],
      packages: [
        "scikit-learn",
        "pandas",
        "numpy",
        "psycopg2-binary",
        "pydantic",
        "python-dotenv",
        "reportlab",
        "requests",
      ],
      architecture:
        "Two-model system with a data pipeline underneath. (1) Ingest: WFP food price data and NLSS household survey data, decoded from a 240k-line XML codebook. (2) Feature engineering: lagged prices, rainfall anomalies from Open-Meteo, rolling inflation proxy, and regional identifiers. (3) Train: three Random Forest regressors — one per forecast horizon — plus a regional baseline/differential model that converts raw prices into risk signals. (4) Score households: two parallel scores combined via a 'worse of the two' rule that respects households under invisible stress. (5) Connect: predicted price differentials feed into Score B as price_trend_risk. (6) Generate: a per-household PDF report plus persisted predictions in PostgreSQL.",
      notes:
        "The 'worse of the two' logic in the vulnerability classifier is deliberate. A household with low consumption but stable income, and a household with moderate consumption but extreme shock exposure, are both vulnerable — just in different ways. Averaging the two scores would hide both. Choosing the worse of the two surfaces the household's real constraint. Every decision is driven by Pydantic-validated config, and the codebook parser handles a document most teams would have given up on.",
    },

    metrics: [
      { label: "Forecast horizons", value: "3 (1mo, 6mo, 1yr)" },
      { label: "Vulnerability tiers", value: "3 (Low/Med/High)" },
      { label: "Data sources", value: "WFP, NLSS, Open-Meteo" },
      { label: "Codebook lines parsed", value: "240k+" },
      { label: "Output format", value: "PDF + PostgreSQL" },
    ],
  },

  {
    slug: "lpr",
    stack: "python",
    name: "License Plate Recognition",
    pitch: "Real-time vehicle identification with wanted-status lookup",
    pills: ["Python", "OpenCV", "EasyOCR", "JSON"],
    status: "personal",

    overview: {
      problem:
        "Security checkpoints, estate gates, and parking facilities still rely on manual plate reading — slow, error-prone, and impossible to audit. Off-the-shelf ANPR systems cost thousands per camera and lock you into proprietary hardware.",

      solution:
        "A lightweight, self-contained plate recognition system that runs on any laptop with a webcam. It detects the plate, reads the characters, looks up the vehicle in a local database, and — if the vehicle is flagged as wanted — displays a red overlay with the owner's photo. Every detection is logged with a timestamp.",

      story:
        "Built as an open, testable alternative to expensive commercial ANPR systems. The synthetic test-image generator means anyone can clone the repo and run a full demo in under five minutes — no camera, no dataset, no setup friction.",

      outcome:
        "Full recognition pipeline in image or live-webcam mode. Detects, reads, looks up, and logs. Wanted-status flags appear immediately on-screen. Every detection produces a structured JSON audit record ready for downstream tooling.",
    },

    technical: {
      languages: ["Python"],
      frameworks: ["OpenCV", "EasyOCR", "Pydantic"],
      database: ["JSON (flat file)"],
      packages: [
        "opencv-python",
        "easyocr",
        "pydantic",
        "Pillow",
        "requests",
      ],
      architecture:
        "Modular four-file core: (1) detector.py — contour-based plate localization. (2) reader.py — EasyOCR character extraction with per-read confidence scoring. (3) database.py — JSON loader and lookup by plate string. (4) logger.py — timestamped JSON audit records. A Pydantic-validated config drives camera index, detection confidence threshold, cooldown timer, and database path. Live mode adds a cooldown window to prevent duplicate detections of the same plate.",
      notes:
        "Includes a synthetic test-image generator that creates demo plates from every entry in the database, so testing requires zero setup. Config is fully externalized; the system runs out-of-the-box with defaults. Headless mode supported for server-side deployments.",
    },

    metrics: [
      { label: "Detection modes", value: "Image + Live webcam" },
      { label: "Database entries (demo)", value: "12" },
      { label: "OCR confidence floor", value: "0.4" },
      { label: "Config", value: "Fully externalized" },
    ],
  },

  // ==========================================
  // BACKEND
  // ==========================================

  {
    slug: "kurate-backend",
    stack: "backend",
    name: "Kurate",
    pitch: "Gadget marketplace API with role-based access",
    pills: ["NestJS", "Prisma", "PostgreSQL", "Cloudinary"],
    status: "personal",
    crossStack: ["frontend"],
    externalUrl: "https://kurate-frontend.vercel.app",

    overview: {
      problem:
        "Building a marketplace backend means solving the same problems over and over — auth, roles, uploads, analytics, soft-delete, admin moderation — but most tutorials give you toys, not production systems. The gap between 'working demo' and 'shippable API' is where most projects die.",

      solution:
        "A production-oriented backend for a gadget marketplace. Full REST API with JWT auth (httpOnly cookies), role-based access (BUYER, SELLER, ADMIN), seller verification workflow, product listings with image management, per-product analytics, and a documented Swagger interface.",

      story:
        "Built around a layered permission system — verified sellers manage their own products, admins moderate everything, buyers see only what's live. That structure shapes almost every endpoint.",

      outcome:
        "Full CRUD across users, categories, sellers, products, and analytics. JWT cookies with refresh rotation. Cloudinary uploads. Soft-delete everywhere with admin restore. Swagger docs at /api/docs. Rate limiting at 100 req/15min per IP.",
    },

    technical: {
      languages: ["TypeScript", "JavaScript"],
      frameworks: ["NestJS", "Prisma"],
      database: ["PostgreSQL"],
      packages: [
        "@nestjs/jwt",
        "passport-jwt",
        "cloudinary",
        "@nestjs/swagger",
        "helmet",
        "class-validator",
        "class-transformer",
      ],
      architecture:
        "Modular NestJS architecture. Root app module composes feature modules (auth, user, seller, category, product, analytics, upload, cloudinary). Global Prisma service for database access. JWT guard + role decorator enforce access control at controller level, with ownership checks in services for seller-owned resources. ValidationPipe with whitelist + forbidNonWhitelisted prevents mass assignment. Swagger decorators document every endpoint.",
      notes:
        "Soft-delete is used consistently for users, sellers, categories, and products — a real-world pattern that preserves data integrity and enables admin restore. Hard-delete exists but cascades are enforced carefully (e.g., can't hard-delete a category with products). Product prices stored in cents to avoid float issues. Images handled via Cloudinary with primary-image enforcement logic.",
    },

    metrics: [
      { label: "API modules", value: "8" },
      { label: "Auth model", value: "JWT httpOnly cookies" },
      { label: "Roles", value: "3" },
      { label: "Rate limit", value: "100 req/15min" },
      { label: "Docs", value: "Swagger at /api/docs" },
    ],
  },

  {
    slug: "multi-tenant-pos-saas",
    stack: "backend",
    name: "Multi-Tenant Business Management & POS Platform",
    pitch: "Multi-tenant SaaS backend for POS, inventory, and subscription billing",
    pills: ["NestJS", "Prisma", "MySQL", "Paystack"],
    status: "client",

    overview: {
      problem:
        "Small and mid-sized businesses run on disconnected tools — one app for sales, another for inventory, a spreadsheet for expenses, nothing for branches. Real POS systems are expensive per-seat enterprise software. Multi-branch operators end up with three systems that don't talk to each other.",

      solution:
        "A multi-tenant SaaS backend that unifies sales, inventory, procurement, expenses, payments, reporting, and subscription management — designed for businesses with multiple branches. Each tenant gets isolated stock, users, and reporting, all from a single deployment. Includes a KYC workflow, subscription billing, and immutable audit logging.",

      story:
        "Designed around a single structural decision: Business is the tenant root. Everything — branches, users, stock, reports, subscriptions — flows from that Business entity. It makes row-level tenancy natural and lets the platform scale from a single shop to a franchise without architectural change.",

      outcome:
        "Full backend delivered — 20+ tables covering identity, organization, catalog, inventory, sales, procurement, subscriptions, reporting, and audit. JWT cookies, role-based guards, login attempt lockouts, split-tender payments, and Paystack webhook handling in place.",
    },

    technical: {
      languages: ["TypeScript", "JavaScript"],
      frameworks: ["NestJS", "Prisma"],
      database: ["MySQL"],
      packages: [
        "@nestjs/jwt",
        "passport-jwt",
        "class-validator",
        "@nestjs/swagger",
        "@nestjs/throttler",
        "helmet",
        "paystack",
      ],
      architecture:
        "Modular NestJS with 20+ feature modules: auth, users, business, branches, products, categories, suppliers, inventory, customers, sales, payments, expenses, procurement, reporting, subscriptions, audit, notifications, kyc, analytics, cart, email, payment-gateway. Prisma schema defines the multi-tenant data model with Business as the root. All controllers use JWT + @Roles decorators for access control, with a ThrottlerGuard for rate limiting.",
      notes:
        "The multi-tenancy model is the core architectural decision: Business is the tenant root, and every downstream entity (Branch, User, Product, Sale, Report) is scoped to it. Row-level isolation is enforced at the service layer. Procurement follows a three-stage workflow (requisition → order → receipt), and payments support split-tender (cash, card, transfer, other) per sale. Audit logs are append-only and record user, table, record ID, and IP.",
    },

    metrics: [
      { label: "Database tables", value: "20+" },
      { label: "Backend modules", value: "20+" },
      { label: "Tenancy model", value: "Multi-branch SaaS" },
      { label: "Payments", value: "Split-tender + Paystack" },
      { label: "Status", value: "Backend delivered" },
    ],
  },

  {
    slug: "habit-wise-backend",
    stack: "backend",
    name: "Habit Wise",
    pitch: "Habit tracker API with anonymous community support",
    pills: ["NestJS", "Prisma", "PostgreSQL", "Redis"],
    status: "personal",
    crossStack: ["mobile"],

    overview: {
      problem:
        "Habit trackers usually fail for two reasons: they're too rigid (no offline support, no flexible scheduling) and they're cold (no accountability, no human connection). Meanwhile, community features in wellness apps tend to feel invasive — people want support without giving up their identity.",

      solution:
        "A backend that treats habit tracking as a serious engineering problem (streaks, offline sync, priority tiers, expiry windows) while introducing a moderated anonymous community where private reflections can be shared with a pseudo-ID — no link back to the user's real identity. Full moderation, reporting, and admin workflow included.",

      story:
        "Built around a single design principle: support without exposure. The anonymity isn't a feature bolted on — it's built into the data model. SharedReflection uses a pseudo-ID with no foreign key back to User, so even a database leak can't deanonymize a post.",

      outcome:
        "Full CRUD on habits with streak tracking, offline batch sync, and flexible scheduling. Private reflections with optional emotional tags and anonymous sharing. Community feed with cursor-based pagination, response counts, and moderation. Notifications, reports, and admin platform stats.",
    },

    technical: {
      languages: ["TypeScript", "JavaScript"],
      frameworks: ["NestJS", "Prisma"],
      database: ["PostgreSQL", "Redis"],
      packages: [
        "@nestjs/jwt",
        "passport",
        "class-validator",
        "@nestjs/swagger",
        "ioredis",
      ],
      architecture:
        "Modular NestJS structure with a common/ folder for cross-cutting decorators, guards, filters, and interceptors. Business logic organized into feature modules (auth, users, habits, reflections, community, notifications, admin). Prisma manages the data layer with migrations and seed data. Redis handles caching and queue-adjacent workloads. DTO validation via class-validator with strict config.",
      notes:
        "The anonymity model is the core technical innovation. When a user shares a reflection, the system creates a SharedReflection with a pseudo-ID and no FK to the User table — the shared copy is entirely decoupled from the author. Deleting your private reflection does NOT delete the shared version, preserving community integrity. Crisis-check confirmation before sharing keeps vulnerable users safe.",
    },

    metrics: [
      { label: "Domain modules", value: "7" },
      { label: "Auth model", value: "JWT with refresh rotation" },
      { label: "Anonymity", value: "Pseudo-ID, no FK back" },
      { label: "Offline support", value: "Batch sync endpoint" },
      { label: "Cache layer", value: "Redis" },
    ],
  },

  // ==========================================
  // MOBILE
  // ==========================================

  {
    slug: "habit-wise-mobile",
    stack: "mobile",
    name: "Habit Wise",
    pitch: "Habit tracker with anonymous community support",
    pills: ["Flutter", "Dart", "Provider", "REST API"],
    status: "personal",
    crossStack: ["backend"],

    overview: {
      problem:
        "Most habit apps fail on two fronts: they break the moment you lose signal (no offline support), and they don't give users a reason to come back beyond guilt. Meanwhile, wellness apps that add community features tend to feel invasive — you're expected to bare your soul under your real name.",

      solution:
        "A Flutter app that treats habit tracking as a serious tool — flexible scheduling, priority tiers, streak tracking, and full offline sync — while layering in an anonymous community where private reflections can be shared with a pseudo-ID.",

      story:
        "Built in parallel with the NestJS backend so the two evolved together. Every UI decision was driven by the backend's design principle: support without exposure. If you delete a reflection, the shared version stays — because the community isn't yours to delete.",

      outcome:
        "Cross-platform app for Android, iOS, Linux, macOS, and Web. Full habit lifecycle with streaks and offline batch sync. Private journal with emotional tagging. Anonymous community feed with responses and content flagging. In-app notifications. Themed UI with light/dark modes and auto-login session persistence.",
    },

    technical: {
      languages: ["Dart"],
      frameworks: ["Flutter", "Provider"],
      database: ["Local (SharedPreferences for session)"],
      packages: ["provider", "http", "shared_preferences", "intl"],
      architecture:
        "Modular lib/ structure: config/, models/, providers/, routes/, screens/, services/, utils/, widgets/. Provider handles state management across screens. Offline-first habit logging batches check-ins locally and syncs in bulk when the connection returns. JWT session persisted via SharedPreferences for auto-login.",
      notes:
        "The app talks to the Habit Wise NestJS backend. That means the anonymity model (pseudo-ID with no foreign key) is enforced end-to-end: the app never sends identifying information with shared reflections, and the backend has no way to link them back. Platform folders for all major targets are included in the repo, so the same codebase ships to five platforms.",
    },

    metrics: [
      { label: "Platforms", value: "5 (iOS, Android, Linux, macOS, Web)" },
      { label: "State management", value: "Provider" },
      { label: "Offline support", value: "Batch sync" },
      { label: "Anonymity", value: "Pseudo-ID, no FK back" },
    ],
  },

  {
    slug: "voyage",
    stack: "mobile",
    name: "Voyage",
    pitch: "Theme-aware travel weather companion",
    pills: ["Flutter", "Dart", "OpenWeatherMap", "Geolocator"],
    status: "personal",

    overview: {
      problem:
        "Weather apps look the same — a blue gradient, some numbers, a boring weekly list. They tell you the temperature but they don't tell you what it feels like, and they certainly don't help you decide whether to pack a jacket or book that trip.",

      solution:
        "A travel weather app that treats weather as an atmosphere. Dynamic glassmorphic UI that shifts palette, particles, and ambient sound with current conditions. Current weather with seasonal travel advice, 7-day and hourly forecasts for any city, GPS lookup, and a manual theme picker.",

      story:
        "Built to prove that craft and function aren't opposites. Every screen was designed from scratch rather than using default Material components — frosted glass cards, animated particle backgrounds, weather-aware typography.",

      outcome:
        "Cross-platform Flutter app with dynamic theming, animated splash screen, GPS + city search, hourly and 7-day forecasts, ambient soundscapes with mute toggle, and graceful error handling. Ships as a signed release APK.",
    },

    technical: {
      languages: ["Dart"],
      frameworks: ["Flutter", "Provider"],
      database: ["None (stateless app)"],
      packages: [
        "provider",
        "http",
        "geolocator",
        "geocoding",
        "audioplayers",
        "intl",
      ],
      architecture:
        "Modular lib/ structure: config.dart, models/, services/ (weather_service, location_service), providers/ (WeatherProvider), screens/ (splash, main_shell with three tabs), widgets/ (16 custom components), utils/ (config, theme_manager, seasonal_advisor). OpenWeatherMap API drives forecast data; Geolocator + Geocoding handle device location and reverse geocoding.",
      notes:
        "Every visual element is bespoke — no default Material widgets in the main surfaces. Weather backgrounds and accent colors are driven by a theme_manager that maps conditions to palettes. Seasonal travel advice is generated locally based on temperature, humidity, and wind — not fetched from an API. Ambient audio plays condition-matched soundscapes that layer under the UI.",
    },

    metrics: [
      { label: "Custom widgets", value: "16" },
      { label: "Theme presets", value: "Based on weather" },
      { label: "Forecast range", value: "7-day + hourly" },
      { label: "Distribution", value: "Release APK" },
    ],
  },

  // ==========================================
  // FRONTEND
  // ==========================================

  {
    slug: "tgnspot-frontend",
    stack: "frontend",
    name: "TGNSpot",
    pitch: "Dark-mode consumer interface for an autonomous gaming blog",
    pills: ["Next.js", "TypeScript", "Tailwind", "Zustand"],
    status: "live",
    crossStack: ["python"],
    externalUrl: "https://tgnspot-frontend.vercel.app",

    overview: {
      problem:
        "Most AI-generated content sites look like AI-generated content sites — cluttered, templated, and instantly forgettable. If the writing is going to be judged on personality, the reading experience has to carry the same weight.",

      solution:
        "A dark-themed, orange-accented gaming publication built around the reading experience. Auto-cycling slideshows, cinematic hover overlays on post cards, ambient particle effects, and a dual-theme system (dark + cream) — plus a signature 'Dead Silence' mode that hides every UI element except the post body.",

      story:
        "Built to prove that a fully autonomous publication can have real design taste. The frontend is a pure consumer — it never generates content, it just renders what the TED pipeline publishes. Every pixel was designed as if a human editor were curating the page.",

      outcome:
        "Live on Vercel with Vercel Analytics and Speed Insights integrated. Full SEO foundation — sitemap generation, FAQ structured data (JSON-LD), post-specific metadata via Next.js generateMetadata. Category browsing, full-text search, bookmarks, and an About page telling TED's lore. 100+ posts indexed and discoverable.",
    },

    technical: {
      languages: ["TypeScript"],
      frameworks: ["Next.js (App Router)", "Tailwind CSS", "Zustand"],
      database: ["PostgreSQL (dev) / Supabase (production)"],
      packages: [
        "react-markdown",
        "remark-gfm",
        "lucide-react",
        "@vercel/analytics",
        "@vercel/speed-insights",
      ],
      architecture:
        "Pure consumer architecture — the frontend never touches the generation pipeline. Reads posts, categories, and metadata from PostgreSQL/Supabase populated by the TED backend. State managed with Zustand for theme, bookmarks, and UI state. Custom CSS variables drive the theme system so dark/cream switching is instant and consistent. Fonts loaded via next/font: Rajdhani for headings, Inter for body.",
      notes:
        "The design system is bespoke. PlayStation button colours (the four iconic shapes) became the accent gradients. Ten distinct design flourishes were lifted directly from the original concept notebook — including auto-cycling hero slideshows, ambient particles, and cinematic hover overlays that reveal metadata without cluttering the resting state.",
    },

    metrics: [
      { label: "Posts published", value: "100+" },
      { label: "Theme modes", value: "2 (Dark / Cream)" },
      { label: "Signature features", value: "10 custom design flourishes" },
      { label: "SEO", value: "Sitemap + JSON-LD FAQ" },
      { label: "Live since", value: "July 2026" },
    ],
  },

  {
    slug: "kyc-frontend",
    stack: "frontend",
    name: "KYC Mission Control",
    pitch: "Identity verification demo portal",
    pills: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    status: "live",
    crossStack: ["python"],
    externalUrl: "https://kyc-demo-cyan.vercel.app",

    overview: {
      problem:
        "Most identity verification demos are either fake (fake API responses, fake progress bars) or intimidating (raw OCR output, technical jargon, no context for non-technical viewers). A bank's operations manager doesn't want to see a JSON dump — they want to see what the experience would look like for their team.",

      solution:
        "A 'Mission Control' portal that presents the KYC pipeline as a real product. Three-step flow (Upload → AI Process → Get Results), a live demo recording showing a NIN Slip analysis, and a graceful fraud disclaimer that clarifies what 'Flagged' actually means — the system detected inconsistencies, not that anyone committed fraud.",

      story:
        "Built as the frontend for the Nigerian ID Verification System V2 — a bridge between the Python engine and the people who might actually buy it. The original plan was a live upload demo, but pivoted to a video format when the real engine took longer to run than a viewer's patience. The pivot was the right call: it lets the pipeline shine at its own pace.",

      outcome:
        "Live on Vercel. Full documentation of the KYC pipeline in a format non-engineers can follow. Includes a FraudDisclaimer that protects against legal exposure, and a FeatureTeaser modal that pitches premium capabilities as a natural next step. Used as the primary link in outreach to fintechs and microfinance banks.",
    },

    technical: {
      languages: ["TypeScript"],
      frameworks: ["Next.js (App Router)", "Tailwind CSS", "Framer Motion"],
      database: ["None — demo only"],
      packages: ["framer-motion", "lucide-react"],
      architecture:
        "Single-page demo built on Next.js App Router with Framer Motion driving all animations. Custom video player component (DemoPlayer) with native controls, progress scrubber, and play overlay. Typing-animation DemoBanner that self-dismisses after 10 seconds. FraudDisclaimer component with explicit legal copy. FeatureTeaser modal with benefit-driven pitch. Font loaded via next/font (Geist).",
      notes:
        "The demo video was compressed from 77MB to 23MB to keep the initial load fast — a real deployment concern that most portfolio projects skip. The FraudDisclaimer is not decoration: it clarifies that a 'Flagged' status from an OCR pipeline means the system detected visual inconsistencies, not that any specific person is a fraudster.",
    },

    metrics: [
      { label: "Demo video size", value: "23MB (from 77MB)" },
      { label: "Verification flow", value: "3 steps" },
      { label: "Legal safeguard", value: "Fraud disclaimer" },
      { label: "Live since", value: "2026" },
    ],
  },

  {
    slug: "kurate-frontend",
    stack: "frontend",
    name: "Kurate",
    pitch: "Tech marketplace frontend for buyers and sellers",
    pills: ["Next.js", "TypeScript", "Tailwind", "Redux"],
    status: "personal",
    crossStack: ["backend"],
    externalUrl: "https://kurate-frontend.vercel.app",

    overview: {
      problem:
        "Buying and selling tech in Nigeria happens on WhatsApp groups, Instagram DMs, and Twitter replies — no search, no specs, no trust signals, no accountability. It works, but it's exhausting for both sides.",

      solution:
        "A gadget marketplace built for the way Nigerians actually transact. Buyers browse full specs, see seller information, and contact sellers directly via one-tap WhatsApp — no account needed to browse. Sellers get a dashboard with product management, view analytics, and image uploads.",

      story:
        "Built to prove that the informal marketplace that already exists can be formalized without losing its frictionless feel. The 'no account needed to browse' decision was deliberate — adding a signup wall was the easiest way to lose most curious visitors. Let people explore first; make them sign up only when they want to sell or save.",

      outcome:
        "Live on Vercel. SEO-optimized with App Router, multi-theme support (light/dark), and Redux-managed state with JWT authentication via the Kurate backend. Seller dashboard ships with real analytics — total views, weekly views, monthly views per product — so sellers can see what's working.",
    },

    technical: {
      languages: ["TypeScript"],
      frameworks: ["Next.js (App Router)", "Tailwind CSS", "Redux"],
      database: ["PostgreSQL (via Kurate Backend API)"],
      packages: ["@reduxjs/toolkit", "react-redux", "lucide-react"],
      architecture:
        "App Router architecture with feature-based folders: products (listing + detail), dashboard (seller/admin), my-shop, profile, stores, and supporting pages (about, contact, faq, privacy, shipping, terms). Redux Toolkit manages global state for auth, wishlist, cart, and UI. API service layer wraps the NestJS backend. Role-based routing (BUYER, SELLER, ADMIN) enforced via route guards.",
      notes:
        "The seller dashboard is the real differentiator — most marketplace frontends are buyer-only. Kurate gives sellers their own operating surface: product creation with structured JSON specs, image management, per-product view analytics, and shop profile editing. The result is a two-sided product, not just a storefront.",
    },

    metrics: [
      { label: "Roles supported", value: "3" },
      { label: "Spec fields per listing", value: "30+" },
      { label: "Theme modes", value: "2 (Light/Dark)" },
      { label: "Image handling", value: "Cloudinary integration" },
      { label: "Auth", value: "JWT + Redux state" },
    ],
  },

  {
    slug: "portfolio-site",
    stack: "frontend",
    name: "SalimSambo.com",
    pitch: "Portfolio and services site for automation work",
    pills: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    status: "live",
    externalUrl: "https://salim-sambo.vercel.app",

    overview: {
      problem:
        "Cold emails to banks and fintechs need a home base. Without a live, credible site, every outreach message is a standalone pitch with no proof behind it — and every reply asking 'can I see more?' requires a scramble.",

      solution:
        "A content-architected portfolio and services site built to serve as the home base for all outreach. A landing page presenting services, a live demo link, case studies, and contact — plus four stack-specific routes (Python, Frontend, Backend, Mobile) that deep-dive into every project.",

      story:
        "Built in a single day after the first batch of outreach went out. The architecture was designed first — content.ts and stack.ts as single sources of truth — so the design could evolve without touching copy, and copy could change without touching layout.",

      outcome:
        "Live on Vercel. Four stack routes with dynamic project pages, a content-driven architecture that keeps copy and components separate, and a mono theme that keeps the visual language consistent across every section. Used as the primary link in all outreach.",
    },

    technical: {
      languages: ["TypeScript"],
      frameworks: ["Next.js (App Router)", "Tailwind CSS", "Framer Motion"],
      database: ["None"],
      packages: ["framer-motion", "lucide-react"],
      architecture:
        "Content-architected Next.js site. Two data files (content.ts, stack.ts) hold every piece of user-facing copy and every project record. Components consume these files directly — no copy is hardcoded in components. Stack routes (/frontend, /backend, /mobile, /python) are generated dynamically from stack.ts. Per-stack accent colors are applied via CSS variables only when the user enters that route; the home page stays monochrome.",
      notes:
        "The architecture decision to separate content from components wasn't premature optimization — it was the only way to build a site this fast without it becoming unmaintainable. Adding a new project means editing one array. Changing the services copy means editing one object. No component needs to be touched.",
    },

    metrics: [
      { label: "Stack routes", value: "4" },
      { label: "Projects documented", value: "13+" },
      { label: "Architecture", value: "Content-driven (single source)" },
      { label: "Deployment", value: "Vercel (auto-deploy on push)" },
    ],
  },
];

// ==========================================
// CROSS-STACK PILLS
// ==========================================

export const crossStackPills: string[] = [
  "GitHub",
  "Git",
  "CI/CD",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "Linux",
  "Deployment",
  "Testing",
  "REST APIs",
  "JWT Auth",
];

// ==========================================
// HELPERS
// ==========================================

export const getProjectsByStack = (slug: StackSlug): Project[] => {
  const own = projects.filter((p) => p.stack === slug);
  const cross = projects.filter(
    (p) => p.crossStack?.includes(slug) && p.stack !== slug
  );
  return [...own, ...cross];
};

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

export const getStack = (slug: StackSlug): Stack => stacks[slug];