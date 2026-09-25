# Scalar.ai Landing Page

Landing page SaaS untuk **Scalar.ai**, platform AI visibility yang membantu brand tampil di search engine, jawaban generative AI, dan answer engine (SEO, GEO, AEO).

Dibangun pixel-perfect dari desain Figma, lengkap dengan animasi scroll, parallax, dan hover interaction.

## Stack

| | |
|---|---|
| Framework | [TanStack Start](https://tanstack.com/start) (React 19, SSR) |
| Bundler | Vite |
| Language | TypeScript |
| Styling | Plain CSS (tanpa framework) |
| Icons | Phosphor Icons + SVG yang diekspor dari Figma |
| Fonts | Inter 3.19 (`@fontsource`), Satoshi (Fontshare) |
| Deploy | Vercel |

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | Keterangan |
|---|---|
| `npm run dev` | Dev server di port 3000 |
| `npm run build` | Production build |
| `npm run preview` | Preview hasil build |
| `npm run generate-routes` | Generate ulang `routeTree.gen.ts` |

## Project Structure

```text
apps/scalar-ai/
├── public/
│   ├── icons/          # SVG dari Figma: logo, bullet, social, verified
│   ├── images/         # Hero, dashboard, avatar, bento, background
│   └── logos/          # Logo perusahaan di section reviews
├── src/
│   ├── components/     # Komponen reusable: Logo, Mockup
│   ├── data/           # Konten statis: plans, reviews, features, socials
│   ├── lib/            # Motion helpers: reveal on scroll, pointer tracking
│   ├── routes/         # TanStack Router: __root (head/meta) dan index (halaman)
│   ├── sections/       # Satu file per section halaman
│   ├── styles/         # global.css
│   ├── router.tsx
│   └── routeTree.gen.ts   # Auto-generated, jangan diedit manual
├── docs/
│   └── design-qa.md    # Catatan verifikasi desain vs Figma
├── PROJECT.md
├── vercel.json
└── vite.config.ts
```

Urutan section di halaman (`src/routes/index.tsx`):

`Hero` → `Features` (bento) → `CaseStudy` → `Pricing` → `Reviews` → `Cta` → `Footer`

## Highlights

- **Pixel-perfect ke Figma.** Di viewport 1440×1024, tinggi ketujuh section sama persis dengan desain.
- **Responsive proporsional.** Ilustrasi bento, case study, dan CTA menskala mengikuti lebar container (`container-type: inline-size` + unit `--u`), jadi komposisi tidak pecah di layar kecil.
- **Adaptif tinggi layar.** Spacing vertikal mengecil di layar laptop pendek (700–1024px), sehingga konten utama tetap terlihat above the fold.
- **Motion:**
  - Reveal on scroll (IntersectionObserver).
  - Parallax berbasis CSS scroll-driven animation.
  - Bento hover dengan spotlight yang mengikuti kursor.
  - Border gradasi berputar di plan unggulan.
  - Review marquee: vertikal di desktop, horizontal di mobile.
- **Aksesibel.** `prefers-reduced-motion` mematikan semua animasi. Salinan konten yang diduplikasi untuk marquee diberi `aria-hidden`.

## Editing Content

Semua copy yang berulang ada di [`src/data/content.ts`](src/data/content.ts): harga, fitur plan, review, dan social links. Copy yang hanya muncul sekali (heading, hero) ada langsung di file section masing-masing.

## Deployment

Deploy ke Vercel dengan **Root Directory** `apps/scalar-ai`. Framework preset terdeteksi otomatis lewat `vercel.json` (`tanstack-start`). Detail ada di [`docs/VERCEL_SETUP.md`](../../docs/VERCEL_SETUP.md).
