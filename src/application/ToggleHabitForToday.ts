import type { LogRepository } from "@/src/infrastructure/repositories/LogRepository";
import { todayKey } from "@/src/domain/services/DateUtils";

export async function toggleHabitForToday(
  logRepo: LogRepository,
  habitId: string
): Promise<void> {
  await logRepo.toggle(habitId, todayKey());
}
