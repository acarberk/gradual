import { describe, expect, it } from "vitest";
import { makeHabitId } from "@/src/domain/entities/HabitId";
import type { HabitLog } from "@/src/domain/entities/HabitLog";
import { currentStreak } from "@/src/domain/services/StreakCalculator";

const habitA = makeHabitId("habit-a");
const habitB = makeHabitId("habit-b");

describe("StreakCalculator.currentStreak", () => {
  it("returns 0 when there are no logs for the habit", () => {
    expect(currentStreak([], habitA, "2026-05-03")).toBe(0);
  });

  it("returns 0 when today has no log even if previous days do", () => {
    const logs: HabitLog[] = [
      { habitId: habitA, date: "2026-05-01" },
      { habitId: habitA, date: "2026-05-02" },
    ];
    expect(currentStreak(logs, habitA, "2026-05-03")).toBe(0);
  });

  it("returns 1 when only today is logged", () => {
    const logs: HabitLog[] = [{ habitId: habitA, date: "2026-05-03" }];
    expect(currentStreak(logs, habitA, "2026-05-03")).toBe(1);
  });

  it("counts consecutive days ending today", () => {
    const logs: HabitLog[] = [
      { habitId: habitA, date: "2026-05-01" },
      { habitId: habitA, date: "2026-05-02" },
      { habitId: habitA, date: "2026-05-03" },
    ];
    expect(currentStreak(logs, habitA, "2026-05-03")).toBe(3);
  });

  it("stops at the first gap", () => {
    const logs: HabitLog[] = [
      { habitId: habitA, date: "2026-04-29" },
      { habitId: habitA, date: "2026-05-01" },
      { habitId: habitA, date: "2026-05-02" },
      { habitId: habitA, date: "2026-05-03" },
    ];
    expect(currentStreak(logs, habitA, "2026-05-03")).toBe(3);
  });

  it("ignores logs of other habits", () => {
    const logs: HabitLog[] = [
      { habitId: habitB, date: "2026-05-01" },
      { habitId: habitB, date: "2026-05-02" },
      { habitId: habitA, date: "2026-05-03" },
    ];
    expect(currentStreak(logs, habitA, "2026-05-03")).toBe(1);
  });

  it("handles logs supplied in arbitrary order", () => {
    const logs: HabitLog[] = [
      { habitId: habitA, date: "2026-05-03" },
      { habitId: habitA, date: "2026-05-01" },
      { habitId: habitA, date: "2026-05-02" },
    ];
    expect(currentStreak(logs, habitA, "2026-05-03")).toBe(3);
  });
});
