import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

import { CoffeeRose } from "./theme";
import HoverSkillsPanel from "./TabPanels/HoverSkillsPanel";
import HoverEducationPanel from "./TabPanels/HoverEducationPanel";
import HoverProjectsPanel from "./TabPanels/HoverProjectsPanel";
import ContactPanel from "./TabPanels/ContactPanel"; // adjust path if needed

import { Skill, HoverProject } from "./types";

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

type Key = "skills" | "education" | "projects" | "contact";

const navItems: { key: Key; label: string; to?: string }[] = [
  { key: "skills", label: "Skills", to: "/skills" },
  { key: "education", label: "Education", to: "/education" },
  { key: "projects", label: "Projects", to: "/projects" },
  { key: "contact", label: "Contact" }, // no route
];

const ResumeHoverPanels: React.FC = () => {
  const location = useLocation();
  const [open, setOpen] = useState<Key | null>(null);

  const [contactOpen, setContactOpen] = useState<boolean>(false);
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

  // Skills
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

  // Projects
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

  const renderHoverPanelContent = (key: Key) => {
    if (key === "skills")
      return <HoverSkillsPanel groupedSkillsAll={groupedSkillsAll} />;

    if (key === "education") return <HoverEducationPanel />;

    if (key === "projects")
      return (
        <HoverProjectsPanel
          projects={projects}
          openModalWithMedia={openModalWithMedia}
          isVideoUrl={isVideoUrl}
          isExternalVideoHost={isExternalVideoHost}
        />
      );

    return null;
  };

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
        <div className="container mx-auto max-w-7xl px-8 relative">
          <nav className="flex gap-6 py-3 relative" role="menubar">

            {navItems.map(({ key, label, to }) => {
              const isActive = to ? location.pathname === to : false;
              const isContact = key === "contact";

              const handleMouseEnter = () => {
                if (isContact) return;          // don't auto-open contact on hover
                setOpen(key);
              };

              const handleMouseLeave = () => {
                if (isContact) return;          // don't auto-close contact on hover leave
                setOpen((prev) => (prev === key ? null : prev));
              };

              const handleContactClick = () => {
                if (!isContact) return;
                // toggle
                setContactOpen((prev) => !prev);
              };

              return (
                <div
                  key={key}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {isContact ? (
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleContactClick}
                      className="px-3 py-2 rounded-md transition-colors border inline-block"
                      style={{
                        color: contactOpen
                          ? CoffeeRose.mocha
                          : `${CoffeeRose.mocha}CC`,
                        backgroundColor: contactOpen
                          ? `${CoffeeRose.blush}66`
                          : "transparent",
                        borderColor: contactOpen
                          ? CoffeeRose.rosewd
                          : "transparent",
                      }}
                    >
                      {label}
                    </button>
                  ) : (
                    <Link
                      to={to!}
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
                  )}

                  {!isContact && open === key && (
                    <div
                      className="absolute left-0 mt-2 w-[min(90vw,64rem)] rounded-xl shadow-xl p-5 z-50"
                      style={{
                        backgroundColor: CoffeeRose.cream,
                        border: `1px solid ${CoffeeRose.rosewd}`,
                        maxHeight: "70vh",
                        overflowY: "auto",
                      }}
                    >
                      {renderHoverPanelContent(key)}
                    </div>
                  )}

                  {isContact && contactOpen && (
                    <div
                      className="absolute left-0 mt-2 z-50 rounded-xl shadow-xl p-4 w-80 max-w-[90vw]"
                      style={{
                        backgroundColor: CoffeeRose.cream,
                        border: `1px solid ${CoffeeRose.rosewd}`,
                        boxShadow: "0 20px 48px rgba(0,0,0,0.15)",
                      }}
                    >
                      <div className="relative">
                        <button
                          onClick={() => setContactOpen(false)}
                          className="absolute top-0 right-0 text-xs px-2 py-1 rounded border"
                          style={{
                            backgroundColor: "#fff",
                            color: CoffeeRose.mocha,
                            borderColor: CoffeeRose.rosewd,
                            lineHeight: 1,
                          }}
                        >
                          ✕
                        </button>

                        <div className="pr-8">
                          <ContactPanel
                            open={true}
                            onClose={() => setContactOpen(false)}
                            inline={true}
                            hideBackdrop={true}
                          />
                        </div>
                      </div>
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
                      (e.currentTarget.style.display = "none");
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
                      (e.currentTarget.style.display = "none");
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
