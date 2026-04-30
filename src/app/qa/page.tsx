"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { QuizGame } from "@/components/qa/QuizGame";
import { LeaderboardTable } from "@/components/qa/LeaderboardTable";
import { type QuizDifficulty } from "@/data/qa";
import { readLeaderboard } from "@/lib/quiz/leaderboard";
import { useI18n } from "@/lib/i18n/I18nProvider";

export default function QaPage() {
  const { t } = useI18n();
  const [difficulty, setDifficulty] = useState<QuizDifficulty | null>(null);

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
            {[
              { id: "easy", title: t("qa.level.easy"), subtitle: t("qa.level.easyDesc") },
              { id: "medium", title: t("qa.level.medium"), subtitle: t("qa.level.mediumDesc") },
              { id: "hard", title: t("qa.level.hard"), subtitle: t("qa.level.hardDesc") }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setDifficulty(item.id as QuizDifficulty)}
                className="rounded-2xl border border-white/15 bg-white/5 p-5 text-left transition hover:border-cyan-300/60 hover:bg-white/10"
              >
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-white/70">{item.subtitle}</p>
              </button>
            ))}
          </section>
          <LeaderboardTable entries={readLeaderboard()} />
        </div>
      )}
    </AppShell>
  );
}
