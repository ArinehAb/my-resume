import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../lib/supabaseClient";

const CoffeeRose = {
  cream:  "#FFF8F0",
  blush:  "#F5E1DC",
  rosewd: "#D4A59A",
  mocha:  "#6B3E2E",
  dusty:  "#A76D63",
  cocoa:  "#7B4B3A",
};

type Skill = {
  id: number;
  category: string;
  name: string;
  level: number;
  sort_order?: number | null;
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
          boxShadow: i < level ? "0 0 0 1px rgba(0,0,0,0.04)" : "none",
        }}
      />
    ))}
  </div>
);

const SkillsPage: React.FC = () => {
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

  return (
    <main className="w-full px-8 py-8 max-w-7xl mx-auto">
      {/* Header row with Back button + title */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/"
          className="text-sm font-medium px-3 py-2 rounded-md border"
          style={{
            color: CoffeeRose.mocha,
            borderColor: CoffeeRose.rosewd,
            backgroundColor: CoffeeRose.cream,
          }}
        >
          ← Back
        </Link>

        <h1
          className="text-2xl font-semibold"
          style={{ color: CoffeeRose.mocha }}
        >
          Skills
        </h1>

        {/* spacer to keep title visually centered */}
        <div className="w-[60px]" />
      </div>

      {skillsLoading && (
        <div className="grid gap-5 md:grid-cols-2">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="rounded-xl p-4 bg-white border"
              style={{ borderColor: CoffeeRose.rosewd }}
            >
              <div className="h-5 w-40 mb-4 bg-gray-200 animate-pulse rounded" />
              <div className="h-6 w-full mb-2 bg-gray-200 animate-pulse rounded" />
              <div className="h-6 w-3/4 mb-2 bg-gray-200 animate-pulse rounded" />
              <div className="h-6 w-2/3 mb-2 bg-gray-200 animate-pulse rounded" />
            </div>
          ))}
        </div>
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

      {!skillsLoading && !skillsError && (
        <div className="grid gap-5 md:grid-cols-2">
          {groupedSkills.map(([category, items]) => {
            const avg =
              items.length > 0
                ? Math.round(
                    items.reduce((a, b) => a + b.level, 0) / items.length
                  )
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
    </main>
  );
};

export default SkillsPage;
