import { useTimeline } from "../../context/TimelineContext";

export default function SidebarTimeline() {
  const { items, selectedId, setSelectedId } = useTimeline();

  return (
    <div className="sticky top-20 space-y-1 rounded-lg bg-gray-50 p-2">
      {items.map((it) => {
        const active = it.id === selectedId;
        return (
          <button
            key={it.id}
            onClick={() => setSelectedId(it.id)}
            className={`w-full text-left rounded-md px-3 py-2 text-sm
              ${active ? "bg-gray-200 font-medium" : "hover:bg-gray-100"}`}
          >
            {it.title.length > 26 ? it.title.slice(0, 26) + "…" : it.title}
          </button>
        );
      })}
    </div>
  );
}
