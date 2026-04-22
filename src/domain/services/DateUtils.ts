export function todayKey(): string {
  return toDateKey(new Date());
}

export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDays(dateKey: string, days: number): string {
  const d = new Date(dateKey + "T00:00:00");
  d.setDate(d.getDate() + days);
  return toDateKey(d);
}

export function daysInRange(startKey: string, endKey: string): string[] {
  const result: string[] = [];
  let current = startKey;
  while (current <= endKey) {
    result.push(current);
    current = addDays(current, 1);
  }
  return result;
}

export function lastNDaysKeys(n: number, todayOverride?: string): string[] {
  const today = todayOverride ?? todayKey();
  const start = addDays(today, -(n - 1));
  return daysInRange(start, today);
}
