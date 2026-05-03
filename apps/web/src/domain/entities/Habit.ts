import type { HabitId } from "./HabitId";
import type { HabitStatus } from "./HabitStatus";

export type Habit = {
  id: HabitId;
  name: string;
  order: number;
  status: HabitStatus;
  activeStartDate: string | null;
  triggeredUnlockAt: string | null;
  anchor: string | null;
  createdAt: string;
  updatedAt: string;
};
