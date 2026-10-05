# README Template

Setiap app di `apps/` punya satu `README.md` dengan format di bawah. Tidak ada `PROJECT.md` terpisah; metadata ada di tabel paling atas README.

---

# Format README

````md
# <Nama Project>

<Satu kalimat: apa ini dan untuk siapa.>

| | |
|---|---|
| Live | https://<alias>.vercel.app |
| Tipe | Landing page / Company profile / Storefront / Dashboard |
| Stack | Framework, React, Vite, TypeScript, CSS |
| Design | [Figma: <frame>](https://www.figma.com/design/...) |
| Vercel | Project `<nama-vercel>`, Root Directory `apps/<folder>` |
| Port lokal | <port> |

## Menjalankan

Butuh Node.js <versi>.

```bash
npm ci
npm run dev        # http://127.0.0.1:<port>
```

| Script | Fungsi |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview hasil build |

## Fitur

- Bullet singkat: interaksi, halaman, motion, aksesibilitas.

Routes: `/`, ...

## Mengedit

| File | Isi |
|---|---|
| `src/content.ts` | Copy dan data |
| `src/styles.css` | Styling |

## Catatan

- Konten demo, aset hasil generate, batasan (form tidak mengirim data, dll).

## QA

[`docs/design-qa.md`](docs/design-qa.md)
````

Bahasa: Indonesia. Kode, nama file, dan istilah teknis tetap apa adanya.

---

# Recommended Folder Structure

```text
project-name/
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── sections/
│   ├── styles/
│   ├── App.tsx
│   └── main.tsx
│
├── README.md
├── package.json
├── vite.config.ts
├── tsconfig.json
└── index.html
```

Tidak wajib mengikuti struktur ini persis.

---

# Design Checklist

- [ ] Hero section selesai
- [ ] Navigation selesai
- [ ] Main content sections selesai
- [ ] Footer selesai
- [ ] Desktop sesuai design
- [ ] Tablet sesuai design
- [ ] Mobile sesuai design
- [ ] Spacing konsisten
- [ ] Typography sesuai
- [ ] Color sesuai
- [ ] Border radius sesuai
- [ ] Shadow sesuai
- [ ] Icons sesuai
- [ ] Images sesuai
- [ ] Hover state tersedia jika diperlukan
- [ ] Animation tidak berlebihan

---

# Development Checklist

- [ ] `npm install` berhasil
- [ ] `npm run dev` berhasil
- [ ] `npm run build` berhasil
- [ ] Tidak ada critical console error
- [ ] Tidak ada missing assets
- [ ] Tidak ada broken import
- [ ] Tidak ada hardcoded localhost URL
- [ ] Responsive layout sudah dicek
- [ ] Image size sudah reasonable
- [ ] Font load dengan benar

---

# Preview Checklist

- [ ] Project hanya menampilkan design yang relevan
- [ ] Tidak ada navigation ke project lain
- [ ] Tidak ada dev toolbar yang tidak diperlukan
- [ ] Tidak ada test copy
- [ ] Tidak ada dummy content yang tidak disengaja
- [ ] Tidak ada secret / API key
- [ ] Tidak ada internal note
- [ ] Metadata/title browser sesuai project

---

# Vercel Checklist

- [ ] GitHub repository connected
- [ ] Root Directory benar
- [ ] Framework preset benar
- [ ] Build command benar
- [ ] Output directory benar jika perlu
- [ ] Production deployment berhasil
- [ ] Domain preview dapat dibuka
- [ ] Mobile production sudah dites
- [ ] Images production tidak broken

---

# Portfolio Checklist

- [ ] Portfolio case study dibuat
- [ ] Thumbnail dibuat
- [ ] Project title final
- [ ] Short description final
- [ ] Figma link tersedia jika ingin ditampilkan
- [ ] Live preview URL ditambahkan
- [ ] Preview bekerja di iframe jika digunakan
- [ ] CTA membuka URL yang benar
