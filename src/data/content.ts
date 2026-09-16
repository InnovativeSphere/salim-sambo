// ============================================================
// src/data/content.ts
// SINGLE SOURCE OF TRUTH FOR ALL USER-FACING COPY
//
// Rule: Every piece of user-facing text lives here.
// Components import from here. Micro-labels (Submit, Read More)
// can stay inline in components.
// ============================================================

// ==========================================
// TYPES
// ==========================================

export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  pricing: string;
  pricingNote?: string;
}

export interface CaseStudy {
  id: string;
  name: string;
  tagline: string;
  tech: string[];
  description: string;
  liveSince?: string;
}

export interface StackRoute {
  slug: string;
  label: string;
  tagline: string;
  description: string;
  skills: string[];
}

export interface TrustBadge {
  value: string;
  label: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
}

// ==========================================
// 1. SITE METADATA
// Used in: layout.tsx (metadata), footer, social cards
// ==========================================

export const siteConfig = {
  name: "Salim Sambo",
  role: "Python Automation & KYC Systems Developer",
  tagline: "I build Python systems that eliminate manual work.",
  description:
    "Python developer specializing in KYC automation and data extraction systems for fintechs and microfinance banks in Nigeria. Building tools that replace manual identity verification with automated, fraud-aware pipelines.",
  domain: "salim-sambo.vercel.app",
  location: "Nigeria",
  logo: "/images/logo.svg",
  email: "004sas@gmail.com",
  whatsapp: "+234 902 484 2586",
  demoUrl: "https://kyc-demo-cyan.vercel.app/",
};

// ==========================================
// 2. NAVIGATION
// Used in: Header.tsx
// ==========================================

export const navLinks: NavLink[] = [
  { label: "Work", href: "#case-studies" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Demo", href: "#demo" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const navCta = {
  label: "Get in Touch",
  href: "#contact",
};

// ==========================================
// 3. HERO SECTION
// Used in: Hero.tsx
// ==========================================

export const heroData = {
  eyebrow: "Available for freelance work",
  headline: "Python Automation & KYC Systems",
  headlineAccent: "for Fintechs and Banks",
  subheadline:
    "I build tools that eliminate manual identity verification and data processing — so your team stops checking documents by hand and starts closing more customers.",
  ctaPrimary: {
    label: "See the Live Demo",
    href: "#demo",
  },
  ctaSecondary: {
    label: "Get in Touch",
    href: "#contact",
  },
  trustBadges: [
    { value: "4+", label: "Production systems shipped" },
    { value: "5", label: "Nigerian ID types supported" },
    { value: "24h", label: "Response on serious inquiries" },
  ] as TrustBadge[],
};

// ==========================================
// 4. PRIMARY SERVICES
// Used in: Services.tsx
// All pricing is "Contact for pricing" — scoped after discovery.
// ==========================================

export const servicesSection = {
  heading: "What I Build",
  subheading:
    "Three clear offers. Each one solves a specific, expensive problem for businesses drowning in manual work.",
  services: [
    {
      id: "kyc",
      title: "KYC Automation & Verification",
      description:
        "Automated document detection, field extraction, and fraud detection for Nigerian ID types — NIN slips, NIN cards, driver's licenses, voter's cards, and passports. Reduces manual review time, catches tampered documents, and stores structured results for audit trails.",
      pricing: "Contact for pricing",
      pricingNote: "scoped per deployment",
    },
    {
      id: "data-extraction",
      title: "Data Extraction & Normalization",
      description:
        "Pull data from databases, spreadsheets, PDFs, or live feeds. Clean it, normalize it, and export it — automatically. Built for teams drowning in manual data entry and disconnected sources.",
      pricing: "Contact for pricing",
      pricingNote: "scoped per pipeline",
    },
    {
      id: "custom-automation",
      title: "Custom Python Automation",
      description:
        "If your team is spending hours every week on a repetitive process, I can probably automate it. Scraping, report generation, notifications, database operations — if it's Python-shaped, I can build it.",
      pricing: "Contact for pricing",
      pricingNote: "scoped per project",
    },
  ] as Service[],
};

// ==========================================
// 5. PROCESS SECTION
// Used in: Process.tsx
// ==========================================

export const processSection = {
  heading: "How It Works",
  subheading: "A simple, four-step process. No surprises, no ambiguity.",
  steps: [
    {
      step: "01",
      title: "Discovery",
      description:
        "You tell me about the manual process that's eating up your team's time. I ask questions until I understand it — inputs, steps, exceptions, edge cases.",
    },
    {
      step: "02",
      title: "Scoping & Quote",
      description:
        "I propose a clear scope, timeline, and fixed price. No hourly guesswork. You know exactly what you're getting and what it costs before anything starts.",
    },
    {
      step: "03",
      title: "Build & Test",
      description:
        "I build the system, test it against real data (yours or representative samples), and share progress along the way. You see it working before it's finalized.",
    },
    {
      step: "04",
      title: "Delivery & Handover",
      description:
        "I deliver clean, documented code with a short walkthrough so your team can run it themselves. Optional support period included for post-delivery questions.",
    },
  ] as ProcessStep[],
};

// ==========================================
// 6. DEMO SECTION
// Used in: Demo.tsx
// ==========================================

export const demoSection = {
  heading: "See It in Action",
  description:
    "A live demo of the KYC system running on a real NIN slip — detection, extraction, fraud analysis, and verdict in under a minute.",
  ctaLabel: "Open the Live Demo",
  ctaHref: "https://kyc-demo-cyan.vercel.app/",
  footnote:
    "Human-in-the-loop by design. The system flags inconsistencies; a person makes the final call.",
  previewVideo: "/sample-video-compressed.mp4",
};

// ==========================================
// 7. CASE STUDIES
// Used in: CaseStudies.tsx
// ==========================================

export const caseStudiesSection = {
  heading: "Selected Work",
  subheading:
    "Four projects across four different domains. What they share: automation, precision, and systems that run reliably on their own.",
  projects: [
    {
      id: "kyc",
      name: "Nigerian ID Verification System",
      tagline: "KYC with Fraud Detection",
      tech: ["Python", "OpenCV", "EasyOCR", "PostgreSQL"],
      description:
        "Modular verification pipeline with a V2 fraud layer that flags font inconsistencies, photo splices, and invalid ID numbers. Stores results with human-readable fraud reasoning.",
    },
    {
      id: "ted",
      name: "TED",
      tagline: "Autonomous AI Content Engine",
      tech: ["Python", "DeepSeek API", "Next.js", "Supabase"],
      description:
        "Fully autonomous content pipeline publishing 100+ articles since launch, with a five-layer deduplication system and three daily publishing cycles.",
      liveSince: "Live since July 2026",
    },
    {
      id: "meridian",
      name: "Meridian",
      tagline: "Economic Resilience Forecaster",
      tech: ["Python", "scikit-learn", "PostgreSQL"],
      description:
        "Dual-model system forecasting food prices and classifying household vulnerability using real WFP and NLSS data.",
    },
    {
      id: "lpr",
      name: "License Plate Recognition",
      tagline: "Real-time Vehicle Identification",
      tech: ["Python", "OpenCV", "EasyOCR"],
      description:
        "Real-time plate detection with owner lookup and wanted status flagging.",
    },
  ] as CaseStudy[],
};

// ==========================================
// 8. ALSO AVAILABLE (Versatility Section)
// Used in: AlsoAvailable.tsx
// Each offering links to its dedicated stack route
// ==========================================

export const alsoAvailableSection = {
  heading: "Also Available",
  intro:
    "Beyond automation and KYC, I also build across the full stack. Click any discipline to see the work in depth.",
  offerings: [
    {
      label: "Full-Stack Web",
      detail: "React, Next.js, NestJS, Express",
      route: "/frontend",
      slug: "frontend",
    },
    {
      label: "Backend & APIs",
      detail: "FastAPI, PostgreSQL, MySQL, MongoDB",
      route: "/backend",
      slug: "backend",
    },
    {
      label: "Mobile Apps",
      detail: "Flutter, React Native",
      route: "/mobile",
      slug: "mobile",
    },
    {
      label: "Python & AI",
      detail: "Automation, ML, computer vision",
      route: "/python",
      slug: "python",
    },
  ],
  csharpNote:
    "Also comfortable with C# / .NET for enterprise systems, APIs, and backend architecture.",
  closingLine:
    "Have something in mind that doesn't fit the list? Send me a message. If I can build it, I'll tell you. If I can't, I'll tell you that too.",
};
// ==========================================
// 9. FAQ SECTION
// Used in: FAQ.tsx
// ==========================================

export const faqSection = {
  heading: "Common Questions",
  subheading: "If your question isn't here, ask me directly.",
  items: [
    {
      question: "Do you work with businesses outside Nigeria?",
      answer:
        "Yes. My systems are built for Nigerian ID formats because that's where I have the deepest expertise, but the same architecture extends to any ID format given the time to build and test it. I'm available for remote work globally.",
    },
    {
      question: "How do you handle sensitive customer data?",
      answer:
        "The systems I build run on your infrastructure or a controlled environment you approve. I don't store customer data externally, and every pipeline includes audit logging. For the demo on this site, no real data is processed or retained.",
    },
    {
      question: "What if the ID format changes?",
      answer:
        "My fraud detection and extraction logic uses self-referential analysis — comparing fields against the same document's own patterns rather than fixed templates. This makes it resilient to redesigns. If a format changes fundamentally, updates are quick and scoped separately.",
    },
    {
      question: "Can you integrate with tools we already use?",
      answer:
        "Usually yes. If you already use a verification service, a database, or a CRM, my systems can be built to work alongside them — including as a pre-screening layer that reduces your usage costs on third-party APIs.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Small scripts and extraction pipelines: 3–7 days. Full KYC integrations: 1–3 weeks depending on scope. I'll give you a clear timeline before anything starts.",
    },
    {
      question: "What does it cost?",
      answer:
        "Depends on scope. Send me a message with a short description of the process you want to automate, and I'll respond with a fixed quote and timeline. No hourly guessing.",
    },
  ] as FAQItem[],
};

// ==========================================
// 10. TESTIMONIALS (uncomment when you have real quotes)
// ==========================================

// export const testimonialsSection = {
//   heading: "What Clients Say",
//   testimonials: [
//     {
//       quote: "",
//       author: "",
//       role: "",
//       company: "",
//     },
//   ] as Testimonial[],
// };

// ==========================================
// 11. ABOUT SECTION
// Used in: About.tsx
// ==========================================

export const aboutSection = {
  heading: "About",
  paragraphs: [
    "I'm Salim Sambo, a Python developer based in Nigeria. I build automation systems for businesses that have outgrown manual processes — especially fintechs and microfinance banks handling high volumes of identity verification.",
    "My work focuses on one thing: replacing hours of human effort with systems that run reliably on their own. Every project I deliver includes clean documentation, and every result comes with a plain-English explanation so you always know what happened and why.",
  ],
  closingLine: "Let's talk about the process you want to eliminate.",
};

// ==========================================
// 12. CONTACT SECTION
// Used in: Contact.tsx
// ==========================================

export const contactSection = {
  heading: "Get in Touch",
  subheading:
    "Whether you have a project in mind or just want to explore what's possible.",
  responseTime: "I respond to every serious inquiry within 24 hours.",
};

// ==========================================
// 13. FOOTER
// Used in: Footer.tsx
// ==========================================

export const footerData = {
  tagline:
    "Building automation systems for businesses that have outgrown manual work.",
  copyright: `© ${new Date().getFullYear()} Salim Sambo. All rights reserved.`,
  legalLine:
    "Demo for illustration only. No real personal data is processed or stored on this site.",
  quickLinks: [
    { label: "Work", href: "#case-studies" },
    { label: "Services", href: "#services" },
    { label: "Demo", href: "#demo" },
    { label: "Contact", href: "#contact" },
  ] as NavLink[],
};

// ==========================================
// 14. STACK-SPECIFIC ROUTES
// Colors live in theme.ts. This file holds content only.
// ==========================================

export const stackRoutes: StackRoute[] = [
  {
    slug: "frontend",
    label: "Frontend",
    tagline: "Interfaces that feel like products.",
    description:
      "React and Next.js applications built with attention to detail — clean component architecture, smooth interactions, and designs that don't get in the way of the work.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    slug: "backend",
    label: "Backend",
    tagline: "APIs that hold up under pressure.",
    description:
      "RESTful and real-time backends built with NestJS and Express, backed by PostgreSQL, MySQL, or MongoDB. Designed for clarity, testability, and scale.",
    skills: ["NestJS", "Express", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    slug: "mobile",
    label: "Mobile",
    tagline: "Apps that feel native, ship fast.",
    description:
      "Cross-platform mobile applications built with Flutter and React Native — one codebase, two platforms, no compromise on feel.",
    skills: ["Flutter", "Dart", "React Native", "Firebase"],
  },
  {
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
    ],
  },
];

// ==========================================
// VERIFICATION CHECKLIST BEFORE LAUNCH
// ==========================================
//
// - [ ] email: confirm 004sas@gmail.com is your outreach email
// - [ ] whatsapp: confirm +234 902 484 2586 is correct
// - [ ] demoUrl: confirm the KYC demo is live
// - [ ] previewVideo: upload to public/sample-video-compressed.mp4
// - [ ] logo: create /images/logo.svg (we'll build this)
//
// FUTURE ADDITIONS:
// - Testimonials (uncomment section when you have 1–2 real quotes)
// - Blog / Writing section
// - Research route (medical AI)
//
// ============================================================
