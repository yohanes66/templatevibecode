# Sorrel Studio

Template company profile responsive untuk studio desain interior dan hospitality.

| | |
|---|---|
| Live | https://yohanesnicksorrel.vercel.app |
| Tipe | Company profile |
| Stack | TanStack Router, React, Vite, TypeScript, CSS |
| Design | [Figma Community: Sorrel](https://www.figma.com/community/file/1688204741451715618/sorrel-company-profile) (gratis) |
| Vercel | Project `sorrel-studio`, Root Directory `apps/sorrel-studio` |
| Port lokal | 3400 |

## Menjalankan

Butuh Node.js 22.18+ (disarankan Node 24).

```bash
npm ci
npm run dev        # http://127.0.0.1:3400
```

| Script | Fungsi |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Type check + production build ke `dist/` |
| `npm run preview` | Preview hasil build |
| `npm run check` | Cek data konten dan aset |

## Fitur

- 14 section homepage dengan foto, logo, dan avatar asli dari Figma.
- Empat perbandingan before/after yang bisa dikontrol masing-masing, filter project, accordion eksklusif (process, experience, FAQ), dan navigasi mobile.
- Empat halaman project, arsip journal dengan empat artikel, serta halaman contact, press, dan privacy.
- PDF company profile empat halaman yang bisa diunduh.
- Count-up metrik saat masuk viewport, reveal card/gambar bertahap, crossfade gambar, icon accordion beranimasi, hover yang halus, dan dukungan reduced motion.

## Mengedit

| File | Isi |
|---|---|
| `src/content.ts` | Project, gambar, layanan, tim, proses, artikel, FAQ |
| `src/App.tsx` | Section, routes halaman, kontrol interaktif |
| `src/styles.css` | Design token, layout, breakpoint, motion |
| `public/images/` | 25 gambar WebP dan satu SVG asli Figma |
| `public/fonts/` | Archivo, Geist, Pinyon Script beserta lisensi OFL-nya |

Untuk membuat ulang PDF setelah kontennya diubah: install `reportlab` di environment Python, lalu jalankan `python3 scripts/create-profile.py`.

## Catatan

- Keempat file `*-before.webp` adalah konsep before-renovation hasil AI (image_gen), dibuat dari tampilan after di Figma. Ini ilustrasi, bukan foto renovasi asli. Prompt lengkapnya ada di `image-prompts.json`.
- Form contact hanya menyiapkan draft `mailto:` di aplikasi email pengunjung; tidak ada data yang dikirim atau disimpan.
- Nama perusahaan, metrik, detail kontak, isi artikel, dan link sosial adalah konten demo. Ganti sebelum dipakai untuk bisnis sungguhan.
- Arsip project berisi empat case study dari desain, bukan dataset 120 project.
- `vercel.json` menyediakan SPA rewrite untuk deep link project dan artikel.

## QA

[`docs/design-qa.md`](docs/design-qa.md)
