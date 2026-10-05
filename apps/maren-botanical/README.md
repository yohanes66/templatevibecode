# Maren Botanical

![Maren Botanical](cover.jpg)

Storefront beauty yang responsive, dengan carousel pilihan shade dan bag yang tersimpan di browser. Dibuat dari desain Maren v5 di Figma.

| | |
|---|---|
| Live | https://yohanesnickmarenbotanical.vercel.app |
| Tipe | E-commerce storefront |
| Stack | TanStack Router, React, Vite, TypeScript, CSS, Phosphor Icons |
| Design | [Figma Community: Maren](https://www.figma.com/community/file/1688265085265846630/maren-beauty-landing-page) (gratis) |
| Vercel | Project `marenbotanical`, Root Directory `apps/maren-botanical` |
| Port lokal | 3200 |

## Menjalankan

Butuh Node.js 22.18+.

```bash
npm ci
npm run dev        # http://127.0.0.1:3200
```

| Script | Fungsi |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Type check + production build ke `dist/` |
| `npm run preview` | Preview hasil build |
| `npm run check` | Cek data katalog, aset, dan bag |

## Fitur

- **Cloud Tint carousel.** Lima shade bisa dipilih lewat panah, klik produk, swatch, tombol panah keyboard, atau swipe. Produk terpilih bergeser ke tengah dan warna background mengikuti shade-nya. Klik beruntun tidak meninggalkan celah karena produk tetap ter-mount selama transisi.
- **The Sets.** Carousel loop untuk tiga produk yang sama.
- **Promotion strip.** Tiga promo dengan panah prev/next dan tombol close. Promo yang ditutup kembali muncul setelah refresh.
- **Dialog.** Dialog ditutup setelah animasi keluar selesai, lalu fokus dikembalikan dan scroll dokumen dibuka lagi.
- **Halaman yang berfungsi.** Search, halaman produk, varian dan jumlah di cart, bag yang tersimpan di `localStorage`, navigasi mobile, accordion rewards, dan validasi newsletter.
- **Migrasi bag lama.** Bag yang tersimpan otomatis membuang produk haircare lama, sementara produk dan jumlah yang masih berlaku tetap disimpan.
- Animasi mengikuti `prefers-reduced-motion`.

Routes: `/`, `/shop`, `/products/$slug`, `/journal`, `/journal/$slug`, `/info/$topic`.

## Mengedit

| File | Isi |
|---|---|
| `src/Beauty.tsx` | Homepage, carousel, card, footer |
| `src/App.tsx` | Navigasi, promotion strip, dialog, cart, routes |
| `src/content.ts` | Produk, harga, shade, konten editorial |
| `src/styles.css` | Layout, tipografi, breakpoint, motion |
| `public/images/v5/` | 23 export dari Figma |
| `public/fonts/` | Jost dan Instrument Serif beserta lisensinya |

## Catatan

- Checkout, akun, dan pengiriman newsletter hanya demo. Tidak ada pembayaran atau data yang dikirim.
- Desain acuannya frame desktop; layout mobile dan tablet mengadaptasi hierarkinya.
- `scripts/check-browser.js` adalah callback halaman untuk Playwright CLI. Script ini membuat dan menutup context terpisah, jadi cek responsive tidak mengubah jendela preview.

## QA

[`docs/design-qa.md`](docs/design-qa.md)
