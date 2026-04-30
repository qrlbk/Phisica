"use client";

import { useEffect, useMemo, useState } from "react";
import { ParameterSlider } from "./ParameterSlider";
import { LabLayout } from "./LabLayout";
import { FormulaInsightPanel } from "./FormulaInsightPanel";
import { ScenarioComparePanel } from "./ScenarioComparePanel";
import { calcKineticEnergy, calcPotentialEnergy } from "@/lib/lab/energy";

type EnergyExperimentProps = {
  onMissionUpdate: (id: "energyBalance", done: boolean) => void;
};

export function EnergyExperiment({ onMissionUpdate }: EnergyExperimentProps) {
  const [mass, setMass] = useState(2);
  const [height, setHeight] = useState(4);
  const [speed, setSpeed] = useState(6);
  const [baseline, setBaseline] = useState<{ ep: number; ek: number } | null>(null);

  const ep = useMemo(() => Number(calcPotentialEnergy(mass, height).toFixed(1)), [mass, height]);
  const ek = useMemo(() => Number(calcKineticEnergy(mass, speed).toFixed(1)), [mass, speed]);
  const maxBar = Math.max(ep, ek, 1);

  useEffect(() => {
    onMissionUpdate("energyBalance", Math.abs(ep - ek) <= 8);
  }, [ep, ek, onMissionUpdate]);

  return (
    <LabLayout
      title="Эксперимент: Энергия"
      description="Сравни потенциальную и кинетическую энергию при изменении массы, высоты и скорости."
      controls={
        <div className="space-y-4">
          <ParameterSlider label="Масса" value={mass} min={1} max={10} onChange={setMass} unit=" кг" />
          <ParameterSlider label="Высота" value={height} min={1} max={10} onChange={setHeight} unit=" м" />
          <ParameterSlider label="Скорость" value={speed} min={1} max={14} onChange={setSpeed} unit=" м/с" />
        </div>
      }
      visualization={
        <div className="space-y-3">
          <p className="text-sm text-white/80">
            Ep: {ep} Дж · Ek: {ek} Дж
          </p>
          <div className="rounded-lg border border-white/15 bg-black/20 p-3">
            <p className="mb-2 text-xs text-white/60">Шкалы энергий</p>
            <div className="mb-2 h-3 rounded bg-cyan-900/40">
              <div className="h-3 rounded bg-cyan-300" style={{ width: `${(ep / maxBar) * 100}%` }} />
            </div>
            <div className="h-3 rounded bg-emerald-900/40">
              <div className="h-3 rounded bg-emerald-300" style={{ width: `${(ek / maxBar) * 100}%` }} />
            </div>
          </div>
        </div>
      }
      insights={
        <FormulaInsightPanel
          title="Инсайт по формулам"
          formula="Ep = mgh,  Ek = m*v²/2"
          substitution={`Ep = ${mass}*9.8*${height},  Ek = ${mass}*${speed}²/2`}
          result={`Ep = ${ep} Дж, Ek = ${ek} Дж`}
          note="Когда Ep и Ek близки, энергия системы распределена более равномерно."
        />
      }
      compare={
        <ScenarioComparePanel
          title="Сравнение сценариев"
          onSaveBaseline={() => setBaseline({ ep, ek })}
          hasBaseline={Boolean(baseline)}
          metrics={[
            { label: "Потенциальная", current: `${ep} Дж`, baseline: `${baseline?.ep ?? ep} Дж` },
            { label: "Кинетическая", current: `${ek} Дж`, baseline: `${baseline?.ek ?? ek} Дж` }
          ]}
        />
      }
    />
  );
}
