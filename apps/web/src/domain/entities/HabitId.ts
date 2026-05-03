export type HabitId = string & { readonly __brand: "HabitId" };

export function makeHabitId(value: string): HabitId {
  return value as HabitId;
}
