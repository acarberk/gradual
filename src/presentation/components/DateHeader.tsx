"use client";

type Props = { today: string };

const DAYS = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
const MONTHS = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

export function DateHeader({ today }: Props) {
  const d = new Date(today + "T00:00:00");
  const dayName = DAYS[d.getDay()];
  const dayNum = d.getDate();
  const monthName = MONTHS[d.getMonth()];

  return (
    <div className="mb-6">
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        {dayName}, {dayNum} {monthName}
      </p>
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Bugün</h1>
      <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
        Alışkanlıklarını takip et, kademeli olarak genişlet
      </p>
    </div>
  );
}
