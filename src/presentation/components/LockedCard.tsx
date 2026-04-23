"use client";

import type { Habit } from "@/src/domain/entities/Habit";

type Props = {
  habit: Habit;
  isNext: boolean;
};

export function LockedCard({ habit, isNext }: Props) {
  return (
    <div
      className={`w-full rounded-2xl border p-4 opacity-50 ${
        isNext
          ? "border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900"
          : "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-zinc-300 dark:border-zinc-600">
          <svg
            className="h-3 w-3 text-zinc-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{habit.name}</p>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                isNext
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
                  : "bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500"
              }`}
            >
              {isNext ? "sıradaki" : "kilitli"}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-zinc-400 dark:text-zinc-500">{habit.meta}</p>
        </div>
      </div>
    </div>
  );
}
