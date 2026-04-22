import type { HabitRepository } from "@/src/infrastructure/repositories/HabitRepository";
import type { LogRepository } from "@/src/infrastructure/repositories/LogRepository";
import type { Habit } from "@/src/domain/entities/Habit";
import { calculateStreak, hitCountInWindow } from "@/src/domain/services/StreakCalculator";
import { lastNDaysKeys } from "@/src/domain/services/DateUtils";
import { CALENDAR_DAYS, UNLOCK_THRESHOLD, UNLOCK_WINDOW } from "@/src/config/constants";

export type HabitViewModel = {
  habit: Habit;
  streak: number;
  hitCount: number;
  daysToUnlock: number;
  calendarDays: { date: string; logged: boolean }[];
  loggedToday: boolean;
};

export type TrackerView = {
  today: string;
  activeHabits: HabitViewModel[];
  lockedHabits: Habit[];
  nextHabit: Habit | null;
  totalActive: number;
  longestStreak: number;
  completedToday: number;
  totalToday: number;
};

export async function getTrackerView(
  habitRepo: HabitRepository,
  logRepo: LogRepository,
  today: string
): Promise<TrackerView> {
  const [allHabits, logs] = await Promise.all([
    habitRepo.getAll(),
    logRepo.getAll(),
  ]);

  const calendarKeys = lastNDaysKeys(CALENDAR_DAYS, today);
  const loggedDates = new Set(logs.map((l) => `${l.habitId}:${l.date}`));

  const activeHabits = allHabits.filter((h) => h.isActive);
  const lockedHabits = allHabits.filter((h) => !h.isActive);
  const nextHabit = lockedHabits.sort((a, b) => a.order - b.order)[0] ?? null;

  const activeViewModels: HabitViewModel[] = activeHabits.map((habit) => {
    const streak = calculateStreak(logs, habit.id, today);
    const hitCount = hitCountInWindow(logs, habit.id, UNLOCK_WINDOW, today);
    const daysToUnlock = Math.max(0, UNLOCK_THRESHOLD - hitCount);
    const calendarDays = calendarKeys.map((date) => ({
      date,
      logged: loggedDates.has(`${habit.id}:${date}`),
    }));
    const loggedToday = loggedDates.has(`${habit.id}:${today}`);
    return { habit, streak, hitCount, daysToUnlock, calendarDays, loggedToday };
  });

  const longestStreak = activeViewModels.reduce(
    (max, vm) => Math.max(max, vm.streak),
    0
  );
  const completedToday = activeViewModels.filter((vm) => vm.loggedToday).length;

  return {
    today,
    activeHabits: activeViewModels,
    lockedHabits: lockedHabits.sort((a, b) => a.order - b.order),
    nextHabit,
    totalActive: activeHabits.length,
    longestStreak,
    completedToday,
    totalToday: activeHabits.length,
  };
}
