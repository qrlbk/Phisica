"use client";

import { useEffect, useMemo, useState } from "react";
import { ParameterSlider } from "./ParameterSlider";
import { LabLayout } from "./LabLayout";
import { FormulaInsightPanel } from "./FormulaInsightPanel";
import { ScenarioComparePanel } from "./ScenarioComparePanel";

type OhmExperimentProps = {
  onMissionUpdate: (id: "currentNear2", done: boolean) => void;
};

export function OhmExperiment({ onMissionUpdate }: OhmExperimentProps) {
  const [voltage, setVoltage] = useState(6);
  const [resistance, setResistance] = useState(6);
  const [baseline, setBaseline] = useState<{ voltage: number; resistance: number; current: number; power: number } | null>(null);
  const current = useMemo(() => Number((voltage / resistance).toFixed(2)), [voltage, resistance]);
  const power = useMemo(() => Number((voltage * current).toFixed(2)), [voltage, current]);
  const brightness = Math.min(100, voltage * 10);

  useEffect(() => {
    onMissionUpdate("currentNear2", Math.abs(current - 2) <= 0.15);
  }, [current, onMissionUpdate]);

  return (
    <LabLayout
      title="Эксперимент: Закон Ома"
      description="Измени напряжение и сопротивление, чтобы увидеть как меняются ток и мощность."
      controls={
        <div className="space-y-4">
          <ParameterSlider label="Напряжение" value={voltage} min={1} max={12} onChange={setVoltage} unit=" В" />
          <ParameterSlider label="Сопротивление" value={resistance} min={2} max={12} onChange={setResistance} unit=" Ом" />
        </div>
      }
      visualization={
        <div className="rounded-xl border border-white/15 bg-slate-900/80 p-4">
          <p className="text-sm text-white/80">
            Ток: {current} А · Мощность: {power} Вт
          </p>
          <div className="mt-4 flex items-center gap-4">
            <div
              className="h-14 w-14 rounded-full border border-amber-200/60"
              style={{
                backgroundColor: `rgba(250, 204, 21, ${brightness / 100})`,
                boxShadow: `0 0 ${10 + brightness / 2}px rgba(250, 204, 21, ${brightness / 100})`
              }}
            />
            <span className="text-sm text-white/70">Яркость лампы: {Math.round(brightness)}%</span>
          </div>
        </div>
      }
      insights={
        <FormulaInsightPanel
          title="Инсайт по формулам"
          formula="I = U / R,  P = U * I"
          substitution={`I = ${voltage}/${resistance},  P = ${voltage} * ${current}`}
          result={`I = ${current} А, P = ${power} Вт`}
          note="При росте напряжения и фиксированном сопротивлении ток растет."
        />
      }
      compare={
        <ScenarioComparePanel
          title="Сравнение сценариев"
          onSaveBaseline={() => setBaseline({ voltage, resistance, current, power })}
          hasBaseline={Boolean(baseline)}
          metrics={[
            { label: "Напряжение", current: `${voltage} В`, baseline: `${baseline?.voltage ?? voltage} В` },
            { label: "Сопротивление", current: `${resistance} Ом`, baseline: `${baseline?.resistance ?? resistance} Ом` },
            { label: "Ток", current: `${current} А`, baseline: `${baseline?.current ?? current} А` },
            { label: "Мощность", current: `${power} Вт`, baseline: `${baseline?.power ?? power} Вт` }
          ]}
        />
      }
    />
  );
}
