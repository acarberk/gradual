import { describe, expect, it } from "vitest";
import { makeHabitId } from "@/src/domain/entities/HabitId";
import type { HabitLog } from "@/src/domain/entities/HabitLog";
import { completionRate, completionsInWindow } from "@/src/domain/services/CompletionRate";

const habitA = makeHabitId("habit-a");
const habitB = makeHabitId("habit-b");

const logs: HabitLog[] = [
  { habitId: habitA, date: "2026-05-01" },
  { habitId: habitA, date: "2026-05-03" },
  { habitId: habitA, date: "2026-05-10" },
  { habitId: habitB, date: "2026-05-03" },
];

describe("CompletionRate.completionsInWindow", () => {
  it("counts only logs for the given habit", () => {
    expect(completionsInWindow(logs, habitA, "2026-05-01", "2026-05-31")).toBe(3);
    expect(completionsInWindow(logs, habitB, "2026-05-01", "2026-05-31")).toBe(1);
  });

  it("respects window bounds inclusively", () => {
    expect(completionsInWindow(logs, habitA, "2026-05-01", "2026-05-03")).toBe(2);
    expect(completionsInWindow(logs, habitA, "2026-05-02", "2026-05-09")).toBe(1);
  });

  it("returns 0 when no logs match", () => {
    expect(completionsInWindow(logs, habitA, "2026-06-01", "2026-06-30")).toBe(0);
    expect(completionsInWindow([], habitA, "2026-05-01", "2026-05-31")).toBe(0);
  });

  it("does not count logs outside the window", () => {
    expect(completionsInWindow(logs, habitA, "2026-05-04", "2026-05-09")).toBe(0);
  });
});

describe("CompletionRate.completionRate", () => {
  it("returns 0 when totalDays is 0 or negative", () => {
    expect(completionRate(5, 0)).toBe(0);
    expect(completionRate(5, -1)).toBe(0);
  });

  it("computes ratio for positive totals", () => {
    expect(completionRate(10, 14)).toBeCloseTo(10 / 14);
    expect(completionRate(0, 14)).toBe(0);
    expect(completionRate(14, 14)).toBe(1);
  });
});
