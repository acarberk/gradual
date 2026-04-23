import type { Habit } from "@/src/domain/entities/Habit";
import type { HabitRepository } from "./HabitRepository";
import { DEFAULT_HABITS } from "../seed/defaultHabits";

const STORAGE_KEY = "gradual:habits";

export class LocalStorageHabitRepository implements HabitRepository {
  private load(): Habit[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return this.seed();
      return JSON.parse(raw) as Habit[];
    } catch {
      return this.seed();
    }
  }

  private seed(): Habit[] {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_HABITS));
    return DEFAULT_HABITS;
  }

  private save(habits: Habit[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  }

  async getAll(): Promise<Habit[]> {
    return this.load();
  }

  async getActive(): Promise<Habit[]> {
    return this.load().filter((h) => h.isActive);
  }

  async activate(habitId: string): Promise<void> {
    const habits = this.load().map((h) => (h.id === habitId ? { ...h, isActive: true } : h));
    this.save(habits);
  }

  async reset(): Promise<void> {
    this.save(DEFAULT_HABITS);
  }
}
