import { describe, expect, it } from "vitest";
import type { Habit } from "@/src/domain/entities/Habit";
import type { HabitLog } from "@/src/domain/entities/HabitLog";
import { makeHabitId } from "@/src/domain/entities/HabitId";

describe("Habit entity", () => {
  it("accepts a locked habit with no active dates", () => {
    const habit: Habit = {
      id: makeHabitId("habit-1"),
      name: "10 dakika yürüyüş",
      order: 1,
      status: "locked",
      activeStartDate: null,
      triggeredUnlockAt: null,
      anchor: null,
      createdAt: "2026-05-03T00:00:00Z",
      updatedAt: "2026-05-03T00:00:00Z",
    };
    expect(habit.status).toBe("locked");
    expect(habit.activeStartDate).toBeNull();
  });

  it("accepts an active habit with anchor and start date", () => {
    const habit: Habit = {
      id: makeHabitId("habit-2"),
      name: "Su iç",
      order: 2,
      status: "active",
      activeStartDate: "2026-05-03",
      triggeredUnlockAt: null,
      anchor: "kahvaltıdan sonra",
      createdAt: "2026-05-03T00:00:00Z",
      updatedAt: "2026-05-03T00:00:00Z",
    };
    expect(habit.status).toBe("active");
    expect(habit.anchor).toBe("kahvaltıdan sonra");
  });

  it("accepts an active habit that has already triggered an unlock", () => {
    const habit: Habit = {
      id: makeHabitId("habit-3"),
      name: "1 sayfa kitap",
      order: 3,
      status: "active",
      activeStartDate: "2026-04-15",
      triggeredUnlockAt: "2026-04-29",
      anchor: null,
      createdAt: "2026-04-15T00:00:00Z",
      updatedAt: "2026-04-29T00:00:00Z",
    };
    expect(habit.triggeredUnlockAt).toBe("2026-04-29");
    expect(habit.status).toBe("active");
  });
});

describe("HabitLog entity", () => {
  it("accepts a log keyed by HabitId and a day-level date", () => {
    const log: HabitLog = {
      habitId: makeHabitId("habit-1"),
      date: "2026-05-03",
    };
    expect(log.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(log.habitId).toBe("habit-1");
  });
});

describe("HabitId branded type", () => {
  it("makeHabitId returns the same string value at runtime", () => {
    const id = makeHabitId("a-known-id");
    expect(id).toBe("a-known-id");
  });

  it("HabitId is structurally a string but distinguished by the brand at compile time", () => {
    const id = makeHabitId("x");
    expect(typeof id).toBe("string");
  });
});
