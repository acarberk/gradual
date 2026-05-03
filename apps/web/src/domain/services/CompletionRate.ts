import type { HabitId } from "@/src/domain/entities/HabitId";
import type { HabitLog } from "@/src/domain/entities/HabitLog";
import { isWithinWindow } from "./DateUtils";

export function completionsInWindow(
  logs: readonly HabitLog[],
  habitId: HabitId,
  windowStart: string,
  windowEnd: string,
): number {
  return logs.filter(
    (log) => log.habitId === habitId && isWithinWindow(log.date, windowStart, windowEnd),
  ).length;
}

export function completionRate(completions: number, totalDays: number): number {
  if (totalDays <= 0) return 0;
  return completions / totalDays;
}
