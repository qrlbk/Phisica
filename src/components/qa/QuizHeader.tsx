"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";

type QuizHeaderProps = {
  score: number;
  streak: number;
  bestStreak: number;
  current: number;
  total: number;
  timeLeft: number;
};

export function QuizHeader({ score, streak, bestStreak, current, total, timeLeft }: QuizHeaderProps) {
  const { t } = useI18n();

  return (
    <div className="mb-4 grid gap-2 rounded-xl border border-white/15 bg-white/5 p-3 text-sm text-white/85 md:grid-cols-5">
      <div>{t("qa.header.points")}: {score}</div>
      <div>{t("qa.header.streak")}: {streak}</div>
      <div>{t("qa.header.bestStreak")}: {bestStreak}</div>
      <div>
        {t("qa.header.question")}: {current}/{total}
      </div>
      <div className={timeLeft <= 5 ? "text-rose-300" : "text-cyan-200"}>
        {t("qa.header.timer")}: {timeLeft}с
      </div>
    </div>
  );
}
