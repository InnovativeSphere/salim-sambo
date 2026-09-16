// ============================================================
// src/components/sections/StackCapabilities.tsx
// Categorized capabilities grid — languages, frameworks, tools
// ============================================================

import TechPill from "@/components/ui/TechPill";
import type { Stack } from "@/data/stack";

interface StackCapabilitiesProps {
  stack: Stack;
}

// Simple keyword classifier — no per-stack config needed
function categorizeSkills(skills: string[]) {
  const languages = new Set<string>();
  const frameworks = new Set<string>();
  const databases = new Set<string>();
  const tools = new Set<string>();

  const languageKeywords = ["Python", "TypeScript", "JavaScript", "Dart", "C#", "SQL"];
  const databaseKeywords = ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase"];
  const frameworkKeywords = [
    "React", "Next.js", "NestJS", "Express", "Flutter", "FastAPI",
    "Tailwind CSS", "Framer Motion", "Redux", "Zustand", "Provider",
    "Prisma", "scikit-learn", "OpenCV", "EasyOCR", "PyTorch", "Pydantic",
    "Pandas", "NumPy",
  ];

  skills.forEach((skill) => {
    if (languageKeywords.includes(skill)) languages.add(skill);
    else if (databaseKeywords.includes(skill)) databases.add(skill);
    else if (frameworkKeywords.includes(skill)) frameworks.add(skill);
    else tools.add(skill);
  });

  return { languages, frameworks, databases, tools };
}

export default function StackCapabilities({ stack }: StackCapabilitiesProps) {
  const { languages, frameworks, databases, tools } = categorizeSkills(
    stack.skills
  );

  const groups = [
    { label: "Languages", items: Array.from(languages) },
    { label: "Frameworks & Libraries", items: Array.from(frameworks) },
    { label: "Databases", items: Array.from(databases) },
    { label: "Tools & Platforms", items: Array.from(tools) },
  ].filter((group) => group.items.length > 0);

  return (
    <section
      className="relative py-24 md:py-32"
      style={{ backgroundColor: "var(--color-bg-subtle)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="w-6 h-px"
              style={{ backgroundColor: "var(--color-accent)" }}
            />
            <span
              className="text-xs font-mono uppercase tracking-widest"
              style={{ color: "var(--color-accent)" }}
            >
              Toolbox
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight"
            style={{ color: "var(--color-text-primary)" }}
          >
            What I work with
          </h2>
          <p
            className="mt-5 text-base md:text-lg leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            The technologies I reach for in {stack.label.toLowerCase()}.
          </p>
        </div>

        {/* Capability groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {groups.map((group) => (
            <div key={group.label}>
              <h3
                className="text-xs font-mono uppercase tracking-widest mb-5 pb-3"
                style={{
                  color: "var(--color-text-muted)",
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <TechPill key={item} size="md" variant="accent">
                    {item}
                  </TechPill>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}