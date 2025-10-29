import React from "react";
import { CoffeeRose } from "./theme";

// little pill with a border (used for skills, tech tags)
export const Chip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
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

// row of 5 dots showing "average level"
export const LevelDots: React.FC<{ level: number }> = ({ level }) => (
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
