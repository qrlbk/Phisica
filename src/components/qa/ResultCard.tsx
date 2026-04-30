"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { QuizDifficulty } from "@/data/qa";
import { LeaderboardEntry } from "@/lib/quiz/leaderboard";
import { LeaderboardTable } from "@/components/qa/LeaderboardTable";
import { useI18n } from "@/lib/i18n/I18nProvider";

type ResultCardProps = {
  score: number;
  bestStreak: number;
  totalQuestions: number;
  difficulty: QuizDifficulty;
  playerName: string;
  isSaved: boolean;
  leaderboard: LeaderboardEntry[];
  onPlayerNameChange: (value: string) => void;
  onSaveResult: () => void;
  onRestart: () => void;
  onChangeDifficulty: () => void;
};

export function ResultCard({
  score,
  bestStreak,
  totalQuestions,
  difficulty,
  playerName,
  isSaved,
  leaderboard,
  onPlayerNameChange,
  onSaveResult,
  onRestart,
  onChangeDifficulty
}: ResultCardProps) {
  const { locale, t } = useI18n();
  const recommendationByDifficulty: Record<QuizDifficulty, string> = {
    easy:
      locale === "kk"
        ? "Орташа деңгейді байқап көр және F=ma мен I=U/R формулаларын мысалмен бекіт."
        : locale === "en"
          ? "Try medium level and reinforce F=ma and I=U/R with examples."
          : "Попробуй средний уровень и закрепи формулы F=ma и I=U/R на примерах.",
    medium:
      locale === "kk"
        ? "Қарқының жақсы. Қиын режимді көмексіз өтіп көр."
        : locale === "en"
          ? "Great pace. Try hard mode and practice without hints."
          : "Отличный темп. Попробуй сложный режим и потренируйся без подсказок.",
    hard:
      locale === "kk"
        ? "Өте мықты нәтиже. Білімді бекіту үшін ғарыш пен зертхана модуліне қайта орал."
        : locale === "en"
          ? "Strong result. Return to space and lab modules to reinforce with visuals."
          : "Сильный результат. Вернись к космосу и лаборатории для закрепления на визуализациях."
  };

  return (
    <div className="space-y-4">
      <GlassCard>
        <h3 className="text-2xl font-semibold text-white">{t("qa.result.title")}</h3>
        <p className="mt-2 text-sm text-white/80">
          {t("qa.result.scorePrefix")}: <span className="text-cyan-200">{score}</span> {t("qa.result.points")} {totalQuestions}{" "}
          {t("qa.result.questionsSuffix")}.
        </p>
        <p className="mt-1 text-sm text-white/70">
          {t("qa.result.bestStreak")}: {bestStreak}
        </p>
        <p className="mt-4 rounded-lg border border-white/15 bg-white/5 p-3 text-sm text-white/75">
          {t("qa.result.recommendation")}: {recommendationByDifficulty[difficulty]}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <input
            type="text"
            value={playerName}
            onChange={(event) => onPlayerNameChange(event.target.value)}
            placeholder={t("qa.result.namePlaceholder")}
            maxLength={24}
            className="rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
          />
          <button
            type="button"
            onClick={onSaveResult}
            disabled={isSaved}
            className="rounded-lg border border-cyan-300/40 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 disabled:opacity-50"
          >
            {isSaved ? t("qa.result.saved") : t("qa.result.saveToLeaders")}
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onRestart}
            className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-medium text-slate-950"
          >
            {t("qa.result.playAgain")}
          </button>
          <button
            type="button"
            onClick={onChangeDifficulty}
            className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/85"
          >
            {t("qa.result.changeLevel")}
          </button>
        </div>
      </GlassCard>

      <LeaderboardTable entries={leaderboard} />
    </div>
  );
}
