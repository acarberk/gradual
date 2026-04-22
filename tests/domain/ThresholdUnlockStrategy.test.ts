import { describe, it, expect } from "vitest";
import { ThresholdUnlockStrategy } from "@/src/domain/strategies/ThresholdUnlockStrategy";
import type { Habit } from "@/src/domain/entities/Habit";
import type { HabitLog } from "@/src/domain/entities/HabitLog";

const makeHabit = (id: string, order: number, isActive: boolean): Habit => ({
  id,
  name: id,
  meta: "",
  order,
  isActive,
});

const log = (habitId: string, date: string): HabitLog => ({ habitId, date });

const strategy = new ThresholdUnlockStrategy();

const allHabits: Habit[] = [
  makeHabit("sleep", 1, true),
  makeHabit("water", 2, true),
  makeHabit("move", 3, false),
  makeHabit("plan", 4, false),
];

describe("ThresholdUnlockStrategy", () => {
  it("returns null when no active habit meets threshold", () => {
    const result = strategy.shouldUnlockNext({
      activeHabits: allHabits.filter((h) => h.isActive),
      allHabits,
      logs: [],
      today: "2026-04-23",
    });
    expect(result).toBeNull();
  });

  it("unlocks next locked habit when threshold met", () => {
    const logs = Array.from({ length: 10 }, (_, i) =>
      log("sleep", `2026-04-${String(14 + i).padStart(2, "0")}`)
    );
    const result = strategy.shouldUnlockNext({
      activeHabits: allHabits.filter((h) => h.isActive),
      allHabits,
      logs,
      today: "2026-04-23",
    });
    expect(result?.id).toBe("move");
  });

  it("returns null when all habits are already active", () => {
    const allActive = allHabits.map((h) => ({ ...h, isActive: true }));
    const logs = Array.from({ length: 10 }, (_, i) =>
      log("sleep", `2026-04-${String(14 + i).padStart(2, "0")}`)
    );
    const result = strategy.shouldUnlockNext({
      activeHabits: allActive,
      allHabits: allActive,
      logs,
      today: "2026-04-23",
    });
    expect(result).toBeNull();
  });

  it("returns null when threshold is 9 (one short)", () => {
    const logs = Array.from({ length: 9 }, (_, i) =>
      log("sleep", `2026-04-${String(15 + i).padStart(2, "0")}`)
    );
    const result = strategy.shouldUnlockNext({
      activeHabits: allHabits.filter((h) => h.isActive),
      allHabits,
      logs,
      today: "2026-04-23",
    });
    expect(result).toBeNull();
  });

  it("unlocks by order — picks lowest order locked habit", () => {
    // plan (order 4) should NOT be unlocked before move (order 3)
    const logs = Array.from({ length: 10 }, (_, i) =>
      log("water", `2026-04-${String(14 + i).padStart(2, "0")}`)
    );
    const result = strategy.shouldUnlockNext({
      activeHabits: allHabits.filter((h) => h.isActive),
      allHabits,
      logs,
      today: "2026-04-23",
    });
    expect(result?.id).toBe("move");
    expect(result?.order).toBe(3);
  });
});
