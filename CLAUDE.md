# Gradual — CLAUDE.md

Bu dosya Claude Code'un proje hafizasidir. Her oturumda otomatik okunur.

@AGENTS.md

---

## Proje Vizyonu

**Gradual**, 10 alışkanlığı aynı anda kurmaya çalışıp başarısız olan kullanıcılar için sıralı kilit açma mekaniğiyle çalışan bir habit tracker. Aktif alışkanlık 14 gün içinde 10 gün tutturulursa bir sonraki kilitli alışkanlık açılır.

**Neden "Gradual"?**

- Kademeli / dereceli anlamı — aynı anda hepsini değil, biriktir
- "Gradual unlock" oyun kültüründen bilinen mekanik
- Türkçe telaffuzu basit, İngilizce pazarda anlaşılır

**Temel fark yaratacak özellikler:**

- **Sıralı kilit açma** — tek rakipte yok, bizim moat'ımız
- **Türkçe first-class UX** — 45M+ Türk kullanıcı, rakipte birinci sınıf Türkçe yok
- **PWA + Native** — App Store paywall'larından bağımsız dağıtım
- **Ücretsiz core** — ana mekanik asla paywall arkasına geçmez
- **Anti-streak-travması** — 14 günlük pencere, 1 gün kaçırma streak bitirmez

---

## Tech Stack

### Frontend (PWA)

- **Next.js 16** — Static export mode (Capacitor için)
- **React 19**
- **TypeScript strict**
- **Tailwind CSS v4**
- **Zustand** — client state
- **Service Worker** — PWA + Web Push API

### Mobile

- **Capacitor** — PWA'yı iOS + Android paketlemesi için saran native kabuk
- `@capacitor/push-notifications` — APN (iOS) + FCM (Android)
- `@capacitor/haptics` — tik geri bildirimi
- `@capacitor/share` — habit paylaşımı
- `@capacitor/preferences` — native storage (localStorage migrasyon)

**Neden Capacitor, React Native değil:**
Mevcut PWA kod tabanının %100'ünü paylaşır. Habit tracker için native render performansı önemsiz. İleride Expo/RN'ye geçiş domain katmanı temiz olduğu için kolay.

### Backend (sadece Pro kullanıcıları için)

- **Supabase** — Postgres + Auth (magic link) + Row-Level Security
- Tek tablo: `sync_blobs` (user_id, encrypted_blob, updated_at)
- Client-side E2E şifreleme — server plaintext görmez
- Serverless, Free tier 50K MAU'ya kadar yeterli

### Payment

- **RevenueCat** — Stripe (web) + Apple IAP + Google Play Billing tek API
- Free tier $2.5K aylık gelire kadar ücretsiz, sonrası %1
- Entitlement sistemi (Pro aktif mi) tek yerde

### Analytics & Monitoring

- **Vercel Analytics** — sayfa görüntüleme
- **Özel event'ler** — `habit_checked`, `habit_unlocked`, `day_streak_broken`, `paywall_viewed`, `pro_purchased`
- **Sentry** (free tier) — error monitoring, source map upload

### Test

- **Vitest + Testing Library** — unit + component
- **Playwright** — E2E kritik akışlar (onboarding, habit tik, unlock, reset, sync)
- Coverage hedefi: domain + application %80+, presentation %50+

### Deployment

- **Vercel** — PWA (git push = deploy)
- **App Store Connect** — iOS
- **Google Play Console** — Android
- **Supabase Cloud** — backend (Pro özellikleri)

### i18n

- **Strateji:** Kod içi string'ler İngilizce, runtime'da çevrilir
- `locales/tr.json` — Türkçe (birinci sınıf)
- `locales/en.json` — İngilizce
- Kütüphane: `next-intl` (Next.js 16 uyumlu, hafif)
- Seed habit'ler i18n key ile taşınır: `habit.sleep.name`, `habit.sleep.meta`

### Git & CI/CD

- **Branching:** Trunk-Based Development — kısa ömürlü feature branch, sık merge
- **CI/CD:** GitHub Actions — PR'da lint + type-check + test + build
- **Deploy:** main'e merge = otomatik Vercel deploy
- **Commit:** Conventional Commits (commitlint + Husky pre-commit)
- **Branch naming:** `feature/`, `fix/`, `chore/`, `docs/`, `refactor/` + kebab-case
- **Commit'lerde Co-Authored-By satırı OLMAYACAK**
- **Repo:** GitHub Public (portfolyo)

---

## Kod Yazım Kuralları (ZORUNLU — İstisnasız)

### Dil

- Kod içinde **HİÇBİR Türkçe karakter/kelime OLMAYACAK**
- Kapsam: değişken/fonksiyon/class/dosya isimleri, string literal'lar, enum değerleri, log mesajları, error mesajları, test açıklamaları, commit mesajları, PR açıklamaları, branch isimleri
- Kullanıcıya gösterilen metinler her zaman `locales/tr.json` veya `locales/en.json` üzerinden i18n key ile
- İstisna yok — seed habit'ler bile key ile: `habit.sleep.name` → locale dosyasında çevrilir

### Yorum Satırları

- **Kod içinde yorum YAZMAYACAĞIM** (`//`, `/* */`, `#`, `<!-- -->`)
- Kod kendini anlatmalı — anlamlı isim + küçük fonksiyon + net tip imzası
- İstisna (sadece bunlar):
  - JSDoc/TSDoc — public API için
  - `// @ts-expect-error` / `// eslint-disable-next-line` — teknik zorunluluk
  - Config dosyalarında zorunlu syntax
  - Üçüncü parti kütüphane gerektirdiğinde

### Commit & PR Yazım

- Commit mesajları ve PR açıklamaları **İngilizce**
- **CLAUDE.md referansı yasak** — commit'lerde, PR'larda, kodda bahsedilmez
- **AI-written görünümü yasak:**
  - Emoji yok (teknik çıktı + badge hariç)
  - Abartılı başlık yok
  - Gereksiz markdown süsü yok
  - "Generated with Claude" imzası yok
- Commit stili: Kısa, teknik, doğrudan — Conventional Commits
- PR body: Değişikliğin "ne" ve "neden"ini kısa anlat, test plan ekle

---

## Internal Dokümantasyon Kuralı (ZORUNLU)

- **Design doc'lar, rekabet analizi, roadmap detayları, monetization kararları KOMMİT EDİLMEZ**
- Public repo'ya sadece **user-facing** dokümantasyon girer: README, LICENSE, SECURITY (varsa)
- İnternal teknik kararlar → `docs/internal/` klasörü (gitignored)
- Rationale:
  - Rekabet: pozisyon ve strateji public olmak zorunda değil
  - Değişkenlik: plan doc'lar sürekli değişir, kod PR'larından izole yaşar
- **Claude'un sorumluluğu:** yeni doc yazmadan önce sorar — public mi internal mi?

---

## Main Branch Koruma Sözü (ZORUNLU — Claude'un Kendi Kuralı)

> GitHub personal repo'larda server-side branch protection enforce edilmiyor.
> Bu yüzden main branch koruması **Claude'un disipline uymasına** bağlı.

**Claude olarak söz veriyorum:**

- ❌ **ASLA** `main` branch'ine doğrudan commit atmayacağım
- ❌ **ASLA** `git push origin main` komutunu çalıştırmayacağım
- ❌ **ASLA** `git push --force` kullanmayacağım (kullanıcı açıkça istemezse)
- ✅ **Her değişiklik** için önce feature branch: `git checkout -b <type>/<kebab-case-isim>`
- ✅ Branch'i push edip **PR açacağım**
- ✅ CI geçtikten sonra **kullanıcıdan onay** alıp merge edeceğim
- ✅ Merge sonrası **feature branch'i sileceğim** (lokal + remote)

**İstisna — Açık kullanıcı talimatı:**
Kullanıcı "acil, doğrudan main'e commit at" derse kural geçici olarak gevşer.

---

## Kurulum Sırası (config & tooling)

### Tamamlanmış

1. TypeScript strict mode ✅ (`tsconfig.json`)
2. ESLint ✅ (`eslint.config.mjs`)
3. Tailwind v4 ✅
4. Vitest + Testing Library ✅ (22 test mevcut)
5. Next.js 16 + PWA manifest ✅
6. Vercel deploy ✅

### Faz 0'da Yapılacak

7. Prettier ❌ — tutarlı format
8. Husky + lint-staged ❌ — pre-commit hook
9. Commitlint ❌ — Conventional Commits enforce
10. GitHub Actions CI ❌ — lint + type-check + test + build
11. CodeQL ❌ — SAST haftalık + PR
12. Dependabot ❌ — haftalık npm + github-actions güncellemeleri
13. Playwright ❌ — E2E kritik akışlar
14. Sentry ❌ — error monitoring

### Sonra (ihtiyaç olunca)

- Codecov — kapsamlı test seti oturunca
- SECURITY.md — Pro backend devreye girince
- Changesets — çoklu paket gerekirse (şimdilik tek app, gerek yok)

---

## Rakip Analizi (Tamamlandı)

Detaylı dokümantasyon: `docs/internal/competitive-analysis.md`

### Ana Rakipler (Özet)

| Rakip | Güçlü Yön | Kritik Eksik |
|-------|-----------|--------------|
| **Streaks** ($4.99 tek sefer) | Apple ekosistemi, en iyi widget | Sadece iOS, sıralı habit yok |
| **Habitify** ($30-95/yıl) | Cross-platform sync, analitik | 3 habit free limit, yavaş |
| **Loop** (free, open source) | Matematiksel strength formülü, privacy | Sadece Android, onboarding sıfır |
| **HabitKit** ($42 lifetime) | GitHub heatmap, privacy | 4 habit free, kategori yok |
| **Atoms** ($70-120/yıl) | James Clear markası, günlük ders | Pazarın en pahalısı |

### Pazar Boşlukları (Gradual Fırsatları)

1. **Sıralı kilit mekaniği** — hiçbir rakipte yok
2. **Türkçe first-class** — hiçbir rakipte yok
3. **PWA + Native birlikte ücretsiz** — rakipler ya app-store ya web
4. **Anti-streak-travması** — Loop matematiksel çözmüş ama pazarlamıyor

---

## Kullanıcı Beklentileri (Tamamlandı)

Detaylı dokümantasyon: `docs/internal/user-expectations.md`

### Mutlak Beklentiler (eksikse bırakıyorlar)

1. **3 saniyede log** — aç, tik, kapa
2. **Bildirim** — "olmayınca uygulamanın varlık sebebi yok"
3. **Veri güvencesi** — "telefonum bozuldu, her şey gitti" korkusu

### Güçlü Beklentiler (varsa bağlayıcı)

4. **Streak'e toleranslı yaklaşım** (1 gün kaçırma streak'i bitirmesin)
5. **Az ama doğru habit ile başlama** (BJ Fogg, Atomic Habits)
6. **Görsel tatmin** (heatmap, celebration)
7. **Esnek program** (haftada 3 gün, sadece hafta içi)

### Anti-beklentiler (yapınca nefret ediyorlar)

8. **Reklamlar** — 1 yıldız sebebi
9. **Karmaşık onboarding**
10. **Her yerde paywall** (3 habit free en büyük şikayet)
11. **Streak bozulma travması** — #1 terk sebebi

---

## Farklılaşma Mekaniği (Tamamlandı)

### Sıralı Kilit Açma (10/14 Kuralı)

- **Seed:** 10 alışkanlık, başlangıçta sadece 2'si aktif
- **Kural:** Aktif habit 14 gün içinde 10 gün tutturulursa → bir sonraki açılır
- **Tolerans:** 14 günlük kayan pencere — 1-2 gün kaçırma streak'i bitirmez
- **Reset:** Kullanıcı istediği zaman sıfırlayabilir (anti-cürck lock-in)
- **Pozisyon:** "Anti-kişisel-yenilgi" — başarısızlık kabul edilir, küçük başlangıç zorlanır

### Neden Moat

- Rakipler "hepsini aynı anda kur" diyor
- Araştırma (BJ Fogg, üniversite çalışmaları) "tek başla" diyor
- Arada mekanik boşluk → Gradual bunu zorla uyguluyor
- Feature değil, **pozisyon**

---

## Monetization (Tamamlandı)

Detaylı dokümantasyon: `docs/internal/monetization.md`

### Model: Freemium + Lifetime

**Gradual Free (Sonsuza kadar ücretsiz):**

- Sıralı kilit mekaniği (core)
- Sınırsız habit
- Yerel veri (localStorage / Capacitor Preferences)
- Bildirim
- Detaylı istatistik + heatmap
- JSON export

**Gradual Pro ($19 lifetime veya $2.99/ay):**

- Cloud sync (E2E şifreli)
- Çoklu cihaz senkronizasyonu
- Notion / Obsidian export
- Destekleyici rozeti (kozmetik)

### Kırmızı Çizgiler

- **Ana mekanik asla paywall arkasına geçmez** — pozisyon buna bağlı
- **İstatistik ekranı ücretsiz** — retention sürücüsü, paywall'a koymayız
- **Reklam yok** — anti-guilt pozisyonu ile çelişir
- **Veri satışı yok** — privacy moat
- **Yıllık subscription yok** — sadece ay veya lifetime; subscription yorgunluğu pozisyona ters

### Fiyat Rasyoneli

- $19 lifetime: Streaks $4.99 ve HabitKit $42 arasında — "ciddi ama sömürücü değil"
- Atoms $120/yıl ile karşılaştırıldığında 6 yılda bedavaya geliyor
- TRY fiyat RevenueCat tarafından dinamik ayarlanır

---

## MVP Kapsamı — Yol Haritası

Detaylı faz planı: `docs/internal/roadmap.md`

### v1.0 — İlk Sürüm (Faz 0-6, ~13-14 hafta part-time)

#### Faz 0: Temel Güçlendirme (1 hafta)

- Error boundary + boş durum
- Prettier + Husky + Commitlint
- GitHub Actions CI (lint/type/test/build)
- CodeQL + Dependabot
- Playwright E2E — 3 kritik akış
- Sentry kurulum
- Vercel Analytics + özel event'ler

#### Faz 1: Pozisyon & Onboarding (2 hafta)

- i18n altyapısı (next-intl, tr/en)
- 3 ekranlı onboarding (sorun → mekanik → ilk habit)
- İlerleme göstergesi (X/14 günde Y)
- Kilit açılma celebration (animasyon + haptic + mesaj)
- Kilitli kart beklenti metni
- Landing sayfası (pozisyon mesajı)

#### Faz 2: Bildirim (1 hafta)

- Web Push API kurulumu (VAPID)
- Zamanlama UI — habit başına saat
- Günlük hatırlatıcı + "günü kurtar" varyantı
- İzin akışı (cold ask değil, value sonrası)

#### Faz 3: Cloud Sync + Monetization (3 hafta)

- Supabase kurulumu — auth (magic link) + sync_blobs tablosu + RLS
- Client-side E2E encryption
- Repository dekoratörü (LocalStorage + cloud)
- RevenueCat entegrasyonu (Stripe + Apple IAP + Google Play)
- Entitlement katmanı (domain'e `ProStatus`)
- Paywall ekranı (tek sefer, cloud sync toggle'ında)
- Restore purchases akışı

#### Faz 4: Mobil Uygulama Paketleme (2 hafta)

- Next.js static export moduna geçiş
- Capacitor kurulum (iOS + Android)
- Platform adaptörleri (NotificationAdapter, HapticAdapter)
- iOS Xcode projesi + Apple Developer
- Android Studio projesi + Play Console
- Store listeleri + ekran görüntüleri + privacy policy
- TestFlight + Play Internal Test

#### Faz 5: Görsel Zenginleştirme (2-3 hafta)

- Detaylı istatistik ekranı (heatmap, unlock timeline, trend)
- Widget (iOS + Android Capacitor plugin)
- Mikro-animasyonlar + haptik
- Haftalık özet push bildirimi

#### Faz 6: Lansman (1 hafta)

- Pozisyon blog yazısı (tr + en)
- Product Hunt launch
- Reddit (r/productivity, r/habits, r/GetDisciplined)
- Ekşi Sözlük (tr)
- Twitter/X thread

### v1.1 (v1.0 + 2-3 ay)

- Haftalık/aylık challenge
- Haptic celebration iyileştirmesi
- Apple Watch + Android Wear companion
- Daha gelişmiş istatistik (yıllık özet)

### v1.2 (v1.1 + 3-4 ay)

- "Partner mode" — iki kişinin sıralı ilerlemesi
- Habit library (uzman önerileri)
- Opsiyonel public profil (istiyorsan paylaşırsın)

---

## UI/UX Tasarımı

### Sayfalar

- `/` — Ana ekran (ilk ziyaret: onboarding yönlendirme, hidrate: habit list)
- `/onboarding` — 3 ekran: sorun → mekanik → ilk habit tik
- `/stats` — Heatmap + unlock timeline + haftalık trend (ücretsiz)
- `/settings` — Veri, sync toggle, tema, bildirim, dil
- `/paywall` — Pro karşılaştırma tablosu + $19 lifetime CTA

### Ana Ekran Hiyerarşisi

```
DateHeader (bugün, haftanın günü)
StatsRow (aktif habit X/Y tamamlandı, aktif habit #)
Calendar15Days (son 15 gün görsel)
HabitList
  HabitCard (aktif, tik atılabilir)
  HabitCard (aktif, tik atılabilir)
  LockedCard x N (kilitli, "Y gün sonra açılabilir")
ResetButton (en altta, küçük)
```

### Kritik Akışlar

1. **İlk açılış** → onboarding → ilk habit tik → "yarın tekrar gel" mesajı
2. **Günlük kullanım** (5-10 sn) → aç → aktif habit tik → kapa
3. **Kilit açma** → 10/14 hedefi → tam sayfa celebration → yeni kart
4. **Pro satın alma** → ayarlar → cloud sync toggle → paywall → RevenueCat → magic link → ilk sync
5. **Reset** → ayarlar → reset confirm → seed state

### Tasarım Prensipleri

- **Minimalist** — gereksiz UI eleman yok, Loop / Streaks dili
- **Koyu mod öncelikli** — habit tracker akşam/sabah kullanılır
- **Parmak dostu** — tik alanları ≥ 44pt
- **Hızlı geri bildirim** — tik anında görsel + haptic
- **Zero-state kullanışlı** — ilk açılış boş değil, action-odaklı

---

## Öğretme Yaklaşımı (HER KOD YAZIMINDA UYGULANACAK)

- **Adım adım ilerle** — küçük, anlaşılır parçalar halinde kod yaz
- **5N1K açıklaması** — her kod bloğu için:
  - **Ne:** Bu kod ne yapıyor?
  - **Neden:** Neden bu şekilde yazdık?
  - **Nasıl:** Nasıl çalışıyor (mekanizma)?
  - **Nerede:** Projede nereye oturuyor?
  - **Ne zaman:** Ne zaman çalışır/tetiklenir?
  - **Alternatifler:** Başka nasıl yazılabilirdi? Neden bu yöntemi tercih ettik?
- **Terim açıklaması** — her yeni teknik terimi ilk kullanımda açıkla
- **Kısa kod blokları** — büyük dosyaları parça parça yaz, her parçayı açıkla, review'a sun
- **Mülakat soruları** — her konunun sonunda 1-2 adet senior seviyesinde teknik mülakat sorusu sor:
  - Gerçek mülakatlarda sorulacak tarzda, açık uçlu ve düşündürücü
  - "Neden X yerine Y?", "Bu yaklaşımın trade-off'ları?", "Production'da nasıl ölçeklenir?"
  - Cevabı basit "evet/hayır" olmayan
  - Proje bağlamına oturtulmuş
- Proje amacı: hem ürün çıkarmak hem öğrenmek — ikisi birlikte

---

## Kod Kalitesi Standartları (ZORUNLU)

### SOLID Prensipleri (zaten uygulanıyor)

Mevcut mimari clean architecture ile SOLID'e uyuyor:

- **S** — `src/domain/`, `src/application/`, `src/infrastructure/`, `src/presentation/`, `src/composition/` her katman tek sorumluluk
- **O** — `UnlockStrategy` interface'i + `ThresholdUnlockStrategy` implementasyonu; yeni strateji eklenebilir, mevcut değişmez
- **L** — Repository implementasyonları arayüzü bozmadan yer değiştirebilir
- **I** — `HabitRepository`, `LogRepository` ayrı arayüzler, büyük şişkin interface yok
- **D** — Application use-case'leri somut repository'ye değil arayüze bağlı, composition root'ta enjekte edilir

### Clean Architecture Katmanları

```
src/
├── domain/              Pure TypeScript, framework bağımsız
│   ├── entities/        Habit, HabitLog, HabitStatus
│   ├── services/        DateUtils, StreakCalculator, CompletionRate
│   └── strategies/      UnlockStrategy, ThresholdUnlockStrategy
├── application/         Use-case orchestration
├── infrastructure/      External concerns (repositories, seed)
├── presentation/        UI katmanı (components, hooks, store)
├── composition/         Dependency injection root
└── config/              Constants, feature flags
```

**Kural:** Inner katmanlar outer katmanları bilmez. Domain → bağımsız. Application → domain'i kullanır. Infrastructure → arayüzleri implement eder. Presentation → composition root'tan DI alır.

### React / Next.js Best Practices

- **Thinking in React** — UI'ı component hiyerarşisine böl, state'i minimal tut
- **Server Components öncelikli** — `"use client"` sadece gerektiğinde
- **Composition over Inheritance** — component'ları composition ile birleştir
- **Custom Hook'lar** — tekrarlanan logic'i `src/presentation/hooks/` altına çıkar
- **Colocate related code** — feature-based folder structure
- **Key prop** — liste render'larda unique ve stable key
- **useCallback/useMemo** — sadece gerçek performans problemi varsa (premature optimization yapma)
- **Error Boundary** — Faz 0'da eklenecek

### Güvenlik (Pro backend geldiğinde aktif)

- **Input validation** — Zod ile her şey validate
- **RLS (Row-Level Security)** — Supabase'de kullanıcı sadece kendi verisine erişir
- **E2E encryption** — sync blob'ları client'ta şifrelenir, server asla plaintext görmez
- **Magic link** — parola yok, JWT kısa ömürlü
- **Secret'lar .env** — asla commit edilmez
- **Rate limiting** — Supabase edge functions üzerinden
- **Dependency audit** — `npm audit` + Dependabot

### Paket Versiyon Politikası (ZORUNLU)

**Her paket kurulumundan önce npm'den güncel versiyon kontrol edilmeli.**

```bash
npm show <paket-adi> version
npm show <paket1> <paket2> version
```

**Kurallar:**

- `package.json`'a yazılacak versiyon: `^X.Y.Z` (caret — minor/patch otomatik)
- Major versiyon değişikliğinde breaking change kontrolü şart
- `package-lock.json` source of truth — commit edilir
- **`latest` veya `*` kullanma** — her zaman explicit versiyon

### Genel Kod Standartları

- **TypeScript strict:** `strict: true`, `noImplicitAny: true`
- **ESLint + Prettier:** tutarlı format
- **Naming:** camelCase (değişken/fonksiyon), PascalCase (component/class/type), UPPER_SNAKE_CASE (sabit)
- **Meaningful names:** `calculateHabitStreak()` evet, `getData()` hayır
- **DRY** — tekrarlanan kodu util'e çıkar
- **YAGNI** — ihtiyaç olmayan kodu yazma
- **Early return** — derin nesting yerine
- **Immutability** — state'i mutate etme
- **Error handling** — try/catch, kullanıcıya anlamlı mesaj
- **Atomic commit'ler** — tek konu, anlamlı mesaj
