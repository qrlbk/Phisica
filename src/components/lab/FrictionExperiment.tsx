"use client";

import { useEffect, useMemo, useState } from "react";
import { ParameterSlider } from "./ParameterSlider";
import { LabLayout } from "./LabLayout";
import { FormulaInsightPanel } from "./FormulaInsightPanel";
import { ScenarioComparePanel } from "./ScenarioComparePanel";
import { calcFrictionForce, calcNormalForce, canObjectMove } from "@/lib/lab/friction";
import { useI18n } from "@/lib/i18n/I18nProvider";

type FrictionExperimentProps = {
  onMissionUpdate: (id: "overcomeFriction", done: boolean) => void;
};

export function FrictionExperiment({ onMissionUpdate }: FrictionExperimentProps) {
  const { locale } = useI18n();
  const tx = (kk: string, ru: string, en: string) => (locale === "kk" ? kk : locale === "en" ? en : ru);
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
      title={tx("Тәжірибе: Үйкеліс", "Эксперимент: Трение", "Experiment: Friction")}
      description={tx(
        "Қолданылған күш үйкелісті қай сәтте жеңетінін тексер.",
        "Проверь, когда приложенной силы достаточно, чтобы преодолеть трение.",
        "Check when applied force is enough to overcome friction."
      )}
      controls={
        <div className="space-y-4">
          <ParameterSlider label={tx("Үйкеліс коэфф. (μ)", "Коэфф. трения (μ)", "Friction coeff. (μ)")} value={mu} min={0.1} max={1} step={0.05} onChange={setMu} />
          <ParameterSlider label={tx("Масса", "Масса", "Mass")} value={mass} min={1} max={10} onChange={setMass} unit={tx(" кг", " кг", " kg")} />
          <ParameterSlider label={tx("Қолданылған күш", "Приложенная сила", "Applied force")} value={appliedForce} min={1} max={80} onChange={setAppliedForce} unit={tx(" Н", " Н", " N")} />
        </div>
      }
      visualization={
        <div className="space-y-3">
          <p className="text-sm text-white/80">
            {tx("Үйкеліс күші", "Fтр", "Ffr")}: {frictionForce} Н · N: {normalForce} Н
          </p>
          <div className="relative h-14 rounded-lg border border-white/15 bg-black/20">
            <div
              className={`absolute top-4 h-6 w-10 rounded transition-transform duration-500 ${moves ? "bg-emerald-300" : "bg-rose-300"}`}
              style={{ transform: `translateX(${moves ? "180%" : "20%"})` }}
            />
          </div>
          <p className={`text-sm ${moves ? "text-emerald-300" : "text-rose-300"}`}>
            {moves
              ? tx("Дене қозғалады: күш үйкелістен үлкен.", "Тело движется: сила больше трения.", "The object moves: force is greater than friction.")
              : tx(
                  "Дене қозғалмайды: үйкеліс қозғалысты тежейді.",
                  "Тело не движется: трение сдерживает движение.",
                  "The object does not move: friction prevents motion."
                )}
          </p>
        </div>
      }
      insights={
        <FormulaInsightPanel
          title={tx("Формула түсіндірмесі", "Инсайт по формулам", "Formula insight")}
          formula="Fтр = μN,  N = mg"
          substitution={`Fтр = ${mu} * ${normalForce}`}
          result={`${tx("Fтр", "Fтр", "Ffr")} = ${frictionForce} Н`}
          note={tx(
            "Қолданылған күш Fтр-ден асса, объект қозғала бастайды.",
            "Если приложенная сила превышает Fтр, объект начинает движение.",
            "If applied force exceeds friction force, the object starts moving."
          )}
        />
      }
      compare={
        <ScenarioComparePanel
          title={tx("Сценарийлерді салыстыру", "Сравнение сценариев", "Scenario comparison")}
          onSaveBaseline={() => setBaseline({ friction: frictionForce, move: moves })}
          hasBaseline={Boolean(baseline)}
          metrics={[
            { label: tx("Үйкеліс күші", "Сила трения", "Friction force"), current: `${frictionForce} Н`, baseline: `${baseline?.friction ?? frictionForce} Н` },
            {
              label: tx("Күй", "Состояние", "State"),
              current: moves ? tx("қозғалады", "движется", "moving") : tx("тыныш", "покой", "rest"),
              baseline: baseline
                ? baseline.move
                  ? tx("қозғалады", "движется", "moving")
                  : tx("тыныш", "покой", "rest")
                : moves
                  ? tx("қозғалады", "движется", "moving")
                  : tx("тыныш", "покой", "rest")
            }
          ]}
        />
      }
    />
  );
}
