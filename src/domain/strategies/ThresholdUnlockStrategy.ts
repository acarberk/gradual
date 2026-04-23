import type { Habit } from "../entities/Habit";
import type { HabitLog } from "../entities/HabitLog";
import type { UnlockStrategy } from "./UnlockStrategy";
import { hitCountInWindow } from "../services/StreakCalculator";
import { UNLOCK_THRESHOLD, UNLOCK_WINDOW } from "@/src/config/constants";

export class ThresholdUnlockStrategy implements UnlockStrategy {
  shouldUnlockNext(params: {
    activeHabits: Habit[];
    allHabits: Habit[];
    logs: HabitLog[];
    today: string;
  }): Habit | null {
    const { activeHabits, allHabits, logs, today } = params;

    const anyQualifies = activeHabits.some(
      (h) => hitCountInWindow(logs, h.id, UNLOCK_WINDOW, today) >= UNLOCK_THRESHOLD,
    );

    if (!anyQualifies) return null;

    const activeIds = new Set(activeHabits.map((h) => h.id));
    const nextHabit = allHabits
      .filter((h) => !activeIds.has(h.id))
      .sort((a, b) => a.order - b.order)[0];

    return nextHabit ?? null;
  }
}
