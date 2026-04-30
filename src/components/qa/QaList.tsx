import { GlassCard } from "@/components/ui/GlassCard";
import { QaItem } from "@/data/qa";

type QaListProps = {
  items: QaItem[];
};

export function QaList({ items }: QaListProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <GlassCard key={item.id}>
          <div className="mb-2 text-xs uppercase tracking-wide text-cyan-200">{item.category}</div>
          <h3 className="text-lg font-semibold text-white">{item.question}</h3>
          <p className="mt-2 text-sm text-white/80">{item.answer}</p>
          <p className="mt-2 text-xs text-white/60">{item.hint}</p>
        </GlassCard>
      ))}
    </div>
  );
}
