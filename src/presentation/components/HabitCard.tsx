"use client";

import type { HabitViewModel } from "@/src/application/GetTrackerView";
import { Calendar15Days } from "./Calendar15Days";
import { UNLOCK_WINDOW } from "@/src/config/constants";

type Props = {
  vm: HabitViewModel;
  onToggle: (habitId: string) => void;
};

export function HabitCard({ vm, onToggle }: Props) {
  const { habit, streak, hitCount, daysToUnlock, calendarDays, loggedToday } = vm;

  return (
    <button
      onClick={() => onToggle(habit.id)}
      className={`w-full rounded-2xl border p-4 text-left transition-all ${
        loggedToday
          ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40"
          : "border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
            loggedToday
              ? "border-emerald-500 bg-emerald-500"
              : "border-zinc-300 dark:border-zinc-600"
          }`}
        >
          {loggedToday && (
            <svg
              className="h-3 w-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p
              className={`text-sm leading-snug font-semibold ${loggedToday ? "text-emerald-800 dark:text-emerald-300" : "text-zinc-900 dark:text-white"}`}
            >
              {habit.name}
            </p>
            {streak > 0 && (
              <span className="flex-shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
                {streak}g seri
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            {habit.meta}
          </p>

          <Calendar15Days days={calendarDays} />

          <p className="mt-1.5 text-xs text-zinc-400 dark:text-zinc-500">
            Son {UNLOCK_WINDOW} gün: {hitCount}/{UNLOCK_WINDOW}
            {daysToUnlock > 0
              ? ` — yenisini açmaya ${daysToUnlock} gün kaldı`
              : " — bir sonrakini açtı!"}
          </p>
        </div>
      </div>
    </button>
  );
}
