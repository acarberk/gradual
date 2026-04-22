"use client";

import { create } from "zustand";
import { getContainer } from "@/src/composition/container";
import { toggleHabitForToday } from "@/src/application/ToggleHabitForToday";
import { checkUnlocks } from "@/src/application/CheckUnlocks";
import { getTrackerView } from "@/src/application/GetTrackerView";
import { todayKey } from "@/src/domain/services/DateUtils";
import type { TrackerView } from "@/src/application/GetTrackerView";

type HabitStore = {
  view: TrackerView | null;
  loading: boolean;
  refresh: () => Promise<void>;
  toggle: (habitId: string) => Promise<void>;
  reset: () => Promise<void>;
};

export const useHabitStore = create<HabitStore>((set) => ({
  view: null,
  loading: false,

  refresh: async () => {
    set({ loading: true });
    const { habitRepo, logRepo } = getContainer();
    const view = await getTrackerView(habitRepo, logRepo, todayKey());
    set({ view, loading: false });
  },

  toggle: async (habitId: string) => {
    const { habitRepo, logRepo, unlockStrategy } = getContainer();
    await toggleHabitForToday(logRepo, habitId);
    await checkUnlocks(habitRepo, logRepo, unlockStrategy);
    const view = await getTrackerView(habitRepo, logRepo, todayKey());
    set({ view });
  },

  reset: async () => {
    const { habitRepo, logRepo } = getContainer();
    await habitRepo.reset();
    await logRepo.reset();
    const view = await getTrackerView(habitRepo, logRepo, todayKey());
    set({ view });
  },
}));
