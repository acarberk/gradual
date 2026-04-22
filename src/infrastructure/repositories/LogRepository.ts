import type { HabitLog } from "@/src/domain/entities/HabitLog";

export interface LogReader {
  getByHabit(habitId: string): Promise<HabitLog[]>;
  getAll(): Promise<HabitLog[]>;
}

export interface LogWriter {
  toggle(habitId: string, date: string): Promise<void>;
  reset(): Promise<void>;
}

export interface LogRepository extends LogReader, LogWriter {}
