import React, { useEffect, useMemo, useState } from "react";
import SelfIntroduction from "../components/selfIntroduction/SelfIntroduction";
import ResumeHoverPanels from "../components/tabs/ResumeHoverPanels";
import SidebarTimeline, { TimelineItem } from "../components/resumeTimeline/SidebarTimeline";
import { supabase } from "../lib/supabaseClient";

type DbTimelineRow = {
  id: number;
  created_at: string;
  title: string;
  organization: string | null;
  startDate: string | null;
  endDate: string | null;
  summary: string | null;
  experience: string[] | null;
};

const formatRange = (start?: string | null, end?: string | null) => {
  const s = (start ?? "").trim();
  const e = (end ?? "").trim();
  if (!s && !e) return "";
  if (!s) return e;
  if (!e) return s;
  return `${s} – ${e}`;
};

const rowToItem = (r: DbTimelineRow): TimelineItem => ({
  id: String(r.id),
  title: r.title,
  org: r.organization ?? "",
  range: formatRange(r.startDate, r.endDate),
  summary: r.summary ?? undefined,
  bullets: (r.experience ?? undefined) as string[] | undefined,
  current: !r.endDate || /present/i.test(r.endDate),
});

const HomePage: React.FC = () => {
  const [items, setItems] = useState<TimelineItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("Timeline")
        .select("*")
        // if your dates are "MM/YYYY" strings, descending string order is fine
        .order("startDate", { ascending: false });

      if (error) {
        setError(error.message);
        return;
      }

      const mapped = (data as DbTimelineRow[]).map(rowToItem);

      mapped.sort((a, b) => Number(b.current) - Number(a.current));

      setItems(mapped);
    })();
  }, []);

  const body = useMemo(() => {
    if (error) {
      return <div className="px-8 py-6 text-red-600">Failed to load timeline: {error}</div>;
    }
    if (!items) {
      return (
        <div className="px-8 py-12">
          <div className="h-6 w-40 mb-3 animate-pulse rounded bg-gray-200" />
          <div className="h-24 w-full max-w-2xl animate-pulse rounded bg-gray-200" />
        </div>
      );
    }
    return <SidebarTimeline items={items} />;
  }, [items, error]);

  return (
    <div>
      <SelfIntroduction />
      <ResumeHoverPanels />
      {body}
    </div>
  );
};

export default HomePage;
