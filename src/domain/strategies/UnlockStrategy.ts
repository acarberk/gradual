import type { Habit } from "../entities/Habit";
import type { HabitLog } from "../entities/HabitLog";

export interface UnlockStrategy {
  shouldUnlockNext(params: {
    activeHabits: Habit[];
    allHabits: Habit[];
    logs: HabitLog[];
    today: string;
  }): Habit | null;
}
