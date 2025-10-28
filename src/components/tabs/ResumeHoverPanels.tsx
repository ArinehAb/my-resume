import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

const CoffeeRose = {
  cream:  "#FFF8F0",
  blush:  "#F5E1DC",
  rosewd: "#D4A59A",
  mocha:  "#6B3E2E",
  dusty:  "#A76D63",
  cocoa:  "#7B4B3A",
};

type Key = "skills" | "education" | "projects";

const navItems: { key: Key; label: string; to: string }[] = [
  { key: "skills", label: "Skills", to: "/skills" },
  { key: "education", label: "Education", to: "/education" },
  { key: "projects", label: "Projects", to: "/projects" },
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
          backgroundColor:
            i < level ? CoffeeRose.dusty : `${CoffeeRose.rosewd}88`,
          boxShadow:
            i < level ? "0 0 0 1px rgba(0,0,0,0.04)" : "none",
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

type HoverProject = {
  id: number;
  title: string;
  description: string | null;
  technologies: string[] | null;
  media_url: string | null;
  website_url: string | null;
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

const isVideoUrl = (url: string) => {
  const lower = url.toLowerCase();
  return (
    lower.endsWith(".mp4") ||
    lower.endsWith(".webm") ||
    lower.endsWith(".mov") ||
    lower.includes("youtube.com") ||
    lower.includes("youtu.be") ||
    lower.includes("vimeo.com")
  );
};

const isExternalVideoHost = (url: string) => {
  const lower = url.toLowerCase();
  return (
    lower.includes("youtube.com") ||
    lower.includes("youtu.be") ||
    lower.includes("vimeo.com")
  );
};

const ResumeHoverPanels: React.FC = () => {
  const location = useLocation();
  const [open, setOpen] = useState<Key | null>(null);

  // ------------------ MODAL STATE (for preview play) ------------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMedia, setModalMedia] = useState<string | null>(null);
  const [modalAlt, setModalAlt] = useState<string>("");

  const openModalWithMedia = (src: string | null, alt: string) => {
    if (!src) return;
    setModalMedia(src);
    setModalAlt(alt);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMedia(null);
    setModalAlt("");
  };

  // ------- Skills fetch (all skills) -------
  const [skills, setSkills] = useState<Skill[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("skills")
        .select("id, category, name, level, sort_order")
        .order("sort_order", { ascending: true })
        .order("name", { ascending: true });
      setSkills(data ?? []);
    })();
  }, []);

  const groupedSkillsAll = useMemo(() => {
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

  // Projects PREVIEW fetch
  const [projects, setProjects] = useState<HoverProject[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("projects")
        .select(
          "id, title, description, technologies, media_url, website_url, featured, created_at"
        )
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(3);
      setProjects((data as any) ?? []);
    })();
  }, []);

  return (
    <>
      <section
        aria-label="Resume quick sections"
        className="w-full border-t"
        style={{
          borderColor: `${CoffeeRose.rosewd}55`,
          backgroundColor: CoffeeRose.cream,
        }}
      >
        <div className="container mx-auto max-w-7xl px-8">
          <nav className="flex gap-6 py-3 relative" role="menubar">
            {navItems.map(({ key, label, to }) => {
              const isActive = location.pathname === to;

              return (
                <div
                  key={key}
                  className="relative"
                  onMouseEnter={() => setOpen(key)}
                  onMouseLeave={() =>
                    setOpen((prev) => (prev === key ? null : prev))
                  }
                >
                  <Link
                    to={to}
                    role="menuitem"
                    className="px-3 py-2 rounded-md transition-colors border inline-block"
                    style={{
                      color: isActive
                        ? CoffeeRose.mocha
                        : `${CoffeeRose.mocha}CC`,
                      backgroundColor: isActive
                        ? `${CoffeeRose.blush}66`
                        : "transparent",
                      borderColor: isActive
                        ? CoffeeRose.rosewd
                        : "transparent",
                    }}
                  >
                    {label}
                  </Link>

                  {open === key && (
                    <div
                      className="absolute left-0 mt-2 w-[min(90vw,64rem)] rounded-xl shadow-xl p-5 z-50"
                      style={{
                        backgroundColor: CoffeeRose.cream,
                        border: `1px solid ${CoffeeRose.rosewd}`,
                        maxHeight: "70vh",
                        overflowY: "auto",
                      }}
                    >
                      {/* ---------- SKILLS (all categories, all skills) ---------- */}
                      {key === "skills" && (
                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                          {groupedSkillsAll.map(([category, list]) => {
                            const avg =
                              list.length > 0
                                ? Math.round(
                                    list.reduce(
                                      (a, b) => a + b.level,
                                      0
                                    ) / list.length
                                  )
                                : 0;

                            return (
                              <div
                                key={category}
                                className="rounded-xl p-4 bg-white"
                                style={{
                                  border: `1px solid ${CoffeeRose.rosewd}`,
                                  boxShadow:
                                    "0 4px 16px rgba(0,0,0,0.06)",
                                }}
                              >
                                <h3
                                  className="text-lg font-semibold mb-2"
                                  style={{ color: CoffeeRose.mocha }}
                                >
                                  {category}
                                </h3>

                                <div className="flex flex-wrap gap-2">
                                  {list.map((skill) => (
                                    <Chip key={skill.id}>
                                      {skill.name}
                                    </Chip>
                                  ))}
                                </div>

                                <LevelDots level={avg} />
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* ---------- EDUCATION ---------- */}
                      {key === "education" && (
                        <div>
                          <h3
                            className="text-lg font-semibold mb-2"
                            style={{ color: CoffeeRose.mocha }}
                          >
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
                              <span
                                style={{ color: CoffeeRose.dusty }}
                              >
                                California State Polytechnic
                                University, Pomona
                              </span>
                            </p>
                            <p
                              className="text-sm opacity-80"
                              style={{ color: CoffeeRose.mocha }}
                            >
                              2016 – 2020
                            </p>
                          </div>

                          <div className="text-sm text-right mt-4">
                            <Link
                              to="/education"
                              style={{ color: CoffeeRose.dusty }}
                              className="underline"
                            >
                              View full education →
                            </Link>
                          </div>
                        </div>
                      )}

                      {/* PROJECTS */}
                      {key === "projects" && (
                        <div className="grid sm:grid-cols-2 gap-4">
                          {projects.map((p) => {
                            const canPlay =
                              p.media_url && isVideoUrl(p.media_url);

                            const isExternal = p.media_url
                              ? isExternalVideoHost(p.media_url)
                              : false;

                            return (
                              <div
                                key={p.id}
                                className="rounded-lg p-4 bg-white flex flex-col"
                                style={{
                                  border: `1px solid ${CoffeeRose.rosewd}`,
                                }}
                              >
                                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                                  <h4
                                    className="font-semibold"
                                    style={{ color: CoffeeRose.dusty }}
                                  >
                                    {p.title}
                                  </h4>

                                  {p.website_url ? (
                                    <a
                                      href={p.website_url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-xs underline"
                                      style={{
                                        color: CoffeeRose.mocha,
                                      }}
                                    >
                                      View live →
                                    </a>
                                  ) : null}
                                </div>

                                {p.description && (
                                  <p
                                    className="text-sm mt-1"
                                    style={{ color: CoffeeRose.mocha }}
                                  >
                                    {p.description}
                                  </p>
                                )}

                                {p.technologies?.length ? (
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {p.technologies.map((t) => (
                                      <Chip key={t}>{t}</Chip>
                                    ))}
                                  </div>
                                ) : null}

                                {p.media_url ? (
                                  <div className="mt-4 rounded overflow-hidden relative group">
                                    {canPlay ? (
                                      <>
                                        {/* Thumbnail/UI */}
                                        <div
                                          className="w-full h-40 bg-black/20 flex items-center justify-center rounded cursor-pointer relative"
                                          style={{
                                            border: `1px solid ${CoffeeRose.rosewd}`,
                                          }}
                                          onClick={() => {
                                            if (isExternal) {
                                              
                                              window.open(
                                                p.media_url!,
                                                "_blank",
                                                "noopener,noreferrer"
                                              );
                                            } else {
                                              
                                              openModalWithMedia(
                                                p.media_url!,
                                                p.title ?? "video"
                                              );
                                            }
                                          }}
                                        >

                                          <div
                                            className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"
                                            style={{}}
                                          />

                                          {/* Play button circle */}
                                          <div
                                            className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                                            style={{
                                              backgroundColor:
                                                CoffeeRose.blush,
                                              border: `2px solid ${CoffeeRose.rosewd}`,
                                              color: CoffeeRose.mocha,
                                              fontWeight: 600,
                                              fontSize: "0.75rem",
                                            }}
                                          >
                                            ▶
                                          </div>
                                        </div>
                                      </>
                                    ) : (
                                      <img
                                        src={p.media_url}
                                        alt={p.title ?? "project screenshot"}
                                        className="w-full h-40 object-cover rounded shadow cursor-pointer"
                                        style={{
                                          border: `1px solid ${CoffeeRose.rosewd}`,
                                        }}
                                        onClick={() =>
                                          openModalWithMedia(
                                            p.media_url!,
                                            p.title ?? "screenshot"
                                          )
                                        }
                                        onError={(e) => {
                                          console.error(
                                            "Hover img failed to load:",
                                            p.media_url
                                          );
                                          (e.currentTarget.style.display =
                                            "none");
                                        }}
                                      />
                                    )}
                                  </div>
                                ) : null}
                              </div>
                            );
                          })}

                          <div className="text-sm text-right pr-2 self-end w-full sm:col-span-2">
                            <Link
                              to="/projects"
                              style={{ color: CoffeeRose.dusty }}
                              className="underline"
                            >
                              View all projects →
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </section>

      {isModalOpen && modalMedia && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={closeModal}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-xl shadow-xl overflow-hidden flex flex-col">
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-sm px-2 py-1 rounded border"
                style={{
                  backgroundColor: CoffeeRose.cream,
                  color: CoffeeRose.mocha,
                  borderColor: CoffeeRose.rosewd,
                }}
              >
                ✕
              </button>

              <div className="flex-1 overflow-auto flex items-center justify-center p-6 bg-black">
                {isVideoUrl(modalMedia) ? (
                  <video
                    src={modalMedia}
                    controls
                    autoPlay
                    className="max-h-[80vh] max-w-full rounded"
                    onError={(e) => {
                      console.error(
                        "Modal video failed to load or play:",
                        modalMedia
                      );
                      (e.currentTarget.style.display =
                        "none");
                    }}
                  />
                ) : (
                  <img
                    src={modalMedia}
                    alt={modalAlt}
                    className="max-h-[80vh] max-w-full rounded object-contain"
                    onError={(e) => {
                      console.error(
                        "Modal image failed to load:",
                        modalMedia
                      );
                      (e.currentTarget.style.display =
                        "none");
                    }}
                  />
                )}
              </div>

              <div
                className="text-sm p-4 border-t"
                style={{ borderColor: CoffeeRose.rosewd }}
              >
                <span
                  style={{
                    color: CoffeeRose.mocha,
                    fontWeight: 500,
                  }}
                >
                  {modalAlt}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResumeHoverPanels;
