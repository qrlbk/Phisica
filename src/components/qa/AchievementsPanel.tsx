"use client";

import { ACHIEVEMENT_IDS, type AchievementId } from "@/lib/quiz/questAchievements";
import { useI18n } from "@/lib/i18n/I18nProvider";

type AchievementsPanelProps = {
  unlockedIds: AchievementId[];
};

export function AchievementsPanel({ unlockedIds }: AchievementsPanelProps) {
  const { t } = useI18n();
  const set = new Set(unlockedIds);

  return (
    <section className="rounded-2xl border border-white/15 bg-white/5 p-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-cyan-200">{t("qa.achievements.title")}</h3>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {ACHIEVEMENT_IDS.map((id) => {
          const unlocked = set.has(id);
          return (
            <div
              key={id}
              className={`rounded-xl border px-3 py-2 text-xs transition ${
                unlocked
                  ? "border-emerald-400/35 bg-emerald-500/10 text-emerald-50"
                  : "border-white/10 bg-black/20 text-white/40"
              }`}
            >
              <div className="flex items-center gap-2">
                <span aria-hidden className="text-base">
                  {unlocked ? "★" : "◇"}
                </span>
                <span className="font-medium leading-snug">{t(`qa.achievement.${id}`)}</span>
              </div>
              <p className="mt-1 pl-7 text-[11px] leading-snug text-white/55">{t(`qa.achievement.${id}.desc`)}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
