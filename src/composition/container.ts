import { LocalStorageHabitRepository } from "@/src/infrastructure/repositories/LocalStorageHabitRepository";
import { LocalStorageLogRepository } from "@/src/infrastructure/repositories/LocalStorageLogRepository";
import { ThresholdUnlockStrategy } from "@/src/domain/strategies/ThresholdUnlockStrategy";
import type { HabitRepository } from "@/src/infrastructure/repositories/HabitRepository";
import type { LogRepository } from "@/src/infrastructure/repositories/LogRepository";
import type { UnlockStrategy } from "@/src/domain/strategies/UnlockStrategy";

type Container = {
  habitRepo: HabitRepository;
  logRepo: LogRepository;
  unlockStrategy: UnlockStrategy;
};

let instance: Container | null = null;

export function getContainer(): Container {
  if (!instance) {
    instance = {
      habitRepo: new LocalStorageHabitRepository(),
      logRepo: new LocalStorageLogRepository(),
      unlockStrategy: new ThresholdUnlockStrategy(),
    };
  }
  return instance;
}
