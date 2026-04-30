import { GlassCard } from "@/components/ui/GlassCard";
import { QuizDifficulty } from "@/data/qa";
import { LeaderboardEntry } from "@/lib/quiz/leaderboard";
import { LeaderboardTable } from "@/components/qa/LeaderboardTable";

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

const recommendationByDifficulty: Record<QuizDifficulty, string> = {
  easy: "Попробуй средний уровень и закрепи формулы F=ma и I=U/R на примерах.",
  medium: "Отличный темп. Попробуй сложный режим и потренируйся без подсказок.",
  hard: "Сильный результат. Вернись к космосу и лаборатории для закрепления на визуализациях."
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
  return (
    <div className="space-y-4">
      <GlassCard>
        <h3 className="text-2xl font-semibold text-white">Финиш!</h3>
        <p className="mt-2 text-sm text-white/80">
          Твой результат: <span className="text-cyan-200">{score}</span> очков за {totalQuestions} вопросов.
        </p>
        <p className="mt-1 text-sm text-white/70">Лучшая серия: {bestStreak}</p>
        <p className="mt-4 rounded-lg border border-white/15 bg-white/5 p-3 text-sm text-white/75">
          Рекомендация: {recommendationByDifficulty[difficulty]}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <input
            type="text"
            value={playerName}
            onChange={(event) => onPlayerNameChange(event.target.value)}
            placeholder="Твое имя"
            maxLength={24}
            className="rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
          />
          <button
            type="button"
            onClick={onSaveResult}
            disabled={isSaved}
            className="rounded-lg border border-cyan-300/40 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 disabled:opacity-50"
          >
            {isSaved ? "Сохранено" : "Сохранить в лидеры"}
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onRestart}
            className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-medium text-slate-950"
          >
            Играть снова
          </button>
          <button
            type="button"
            onClick={onChangeDifficulty}
            className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/85"
          >
            Сменить уровень
          </button>
        </div>
      </GlassCard>

      <LeaderboardTable entries={leaderboard} />
    </div>
  );
}
