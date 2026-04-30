"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";

type FormulaInsightPanelProps = {
  title: string;
  formula: string;
  substitution: string;
  result: string;
  note: string;
};

export function FormulaInsightPanel({ title, formula, substitution, result, note }: FormulaInsightPanelProps) {
  const { t } = useI18n();

  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
      <h4 className="text-base font-semibold text-cyan-200">{title}</h4>
      <p className="mt-2 text-sm text-white/80">
        {t("lab.formula.formula")}: {formula}
      </p>
      <p className="mt-1 text-sm text-white/70">
        {t("lab.formula.substitution")}: {substitution}
      </p>
      <p className="mt-2 text-sm font-medium text-emerald-300">
        {t("lab.formula.result")}: {result}
      </p>
      <p className="mt-2 text-xs text-white/65">{note}</p>
    </div>
  );
}
