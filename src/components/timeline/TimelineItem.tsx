import { TimelineEntry } from "../../data/experience";

export default function TimelineItem({ item }: { item: TimelineEntry }) {
  return (
    <article className="py-4">
      <h3 className="text-2xl font-semibold">{item.title}</h3>
      {item.subtitle && <p className="text-sm text-gray-600">{item.subtitle}</p>}
      <p className="mt-1 text-xs uppercase tracking-wide text-gray-500">{item.period}</p>
      <p className="mt-3 text-gray-700">{item.summary}</p>
      {item.bullets && (
        <ul className="mt-3 list-disc pl-5 text-gray-700">
          {item.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      )}
      <hr className="mt-6" />
    </article>
  );
}
