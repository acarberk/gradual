"use client";

import type { Habit } from "@/src/domain/entities/Habit";

type Props = {
  habit: Habit;
  isNext: boolean;
};

export function LockedCard({ habit, isNext }: Props) {
  return (
    <div
      className={`w-full rounded-2xl p-4 border opacity-50 ${
        isNext
          ? "bg-zinc-50 border-zinc-300 dark:bg-zinc-900 dark:border-zinc-700"
          : "bg-zinc-50 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 w-5 h-5 rounded-full border-2 border-zinc-300 dark:border-zinc-600 flex-shrink-0 flex items-center justify-center">
          <svg className="w-3 h-3 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm text-zinc-700 dark:text-zinc-300">{habit.name}</p>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              isNext
                ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
                : "bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500"
            }`}>
              {isNext ? "sıradaki" : "kilitli"}
            </span>
          </div>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{habit.meta}</p>
        </div>
      </div>
    </div>
  );
}
