import { describe, expect, it } from "vitest";
import {
  addDays,
  dateRange,
  daysBetween,
  isWithinWindow,
  todayKey,
} from "@/src/domain/services/DateUtils";

describe("DateUtils.todayKey", () => {
  it("returns YYYY-MM-DD format", () => {
    const result = todayKey();
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("returns the date matching the supplied Date object's local components", () => {
    const fixed = new Date(2026, 4, 3);
    expect(todayKey(fixed)).toBe("2026-05-03");
  });

  it("pads single-digit months and days with zero", () => {
    const fixed = new Date(2026, 0, 5);
    expect(todayKey(fixed)).toBe("2026-01-05");
  });
});

describe("DateUtils.addDays", () => {
  it("adds positive days", () => {
    expect(addDays("2026-05-03", 1)).toBe("2026-05-04");
    expect(addDays("2026-05-03", 14)).toBe("2026-05-17");
  });

  it("subtracts with negative days", () => {
    expect(addDays("2026-05-03", -1)).toBe("2026-05-02");
    expect(addDays("2026-05-03", -13)).toBe("2026-04-20");
  });

  it("handles month boundary", () => {
    expect(addDays("2026-04-30", 1)).toBe("2026-05-01");
    expect(addDays("2026-05-01", -1)).toBe("2026-04-30");
  });

  it("handles year boundary", () => {
    expect(addDays("2025-12-31", 1)).toBe("2026-01-01");
    expect(addDays("2026-01-01", -1)).toBe("2025-12-31");
  });

  it("handles leap year February", () => {
    expect(addDays("2028-02-28", 1)).toBe("2028-02-29");
    expect(addDays("2028-02-29", 1)).toBe("2028-03-01");
  });

  it("zero days returns same date", () => {
    expect(addDays("2026-05-03", 0)).toBe("2026-05-03");
  });

  it("rejects malformed input", () => {
    expect(() => addDays("not-a-date", 1)).toThrow();
    expect(() => addDays("2026/05/03", 1)).toThrow();
  });
});

describe("DateUtils.daysBetween", () => {
  it("returns 0 for the same date", () => {
    expect(daysBetween("2026-05-03", "2026-05-03")).toBe(0);
  });

  it("returns positive count for end after start", () => {
    expect(daysBetween("2026-05-03", "2026-05-04")).toBe(1);
    expect(daysBetween("2026-05-03", "2026-05-17")).toBe(14);
  });

  it("returns negative count for end before start", () => {
    expect(daysBetween("2026-05-04", "2026-05-03")).toBe(-1);
  });

  it("crosses month and year boundaries correctly", () => {
    expect(daysBetween("2026-04-30", "2026-05-01")).toBe(1);
    expect(daysBetween("2025-12-31", "2026-01-01")).toBe(1);
  });
});

describe("DateUtils.isWithinWindow", () => {
  it("includes both bounds", () => {
    expect(isWithinWindow("2026-05-03", "2026-05-03", "2026-05-10")).toBe(true);
    expect(isWithinWindow("2026-05-10", "2026-05-03", "2026-05-10")).toBe(true);
  });

  it("excludes dates outside the window", () => {
    expect(isWithinWindow("2026-05-02", "2026-05-03", "2026-05-10")).toBe(false);
    expect(isWithinWindow("2026-05-11", "2026-05-03", "2026-05-10")).toBe(false);
  });

  it("includes any day strictly inside the window", () => {
    expect(isWithinWindow("2026-05-07", "2026-05-03", "2026-05-10")).toBe(true);
  });
});

describe("DateUtils.dateRange", () => {
  it("returns inclusive range", () => {
    expect(dateRange("2026-05-03", "2026-05-05")).toEqual([
      "2026-05-03",
      "2026-05-04",
      "2026-05-05",
    ]);
  });

  it("returns single-element array for same start and end", () => {
    expect(dateRange("2026-05-03", "2026-05-03")).toEqual(["2026-05-03"]);
  });

  it("returns empty array if end is before start", () => {
    expect(dateRange("2026-05-05", "2026-05-03")).toEqual([]);
  });

  it("returns 14 dates for a typical unlock window", () => {
    const range = dateRange("2026-05-03", "2026-05-16");
    expect(range).toHaveLength(14);
    expect(range[0]).toBe("2026-05-03");
    expect(range[13]).toBe("2026-05-16");
  });
});
