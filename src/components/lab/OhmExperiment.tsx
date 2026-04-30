"use client";

import { useEffect, useMemo, useState } from "react";
import { ParameterSlider } from "./ParameterSlider";
import { LabLayout } from "./LabLayout";
import { FormulaInsightPanel } from "./FormulaInsightPanel";
import { ScenarioComparePanel } from "./ScenarioComparePanel";
import { useI18n } from "@/lib/i18n/I18nProvider";

type OhmExperimentProps = {
  onMissionUpdate: (id: "currentNear2", done: boolean) => void;
};

export function OhmExperiment({ onMissionUpdate }: OhmExperimentProps) {
  const { locale } = useI18n();
  const tx = (kk: string, ru: string, en: string) => (locale === "kk" ? kk : locale === "en" ? en : ru);
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
      title={tx("Тәжірибе: Ом заңы", "Эксперимент: Закон Ома", "Experiment: Ohm's Law")}
      description={tx(
        "Ток пен қуат өзгерісін көру үшін кернеу мен кедергіні өзгерт.",
        "Измени напряжение и сопротивление, чтобы увидеть как меняются ток и мощность.",
        "Change voltage and resistance to observe current and power changes."
      )}
      controls={
        <div className="space-y-4">
          <ParameterSlider label={tx("Кернеу", "Напряжение", "Voltage")} value={voltage} min={1} max={12} onChange={setVoltage} unit={tx(" В", " В", " V")} />
          <ParameterSlider label={tx("Кедергі", "Сопротивление", "Resistance")} value={resistance} min={2} max={12} onChange={setResistance} unit={tx(" Ом", " Ом", " Ohm")} />
        </div>
      }
      visualization={
        <div className="rounded-xl border border-white/15 bg-slate-900/80 p-4">
          <p className="text-sm text-white/80">
            {tx("Ток", "Ток", "Current")}: {current} А · {tx("Қуат", "Мощность", "Power")}: {power} {tx("Вт", "Вт", "W")}
          </p>
          <div className="mt-4 flex items-center gap-4">
            <div
              className="h-14 w-14 rounded-full border border-amber-200/60"
              style={{
                backgroundColor: `rgba(250, 204, 21, ${brightness / 100})`,
                boxShadow: `0 0 ${10 + brightness / 2}px rgba(250, 204, 21, ${brightness / 100})`
              }}
            />
            <span className="text-sm text-white/70">{tx("Шам жарықтығы", "Яркость лампы", "Lamp brightness")}: {Math.round(brightness)}%</span>
          </div>
        </div>
      }
      insights={
        <FormulaInsightPanel
          title={tx("Формула түсіндірмесі", "Инсайт по формулам", "Formula insight")}
          formula="I = U / R,  P = U * I"
          substitution={`I = ${voltage}/${resistance},  P = ${voltage} * ${current}`}
          result={`I = ${current} А, P = ${power} ${tx("Вт", "Вт", "W")}`}
          note={tx(
            "Кедергі тұрақты болса, кернеу өскен сайын ток күшейеді.",
            "При росте напряжения и фиксированном сопротивлении ток растет.",
            "With fixed resistance, higher voltage increases current."
          )}
        />
      }
      compare={
        <ScenarioComparePanel
          title={tx("Сценарийлерді салыстыру", "Сравнение сценариев", "Scenario comparison")}
          onSaveBaseline={() => setBaseline({ voltage, resistance, current, power })}
          hasBaseline={Boolean(baseline)}
          metrics={[
            { label: tx("Кернеу", "Напряжение", "Voltage"), current: `${voltage} В`, baseline: `${baseline?.voltage ?? voltage} В` },
            { label: tx("Кедергі", "Сопротивление", "Resistance"), current: `${resistance} Ом`, baseline: `${baseline?.resistance ?? resistance} Ом` },
            { label: tx("Ток", "Ток", "Current"), current: `${current} А`, baseline: `${baseline?.current ?? current} А` },
            { label: tx("Қуат", "Мощность", "Power"), current: `${power} Вт`, baseline: `${baseline?.power ?? power} Вт` }
          ]}
        />
      }
    />
  );
}
