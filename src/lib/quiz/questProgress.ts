import { QuizDifficulty } from "@/data/qa";

export const QUEST_PROGRESS_STORAGE_KEY = "physics_quest_progress_v1";

export function readClearedDifficulties(): QuizDifficulty[] {
  if (typeof window === "undefined") {
    return [];
  }
  const raw = window.localStorage.getItem(QUEST_PROGRESS_STORAGE_KEY);
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }
    const valid: QuizDifficulty[] = ["easy", "medium", "hard"];
    return parsed.filter((x): x is QuizDifficulty => typeof x === "string" && valid.includes(x as QuizDifficulty));
  } catch {
    return [];
  }
}

export function writeClearedDifficulties(cleared: QuizDifficulty[]): void {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(QUEST_PROGRESS_STORAGE_KEY, JSON.stringify(cleared));
}

export function isDifficultyUnlocked(difficulty: QuizDifficulty, cleared: QuizDifficulty[]): boolean {
  if (difficulty === "easy") {
    return true;
  }
  if (difficulty === "medium") {
    return cleared.includes("easy");
  }
  return cleared.includes("medium");
}

export type MarkClearedResult = {
  nextCleared: QuizDifficulty[];
  /** First-time completing easy — medium tier becomes playable */
  justOpenedMedium: boolean;
  /** First-time completing medium — hard tier becomes playable */
  justOpenedHard: boolean;
};

export function markDifficultyCleared(
  clearedBefore: QuizDifficulty[],
  difficulty: QuizDifficulty
): MarkClearedResult {
  const hadEasy = clearedBefore.includes("easy");
  const hadMedium = clearedBefore.includes("medium");

  const nextCleared = clearedBefore.includes(difficulty)
    ? clearedBefore
    : [...clearedBefore, difficulty];

  return {
    nextCleared,
    justOpenedMedium: difficulty === "easy" && !hadEasy,
    justOpenedHard: difficulty === "medium" && !hadMedium
  };
}
