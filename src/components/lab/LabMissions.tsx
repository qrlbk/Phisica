"use client";

import { getLabMissions, LabMissionId } from "@/data/labMissions";
import { useI18n } from "@/lib/i18n/I18nProvider";

type LabMissionsProps = {
  completed: Record<LabMissionId, boolean>;
};

export function LabMissions({ completed }: LabMissionsProps) {
  const { locale, t } = useI18n();
  const labMissions = getLabMissions(locale);
  const score = labMissions.reduce((sum, mission) => sum + (completed[mission.id] ? mission.points : 0), 0);
  const done = labMissions.filter((mission) => completed[mission.id]).length;

  return (
    <section className="rounded-2xl border border-white/15 bg-white/5 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{t("lab.missions.title")}</h3>
        <p className="text-sm text-cyan-200">
          {t("lab.missions.points")}: {score} · {done}/{labMissions.length}
        </p>
      </div>
      <div className="mt-3 space-y-2">
        {labMissions.map((mission) => (
          <div key={mission.id} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/80">
            <span className={completed[mission.id] ? "text-emerald-300" : "text-white/90"}>
              {completed[mission.id] ? `${t("lab.missions.completed")}: ` : `${t("lab.missions.goal")}: `}
            </span>
            {mission.label}
          </div>
        ))}
      </div>
    </section>
  );
}
