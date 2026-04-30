type FormulaInsightPanelProps = {
  title: string;
  formula: string;
  substitution: string;
  result: string;
  note: string;
};

export function FormulaInsightPanel({ title, formula, substitution, result, note }: FormulaInsightPanelProps) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
      <h4 className="text-base font-semibold text-cyan-200">{title}</h4>
      <p className="mt-2 text-sm text-white/80">Формула: {formula}</p>
      <p className="mt-1 text-sm text-white/70">Подстановка: {substitution}</p>
      <p className="mt-2 text-sm font-medium text-emerald-300">Результат: {result}</p>
      <p className="mt-2 text-xs text-white/65">{note}</p>
    </div>
  );
}
