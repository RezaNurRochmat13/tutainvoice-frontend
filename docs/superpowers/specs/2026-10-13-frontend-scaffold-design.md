# Frontend Scaffold — Design Doc

Date: 2026-10-13
Scope: tahap 1 — scaffold saja (cermin backend tahap 1: struktur jalan, belum CRUD)
Repo: `tutainvoice-frontend/` (repo terpisah, sibling dari `tutainvoice-backend/`)
Approach: A — scaffold minimal + TS + Tailwind (dipilih user; B/C ditolak: dead code / overkill)

## 1. Lokasi & tooling

Repo baru `tutainvoice-frontend/`. Package manager pnpm. Vue 3 + Vite + TypeScript strict (konsisten dengan backend). Tailwind CSS untuk styling. Node >= 20. Dev server di `:5173`.

## 2. Struktur folder

```
tutainvoice-frontend/
├── src/
│   ├── api/client.ts             # fetch wrapper: baseURL dari env, JSON, throw ApiError
│   ├── api/health.ts             # getHealth(): GET /health
│   ├── components/HealthStatus.vue  # tampil status backend ok/down
│   ├── App.vue                   # render HealthStatus
│   └── main.ts
├── .env / .env.example           # VITE_API_URL=http://localhost:3000
├── package.json, tsconfig, vite.config.ts, vitest config
```

Tanpa vue-router dan tanpa Pinia — YAGNI. Keduanya masuk tahap 2 saat ada halaman beneran (daftar invoice, form, dsb).

## 3. API client

`client.ts` sediakan `apiFetch(path, options)`: gabung `import.meta.env.VITE_API_URL` + path, parse JSON, throw `ApiError(status, message)` untuk non-2xx dan network failure. `health.ts` sediakan `getHealth()` yang return `{ status: 'ok' }`. Tidak ada auth header di tahap 1 (backend belum ada auth).

## 4. Kesiapan backend (dependensi lintas repo)

API Hono (`tutainvoice-backend`) belum ada CORS. Browser block request dari `localhost:5173` ke `localhost:3000`. Syarat scaffold ini bekerja: 1 task kecil di repo backend — tambah middleware `hono/cors` (allow origin dev `http://localhost:5173`). Task itu bagian dari plan frontend ini (dikerjakan di repo backend, diverifikasi via halaman health-check).

## 5. Testing

Vitest + @vue/test-utils + jsdom: unit test api client (URL benar, throw ApiError saat non-2xx dan network error) + render test HealthStatus (mock fetch global, assert tampil OK dan DOWN). Typecheck via `vue-tsc --noEmit`.

## 6. Kriteria sukses

`pnpm dev` jalan di `:5173`, halaman tampil "Backend: OK" saat API hidup dan "Backend: DOWN" saat mati. `pnpm test` hijau, `pnpm typecheck` bersih. Tidak ada router/store terinstall.

## Non-goals (tahap 2+)

Halaman daftar/form invoice, customer, store. Auth. Router, Pinia. Docker service untuk web. E2E test.
