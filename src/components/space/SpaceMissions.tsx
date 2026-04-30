"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SpaceMission } from "@/data/spaceMissions";
import { useI18n } from "@/lib/i18n/I18nProvider";

type SpaceMissionsProps = {
  missions: SpaceMission[];
  activeMissionIndex: number;
  solvedMissionIds: string[];
  score: number;
  streak: number;
  feedback: { type: "success" | "error" | null; message: string };
};

export function SpaceMissions({ missions, activeMissionIndex, solvedMissionIds, score, streak, feedback }: SpaceMissionsProps) {
  const { t } = useI18n();
  const solvedCount = solvedMissionIds.length;
  const activeMission = missions[activeMissionIndex] ?? null;

  return (
    <section className="rounded-2xl border border-white/15 bg-white/5 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{t("space.missions.title")}</h3>
        <p className="text-sm text-cyan-200">
          {t("space.missions.progress")}: {solvedCount}/{missions.length}
        </p>
      </div>
      <p className="mt-1 text-xs text-white/70">
        {t("space.missions.points")}: {score} · {t("space.missions.streak")}: {streak}
      </p>
      <div className="mt-3 space-y-3">
        {missions.map((mission, index) => {
          const isSolved = solvedMissionIds.includes(mission.id);
          const isActive = index === activeMissionIndex;
          return (
            <div
              key={mission.id}
              className={`rounded-lg border p-3 ${
                isSolved
                  ? "border-emerald-300/40 bg-emerald-500/10"
                  : isActive
                    ? "border-cyan-300/40 bg-cyan-500/10"
                    : "border-white/15 bg-black/20"
              }`}
            >
              <p className="text-sm text-white">
                {isSolved ? "✅ " : isActive ? "🎯 " : "• "}
                {mission.question}
              </p>
              {isActive ? <p className="mt-2 text-xs text-cyan-100">{t("space.missions.clickPlanetCta")}</p> : null}
            </div>
          );
        })}
      </div>
      {activeMission ? (
        <div className="mt-3 rounded-lg border border-white/15 bg-black/20 p-3 text-xs text-white/70">
          {t("space.missions.currentHint")}: {activeMission.hint}
        </div>
      ) : null}

      <AnimatePresence mode="wait">
        {feedback.type ? (
          <motion.div
            key={`${feedback.type}-${feedback.message}`}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            className={`mt-3 rounded-lg border p-3 text-sm ${
              feedback.type === "success"
                ? "border-emerald-300/40 bg-emerald-500/15 text-emerald-100"
                : "border-amber-300/40 bg-amber-500/15 text-amber-100"
            }`}
          >
            {feedback.message}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
