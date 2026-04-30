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
  const score = spaceMissions.reduce((sum, mission) => sum + (answers[mission.id] === mission.answerPlanetId ? 10 : 0), 0);

  return (
    <section className="rounded-2xl border border-white/15 bg-white/5 p-4">
      <h3 className="text-lg font-semibold text-white">{t("space.missions.title")}</h3>
      <p className="mt-1 text-sm text-cyan-200">
        {t("space.missions.progress")}: {solvedCount}/{spaceMissions.length} · {locale === "kk" ? "Ұпай" : locale === "en" ? "Points" : "Очки"}: {score}
      </p>
      <div className="mt-3 space-y-3">
        {spaceMissions.map((mission) => {
          const selected = answers[mission.id] ?? "";
          const isCorrect = selected === mission.answerPlanetId;
          const isWrong = Boolean(selected) && !isCorrect;
          return (
            <div key={mission.id} className="rounded-lg border border-white/15 bg-black/20 p-3">
              <p className="text-sm text-white">{mission.question}</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {planets.map((planet) => {
                  const isSelected = selected === planet.id;
                  const isRightOption = mission.answerPlanetId === planet.id;
                  const className = isCorrect && isRightOption
                    ? "border-emerald-300/70 bg-emerald-500/20 text-emerald-100 animate-pulse"
                    : isWrong && isSelected
                      ? "border-rose-300/70 bg-rose-500/20 text-rose-100"
                      : "border-white/20 bg-slate-950 text-white/85 hover:bg-slate-900";
                  return (
                    <button
                      key={`${mission.id}-${planet.id}`}
                      type="button"
                      onClick={() => onAnswer(mission.id, planet.id)}
                      className={`rounded-lg border px-3 py-2 text-left text-xs transition ${className}`}
                    >
                      {planet.name}
                    </button>
                  );
                })}
              </div>
              {selected ? (
                <p className={`mt-2 text-xs ${isCorrect ? "text-emerald-300" : "text-amber-200"}`}>
                  {isCorrect
                    ? `${t("space.missions.correct")} +10`
                    : `${t("space.missions.wrongPrefix")} ${mission.hint}`}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
