type QuizHeaderProps = {
  score: number;
  streak: number;
  bestStreak: number;
  current: number;
  total: number;
  timeLeft: number;
};

export function QuizHeader({ score, streak, bestStreak, current, total, timeLeft }: QuizHeaderProps) {
  return (
    <div className="mb-4 grid gap-2 rounded-xl border border-white/15 bg-white/5 p-3 text-sm text-white/85 md:grid-cols-5">
      <div>Очки: {score}</div>
      <div>Серия: {streak}</div>
      <div>Макс серия: {bestStreak}</div>
      <div>
        Вопрос: {current}/{total}
      </div>
      <div className={timeLeft <= 5 ? "text-rose-300" : "text-cyan-200"}>Таймер: {timeLeft}с</div>
    </div>
  );
}
