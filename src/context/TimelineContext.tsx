import React, { createContext, useContext, useMemo, useState } from "react";
import { experience, TimelineEntry } from "../data/experience";

type Ctx = {
  items: TimelineEntry[];
  selectedId: string;
  setSelectedId: (id: string) => void;
  selected?: TimelineEntry;
};

const TimelineContext = createContext<Ctx | undefined>(undefined);

export const TimelineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedId, setSelectedId] = useState<string>(experience[0].id);
  const selected = useMemo(
    () => experience.find((e) => e.id === selectedId),
    [selectedId]
  );

  const value: Ctx = { items: experience, selectedId, setSelectedId, selected };
  return <TimelineContext.Provider value={value}>{children}</TimelineContext.Provider>;
};

export const useTimeline = () => {
  const ctx = useContext(TimelineContext);
  if (!ctx) throw new Error("useTimeline must be used within TimelineProvider");
  return ctx;
};
