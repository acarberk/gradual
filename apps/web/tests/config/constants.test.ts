import { describe, expect, it } from "vitest";
import { MAX_HABIT_NAME_LENGTH, THRESHOLD, WINDOW_DAYS } from "@/src/config/constants";

describe("domain constants", () => {
  it("WINDOW_DAYS is the rolling window length used by the unlock rule", () => {
    expect(WINDOW_DAYS).toBe(14);
  });

  it("THRESHOLD is the minimum completions required within the window to unlock the next habit", () => {
    expect(THRESHOLD).toBe(10);
  });

  it("THRESHOLD is strictly less than WINDOW_DAYS so the rule allows missed days", () => {
    expect(THRESHOLD).toBeLessThan(WINDOW_DAYS);
  });

  it("MAX_HABIT_NAME_LENGTH allows reasonable Turkish habit names", () => {
    expect(MAX_HABIT_NAME_LENGTH).toBe(50);
    expect(MAX_HABIT_NAME_LENGTH).toBeGreaterThanOrEqual(20);
  });
});
