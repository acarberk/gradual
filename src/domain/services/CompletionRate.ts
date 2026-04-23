import type { HabitLog } from "../entities/HabitLog";
import { hitCountInWindow } from "./StreakCalculator";

export function completionRate(
  logs: HabitLog[],
  habitId: string,
  windowDays: number,
  today: string,
): number {
  const hits = hitCountInWindow(logs, habitId, windowDays, today);
  return Math.round((hits / windowDays) * 100);
}
