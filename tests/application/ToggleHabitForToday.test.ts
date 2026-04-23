import { describe, it, expect, vi } from "vitest";
import { toggleHabitForToday } from "@/src/application/ToggleHabitForToday";
import * as DateUtils from "@/src/domain/services/DateUtils";
import type { LogRepository } from "@/src/infrastructure/repositories/LogRepository";

const TODAY = "2026-04-23";

vi.spyOn(DateUtils, "todayKey").mockReturnValue(TODAY);

const makeLogRepo = (initialLogs: { habitId: string; date: string }[] = []): LogRepository => {
  const logs = [...initialLogs];
  return {
    getAll: async () => [...logs],
    getByHabit: async (id) => logs.filter((l) => l.habitId === id),
    toggle: async (habitId, date) => {
      const idx = logs.findIndex((l) => l.habitId === habitId && l.date === date);
      if (idx >= 0) logs.splice(idx, 1);
      else logs.push({ habitId, date });
    },
    reset: async () => {
      logs.length = 0;
    },
  };
};

describe("toggleHabitForToday", () => {
  it("adds a log when habit not yet logged today", async () => {
    const repo = makeLogRepo();
    await toggleHabitForToday(repo, "sleep");
    const all = await repo.getAll();
    expect(all).toContainEqual({ habitId: "sleep", date: TODAY });
  });

  it("removes log when habit already logged today", async () => {
    const repo = makeLogRepo([{ habitId: "sleep", date: TODAY }]);
    await toggleHabitForToday(repo, "sleep");
    const all = await repo.getAll();
    expect(all).not.toContainEqual({ habitId: "sleep", date: TODAY });
  });

  it("does not affect other habits", async () => {
    const repo = makeLogRepo([{ habitId: "water", date: TODAY }]);
    await toggleHabitForToday(repo, "sleep");
    const all = await repo.getAll();
    expect(all.some((l) => l.habitId === "water")).toBe(true);
  });
});
