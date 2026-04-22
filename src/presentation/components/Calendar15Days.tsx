"use client";

type Day = { date: string; logged: boolean };
type Props = { days: Day[] };

export function Calendar15Days({ days }: Props) {
  return (
    <div className="flex gap-0.5 mt-2">
      {days.map(({ date, logged }) => (
        <div
          key={date}
          title={date}
          className={`h-2 flex-1 rounded-sm ${
            logged
              ? "bg-emerald-500 dark:bg-emerald-400"
              : "bg-zinc-200 dark:bg-zinc-700"
          }`}
        />
      ))}
    </div>
  );
}
