import type { HabitLog } from "../entities/HabitLog";
import { addDays } from "./DateUtils";

export function calculateStreak(
  logs: HabitLog[],
  habitId: string,
  today: string
): number {
  const datesSet = new Set(
    logs.filter((l) => l.habitId === habitId).map((l) => l.date)
  );

  // Start from today if logged, otherwise from yesterday
  const startDay = datesSet.has(today) ? today : addDays(today, -1);

  if (!datesSet.has(startDay)) return 0;

  let streak = 0;
  let current = startDay;
  while (datesSet.has(current)) {
    streak++;
    current = addDays(current, -1);
  }
  return streak;
}

export function hitCountInWindow(
  logs: HabitLog[],
  habitId: string,
  windowDays: number,
  today: string
): number {
  const windowStart = addDays(today, -(windowDays - 1));
  return logs.filter(
    (l) => l.habitId === habitId && l.date >= windowStart && l.date <= today
  ).length;
}
