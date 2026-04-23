"use client";

type Props = {
  totalActive: number;
  longestStreak: number;
  completedToday: number;
  totalToday: number;
};

export function StatsRow({ totalActive, longestStreak, completedToday, totalToday }: Props) {
  const stats = [
    { label: "Aktif", value: String(totalActive) },
    { label: "En uzun seri", value: `${longestStreak}g` },
    { label: "Bugün", value: `${completedToday}/${totalToday}` },
  ];

  return (
    <div className="mb-6 grid grid-cols-3 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl bg-zinc-100 p-3 text-center dark:bg-zinc-800">
          <p className="text-xl font-bold text-zinc-900 dark:text-white">{s.value}</p>
          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
