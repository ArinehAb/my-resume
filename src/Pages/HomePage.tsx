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

const isEducation = (item: TimelineItem) => {
  const t = item.title.toLowerCase();
  const o = item.org.toLowerCase();
  return (
    t.includes("b.s.") ||
    t.includes("bachelors") ||
    t.includes("bachelor") ||
    t.includes("m.s.") ||
    t.includes("masters") ||
    t.includes("master") ||
    t.includes("degree") ||
    t.includes("diploma") ||
    o.includes("university") ||
    o.includes("college") ||
    o.includes("school")
  );
};

const HomePage: React.FC = () => {
  const [items, setItems] = useState<TimelineItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from("Timeline")
          .select("*")
          .order("startDate", { ascending: false });

        if (error) {
          setError(error.message);
          return;
        }

        const mapped = (data as DbTimelineRow[]).map(rowToItem);

        const current = mapped.filter((i) => i.current && !isEducation(i));
        const jobs = mapped.filter((i) => !i.current && !isEducation(i));
        const edu = mapped.filter((i) => isEducation(i));

        const ordered = [...current, ...jobs, ...edu];

        setItems(ordered);
      } catch (e: any) {
        setError(e?.message ?? "Unknown error");
      }
    })();
  }, []);

  const body = useMemo(() => {
    if (error) {
      return (
        <div className="px-8 py-6 text-red-700 bg-red-50 border border-red-200 rounded">
          <div className="font-semibold mb-1">Timeline failed to load</div>
          <pre className="text-sm whitespace-pre-wrap">{String(error)}</pre>
          <div className="mt-2 text-xs text-red-600">
            Tip: Check your .env values and RLS policy.
          </div>
        </div>
      );
    }
    if (!items) {
      return (
        <div className="px-8 py-12">
          <div className="h-6 w-40 mb-3 animate-pulse rounded bg-gray-200" />
          <div className="h-24 w-full max-w-2xl animate-pulse rounded bg-gray-200" />
        </div>
      );
    }
    if (items.length === 0) {
      return (
        <div className="px-8 py-6 text-gray-700 bg-gray-50 border border-gray-200 rounded">
          No timeline rows found. Add rows in Supabase table <code>public."Timeline"</code>.
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
