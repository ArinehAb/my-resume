import { useTimeline } from "../../context/TimelineContext";

export default function DetailsPanel() {
  const { selected } = useTimeline();
  if (!selected) return null;

  return (
    <section aria-labelledby="detail-heading" className="pb-4">
      <h2 id="detail-heading" className="text-3xl font-bold">
        {selected.title}
      </h2>
      {selected.subtitle && (
        <p className="text-gray-600">{selected.subtitle}</p>
      )}
      <p className="mt-2 text-sm uppercase tracking-wide text-gray-500">{selected.period}</p>
      <p className="mt-4 text-gray-800">{selected.summary}</p>
      {selected.bullets && (
        <ul className="mt-3 list-disc pl-5 text-gray-800">
          {selected.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      )}
      <hr className="my-6" />
    </section>
  );
}
