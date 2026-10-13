# tutainvoice-frontend

Frontend untuk Tuta Invoice Generator. Vue 3 + Vite + TypeScript + Tailwind CSS.

> Tahap 1: scaffold — struktur jalan + halaman status backend. Belum ada halaman daftar/form, router, atau store.

## Stack

- Node >= 20, pnpm
- Vue 3.5, Vite 7, TypeScript strict
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Vitest + jsdom + `@vue/test-utils` (test)

## Struktur

```
├── src/
│   ├── main.ts                    # mount App + import style.css
│   ├── App.vue                    # render HealthStatus
│   ├── style.css                  # @import "tailwindcss"
│   ├── api/
│   │   ├── client.ts              # fetch wrapper: baseURL dari env, throw ApiError
│   │   └── health.ts              # getHealth(): GET /health
│   └── components/
│       └── HealthStatus.vue       # tampil "Backend: OK / DOWN"
├── .env / .env.example            # VITE_API_URL=http://localhost:3000
└── docs/superpowers/              # spec + implementation plan tahap 1
```

Tanpa vue-router dan Pinia — masuk tahap 2.

## Setup lokal

```bash
pnpm install
pnpm dev   # http://localhost:5173
```

Butuh backend hidup (`tutainvoice-backend`, `pnpm dev` di :3000) supaya status tampil OK. Backend harus allow origin dev via `hono/cors` — kalau belum, request browser ke-block CORS.

## Scripts

| Script           | Keterangan              |
| ---------------- | ----------------------- |
| `pnpm dev`       | dev server (:5173)      |
| `pnpm build`     | typecheck + build dist  |
| `pnpm preview`   | preview dist            |
| `pnpm test`      | vitest                  |
| `pnpm typecheck` | vue-tsc --noEmit        |

## Non-goals (tahap 2+)

Halaman invoice/customer/store, auth, router, Pinia, docker service, E2E.
