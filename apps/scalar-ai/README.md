# Scalar.ai

Landing page SaaS untuk Scalar.ai, platform AI visibility yang membantu brand tampil di search engine, jawaban generative AI, dan answer engine (SEO, GEO, AEO).

| | |
|---|---|
| Live | https://yohanesnickscalar.vercel.app |
| Tipe | SaaS marketing website |
| Stack | TanStack Start (React 19, SSR), Vite, TypeScript, plain CSS |
| Design | [Figma Community: Scalar](https://www.figma.com/community/file/1688200935581515789/scalar-a-saas-landing-page-concept-for-an-ai-visibility-platform-that-helps-brandsaas-landing-page) (gratis) |
| Vercel | Project `scalar.ai`, Root Directory `apps/scalar-ai` |
| Port lokal | 3000 |

## Menjalankan

```bash
npm ci
npm run dev        # http://localhost:3000
```

| Script | Fungsi |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build (output Nitro di `.output/`) |
| `npm run preview` | Preview hasil build |
| `npm run generate-routes` | Generate ulang `src/routeTree.gen.ts` |

## Fitur

- **Pixel-perfect ke Figma.** Di viewport 1440×1024, tinggi ketujuh section sama persis dengan desain.
- **Responsive proporsional.** Ilustrasi bento, case study, dan CTA menskala mengikuti lebar container (`container-type: inline-size` + unit `--u`).
- **Adaptif tinggi layar.** Spacing vertikal mengecil di layar laptop pendek (700–1024px) supaya konten utama tetap above the fold.
- **Motion.** Reveal on scroll, parallax berbasis CSS scroll-driven animation, bento hover dengan spotlight yang mengikuti kursor, border gradasi berputar di plan unggulan, review marquee (vertikal di desktop, horizontal di mobile).
- **Aksesibel.** `prefers-reduced-motion` mematikan semua animasi. Konten duplikat untuk marquee diberi `aria-hidden`.

Urutan section (`src/routes/index.tsx`): `Hero` → `Features` → `CaseStudy` → `Pricing` → `Reviews` → `Cta` → `Footer`.

## Mengedit

| File | Isi |
|---|---|
| `src/data/content.ts` | Copy yang berulang: harga, fitur plan, review, social links |
| `src/sections/` | Satu file per section; copy yang muncul sekali (heading, hero) ada di sini |
| `src/components/` | Komponen reusable: `Logo`, `Mockup`, `Header` |
| `src/lib/motion.ts` | Reveal on scroll dan pointer tracking |
| `src/routes/` | `__root` (head/meta) dan `index` (halaman) |
| `src/styles/global.css` | Seluruh styling |
| `public/` | `icons/`, `images/`, `logos/` hasil export Figma |

`src/routeTree.gen.ts` di-generate otomatis, jangan diedit manual.

## Catatan

- Icon: Phosphor Icons + SVG export Figma. Font: Inter 3.19 (`@fontsource`) dan Satoshi (Fontshare).
- Preset framework Vercel diatur lewat `vercel.json` (`tanstack-start`).
- Vercel memblokir deploy kalau versi `@tanstack/react-start` punya celah keamanan yang diketahui. Kalau deploy gagal dengan pesan "Vulnerable TanStack Start package", jalankan `npm update @tanstack/react-start @tanstack/react-router`.

## QA

[`docs/design-qa.md`](docs/design-qa.md)
