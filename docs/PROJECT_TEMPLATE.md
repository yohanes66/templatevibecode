# Project Template

Gunakan file ini sebagai checklist saat menambahkan portfolio preview baru.

---

# Project Information

```text
Project Name:
Project Type:
Design Status:
Development Status:
Portfolio URL:
Preview URL:
Vercel Project:
Root Directory:
```

Example:

```text
Project Name: SaaS Landing Page
Project Type: Marketing Website
Design Status: Complete
Development Status: Live
Portfolio URL: https://yohanesnick.site/work/saas-landing-page
Preview URL: https://saas-landing-page.vercel.app
Vercel Project: saas-landing-page
Root Directory: apps/saas-landing-page
```

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
├── PROJECT.md
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

---

# Optional PROJECT.md Template

Copy ke folder project:

```md
# Project Name

## Overview

Short description of this project.

## Type

Landing Page / Dashboard / Website / Product Page

## Stack

- React
- Vite
- Tailwind CSS

## Status

Live

## Portfolio

https://yohanesnick.site/work/...

## Preview

https://....vercel.app

## Deployment

Vercel Project:
project-name

Root Directory:
apps/project-name

## Notes

Any project-specific notes.
```

---

# Completion Definition

Project dianggap selesai jika:

```text
Design
+ responsive implementation
+ successful production build
+ isolated Vercel deployment
+ connected portfolio preview
```

semuanya sudah tersedia.
