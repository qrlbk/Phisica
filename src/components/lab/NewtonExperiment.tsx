"use client";

import { useEffect, useMemo, useState } from "react";
import { ParameterSlider } from "./ParameterSlider";
import { LabLayout } from "./LabLayout";
import { FormulaInsightPanel } from "./FormulaInsightPanel";
import { ScenarioComparePanel } from "./ScenarioComparePanel";

type NewtonExperimentProps = {
  onMissionUpdate: (id: "accelOver6", done: boolean) => void;
};

export function NewtonExperiment({ onMissionUpdate }: NewtonExperimentProps) {
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
      title="Эксперимент: F = ma"
      description="Измени силу и массу, чтобы увидеть как изменяется ускорение и скорость движения тела."
      controls={
        <div className="space-y-4">
          <ParameterSlider label="Сила" value={force} min={5} max={50} onChange={setForce} unit=" Н" />
          <ParameterSlider label="Масса" value={mass} min={1} max={10} onChange={setMass} unit=" кг" />
        </div>
      }
      visualization={
        <div>
          <p className="text-sm text-white/80">Ускорение: {acceleration} м/с²</p>
          <p className="mt-1 text-xs text-white/60">Условная дистанция: {distance.toFixed(1)} ед.</p>
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
          title="Инсайт по формуле"
          formula="a = F / m"
          substitution={`a = ${force} / ${mass}`}
          result={`${acceleration} м/с²`}
          note="При той же силе уменьшение массы ведет к росту ускорения."
        />
      }
      compare={
        <ScenarioComparePanel
          title="Сравнение сценариев"
          onSaveBaseline={() => setBaseline({ force, mass, acceleration })}
          hasBaseline={Boolean(baseline)}
          metrics={[
            { label: "Сила", current: `${force} Н`, baseline: `${baseline?.force ?? force} Н` },
            { label: "Масса", current: `${mass} кг`, baseline: `${baseline?.mass ?? mass} кг` },
            { label: "Ускорение", current: `${acceleration} м/с²`, baseline: `${baseline?.acceleration ?? acceleration} м/с²` }
          ]}
        />
      }
    />
  );
}
