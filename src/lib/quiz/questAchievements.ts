import { QuizDifficulty } from "@/data/qa";
import { readClearedDifficulties } from "@/lib/quiz/questProgress";

export const QUEST_ACHIEVEMENTS_STORAGE_KEY = "physics_quest_achievements_v1";

export const ACHIEVEMENT_IDS = [
  "cleared_easy",
  "cleared_medium",
  "cleared_hard",
  "streak_3",
  "perfect_run",
  "master_quest"
] as const;

export type AchievementId = (typeof ACHIEVEMENT_IDS)[number];

export function readAchievements(): AchievementId[] {
  if (typeof window === "undefined") {
    return [];
  }
  const raw = window.localStorage.getItem(QUEST_ACHIEVEMENTS_STORAGE_KEY);
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }
    const valid = new Set(ACHIEVEMENT_IDS);
    return parsed.filter((x): x is AchievementId => typeof x === "string" && valid.has(x as AchievementId));
  } catch {
    return [];
  }
}

export function writeAchievements(ids: AchievementId[]): void {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(QUEST_ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(ids));
}

export type RunFinishStats = {
  difficulty: QuizDifficulty;
  bestStreak: number;
  correctCount: number;
  totalQuestions: number;
  clearedBefore: QuizDifficulty[];
};

export type UnlockAchievementsResult = {
  stored: AchievementId[];
  newlyUnlocked: AchievementId[];
};

export function unlockAchievementsAfterRun(stats: RunFinishStats): UnlockAchievementsResult {
  const had = new Set(readAchievements());
  const newlyUnlocked: AchievementId[] = [];

  const pushIfNew = (id: AchievementId) => {
    if (!had.has(id)) {
      had.add(id);
      newlyUnlocked.push(id);
    }
  };

  const wasEasyDone = stats.clearedBefore.includes("easy");
  const wasMediumDone = stats.clearedBefore.includes("medium");
  const wasHardDone = stats.clearedBefore.includes("hard");

  if (stats.difficulty === "easy" && !wasEasyDone) {
    pushIfNew("cleared_easy");
  }
  if (stats.difficulty === "medium" && !wasMediumDone) {
    pushIfNew("cleared_medium");
  }
  if (stats.difficulty === "hard" && !wasHardDone) {
    pushIfNew("cleared_hard");
  }

  if (stats.bestStreak >= 3) {
    pushIfNew("streak_3");
  }

  if (stats.totalQuestions > 0 && stats.correctCount === stats.totalQuestions) {
    pushIfNew("perfect_run");
  }

  const clearedAfter = stats.clearedBefore.includes(stats.difficulty)
    ? stats.clearedBefore
    : [...stats.clearedBefore, stats.difficulty];

  if (clearedAfter.includes("easy") && clearedAfter.includes("medium") && clearedAfter.includes("hard")) {
    pushIfNew("master_quest");
  }

  const stored = Array.from(had);
  writeAchievements(stored);

  return { stored, newlyUnlocked };
}

/** Reconcile master_quest if progress file was edited manually */
export function syncMasterAchievement(): void {
  const cleared = readClearedDifficulties();
  if (cleared.includes("easy") && cleared.includes("medium") && cleared.includes("hard")) {
    const had = new Set(readAchievements());
    if (!had.has("master_quest")) {
      had.add("master_quest");
      writeAchievements(Array.from(had));
    }
  }
}
