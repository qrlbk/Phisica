"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";

type ScenarioComparePanelProps = {
  title: string;
  metrics: Array<{ label: string; current: string; baseline: string }>;
  onSaveBaseline: () => void;
  hasBaseline: boolean;
};

export function ScenarioComparePanel({ title, metrics, onSaveBaseline, hasBaseline }: ScenarioComparePanelProps) {
  const { t } = useI18n();

  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-base font-semibold text-cyan-200">{title}</h4>
        <button
          type="button"
          onClick={onSaveBaseline}
          className="rounded-lg border border-white/20 bg-white/5 px-3 py-1 text-xs text-white/85"
        >
          {hasBaseline ? t("lab.compare.update") : t("lab.compare.save")}
        </button>
      </div>
      <div className="space-y-2 text-sm">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-white/80">
            <span className="text-white">{metric.label}:</span> {t("lab.compare.current")} {metric.current} · {t("lab.compare.baseline")}{" "}
            {metric.baseline}
          </div>
        ))}
      </div>
    </div>
  );
}
