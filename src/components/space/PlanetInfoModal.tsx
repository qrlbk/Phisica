"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PlanetInfo } from "@/data/planets";

type PlanetInfoModalProps = {
  planet: PlanetInfo | null;
  onClose: () => void;
};

export function PlanetInfoModal({ planet, onClose }: PlanetInfoModalProps) {
  return (
    <AnimatePresence>
      {planet ? (
        <motion.div
          className="fixed inset-0 z-[200] flex items-end justify-center bg-black/50 px-3 pb-4 pt-16 md:items-center md:px-4"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-md rounded-2xl border border-white/20 bg-slate-950/95 p-5 md:p-6"
            onClick={(event) => event.stopPropagation()}
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 16, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-white">{planet.name}</h3>
            <p className="mt-2 text-xs uppercase tracking-wide text-cyan-200">Период: {planet.orbitPeriod}</p>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              {planet.facts.map((fact) => (
                <li key={fact}>- {fact}</li>
              ))}
            </ul>
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
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
