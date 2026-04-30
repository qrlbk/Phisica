"use client";

import { PlanetInfo } from "@/data/planets";

type PlanetInfoModalProps = {
  planet: PlanetInfo | null;
  onClose: () => void;
};

export function PlanetInfoModal({ planet, onClose }: PlanetInfoModalProps) {
  if (!planet) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 px-4" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl border border-white/20 bg-slate-950/95 p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <h3 className="text-2xl font-semibold text-white">{planet.name}</h3>
        <p className="mt-3 text-sm text-white/80">{planet.fact}</p>
        <div className="mt-4 rounded-lg border border-white/15 bg-white/5 p-3 text-sm text-cyan-100">
          Радиус орбиты: {planet.orbitRadius} AU (условно) · Скорость: {planet.orbitSpeed.toFixed(2)}x
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-5 rounded-lg bg-cyan-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-cyan-400"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}
