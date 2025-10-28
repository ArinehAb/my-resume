import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

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

/* ---------- Types ---------- */
type Skill = {
  id: number;
  category: string;
  name: string;
  level: number;
  sort_order?: number | null;
};

type Project = {
  id: number;
  created_at?: string | null;
  title: string;
  description: string | null;
  technologies: string[] | null;
  bullets: string[] | null;
  media_url: string | null;  // image, video, or link
  category: string | null;
  featured: boolean | null;
};

const categoryOrder = [
  "Frontend",
  "Backend & APIs",
  "DevOps & CI/CD",
  "Testing & Automation",
  "Data & Analytics",
  "AI & ML",
  "Programming Languages",
  "Other Tools",
  "General",
];

/* Helper: detect video-ish URL */
const isVideoUrl = (url: string) => {
  const lower = url.toLowerCase();
  return lower.endsWith(".mp4") || lower.endsWith(".webm") || lower.includes("youtube.com") || lower.includes("youtu.be") || lower.includes("vimeo.com");
};

const ResumeHoverPanels: React.FC = () => {
  const [open, setOpen] = useState<Key | null>(null);

  /* ---------- Skills (Supabase) ---------- */
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillsError, setSkillsError] = useState<string | null>(null);
  const [skillsLoading, setSkillsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setSkillsLoading(true);
        const { data, error } = await supabase
          .from("skills")
          .select("id, category, name, level, sort_order")
          .order("sort_order", { ascending: true })
          .order("name", { ascending: true });

        if (error) {
          setSkillsError(error.message);
          return;
        }
        setSkills(data ?? []);
      } catch (e: any) {
        setSkillsError(e?.message ?? "Failed to load skills.");
      } finally {
        setSkillsLoading(false);
      }
    })();
  }, []);

  const groupedSkills = useMemo(() => {
    const groups = skills.reduce((acc, s) => {
      if (!acc[s.category]) acc[s.category] = [];
      acc[s.category].push(s);
      return acc;
    }, {} as Record<string, Skill[]>);

    const orderedEntries = Object.entries(groups).sort((a, b) => {
      const ai = categoryOrder.indexOf(a[0]);
      const bi = categoryOrder.indexOf(b[0]);
      if (ai === -1 && bi === -1) return a[0].localeCompare(b[0]);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });

    return orderedEntries;
  }, [skills]);

  /* ---------- Projects (Supabase) ---------- */
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [projectsError, setProjectsError] = useState<string | null>(null);
  const [projectsLoading, setProjectsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setProjectsLoading(true);
        const { data, error } = await supabase
          .from("projects")
          .select("id, created_at, title, description, technologies, bullets, media_url, category, featured")
          .order("featured", { ascending: false })
          .order("created_at", { ascending: false });

        if (error) {
          setProjectsError(error.message);
          return;
        }
        setProjects(data ?? []);
      } catch (e: any) {
        setProjectsError(e?.message ?? "Failed to load projects.");
      } finally {
        setProjectsLoading(false);
      }
    })();
  }, []);

  return (
    <section
      aria-label="Resume quick sections"
      className="w-full border-t"
      style={{ borderColor: `${CoffeeRose.rosewd}55`, backgroundColor: CoffeeRose.cream }}
    >
      <div className="container mx-auto max-w-7xl px-8">
        <nav className="flex gap-6 py-3 relative" role="menubar">
          {items.map(({ key, label }) => (
            <div
              key={key}
              className="relative"
              onMouseEnter={() => setOpen(key)}
              onMouseLeave={() => setOpen((prev) => (prev === key ? null : prev))}
            >
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

              {open === key && (
                <div
                  className="absolute left-0 mt-2 w-[min(90vw,64rem)] rounded-xl shadow-xl p-5 z-50"
                  style={{
                    backgroundColor: CoffeeRose.cream,
                    border: `1px solid ${CoffeeRose.rosewd}`,
                  }}
                >
                  {/* ---------- SKILLS (Dynamic) ---------- */}
                  {key === "skills" && (
                    <div className="grid gap-5 md:grid-cols-2">
                      {skillsLoading && (
                        <>
                          <div className="rounded-xl p-4 bg-white border" style={{ borderColor: CoffeeRose.rosewd }}>
                            <div className="h-5 w-40 mb-4 bg-gray-200 animate-pulse rounded" />
                            <div className="h-6 w-full mb-2 bg-gray-200 animate-pulse rounded" />
                            <div className="h-6 w-3/4 mb-2 bg-gray-200 animate-pulse rounded" />
                            <div className="h-6 w-2/3 mb-2 bg-gray-200 animate-pulse rounded" />
                          </div>
                          <div className="rounded-xl p-4 bg-white border" style={{ borderColor: CoffeeRose.rosewd }}>
                            <div className="h-5 w-40 mb-4 bg-gray-200 animate-pulse rounded" />
                            <div className="h-6 w-full mb-2 bg-gray-200 animate-pulse rounded" />
                            <div className="h-6 w-3/4 mb-2 bg-gray-200 animate-pulse rounded" />
                            <div className="h-6 w-2/3 mb-2 bg-gray-200 animate-pulse rounded" />
                          </div>
                        </>
                      )}

                      {skillsError && (
                        <div
                          className="rounded-xl p-4"
                          style={{
                            backgroundColor: "#FFFFFF",
                            border: `1px solid ${CoffeeRose.rosewd}`,
                            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                            color: CoffeeRose.cocoa,
                          }}
                        >
                          Error loading skills: {skillsError}
                        </div>
                      )}

                      {!skillsLoading && !skillsError && groupedSkills.length === 0 && (
                        <div
                          className="rounded-xl p-4"
                          style={{
                            backgroundColor: "#FFFFFF",
                            border: `1px solid ${CoffeeRose.rosewd}`,
                            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                            color: CoffeeRose.cocoa,
                          }}
                        >
                          No skills found. Add rows to <code>public.skills</code> in Supabase.
                        </div>
                      )}

                      {!skillsLoading &&
                        !skillsError &&
                        groupedSkills.map(([category, items]) => {
                          const avg =
                            items.length > 0
                              ? Math.round(items.reduce((a, b) => a + b.level, 0) / items.length)
                              : 0;
                          return (
                            <div
                              key={category}
                              className="rounded-xl p-4"
                              style={{
                                backgroundColor: "#FFFFFF",
                                border: `1px solid ${CoffeeRose.rosewd}`,
                                boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                              }}
                            >
                              <h3
                                className="text-lg font-semibold mb-2"
                                style={{ color: CoffeeRose.mocha }}
                              >
                                {category}
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                {items.map((skill) => (
                                  <Chip key={skill.id}>{skill.name}</Chip>
                                ))}
                              </div>
                              <LevelDots level={avg} />
                            </div>
                          );
                        })}
                    </div>
                  )}

                  {/* ---------- EDUCATION (Static for now) ---------- */}
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
                          <span style={{ color: CoffeeRose.dusty }}>
                            California State Polytechnic University, Pomona
                          </span>
                        </p>
                        <p className="text-sm opacity-80" style={{ color: CoffeeRose.mocha }}>
                          2016 – 2020
                        </p>
                      </div>
                    </div>
                  )}

                  {/* ---------- PROJECTS (Dynamic) ---------- */}
                  {key === "projects" && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {projectsLoading && (
                        <>
                          <div className="rounded-lg p-4 bg-white border" style={{ borderColor: CoffeeRose.rosewd }}>
                            <div className="h-5 w-48 mb-3 bg-gray-200 animate-pulse rounded" />
                            <div className="h-20 w-full mb-3 bg-gray-200 animate-pulse rounded" />
                            <div className="h-40 w-full bg-gray-200 animate-pulse rounded" />
                          </div>
                          <div className="rounded-lg p-4 bg-white border" style={{ borderColor: CoffeeRose.rosewd }}>
                            <div className="h-5 w-48 mb-3 bg-gray-200 animate-pulse rounded" />
                            <div className="h-20 w-full mb-3 bg-gray-200 animate-pulse rounded" />
                            <div className="h-40 w-full bg-gray-200 animate-pulse rounded" />
                          </div>
                        </>
                      )}

                      {projectsError && (
                        <div
                          className="rounded-lg p-4"
                          style={{
                            backgroundColor: "#FFFFFF",
                            border: `1px solid ${CoffeeRose.rosewd}`,
                            color: CoffeeRose.cocoa,
                          }}
                        >
                          Error loading projects: {projectsError}
                        </div>
                      )}

                      {!projectsLoading && !projectsError && (!projects || projects.length === 0) && (
                        <div
                          className="rounded-lg p-4"
                          style={{
                            backgroundColor: CoffeeRose.cream,
                            border: `1px solid ${CoffeeRose.rosewd}`,
                            color: CoffeeRose.cocoa,
                          }}
                        >
                          No projects found. Add rows to <code>public.projects</code> in Supabase.
                        </div>
                      )}

                      {!projectsLoading && !projectsError && projects?.map((p) => (
                        <div
                          key={p.id}
                          className="rounded-lg p-4"
                          style={{
                            backgroundColor: "#FFFFFF",
                            border: `1px solid ${CoffeeRose.rosewd}`,
                          }}
                        >
                          <h4 className="font-semibold" style={{ color: CoffeeRose.dusty }}>
                            {p.title}
                          </h4>
                          {p.description && (
                            <p className="text-sm mt-1" style={{ color: CoffeeRose.mocha }}>
                              {p.description}
                            </p>
                          )}

                          {/* Tech chips */}
                          {p.technologies?.length ? (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {p.technologies.map((t) => (
                                <Chip key={t}>{t}</Chip>
                              ))}
                            </div>
                          ) : null}

                          {/* Bullets */}
                          {p.bullets?.length ? (
                            <ul className="list-disc ml-5 mt-3 text-sm" style={{ color: CoffeeRose.cocoa }}>
                              {p.bullets.map((b) => (
                                <li key={b}>{b}</li>
                              ))}
                            </ul>
                          ) : null}

                          {/* Media preview */}
                          {p.media_url ? (
                            <div className="mt-4 rounded overflow-hidden">
                              {isVideoUrl(p.media_url) ? (
                                // Simple video/youtube handling; you could enhance with a player
                                p.media_url.includes("youtube.com") || p.media_url.includes("youtu.be") ? (
                                  <a
                                    href={p.media_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="underline"
                                    style={{ color: CoffeeRose.dusty }}
                                  >
                                    Watch video
                                  </a>
                                ) : (
                                  <video
                                    src={p.media_url}
                                    controls
                                    className="w-full rounded"
                                  />
                                )
                              ) : (
                                <img
                                  src={p.media_url}
                                  alt={p.title}
                                  className="w-full h-48 object-cover rounded shadow"
                                />
                              )}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ---------- ECS (Static placeholder) ---------- */}
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
