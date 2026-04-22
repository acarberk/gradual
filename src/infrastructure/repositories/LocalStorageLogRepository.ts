import type { HabitLog } from "@/src/domain/entities/HabitLog";
import type { LogRepository } from "./LogRepository";

const STORAGE_KEY = "gradual:logs";

export class LocalStorageLogRepository implements LogRepository {
  private load(): HabitLog[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as HabitLog[]) : [];
    } catch {
      return [];
    }
  }

  private save(logs: HabitLog[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  }

  async getAll(): Promise<HabitLog[]> {
    return this.load();
  }

  async getByHabit(habitId: string): Promise<HabitLog[]> {
    return this.load().filter((l) => l.habitId === habitId);
  }

  async toggle(habitId: string, date: string): Promise<void> {
    const logs = this.load();
    const idx = logs.findIndex((l) => l.habitId === habitId && l.date === date);
    if (idx >= 0) {
      logs.splice(idx, 1);
    } else {
      logs.push({ habitId, date });
    }
    this.save(logs);
  }

  async reset(): Promise<void> {
    this.save([]);
  }
}
