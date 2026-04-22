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
      className={`w-full text-left rounded-2xl p-4 transition-all border ${
        loggedToday
          ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800"
          : "bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
            loggedToday
              ? "bg-emerald-500 border-emerald-500"
              : "border-zinc-300 dark:border-zinc-600"
          }`}
        >
          {loggedToday && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className={`font-semibold text-sm leading-snug ${loggedToday ? "text-emerald-800 dark:text-emerald-300" : "text-zinc-900 dark:text-white"}`}>
              {habit.name}
            </p>
            {streak > 0 && (
              <span className="flex-shrink-0 text-xs font-semibold bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 px-2 py-0.5 rounded-full">
                {streak}g seri
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
            {habit.meta}
          </p>

          <Calendar15Days days={calendarDays} />

          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1.5">
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
