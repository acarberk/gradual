const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

function assertIsoDate(value: string): void {
  if (!ISO_DATE_REGEX.test(value)) {
    throw new Error(`Invalid ISO date: ${value}. Expected YYYY-MM-DD.`);
  }
}

function toDate(value: string): Date {
  assertIsoDate(value);
  return new Date(`${value}T00:00:00`);
}

function toIso(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function todayKey(now: Date = new Date()): string {
  return toIso(now);
}

export function addDays(date: string, days: number): string {
  const d = toDate(date);
  d.setDate(d.getDate() + days);
  return toIso(d);
}

export function daysBetween(start: string, end: string): number {
  const startDate = toDate(start);
  const endDate = toDate(end);
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((endDate.getTime() - startDate.getTime()) / msPerDay);
}

export function isWithinWindow(date: string, start: string, end: string): boolean {
  return date >= start && date <= end;
}

export function dateRange(start: string, end: string): string[] {
  const total = daysBetween(start, end);
  if (total < 0) return [];
  const result: string[] = [];
  for (let i = 0; i <= total; i++) {
    result.push(addDays(start, i));
  }
  return result;
}
