"use client";

import { useEffect } from "react";
import { useHabitStore } from "@/src/presentation/store/useHabitStore";
import { useHydration } from "@/src/presentation/hooks/useHydration";
import { DateHeader } from "@/src/presentation/components/DateHeader";
import { StatsRow } from "@/src/presentation/components/StatsRow";
import { HabitList } from "@/src/presentation/components/HabitList";
import { ResetButton } from "@/src/presentation/components/ResetButton";

export default function HomePage() {
  const hydrated = useHydration();
  const { view, refresh, toggle, reset } = useHabitStore();

  useEffect(() => {
    if (hydrated) refresh();
  }, [hydrated, refresh]);

  if (!hydrated || !view) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-600" />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-md px-4 py-8 pb-16">
      <DateHeader today={view.today} />
      <StatsRow
        totalActive={view.totalActive}
        longestStreak={view.longestStreak}
        completedToday={view.completedToday}
        totalToday={view.totalToday}
      />
      <HabitList view={view} onToggle={toggle} />
      <div className="mt-10 flex justify-center">
        <ResetButton onReset={reset} />
      </div>
    </main>
  );
}
