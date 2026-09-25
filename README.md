# Template Vibe Code

Kumpulan landing page, website exploration, dan interactive preview untuk portfolio.

Setiap project adalah **aplikasi standalone** di dalam `apps/`, dengan stack, dependency, font, asset, dan deployment Vercel masing-masing. Satu repository, banyak preview, tanpa perlu membuat repository baru untuk setiap exploration.

```text
1 folder = 1 project = 1 Vercel deployment
```

---

## Projects

| Project | Deskripsi | Stack | Folder |
|---|---|---|---|
| Scalar.ai | Landing page SaaS AI visibility (SEO, GEO, AEO) | TanStack Start, React, Vite, CSS | [`apps/scalar-ai`](apps/scalar-ai) |

---

## Repository Structure

```text
templatevibecode/
├── apps/
│   └── scalar-ai/            # Standalone app: punya package.json sendiri
│
├── docs/
│   ├── ADD_NEW_PROJECT.md    # Workflow menambahkan project baru
│   ├── PROJECT_TEMPLATE.md   # Checklist dan template PROJECT.md
│   └── VERCEL_SETUP.md       # Setup deployment per project
│
├── .gitignore
└── README.md
```

Tidak ada root `package.json` dan tidak ada workspace. Setiap app di-install dan dijalankan dari folder-nya sendiri.

---

## Getting Started

```bash
git clone https://github.com/yohanes66/templatevibecode.git
cd templatevibecode/apps/<project-name>

npm install
npm run dev
```

Perintah per project (port, script, stack) ada di README masing-masing app.

---

## Adding a New Project

1. Buat folder baru di `apps/` dengan nama **kebab-case**, misalnya `apps/fintech-dashboard`.
2. Scaffold app dengan stack apa pun yang cocok untuk desainnya.
3. Tambahkan `README.md` dan `PROJECT.md` (template di [`docs/PROJECT_TEMPLATE.md`](docs/PROJECT_TEMPLATE.md)).
4. Pastikan `npm run build` berhasil.
5. Tambahkan project ke tabel **Projects** di atas.
6. Buat Vercel project baru dengan Root Directory mengarah ke folder tersebut.

Workflow lengkap ada di [`docs/ADD_NEW_PROJECT.md`](docs/ADD_NEW_PROJECT.md).

### Naming Convention

| ✅ Recommended | ❌ Hindari |
|---|---|
| `saas-landing-page` | `SaaS Landing Page` |
| `fintech-dashboard` | `landingPageFinal` |
| `ai-product-landing` | `new-project-2` |

---

## Deployment

Semua project terhubung ke repository GitHub yang sama, tetapi masing-masing memakai **Vercel Root Directory** yang berbeda:

| Vercel Project | Root Directory |
|---|---|
| `scalar-ai` | `apps/scalar-ai` |

Detail setup ada di [`docs/VERCEL_SETUP.md`](docs/VERCEL_SETUP.md).

---

## Principles

- **Isolated.** Setiap preview adalah website terpisah, bukan halaman di dalam satu website besar. Tidak ada navigasi antar project kecuali memang disengaja.
- **Bebas stack.** Project boleh memakai framework dan tooling berbeda sesuai kebutuhan desainnya.
- **Tanpa shared UI package.** Setiap exploration punya visual identity sendiri. Shared package baru masuk akal untuk hal teknis (analytics, SEO utility, device mockup), bukan untuk design system.
- **Struktur secukupnya.** Project kecil boleh sederhana; jangan membuat architecture kompleks hanya demi konsistensi.

---

## Git Workflow

```bash
git add apps/<project-name>
git commit -m "update <project-name> hero"
git push
```

Contoh commit message:

```text
add scalar ai landing page
fix mobile layout for scalar ai reviews
optimize images for fintech dashboard
```
