"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { AchievementsPanel } from "@/components/qa/AchievementsPanel";
import { QuizGame } from "@/components/qa/QuizGame";
import { LeaderboardTable } from "@/components/qa/LeaderboardTable";
import { type QuizDifficulty } from "@/data/qa";
import { readLeaderboard } from "@/lib/quiz/leaderboard";
import { readAchievements, syncMasterAchievement, type AchievementId } from "@/lib/quiz/questAchievements";
import { isDifficultyUnlocked, readClearedDifficulties } from "@/lib/quiz/questProgress";
import { useI18n } from "@/lib/i18n/I18nProvider";

export default function QaPage() {
  const { t } = useI18n();
  const [difficulty, setDifficulty] = useState<QuizDifficulty | null>(null);
  const [clearedDifficulties, setClearedDifficulties] = useState<QuizDifficulty[]>([]);
  const [achievementIds, setAchievementIds] = useState<AchievementId[]>([]);

  useEffect(() => {
    setClearedDifficulties(readClearedDifficulties());
    syncMasterAchievement();
    setAchievementIds(readAchievements());
  }, [difficulty]);

  return (
    <AppShell
      title={t("qa.title")}
      description={t("qa.description")}
    >
      {difficulty ? (
        <QuizGame difficulty={difficulty} onChangeDifficulty={() => setDifficulty(null)} />
      ) : (
        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <section className="grid gap-3 md:grid-cols-3">
            {(
              [
                { id: "easy" as const, title: t("qa.level.easy"), subtitle: t("qa.level.easyDesc") },
                { id: "medium" as const, title: t("qa.level.medium"), subtitle: t("qa.level.mediumDesc") },
                { id: "hard" as const, title: t("qa.level.hard"), subtitle: t("qa.level.hardDesc") }
              ] as const
            ).map((item) => {
              const unlocked = isDifficultyUnlocked(item.id, clearedDifficulties);
              const lockHint =
                item.id === "medium"
                  ? t("qa.level.lockHint.medium")
                  : item.id === "hard"
                    ? t("qa.level.lockHint.hard")
                    : null;
              return (
                <button
                  key={item.id}
                  type="button"
                  disabled={!unlocked}
                  onClick={() => unlocked && setDifficulty(item.id)}
                  className={`rounded-2xl border p-5 text-left transition ${
                    unlocked
                      ? "border-white/15 bg-white/5 hover:border-cyan-300/60 hover:bg-white/10"
                      : "cursor-not-allowed border-white/10 bg-black/25 opacity-70"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    {!unlocked ? <span aria-hidden>🔒</span> : null}
                  </div>
                  <p className="mt-1 text-sm text-white/70">{item.subtitle}</p>
                  {!unlocked && lockHint ? (
                    <p className="mt-2 text-xs text-amber-200/90">{lockHint}</p>
                  ) : null}
                </button>
              );
            })}
          </section>
          <div className="flex flex-col gap-4">
            <LeaderboardTable entries={readLeaderboard()} />
            <AchievementsPanel unlockedIds={achievementIds} />
          </div>
        </div>
      )}
    </AppShell>
  );
}
