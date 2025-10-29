import React from "react";
import { Link } from "react-router-dom";
import { CoffeeRose } from "../theme";
import { Chip } from "../uiParts";
import { HoverProject } from "../types";

type HoverProjectsPanelProps = {
  projects: HoverProject[];
  openModalWithMedia: (src: string | null, alt: string) => void;
  isVideoUrl: (url: string) => boolean;
  isExternalVideoHost: (url: string) => boolean;
};

const HoverProjectsPanel: React.FC<HoverProjectsPanelProps> = ({
  projects,
  openModalWithMedia,
  isVideoUrl,
  isExternalVideoHost,
}) => {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {projects.map((p) => {
        const canPlay = p.media_url && isVideoUrl(p.media_url);
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
                      />

                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                        style={{
                          backgroundColor: CoffeeRose.blush,
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
                      (e.currentTarget.style.display = "none");
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
  );
};

export default HoverProjectsPanel;
