"use client";

import { getPlanets } from "@/data/planets";
import { getSpaceMissions } from "@/data/spaceMissions";
import { useI18n } from "@/lib/i18n/I18nProvider";

type SpaceMissionsProps = {
  answers: Record<string, string>;
  onAnswer: (missionId: string, planetId: string) => void;
};

export function SpaceMissions({ answers, onAnswer }: SpaceMissionsProps) {
  const { locale, t } = useI18n();
  const planets = getPlanets(locale);
  const spaceMissions = getSpaceMissions(locale);
  const solvedCount = spaceMissions.filter((mission) => answers[mission.id] === mission.answerPlanetId).length;

  return (
    <section className="rounded-2xl border border-white/15 bg-white/5 p-4">
      <h3 className="text-lg font-semibold text-white">{t("space.missions.title")}</h3>
      <p className="mt-1 text-sm text-cyan-200">
        {t("space.missions.progress")}: {solvedCount}/{spaceMissions.length}
      </p>
      <div className="mt-3 space-y-3">
        {spaceMissions.map((mission) => {
          const selected = answers[mission.id] ?? "";
          const isCorrect = selected === mission.answerPlanetId;
          return (
            <div key={mission.id} className="rounded-lg border border-white/15 bg-black/20 p-3">
              <p className="text-sm text-white">{mission.question}</p>
              <select
                value={selected}
                onChange={(event) => onAnswer(mission.id, event.target.value)}
                className="mt-2 w-full rounded-lg border border-white/20 bg-slate-950 px-3 py-2 text-sm text-white"
              >
                <option value="">{t("space.missions.selectPlanet")}</option>
                {planets.map((planet) => (
                  <option key={`${mission.id}-${planet.id}`} value={planet.id}>
                    {planet.name}
                  </option>
                ))}
              </select>
              {selected ? (
                <p className={`mt-2 text-xs ${isCorrect ? "text-emerald-300" : "text-amber-200"}`}>
                  {isCorrect ? t("space.missions.correct") : `${t("space.missions.wrongPrefix")} ${mission.hint}`}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
