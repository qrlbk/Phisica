"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { QuizGame } from "@/components/qa/QuizGame";
import { LeaderboardTable } from "@/components/qa/LeaderboardTable";
import { type QuizDifficulty } from "@/data/qa";
import { readLeaderboard } from "@/lib/quiz/leaderboard";

export default function QaPage() {
  const [difficulty, setDifficulty] = useState<QuizDifficulty | null>(null);

  return (
    <AppShell
      title="Игровой Q&A"
      description="Ответь на физические вопросы в формате квиза: 4 варианта ответа, таймер, серия и очки."
    >
      {difficulty ? (
        <QuizGame difficulty={difficulty} onChangeDifficulty={() => setDifficulty(null)} />
      ) : (
        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <section className="grid gap-3 md:grid-cols-3">
            {[
              { id: "easy", title: "Легкий", subtitle: "Базовые вопросы, 30 секунд" },
              { id: "medium", title: "Средний", subtitle: "Формулы и расчеты, 25 секунд" },
              { id: "hard", title: "Сложный", subtitle: "Больше логики и физики, 20 секунд" }
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
