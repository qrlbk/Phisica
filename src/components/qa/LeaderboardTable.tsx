"use client";

import { LeaderboardEntry } from "@/lib/quiz/leaderboard";
import { useI18n } from "@/lib/i18n/I18nProvider";

type LeaderboardTableProps = {
  entries: LeaderboardEntry[];
};

export function LeaderboardTable({ entries }: LeaderboardTableProps) {
  const { t } = useI18n();
  const difficultyLabel = {
    easy: t("qa.leaderboard.easy"),
    medium: t("qa.leaderboard.medium"),
    hard: t("qa.leaderboard.hard")
  } as const;

  return (
    <section className="rounded-2xl border border-white/15 bg-white/5 p-4">
      <h3 className="text-lg font-semibold text-white">{t("qa.leaderboard.title")}</h3>
      {entries.length === 0 ? (
        <p className="mt-2 text-sm text-white/65">{t("qa.leaderboard.empty")}</p>
      ) : (
        <div className="mt-3 space-y-2">
          {entries.map((entry, index) => (
            <div key={entry.id} className="grid grid-cols-[36px_1fr_auto_auto] items-center gap-2 rounded-lg bg-black/20 px-3 py-2">
              <span className="text-sm text-cyan-200">#{index + 1}</span>
              <span className="truncate text-sm text-white/90">{entry.name}</span>
              <span className="text-xs text-white/70">{difficultyLabel[entry.difficulty]}</span>
              <span className="text-sm font-medium text-emerald-300">{entry.score}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
