"use client";

import { useEffect, useMemo, useState } from "react";
import { ParameterSlider } from "./ParameterSlider";
import { LabLayout } from "./LabLayout";
import { FormulaInsightPanel } from "./FormulaInsightPanel";
import { ScenarioComparePanel } from "./ScenarioComparePanel";
import { useI18n } from "@/lib/i18n/I18nProvider";

type NewtonExperimentProps = {
  onMissionUpdate: (id: "accelOver6", done: boolean) => void;
};

export function NewtonExperiment({ onMissionUpdate }: NewtonExperimentProps) {
  const { locale } = useI18n();
  const tx = (kk: string, ru: string, en: string) => (locale === "kk" ? kk : locale === "en" ? en : ru);
  const [force, setForce] = useState(20);
  const [mass, setMass] = useState(5);
  const [baseline, setBaseline] = useState<{ force: number; mass: number; acceleration: number } | null>(null);

  const acceleration = useMemo(() => Number((force / mass).toFixed(2)), [force, mass]);
  const distance = Math.min(95, acceleration * 9);
  useEffect(() => {
    onMissionUpdate("accelOver6", acceleration > 6);
  }, [acceleration, onMissionUpdate]);

  return (
    <LabLayout
      title={tx("Тәжірибе: F = ma", "Эксперимент: F = ma", "Experiment: F = ma")}
      description={tx(
        "Үдеу мен қозғалыс өзгерісін көру үшін күш пен массаны өзгерт.",
        "Измени силу и массу, чтобы увидеть как изменяется ускорение и скорость движения тела.",
        "Change force and mass to see how acceleration and motion speed change."
      )}
      controls={
        <div className="space-y-4">
          <ParameterSlider label={tx("Күш", "Сила", "Force")} value={force} min={5} max={50} onChange={setForce} unit=" Н" />
          <ParameterSlider label={tx("Масса", "Масса", "Mass")} value={mass} min={1} max={10} onChange={setMass} unit={tx(" кг", " кг", " kg")} />
        </div>
      }
      visualization={
        <div>
          <p className="text-sm text-white/80">{tx("Үдеу", "Ускорение", "Acceleration")}: {acceleration} м/с²</p>
          <p className="mt-1 text-xs text-white/60">{tx("Шартты қашықтық", "Условная дистанция", "Relative distance")}: {distance.toFixed(1)}</p>
          <div className="relative mt-4 h-14 rounded-lg border border-white/10 bg-black/20">
            <div
              className="absolute top-4 h-6 w-6 rounded bg-cyan-300 transition-transform duration-500"
              style={{ transform: `translateX(${distance}%)` }}
            />
          </div>
        </div>
      }
      insights={
        <FormulaInsightPanel
          title={tx("Формула түсіндірмесі", "Инсайт по формуле", "Formula insight")}
          formula="a = F / m"
          substitution={`a = ${force} / ${mass}`}
          result={`${acceleration} м/с²`}
          note={tx(
            "Күш бірдей болса, массаның азаюы үдеуді арттырады.",
            "При той же силе уменьшение массы ведет к росту ускорения.",
            "With the same force, lower mass leads to higher acceleration."
          )}
        />
      }
      compare={
        <ScenarioComparePanel
          title={tx("Сценарийлерді салыстыру", "Сравнение сценариев", "Scenario comparison")}
          onSaveBaseline={() => setBaseline({ force, mass, acceleration })}
          hasBaseline={Boolean(baseline)}
          metrics={[
            { label: tx("Күш", "Сила", "Force"), current: `${force} Н`, baseline: `${baseline?.force ?? force} Н` },
            { label: tx("Масса", "Масса", "Mass"), current: `${mass} кг`, baseline: `${baseline?.mass ?? mass} кг` },
            { label: tx("Үдеу", "Ускорение", "Acceleration"), current: `${acceleration} м/с²`, baseline: `${baseline?.acceleration ?? acceleration} м/с²` }
          ]}
        />
      }
    />
  );
}
