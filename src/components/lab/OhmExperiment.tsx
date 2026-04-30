"use client";

import { useMemo, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ParameterSlider } from "./ParameterSlider";

export function OhmExperiment() {
  const [voltage, setVoltage] = useState(6);
  const resistance = 6;
  const current = useMemo(() => Number((voltage / resistance).toFixed(2)), [voltage]);
  const brightness = Math.min(100, voltage * 10);

  return (
    <GlassCard className="space-y-5">
      <h3 className="text-lg font-semibold text-white">Эксперимент: Закон Ома</h3>
      <p className="text-sm text-white/70">
        При постоянном сопротивлении увеличение напряжения повышает силу тока и яркость лампы.
      </p>
      <ParameterSlider label="Напряжение" value={voltage} min={1} max={12} onChange={setVoltage} unit=" В" />
      <div className="rounded-xl border border-white/15 bg-slate-900/80 p-4">
        <p className="text-sm text-white/80">Сила тока: {current} А</p>
        <div className="mt-4 flex items-center gap-4">
          <div
            className="h-14 w-14 rounded-full border border-amber-200/60"
            style={{
              backgroundColor: `rgba(250, 204, 21, ${brightness / 100})`,
              boxShadow: `0 0 ${10 + brightness / 2}px rgba(250, 204, 21, ${brightness / 100})`
            }}
          />
          <span className="text-sm text-white/70">Яркость: {Math.round(brightness)}%</span>
        </div>
      </div>
    </GlassCard>
  );
}
