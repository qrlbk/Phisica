"use client";

import { useEffect, useMemo, useState } from "react";
import { ParameterSlider } from "./ParameterSlider";
import { LabLayout } from "./LabLayout";
import { FormulaInsightPanel } from "./FormulaInsightPanel";
import { ScenarioComparePanel } from "./ScenarioComparePanel";
import { calcKineticEnergy, calcPotentialEnergy } from "@/lib/lab/energy";
import { useI18n } from "@/lib/i18n/I18nProvider";

type EnergyExperimentProps = {
  onMissionUpdate: (id: "energyBalance", done: boolean) => void;
};

export function EnergyExperiment({ onMissionUpdate }: EnergyExperimentProps) {
  const { locale } = useI18n();
  const tx = (kk: string, ru: string, en: string) => (locale === "kk" ? kk : locale === "en" ? en : ru);
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
      title={tx("Тәжірибе: Энергия", "Эксперимент: Энергия", "Experiment: Energy")}
      description={tx(
        "Масса, биіктік және жылдамдық өзгергенде потенциал және кинетикалық энергияны салыстыр.",
        "Сравни потенциальную и кинетическую энергию при изменении массы, высоты и скорости.",
        "Compare potential and kinetic energy as mass, height, and speed change."
      )}
      controls={
        <div className="space-y-4">
          <ParameterSlider label={tx("Масса", "Масса", "Mass")} value={mass} min={1} max={10} onChange={setMass} unit={tx(" кг", " кг", " kg")} />
          <ParameterSlider label={tx("Биіктік", "Высота", "Height")} value={height} min={1} max={10} onChange={setHeight} unit={tx(" м", " м", " m")} />
          <ParameterSlider label={tx("Жылдамдық", "Скорость", "Speed")} value={speed} min={1} max={14} onChange={setSpeed} unit={tx(" м/с", " м/с", " m/s")} />
        </div>
      }
      visualization={
        <div className="space-y-3">
          <p className="text-sm text-white/80">
            Ep: {ep} Дж · Ek: {ek} Дж
          </p>
          <div className="rounded-lg border border-white/15 bg-black/20 p-3">
            <p className="mb-2 text-xs text-white/60">{tx("Энергия шкалалары", "Шкалы энергий", "Energy bars")}</p>
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
          title={tx("Формула түсіндірмесі", "Инсайт по формулам", "Formula insight")}
          formula="Ep = mgh,  Ek = m*v²/2"
          substitution={`Ep = ${mass}*9.8*${height},  Ek = ${mass}*${speed}²/2`}
          result={`Ep = ${ep} Дж, Ek = ${ek} Дж`}
          note={tx(
            "Ep және Ek жақындаған сайын жүйе энергиясы біркелкі бөлінеді.",
            "Когда Ep и Ek близки, энергия системы распределена более равномерно.",
            "When Ep and Ek are close, system energy is distributed more evenly."
          )}
        />
      }
      compare={
        <ScenarioComparePanel
          title={tx("Сценарийлерді салыстыру", "Сравнение сценариев", "Scenario comparison")}
          onSaveBaseline={() => setBaseline({ ep, ek })}
          hasBaseline={Boolean(baseline)}
          metrics={[
            { label: tx("Потенциал", "Потенциальная", "Potential"), current: `${ep} Дж`, baseline: `${baseline?.ep ?? ep} Дж` },
            { label: tx("Кинетика", "Кинетическая", "Kinetic"), current: `${ek} Дж`, baseline: `${baseline?.ek ?? ek} Дж` }
          ]}
        />
      }
    />
  );
}
