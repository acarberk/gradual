import { describe, it, expect } from "vitest";
import { calculateStreak, hitCountInWindow } from "@/src/domain/services/StreakCalculator";
import type { HabitLog } from "@/src/domain/entities/HabitLog";

const log = (habitId: string, date: string): HabitLog => ({ habitId, date });

describe("calculateStreak", () => {
  it("returns 0 for empty logs", () => {
    expect(calculateStreak([], "sleep", "2026-04-23")).toBe(0);
  });

  it("returns 1 for only today logged", () => {
    expect(calculateStreak([log("sleep", "2026-04-23")], "sleep", "2026-04-23")).toBe(1);
  });

  it("counts consecutive days ending today", () => {
    const logs = [
      log("sleep", "2026-04-21"),
      log("sleep", "2026-04-22"),
      log("sleep", "2026-04-23"),
    ];
    expect(calculateStreak(logs, "sleep", "2026-04-23")).toBe(3);
  });

  it("stops at gap", () => {
    const logs = [
      log("sleep", "2026-04-20"),
      log("sleep", "2026-04-22"),
      log("sleep", "2026-04-23"),
    ];
    expect(calculateStreak(logs, "sleep", "2026-04-23")).toBe(2);
  });

  it("counts from yesterday if today not logged", () => {
    const logs = [log("sleep", "2026-04-21"), log("sleep", "2026-04-22")];
    expect(calculateStreak(logs, "sleep", "2026-04-23")).toBe(2);
  });

  it("returns 0 if yesterday not logged either", () => {
    const logs = [log("sleep", "2026-04-20")];
    expect(calculateStreak(logs, "sleep", "2026-04-23")).toBe(0);
  });

  it("ignores other habits", () => {
    const logs = [
      log("water", "2026-04-21"),
      log("water", "2026-04-22"),
      log("water", "2026-04-23"),
      log("sleep", "2026-04-23"),
    ];
    expect(calculateStreak(logs, "sleep", "2026-04-23")).toBe(1);
  });
});

describe("hitCountInWindow", () => {
  it("counts hits in last 14 days", () => {
    const logs = Array.from({ length: 10 }, (_, i) =>
      log("sleep", `2026-04-${String(14 + i).padStart(2, "0")}`),
    );
    expect(hitCountInWindow(logs, "sleep", 14, "2026-04-23")).toBe(10);
  });

  it("excludes days outside window", () => {
    const logs = [
      log("sleep", "2026-04-01"), // outside 14-day window ending 2026-04-23
      log("sleep", "2026-04-22"),
      log("sleep", "2026-04-23"),
    ];
    expect(hitCountInWindow(logs, "sleep", 14, "2026-04-23")).toBe(2);
  });
});
