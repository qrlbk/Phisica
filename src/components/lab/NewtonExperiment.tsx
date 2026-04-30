"use client";

import { useMemo, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ParameterSlider } from "./ParameterSlider";

export function NewtonExperiment() {
  const [force, setForce] = useState(20);
  const [mass, setMass] = useState(5);

  const acceleration = useMemo(() => Number((force / mass).toFixed(2)), [force, mass]);
  const distance = Math.min(100, acceleration * 9);

  return (
    <GlassCard className="space-y-5">
      <h3 className="text-lg font-semibold text-white">Эксперимент: F = ma</h3>
      <p className="text-sm text-white/70">
        Увеличь силу или уменьши массу, чтобы увидеть как тело ускоряется быстрее.
      </p>
      <ParameterSlider label="Сила" value={force} min={5} max={50} onChange={setForce} unit=" Н" />
      <ParameterSlider label="Масса" value={mass} min={1} max={10} onChange={setMass} unit=" кг" />
      <div className="rounded-xl border border-white/15 bg-slate-900/80 p-4">
        <p className="text-sm text-white/80">Ускорение: {acceleration} м/с²</p>
        <div className="relative mt-4 h-12 rounded-lg bg-white/5">
          <div className="absolute left-2 top-3 h-6 w-6 rounded bg-cyan-300" style={{ transform: `translateX(${distance}%)` }} />
        </div>
      </div>
    </GlassCard>
  );
}
