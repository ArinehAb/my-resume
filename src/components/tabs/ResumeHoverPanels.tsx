// src/components/sections/ResumeHoverPanels.tsx
import React, { useState } from "react";

type Key = "skills" | "education" | "projects" | "ecs";

const CoffeeRose = {
  cream:  "#FFF8F0",
  blush:  "#F5E1DC",
  rosewd: "#D4A59A",
  mocha:  "#6B3E2E",
  dusty:  "#A76D63",
  cocoa:  "#7B4B3A",
};

const items: { key: Key; label: string }[] = [
  { key: "skills", label: "Skills" },
  { key: "education", label: "Education" },
  { key: "projects", label: "Projects" },
  { key: "ecs", label: "ECS" },
];

// tiny pill badge component
const Chip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    className="px-3 py-1 text-sm rounded-full"
    style={{
      backgroundColor: `${CoffeeRose.blush}66`,
      color: CoffeeRose.mocha,
      border: `1px solid ${CoffeeRose.rosewd}`,
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);

// level dots (1–5)
const LevelDots: React.FC<{ level: number }> = ({ level }) => (
  <div className="flex gap-1 mt-2">
    {Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className="inline-block w-2.5 h-2.5 rounded-full"
        style={{
          backgroundColor: i < level ? CoffeeRose.dusty : `${CoffeeRose.rosewd}88`,
          boxShadow: i < level ? "0 0 0 1px rgba(0,0,0,0.04)" : "none",
        }}
      />
    ))}
  </div>
);

const ResumeHoverPanels: React.FC = () => {
  const [open, setOpen] = useState<Key | null>(null);

  return (
    <section
      aria-label="Resume quick sections"
      className="w-full border-t"
      style={{ borderColor: `${CoffeeRose.rosewd}55`, backgroundColor: CoffeeRose.cream }}
    >
      <div className="container mx-auto max-w-7xl px-8">
        {/* Menu row */}
        <nav className="flex gap-6 py-3 relative" role="menubar">
          {items.map(({ key, label }) => (
            <div
              key={key}
              className="relative"
              onMouseEnter={() => setOpen(key)}
              onMouseLeave={() => setOpen((prev) => (prev === key ? null : prev))}
            >
              {/* Trigger */}
              <button
                role="menuitem"
                className="px-3 py-2 rounded-md transition-colors"
                style={{
                  color: open === key ? CoffeeRose.mocha : `${CoffeeRose.mocha}CC`,
                  backgroundColor: open === key ? `${CoffeeRose.blush}66` : "transparent",
                  border: `1px solid ${open === key ? CoffeeRose.rosewd : "transparent"}`,
                }}
                onFocus={() => setOpen(key)}
                onBlur={() => setOpen((prev) => (prev === key ? null : prev))}
              >
                {label}
              </button>

              {/* Panel */}
              {open === key && (
                <div
                  className="absolute left-0 mt-2 w-[min(90vw,64rem)] rounded-xl shadow-xl p-5 z-50"
                  style={{
                    backgroundColor: CoffeeRose.cream,
                    border: `1px solid ${CoffeeRose.rosewd}`,
                  }}
                >
                  {/* ===== SKILLS (Redesigned) ===== */}
                  {key === "skills" && (
                    <div className="grid gap-5 md:grid-cols-2">
                      {/* Frontend */}
                      <div
                        className="rounded-xl p-4"
                        style={{
                          backgroundColor: "#FFFFFF",
                          border: `1px solid ${CoffeeRose.rosewd}`,
                          boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                        }}
                      >
                        <h3 className="text-lg font-semibold mb-2" style={{ color: CoffeeRose.mocha }}>
                          Frontend
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <Chip>React</Chip>
                          <Chip>TypeScript</Chip>
                          <Chip>Tailwind CSS</Chip>
                          <Chip>React Router</Chip>
                          <Chip>Framer Motion</Chip>
                        </div>
                        <LevelDots level={5} />
                      </div>

                      {/* Backend / APIs */}
                      <div
                        className="rounded-xl p-4"
                        style={{
                          backgroundColor: "#FFFFFF",
                          border: `1px solid ${CoffeeRose.rosewd}`,
                          boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                        }}
                      >
                        <h3 className="text-lg font-semibold mb-2" style={{ color: CoffeeRose.mocha }}>
                          Backend & APIs
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <Chip>Node.js</Chip>
                          <Chip>Express</Chip>
                          <Chip>Prisma</Chip>
                          <Chip>REST</Chip>
                          <Chip>Supabase</Chip>
                        </div>
                        <LevelDots level={4} />
                      </div>

                      {/* DevOps / CI-CD */}
                      <div
                        className="rounded-xl p-4"
                        style={{
                          backgroundColor: "#FFFFFF",
                          border: `1px solid ${CoffeeRose.rosewd}`,
                          boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                        }}
                      >
                        <h3 className="text-lg font-semibold mb-2" style={{ color: CoffeeRose.mocha }}>
                          DevOps & CI/CD
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <Chip>GitHub Actions</Chip>
                          <Chip>Docker</Chip>
                          <Chip>Render</Chip>
                          <Chip>Vite</Chip>
                          <Chip>Stripe / Shippo</Chip>
                        </div>
                        <LevelDots level={3} />
                      </div>

                      {/* Testing / Automation */}
                      <div
                        className="rounded-xl p-4"
                        style={{
                          backgroundColor: "#FFFFFF",
                          border: `1px solid ${CoffeeRose.rosewd}`,
                          boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                        }}
                      >
                        <h3 className="text-lg font-semibold mb-2" style={{ color: CoffeeRose.mocha }}>
                          Testing & Automation
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <Chip>WebdriverIO</Chip>
                          <Chip>Appium</Chip>
                          <Chip>BrowserStack</Chip>
                          <Chip>Jest</Chip>
                          <Chip>Playwright (basic)</Chip>
                        </div>
                        <LevelDots level={4} />
                      </div>
                    </div>
                  )}

                  {/* ===== EDUCATION ===== */}
                  {key === "education" && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2" style={{ color: CoffeeRose.mocha }}>
                        Education
                      </h3>
                      <div
                        className="rounded-lg p-4"
                        style={{
                          backgroundColor: CoffeeRose.cream,
                          border: `1px solid ${CoffeeRose.rosewd}`,
                        }}
                      >
                        <p style={{ color: CoffeeRose.cocoa }}>
                          B.S. in Computer Science —{" "}
                          <span style={{ color: CoffeeRose.dusty }}>Your University</span>
                        </p>
                        <p className="text-sm opacity-80" style={{ color: CoffeeRose.mocha }}>
                          20XX – 20XX
                        </p>
                      </div>
                    </div>
                  )}

                  {/* ===== PROJECTS ===== */}
                  {key === "projects" && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { t: "10E Beauty Storefront", d: "React + Supabase + Stripe + Shippo." },
                        { t: "Mobile Automation", d: "WebdriverIO + Appium + BrowserStack." },
                      ].map((p) => (
                        <div
                          key={p.t}
                          className="rounded-lg p-4"
                          style={{
                            backgroundColor: CoffeeRose.cream,
                            border: `1px solid ${CoffeeRose.rosewd}`,
                          }}
                        >
                          <h4 className="font-semibold" style={{ color: CoffeeRose.dusty }}>
                            {p.t}
                          </h4>
                          <p className="text-sm mt-1" style={{ color: CoffeeRose.mocha }}>
                            {p.d}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ===== ECS ===== */}
                  {key === "ecs" && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2" style={{ color: CoffeeRose.mocha }}>
                        ECS
                      </h3>
                      <p className="text-sm" style={{ color: CoffeeRose.cocoa }}>
                        Add your ECS details here (e.g., Amazon ECS deployments, containers, CI/CD).
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default ResumeHoverPanels;
