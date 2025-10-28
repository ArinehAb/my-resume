import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // <-- NEW
import { supabase } from "../../lib/supabaseClient";

const CoffeeRose = {
  blush:  "#F5E1DC",
  rosewd: "#D4A59A",
  mocha:  "#6B3E2E",
  dusty:  "#A76D63",
  cocoa:  "#7B4B3A",
  cream:  "#FFF8F0",
};

type Project = {
  id: number;
  created_at?: string | null;
  title: string;
  description: string | null;
  technologies: string[] | null;
  bullets: string[] | null;
  media_url: string | null;
  website_url: string | null;
  category: string | null;
  featured: boolean | null;
};

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

/**
 * includes .mov so we treat .mov as video
 */
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

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [projectsError, setProjectsError] = useState<string | null>(null);
  const [projectsLoading, setProjectsLoading] = useState<boolean>(false);

  // modal/lightbox state
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

  useEffect(() => {
    (async () => {
      try {
        setProjectsLoading(true);

        const { data, error } = await supabase
          .from("projects")
          .select(
            "id, created_at, title, description, technologies, bullets, media_url, website_url, category, featured"
          )
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
    <main className="w-full px-8 py-8 max-w-7xl mx-auto relative">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-6">
        <h1
          className="text-2xl font-semibold"
          style={{ color: CoffeeRose.mocha }}
        >
          Projects
        </h1>

        <Link
          to="/"
          className="text-sm font-medium px-3 py-2 rounded-md border shadow-sm self-start sm:self-auto"
          style={{
            backgroundColor: CoffeeRose.cream,
            color: CoffeeRose.mocha,
            borderColor: CoffeeRose.rosewd,
          }}
        >
          ← Home
        </Link>
      </div>

      {/* Loading skeleton */}
      {projectsLoading && (
        <div className="grid sm:grid-cols-2 gap-4">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="rounded-lg p-4 bg-white border"
              style={{ borderColor: CoffeeRose.rosewd }}
            >
              <div className="h-5 w-48 mb-3 bg-gray-200 animate-pulse rounded" />
              <div className="h-20 w-full mb-3 bg-gray-200 animate-pulse rounded" />
              <div className="h-40 w-full bg-gray-200 animate-pulse rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
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

      {/* Empty state */}
      {!projectsLoading &&
        !projectsError &&
        (!projects || projects.length === 0) && (
          <div
            className="rounded-lg p-4"
            style={{
              backgroundColor: CoffeeRose.cream,
              border: `1px solid ${CoffeeRose.rosewd}`,
              color: CoffeeRose.cocoa,
            }}
          >
            No projects found. Add rows to{" "}
            <code>public.projects</code> in Supabase.
          </div>
        )}

      {/* Project cards */}
      {!projectsLoading &&
      !projectsError &&
      projects?.length ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {projects.map((p) => (
            <div
              key={p.id}
              className="rounded-lg p-4"
              style={{
                backgroundColor: "#FFFFFF",
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
                    className="text-sm underline"
                    style={{ color: CoffeeRose.mocha }}
                  >
                    View live →
                  </a>
                ) : null}
              </div>

              {/* Description */}
              {p.description && (
                <p
                  className="text-sm mt-1"
                  style={{ color: CoffeeRose.mocha }}
                >
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
                <ul
                  className="list-disc ml-5 mt-3 text-sm"
                  style={{ color: CoffeeRose.cocoa }}
                >
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}

              {p.media_url ? (
                <div className="mt-4 rounded overflow-hidden">
                  {isVideoUrl(p.media_url) ? (
                    p.media_url.includes("youtube.com") ||
                    p.media_url.includes("youtu.be") ? (
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
                      <VideoThumb
                        src={p.media_url}
                        title={p.title ?? "video"}
                        onOpen={(src, alt) => openModalWithMedia(src, alt)}
                      />
                    )
                  ) : (
                    <ImageThumb
                      src={p.media_url}
                      title={p.title ?? "screenshot"}
                      onOpen={(src, alt) => openModalWithMedia(src, alt)}
                    />
                  )}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      {/* Lightbox modal */}
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
                        "Modal video failed to load/play:",
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
    </main>
  );
};

const VideoThumb: React.FC<{
  src: string;
  title: string;
  onOpen: (src: string, alt: string) => void;
}> = ({ src, title, onOpen }) => {
  return (
    <video
      src={src}
      controls
      className="w-full rounded cursor-pointer"
      onError={(e) => {
        console.error("Video failed to load:", src);
        (e.currentTarget.style.display = "none");
      }}
      onClick={() => onOpen(src, title)}
    />
  );
};

const ImageThumb: React.FC<{
  src: string;
  title: string;
  onOpen: (src: string, alt: string) => void;
}> = ({ src, title, onOpen }) => {
  return (
    <img
      src={src}
      alt={title}
      className="w-full h-48 object-cover rounded shadow cursor-pointer"
      onError={(e) => {
        console.error("Image failed to load:", src);
        (e.currentTarget.style.display = "none");
      }}
      onClick={() => onOpen(src, title)}
    />
  );
};

export default ProjectsPage;
