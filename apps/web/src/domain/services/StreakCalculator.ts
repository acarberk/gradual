import type { HabitId } from "@/src/domain/entities/HabitId";
import type { HabitLog } from "@/src/domain/entities/HabitLog";
import { addDays } from "./DateUtils";

export function currentStreak(logs: readonly HabitLog[], habitId: HabitId, today: string): number {
  const habitDates = new Set(logs.filter((log) => log.habitId === habitId).map((log) => log.date));

  let streak = 0;
  let cursor = today;
  while (habitDates.has(cursor)) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}
