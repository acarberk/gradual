import type { Habit } from "@/src/domain/entities/Habit";

export interface HabitReader {
  getActive(): Promise<Habit[]>;
  getAll(): Promise<Habit[]>;
}

export interface HabitWriter {
  activate(habitId: string): Promise<void>;
  reset(): Promise<void>;
}

export interface HabitRepository extends HabitReader, HabitWriter {}
