import React from "react";

const CoffeeRose = {
  cream:  "#FFF8F0",
  blush:  "#F5E1DC",
  rosewd: "#D4A59A",
  mocha:  "#6B3E2E",
  dusty:  "#A76D63",
  cocoa:  "#7B4B3A",
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

type Skill = {
  id: number;
  category: string;
  name: string;
  level: number;
  sort_order?: number | null;
};

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

type HoverSkillsPanelProps = {
  groupedSkillsAll: [string, Skill[]][];
};

const HoverSkillsPanel: React.FC<HoverSkillsPanelProps> = ({ groupedSkillsAll }) => {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {groupedSkillsAll.map(([category, list]) => {
        const avg =
          list.length > 0
            ? Math.round(
                list.reduce((a, b) => a + b.level, 0) / list.length
              )
            : 0;

        return (
          <div
            key={category}
            className="rounded-xl p-4 bg-white"
            style={{
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
              {list.map((skill) => (
                <Chip key={skill.id}>{skill.name}</Chip>
              ))}
            </div>

            <LevelDots level={avg} />
          </div>
        );
      })}
    </div>
  );
};

export default HoverSkillsPanel;
