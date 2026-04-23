import type { HabitRepository } from "@/src/infrastructure/repositories/HabitRepository";
import type { LogRepository } from "@/src/infrastructure/repositories/LogRepository";
import type { UnlockStrategy } from "@/src/domain/strategies/UnlockStrategy";
import { todayKey } from "@/src/domain/services/DateUtils";

export async function checkUnlocks(
  habitRepo: HabitRepository,
  logRepo: LogRepository,
  strategy: UnlockStrategy,
): Promise<string | null> {
  const [activeHabits, allHabits, logs] = await Promise.all([
    habitRepo.getActive(),
    habitRepo.getAll(),
    logRepo.getAll(),
  ]);

  const next = strategy.shouldUnlockNext({
    activeHabits,
    allHabits,
    logs,
    today: todayKey(),
  });

  if (next) {
    await habitRepo.activate(next.id);
    return next.id;
  }
  return null;
}
