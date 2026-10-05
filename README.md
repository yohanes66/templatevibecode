# Template Vibe Code

Kumpulan landing page, website exploration, dan interactive preview untuk portfolio.

Setiap project adalah **aplikasi standalone** di dalam `apps/`, dengan stack, dependency, font, asset, dan deployment Vercel masing-masing. Satu repository, banyak preview, tanpa perlu membuat repository baru untuk setiap exploration.

```text
1 folder = 1 project = 1 Vercel deployment
```

---

## Projects

| Project | Deskripsi | Live | Folder |
|---|---|---|---|
| Scalar.ai | Landing page SaaS AI visibility (SEO, GEO, AEO) | [yohanesnickscalar.vercel.app](https://yohanesnickscalar.vercel.app) | [`apps/scalar-ai`](apps/scalar-ai) |
| Maren Botanical | Storefront beauty dengan carousel shade | [yohanesnickmarenbotanical.vercel.app](https://yohanesnickmarenbotanical.vercel.app) | [`apps/maren-botanical`](apps/maren-botanical) |
| Norte Studio | Landing page editorial studio fashion, beauty & lifestyle | [yohanesnicknorte.vercel.app](https://yohanesnicknorte.vercel.app) | [`apps/norte-studio`](apps/norte-studio) |
| Sorrel Studio | Company profile studio interior & hospitality | [yohanesnicksorrel.vercel.app](https://yohanesnicksorrel.vercel.app) | [`apps/sorrel-studio`](apps/sorrel-studio) |

Stack, port lokal, Figma, dan cara edit ada di README masing-masing app.

Katalog template (static HTML, dibuka langsung di browser) ada di [`catalog/index.html`](catalog/index.html). Tombol preview di katalog mengarah ke dev server lokal (`127.0.0.1:<port>`), jadi app terkait harus sedang `npm run dev`.

---

## Repository Structure

```text
templatevibecode/
├── apps/                     # 1 folder = 1 standalone app (package.json sendiri)
│   ├── scalar-ai/
│   ├── maren-botanical/
│   ├── norte-studio/
│   └── sorrel-studio/
│
├── catalog/                  # Katalog template: index.html + halaman detail
│   └── previews/             # Screenshot untuk template yang source-nya di luar repo
│
├── docs/
│   ├── ADD_NEW_PROJECT.md    # Workflow menambahkan project baru
│   ├── README_TEMPLATE.md    # Format README per app + checklist
│   └── VERCEL_SETUP.md       # Setup deployment per project
│
├── AGENTS.md                 # Aturan untuk agent (Codex, Claude Code)
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
3. Tambahkan `README.md` dengan format [`docs/README_TEMPLATE.md`](docs/README_TEMPLATE.md).
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
| `scalar.ai` | `apps/scalar-ai` |
| `marenbotanical` | `apps/maren-botanical` |
| `norte` | `apps/norte-studio` |
| `sorrel-studio` | `apps/sorrel-studio` |

Push ke `main` langsung men-deploy production. Jangan memindah atau mengganti nama folder app tanpa mengubah Root Directory di Vercel.

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
