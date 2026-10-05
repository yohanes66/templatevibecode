# Norte Studio

Landing page editorial untuk studio fashion, beauty & lifestyle, dengan empat galeri per disiplin.

| | |
|---|---|
| Live | https://yohanesnicknorte.vercel.app |
| Tipe | Editorial agency landing page |
| Stack | TanStack Router, React 19, Vite 8, TypeScript, CSS |
| Design | [Figma: Norte](https://www.figma.com/design/34T8K3XRn2jL4OlaIcbVMu/Eksplorasi-Dribbble?node-id=1662-5602) (desktop 1440 × 10491) |
| Vercel | Project `norte`, Root Directory `apps/norte-studio` |
| Port lokal | 3300 (QA: 3301) |

## Menjalankan

```bash
npm ci
npm run dev        # http://127.0.0.1:3300
```

| Script | Fungsi |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Type check + production build ke `dist/` |
| `npm run preview` | Preview hasil build |
| `npm run check` | Menjalankan server QA di port 3301 lalu browser check lewat Playwright CLI (butuh Node 24+, Chromium, dan akses network npm saat pertama kali) |

## Fitur

- Menu melayang, progress per chapter, empat galeri disiplin, halaman work, journal, dan dialog informasi.
- Contact memakai `mailto:`.
- Layout mobile dan tablet mengadaptasi layout editorial desktop.

Routes: `/`, `/work`, `/work/$slug`.

## Mengedit

| File | Isi |
|---|---|
| `src/App.tsx` | Section, routes, dan interaksi |
| `src/content.ts` | Copy, galeri, dan data work |
| `src/styles.css` | Layout, tipografi, breakpoint, motion |
| `public/` | Foto dan font |

## Catatan

- 19 foto asli diekspor dari Figma (lewat Figma CLI) sebagai WebP lossless. Panel Influence, Events, dan Content masing-masing punya lima foto editorial hasil generate.
- Ketiga font di-host sendiri beserta lisensi OFL-nya.
- Newsletter hanya preview UI: tidak menyimpan atau mengirim email.
- Profil komunitas, link sosial, dan intro berbahasa Indonesia adalah konten demo. Ganti dengan tujuan asli dan mailing provider sebelum dipakai di production.

## QA

[`docs/design-qa.md`](docs/design-qa.md): ukuran desain dan spesifikasi motion.
