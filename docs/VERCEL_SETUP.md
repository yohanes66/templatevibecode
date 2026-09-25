# Vercel Setup

Panduan ini digunakan untuk mendeploy beberapa project dari satu GitHub repository dengan Root Directory yang berbeda.

---

# Architecture

GitHub repository:

```text
portfolio-previews/
└── apps/
    ├── saas-landing-page/
    ├── fintech-dashboard/
    ├── crypto-landing-page/
    └── ai-product/
```

Vercel:

```text
saas-landing-page
→ apps/saas-landing-page

fintech-dashboard
→ apps/fintech-dashboard

crypto-landing-page
→ apps/crypto-landing-page

ai-product
→ apps/ai-product
```

Setiap Vercel Project memiliki deployment sendiri.

---

# Create First Project

Di Vercel Dashboard:

```text
Add New
→ Project
```

Import repository:

```text
portfolio-previews
```

Set:

```text
Project Name:
saas-landing-page

Root Directory:
apps/saas-landing-page
```

Vercel kemudian menjalankan build berdasarkan project tersebut.

---

# Create Second Project from Same Repo

Tidak perlu membuat repository baru.

Buat project baru lagi:

```text
Add New
→ Project
→ Import portfolio-previews
```

Set:

```text
Project Name:
fintech-dashboard

Root Directory:
apps/fintech-dashboard
```

Deploy.

Sekarang satu GitHub repository memiliki dua Vercel Projects.

---

# Example Mapping

```text
GitHub Repo
portfolio-previews
│
├── apps/saas
│   └── Vercel Project: saas-preview
│
├── apps/fintech
│   └── Vercel Project: fintech-preview
│
└── apps/crypto
    └── Vercel Project: crypto-preview
```

---

# Isolation

Walaupun source berada di repository yang sama:

```text
saas-preview.vercel.app
```

tidak otomatis memiliki access/navigation ke:

```text
fintech-preview.vercel.app
crypto-preview.vercel.app
```

Masing-masing merupakan deployment yang berbeda.

Hal yang tetap public adalah source repository jika repository GitHub diset public.

Jika source code tidak ingin terlihat oleh visitor umum, gunakan private GitHub repository.

---

# Framework Detection

Setiap folder dapat memiliki framework berbeda.

Contoh:

```text
apps/saas
→ Vite

apps/fintech
→ Next.js

apps/crypto
→ Astro
```

Vercel configuration dilakukan per Vercel Project.

---

# Root Directory

Ini bagian paling penting.

Pastikan Root Directory menunjuk tepat ke folder yang berisi:

```text
package.json
```

Contoh:

```text
apps/saas-landing-page
```

bukan hanya:

```text
apps
```

Jika salah Root Directory, Vercel dapat:

- gagal menemukan package.json
- menggunakan framework yang salah
- gagal build
- mendeploy folder yang salah

---

# Build Settings

Untuk Vite, biasanya:

```text
Build Command:
npm run build

Output Directory:
dist
```

Untuk Next.js, Vercel biasanya dapat mendeteksi otomatis.

Jangan override setting jika auto-detection sudah benar.

---

# Updating a Project

Jika kamu mengubah:

```text
apps/saas-landing-page
```

lalu push ke GitHub, Vercel project yang terhubung dapat membuat deployment baru.

Contoh:

```bash
git add apps/saas-landing-page
git commit -m "update saas landing page"
git push
```

Setelah push, cek deployment production.

---

# Production URLs

Default:

```text
project-name.vercel.app
```

Contoh:

```text
saas-landing-page.vercel.app
fintech-dashboard.vercel.app
crypto-landing-page.vercel.app
```

Optional custom domain:

```text
saas.preview.yohanesnick.site
fintech.preview.yohanesnick.site
crypto.preview.yohanesnick.site
```

Custom domain tidak wajib untuk portfolio preview.

---

# Recommended Naming

Vercel Project Name:

```text
saas-landing-page
fintech-dashboard
crypto-landing-page
ai-website-builder
```

Samakan dengan nama folder jika memungkinkan agar mudah dicari.

Contoh:

```text
Folder:
apps/saas-landing-page

Vercel:
saas-landing-page
```

---

# Existing Standalone Project

Project lama dapat tetap:

```text
Repo:
community-landing-page

Vercel:
community-landing-page
```

Tidak perlu migration.

Semua project baru:

```text
Repo:
portfolio-previews
```

---

# Deployment Troubleshooting

## Build failed

Coba lokal:

```bash
cd apps/project-name
npm install
npm run build
```

Jika lokal gagal, perbaiki lokal terlebih dahulu.

---

## Assets broken

Hindari path yang bergantung pada local filesystem.

Recommended:

```text
/public/image.png
```

atau import melalui source.

---

## Wrong project deployed

Check:

```text
Settings
→ Build and Deployment
→ Root Directory
```

Pastikan folder sesuai.

---

## Framework not detected

Pastikan folder Root Directory memiliki:

```text
package.json
```

dan dependency framework tersedia.

---

## Different projects interfere with each other

Setiap project sebaiknya memiliki `package.json` dan config sendiri.

Jangan mengandalkan dependency project tetangga jika memang ingin menjaga isolation.

---

# Deployment Checklist

Sebelum dianggap selesai:

- [ ] Root Directory benar
- [ ] Framework terdeteksi
- [ ] Build berhasil
- [ ] URL production berjalan
- [ ] Assets load
- [ ] Responsive berjalan
- [ ] Tidak ada console error penting
- [ ] Tidak ada navigation ke project lain
- [ ] Portfolio menggunakan production URL
