"use client";

import type { TrackerView } from "@/src/application/GetTrackerView";
import { HabitCard } from "./HabitCard";
import { LockedCard } from "./LockedCard";

type Props = {
  view: TrackerView;
  onToggle: (habitId: string) => void;
};

export function HabitList({ view, onToggle }: Props) {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="mb-3 text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
          Aktif alışkanlıklar
        </h2>
        <div className="space-y-2">
          {view.activeHabits.map((vm) => (
            <HabitCard key={vm.habit.id} vm={vm} onToggle={onToggle} />
          ))}
        </div>
      </section>

      {view.lockedHabits.length > 0 && (
        <section>
          <h2 className="mb-3 text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
            Sıradaki
          </h2>
          <div className="space-y-2">
            {view.lockedHabits.map((habit) => (
              <LockedCard key={habit.id} habit={habit} isNext={habit.id === view.nextHabit?.id} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
