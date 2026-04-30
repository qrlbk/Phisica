"use client";

import { useEffect, useMemo, useState } from "react";
import { ParameterSlider } from "./ParameterSlider";
import { LabLayout } from "./LabLayout";
import { FormulaInsightPanel } from "./FormulaInsightPanel";
import { ScenarioComparePanel } from "./ScenarioComparePanel";
import { calcFrictionForce, calcNormalForce, canObjectMove } from "@/lib/lab/friction";

type FrictionExperimentProps = {
  onMissionUpdate: (id: "overcomeFriction", done: boolean) => void;
};

export function FrictionExperiment({ onMissionUpdate }: FrictionExperimentProps) {
  const [mu, setMu] = useState(0.4);
  const [mass, setMass] = useState(5);
  const [appliedForce, setAppliedForce] = useState(20);
  const [baseline, setBaseline] = useState<{ friction: number; move: boolean } | null>(null);

  const normalForce = useMemo(() => Number(calcNormalForce(mass).toFixed(2)), [mass]);
  const frictionForce = useMemo(() => Number(calcFrictionForce(mu, normalForce).toFixed(2)), [mu, normalForce]);
  const moves = useMemo(() => canObjectMove(appliedForce, frictionForce), [appliedForce, frictionForce]);

  useEffect(() => {
    onMissionUpdate("overcomeFriction", moves);
  }, [moves, onMissionUpdate]);

  return (
    <LabLayout
      title="Эксперимент: Трение"
      description="Проверь, когда приложенной силы достаточно, чтобы преодолеть трение."
      controls={
        <div className="space-y-4">
          <ParameterSlider label="Коэфф. трения (μ)" value={mu} min={0.1} max={1} step={0.05} onChange={setMu} />
          <ParameterSlider label="Масса" value={mass} min={1} max={10} onChange={setMass} unit=" кг" />
          <ParameterSlider label="Приложенная сила" value={appliedForce} min={1} max={80} onChange={setAppliedForce} unit=" Н" />
        </div>
      }
      visualization={
        <div className="space-y-3">
          <p className="text-sm text-white/80">
            Fтр: {frictionForce} Н · N: {normalForce} Н
          </p>
          <div className="relative h-14 rounded-lg border border-white/15 bg-black/20">
            <div
              className={`absolute top-4 h-6 w-10 rounded transition-transform duration-500 ${moves ? "bg-emerald-300" : "bg-rose-300"}`}
              style={{ transform: `translateX(${moves ? "180%" : "20%"})` }}
            />
          </div>
          <p className={`text-sm ${moves ? "text-emerald-300" : "text-rose-300"}`}>
            {moves ? "Тело движется: сила больше трения." : "Тело не движется: трение сдерживает движение."}
          </p>
        </div>
      }
      insights={
        <FormulaInsightPanel
          title="Инсайт по формулам"
          formula="Fтр = μN,  N = mg"
          substitution={`Fтр = ${mu} * ${normalForce}`}
          result={`Fтр = ${frictionForce} Н`}
          note="Если приложенная сила превышает Fтр, объект начинает движение."
        />
      }
      compare={
        <ScenarioComparePanel
          title="Сравнение сценариев"
          onSaveBaseline={() => setBaseline({ friction: frictionForce, move: moves })}
          hasBaseline={Boolean(baseline)}
          metrics={[
            { label: "Сила трения", current: `${frictionForce} Н`, baseline: `${baseline?.friction ?? frictionForce} Н` },
            { label: "Состояние", current: moves ? "движется" : "покой", baseline: baseline ? (baseline.move ? "движется" : "покой") : moves ? "движется" : "покой" }
          ]}
        />
      }
    />
  );
}
