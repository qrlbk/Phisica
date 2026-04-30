type ScoreArgs = {
  isCorrect: boolean;
  streakBefore: number;
  usedHint: boolean;
};

export function getScoreDelta({ isCorrect, streakBefore, usedHint }: ScoreArgs): number {
  if (!isCorrect) {
    return 0;
  }

  const base = 10;
  const streakBonus = streakBefore >= 2 ? 5 : 0;
  const hintPenalty = usedHint ? 3 : 0;
  return Math.max(0, base + streakBonus - hintPenalty);
}
