import { QuizDifficulty } from "@/data/qa";

export type LeaderboardEntry = {
  id: string;
  name: string;
  score: number;
  bestStreak: number;
  difficulty: QuizDifficulty;
  createdAt: string;
};

export const LEADERBOARD_STORAGE_KEY = "physics_quiz_leaderboard_v1";

export function readLeaderboard(): LeaderboardEntry[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(LEADERBOARD_STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as LeaderboardEntry[];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch {
    return [];
  }
}

export function writeLeaderboard(entries: LeaderboardEntry[]): void {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(entries));
}

export function addLeaderboardEntry(
  entries: LeaderboardEntry[],
  entry: Omit<LeaderboardEntry, "id" | "createdAt">
): LeaderboardEntry[] {
  const next: LeaderboardEntry[] = [
    {
      ...entry,
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      createdAt: new Date().toISOString()
    },
    ...entries
  ]
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return b.bestStreak - a.bestStreak;
    })
    .slice(0, 10);

  return next;
}
