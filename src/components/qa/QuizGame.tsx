"use client";

import { useEffect, useMemo, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnswerOptions } from "@/components/qa/AnswerOptions";
import { QuizHeader } from "@/components/qa/QuizHeader";
import { ResultCard } from "@/components/qa/ResultCard";
import { getQuizQuestions, type QuizDifficulty } from "@/data/qa";
import { getScoreDelta } from "@/lib/quiz/scoring";
import { getTimerByDifficulty } from "@/lib/quiz/timer";
import {
  addLeaderboardEntry,
  readLeaderboard,
  writeLeaderboard,
  type LeaderboardEntry
} from "@/lib/quiz/leaderboard";
import { useI18n } from "@/lib/i18n/I18nProvider";

type QuizGameProps = {
  difficulty: QuizDifficulty;
  onChangeDifficulty: () => void;
};

export function QuizGame({ difficulty, onChangeDifficulty }: QuizGameProps) {
  const { locale, t } = useI18n();
  const questions = useMemo(
    () => getQuizQuestions(locale).filter((question) => question.difficulty === difficulty),
    [difficulty, locale]
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [usedHint, setUsedHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(getTimerByDifficulty(difficulty));
  const [isFinished, setIsFinished] = useState(false);
  const [playerName, setPlayerName] = useState("Player");
  const [isSaved, setIsSaved] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() => readLeaderboard());

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (isFinished || answered) {
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setAnswered(true);
          setStreak(0);
          setSelectedOption(-1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, answered, isFinished]);

  const handleAnswer = (optionIndex: number) => {
    if (answered) {
      return;
    }

    setSelectedOption(optionIndex);
    setAnswered(true);

    const isCorrect = optionIndex === currentQuestion.correctOption;
    const delta = getScoreDelta({ isCorrect, streakBefore: streak, usedHint });
    const nextStreak = isCorrect ? streak + 1 : 0;

    setScore((prev) => prev + delta);
    setStreak(nextStreak);
    setBestStreak((prev) => Math.max(prev, nextStreak));
  };

  const handleHint = () => {
    if (answered || usedHint) {
      return;
    }
    setUsedHint(true);
  };

  const handleNext = () => {
    if (!answered) {
      return;
    }

    if (currentQuestionIndex === questions.length - 1) {
      setIsFinished(true);
      return;
    }

    setCurrentQuestionIndex((prev) => prev + 1);
    setSelectedOption(null);
    setAnswered(false);
    setUsedHint(false);
    setTimeLeft(getTimerByDifficulty(difficulty));
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setSelectedOption(null);
    setAnswered(false);
    setUsedHint(false);
    setTimeLeft(getTimerByDifficulty(difficulty));
    setIsFinished(false);
    setIsSaved(false);
  };

  const handleSaveResult = () => {
    if (isSaved) {
      return;
    }

    const cleanName = playerName.trim() || "Player";
    const next = addLeaderboardEntry(leaderboard, {
      name: cleanName,
      score,
      bestStreak,
      difficulty
    });
    setLeaderboard(next);
    writeLeaderboard(next);
    setIsSaved(true);
  };

  if (isFinished) {
    return (
      <ResultCard
        score={score}
        bestStreak={bestStreak}
        totalQuestions={questions.length}
        difficulty={difficulty}
        playerName={playerName}
        isSaved={isSaved}
        leaderboard={leaderboard}
        onPlayerNameChange={setPlayerName}
        onSaveResult={handleSaveResult}
        onRestart={handleRestart}
        onChangeDifficulty={onChangeDifficulty}
      />
    );
  }

  const isCorrect = selectedOption === currentQuestion.correctOption;

  return (
    <section>
      <QuizHeader
        score={score}
        streak={streak}
        bestStreak={bestStreak}
        current={currentQuestionIndex + 1}
        total={questions.length}
        timeLeft={timeLeft}
      />
      <GlassCard>
        <div className="mb-2 text-xs uppercase tracking-wide text-cyan-200">{currentQuestion.category}</div>
        <h3 className="text-xl font-semibold text-white">{currentQuestion.question}</h3>

        <AnswerOptions
          options={currentQuestion.options}
          selectedOption={selectedOption}
          correctOption={currentQuestion.correctOption}
          answered={answered}
          onSelect={handleAnswer}
        />

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleHint}
            disabled={usedHint || answered}
            className="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white/85 disabled:opacity-50"
          >
            {usedHint ? t("qa.hint.used") : t("qa.hint.button")}
          </button>
          {answered ? (
            <span className={`text-sm ${isCorrect ? "text-emerald-300" : "text-rose-300"}`}>
              {isCorrect ? `${t("qa.answer.correct")} ` : `${t("qa.answer.wrong")} `}
              {currentQuestion.explanation}
            </span>
          ) : null}
        </div>

        {usedHint && !answered ? (
          <p className="mt-3 rounded-lg border border-amber-300/40 bg-amber-500/10 p-2 text-sm text-amber-100">
            {currentQuestion.hint}
          </p>
        ) : null}

        <button
          type="button"
          onClick={handleNext}
          disabled={!answered}
          className="mt-4 rounded-lg bg-cyan-400 px-4 py-2 text-sm font-medium text-slate-950 disabled:opacity-60"
        >
          {currentQuestionIndex === questions.length - 1 ? t("qa.showResult") : t("qa.next")}
        </button>
      </GlassCard>
    </section>
  );
}
