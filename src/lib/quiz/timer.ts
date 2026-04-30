import { QuizDifficulty } from "@/data/qa";

export function getTimerByDifficulty(difficulty: QuizDifficulty): number {
  switch (difficulty) {
    case "easy":
      return 30;
    case "medium":
      return 25;
    case "hard":
      return 20;
    default:
      return 25;
  }
}
