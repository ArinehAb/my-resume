import React, { useState } from "react";

export type TimelineItem = {
  id: string;
  title: string;
  range: string;
  org: string;
  summary?: string;
  bullets?: string[];
  current?: boolean;
};

const colors = {
  line: "#E5E7EB",
  dot: "#A76D63",
  text: "#1F2937",
  muted: "#6B7280",
  panelBorder: "#E5E7EB",
};

const SidebarTimeline: React.FC<{ items: TimelineItem[] }> = ({ items }) => {
  const defaultItem = items.find((i) => i.current) ?? items[0];
  const [active, setActive] = useState<string>(defaultItem?.id ?? "");

  return (
    <section className="w-full">
      <div className="container mx-auto max-w-7xl px-8 py-12 grid grid-cols-[220px_minmax(0,1fr)] gap-12">
        {/* SIDEBAR */}
        <aside className="relative md:sticky md:top-24 self-start -ml-6 sm:-ml-10 md:-ml-16 lg:-ml-20">
          {/* vertical line */}
          <div
            className="absolute left-[10px] top-0 bottom-0 w-[2px] rounded"
            style={{ backgroundColor: colors.line }}
          />
          <ol className="space-y-10 relative z-10">
            {items.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} className="pl-8">
                  {/* dot */}
                  <span
                    className="absolute -ml-[26px] mt-2 w-4 h-4 rounded-full border-2 bg-white"
                    style={{
                      borderColor: isActive ? colors.dot : colors.line,
                      backgroundColor: isActive ? colors.dot : "#fff",
                      boxShadow: isActive
                        ? "0 0 0 4px rgba(167,109,99,0.2)"
                        : "none",
                    }}
                    aria-hidden
                  />
                  <button
                    onClick={() => setActive(item.id)}
                    className="text-left focus:outline-none"
                  >
                    {/* Job title */}
                    <div
                      className="text-base font-medium"
                      style={{ color: isActive ? colors.dot : colors.text }}
                    >
                      {item.title}
                    </div>

                    {/* Company name */}
                    <div
                      className="text-sm"
                      style={{ color: isActive ? colors.text : colors.muted }}
                    >
                      {item.org}
                    </div>

                    {/* Date range */}
                    <div className="text-sm" style={{ color: colors.muted }}>
                      {item.range}
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
        </aside>

        {/* DETAILS */}
        <main>
          {items.map(
            (item) =>
              active === item.id && (
                <div
                  key={item.id}
                  className="rounded-xl p-6 bg-white border"
                  style={{ borderColor: colors.panelBorder }}
                >
                  <h3 className="text-2xl font-semibold mb-2" style={{ color: colors.text }}>
                    {item.title}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: colors.muted }}>
                    {item.org} • {item.range}
                  </p>
                  {item.summary && (
                    <p className="mb-3 text-base" style={{ color: colors.text }}>
                      {item.summary}
                    </p>
                  )}
                  {item.bullets?.length ? (
                    <ul className="list-disc pl-5 space-y-1">
                      {item.bullets.map((b) => (
                        <li key={b} className="text-sm" style={{ color: colors.text }}>
                          {b}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              )
          )}
        </main>
      </div>
    </section>
  );
};

export default SidebarTimeline;
