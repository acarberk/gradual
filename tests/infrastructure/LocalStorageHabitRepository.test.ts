import { describe, it, expect, beforeEach } from "vitest";
import { LocalStorageHabitRepository } from "@/src/infrastructure/repositories/LocalStorageHabitRepository";

// jsdom provides localStorage globally in test environment

describe("LocalStorageHabitRepository", () => {
  let repo: LocalStorageHabitRepository;

  beforeEach(() => {
    localStorage.clear();
    repo = new LocalStorageHabitRepository();
  });

  it("seeds with default habits on first load", async () => {
    const all = await repo.getAll();
    expect(all).toHaveLength(10);
  });

  it("initially active habits are sleep and water", async () => {
    const active = await repo.getActive();
    expect(active.map((h) => h.id).sort()).toEqual(["sleep", "water"]);
  });

  it("activate adds habit to active list", async () => {
    await repo.activate("move");
    const active = await repo.getActive();
    expect(active.some((h) => h.id === "move")).toBe(true);
  });

  it("activate is idempotent", async () => {
    await repo.activate("sleep");
    const active = await repo.getActive();
    const sleepCount = active.filter((h) => h.id === "sleep").length;
    expect(sleepCount).toBe(1);
  });

  it("reset restores seed state", async () => {
    await repo.activate("move");
    await repo.activate("plan");
    await repo.reset();
    const active = await repo.getActive();
    expect(active.map((h) => h.id).sort()).toEqual(["sleep", "water"]);
  });
});
