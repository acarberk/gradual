import type { Habit } from "@/src/domain/entities/Habit";
import { INITIAL_ACTIVE_IDS } from "@/src/config/constants";

export const DEFAULT_HABITS: Habit[] = [
  {
    id: "sleep",
    order: 1,
    name: "Düzenli saatte yat",
    meta: "Her şeyin temeli — hedef: aynı saat ±30dk",
    isActive: true,
  },
  {
    id: "water",
    order: 2,
    name: "Günde 2L+ su",
    meta: "En kolay kazanım, enerji için kritik",
    isActive: true,
  },
  {
    id: "move",
    order: 3,
    name: "20dk hareket / yürüyüş",
    meta: "Spor günü değilse bile — sadece kıpırda",
    isActive: false,
  },
  {
    id: "plan",
    order: 4,
    name: "Günlük 5dk planlama",
    meta: "Sabah veya akşam, 3 öncelik yaz",
    isActive: false,
  },
  {
    id: "mobility",
    order: 5,
    name: "5dk esneme / mobility",
    meta: "FFXIV + masa başı için şart",
    isActive: false,
  },
  {
    id: "morning",
    order: 6,
    name: "Sabah rutini",
    meta: "Yatak topla, yüz yıka, 5dk toparlan",
    isActive: false,
  },
  {
    id: "meals",
    order: 7,
    name: "Düzgün öğün",
    meta: "Günde en az 2 doğru öğün, fast food az",
    isActive: false,
  },
  {
    id: "home",
    order: 8,
    name: "Ev düzeni",
    meta: "Bulaşık/çamaşır biriktirme, 10dk toparla",
    isActive: false,
  },
  {
    id: "read",
    order: 9,
    name: "15dk okuma",
    meta: "Ekran değil — kitap, makale okusan da olur",
    isActive: false,
  },
  {
    id: "screen",
    order: 10,
    name: "Yatmadan 1 saat ekran kapalı",
    meta: "Uyku kalitesinin gizli kozu",
    isActive: false,
  },
];

// Sanity check: INITIAL_ACTIVE_IDS must match isActive:true in seed
const _: (typeof INITIAL_ACTIVE_IDS)[number][] = DEFAULT_HABITS.filter((h) => h.isActive).map(
  (h) => h.id as (typeof INITIAL_ACTIVE_IDS)[number],
);
void _;
