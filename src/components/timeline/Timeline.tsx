import { useTimeline } from "../../context/TimelineContext";
import TimelineItem from "./TimelineItem";

export default function Timeline() {
  const { items } = useTimeline();
  return (
    <section className="py-2">
      {items.map((i) => <TimelineItem key={i.id} item={i} />)}
    </section>
  );
}
