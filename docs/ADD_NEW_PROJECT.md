# Add New Project

Dokumen ini adalah workflow utama untuk menambahkan project baru ke repository `portfolio-previews`.

Project dapat ditambahkan kapan pun design sudah siap. Tidak perlu mengisi seluruh repository sekaligus.

---

# 1. Choose Project Name

Gunakan nama singkat dan descriptive.

Contoh:

```text
saas-landing-page
fintech-dashboard
crypto-wallet
ai-website-builder
creator-platform
travel-booking
```

Format:

```text
lowercase
kebab-case
```

---

# 2. Create Project Folder

Semua project baru disimpan di:

```text
apps/
```

Contoh:

```bash
mkdir apps/saas-landing-page
```

Hasil:

```text
portfolio-previews/
└── apps/
    └── saas-landing-page/
```

---

# 3. Add Existing Code

Jika code sudah tersedia dari project sebelumnya, copy seluruh source ke folder tersebut.

Contoh:

```text
apps/saas-landing-page/
├── public/
├── src/
├── package.json
├── vite.config.ts
└── index.html
```

Pastikan project tetap bisa dijalankan dari folder tersebut.

---

# 4. Test Locally

Masuk ke folder project:

```bash
cd apps/saas-landing-page
```

Install dependency:

```bash
npm install
```

Run:

```bash
npm run dev
```

Test:

- Desktop
- Tablet
- Mobile
- Navigation
- Buttons
- Animation
- Images
- Fonts
- Console errors

---

# 5. Check Build

Sebelum deploy:

```bash
npm run build
```

Build harus selesai tanpa error.

Jika menggunakan Vite, biasanya output:

```text
dist/
```

Jika menggunakan Next.js:

```text
.next/
```

---

# 6. Add Project Metadata

Optional tetapi disarankan membuat file:

```text
PROJECT.md
```

di dalam folder project.

Contoh:

```text
apps/saas-landing-page/
├── PROJECT.md
├── src/
└── ...
```

Isi sederhana:

```md
# SaaS Landing Page

Type: Landing Page
Status: Live
Stack: React, Vite, Tailwind
Portfolio: https://yohanesnick.site/work/...
Preview: https://...
```

Tujuannya supaya beberapa bulan kemudian project masih mudah dikenali.

---

# 7. Commit Project

Dari root repository:

```bash
git add apps/saas-landing-page
git commit -m "add saas landing page preview"
git push
```

---

# 8. Create Vercel Project

Di Vercel:

1. Add New Project
2. Import repository `portfolio-previews`
3. Pilih repository yang sama
4. Set Root Directory ke:

```text
apps/saas-landing-page
```

5. Pastikan framework terdeteksi dengan benar
6. Deploy

Setiap project Vercel dapat menggunakan repository yang sama.

---

# 9. Verify Deployment

Setelah deploy, cek:

```text
https://project-name.vercel.app
```

Pastikan:

- Page tampil
- Assets load
- Font load
- Images tidak broken
- Animation berjalan
- Mobile responsive
- Tidak ada private/debug information
- Tidak ada navigation ke project portfolio lain kecuali memang diinginkan

---

# 10. Add Preview to Portfolio

Setelah URL production siap, masukkan URL tersebut ke case study.

Contoh:

```text
Portfolio:
https://yohanesnick.site/work/saas-landing-page

Preview:
https://saas-landing-page.vercel.app
```

Jika menggunakan iframe:

```html
<iframe
  src="https://saas-landing-page.vercel.app"
  title="SaaS Landing Page Preview"
/>
```

---

# Repeat for Next Project

Misalnya setelah SaaS selesai, design berikutnya adalah fintech:

```text
apps/
├── saas-landing-page/
└── fintech-dashboard/
```

Kemudian buat Vercel Project baru:

```text
Root Directory:
apps/fintech-dashboard
```

Project lama tidak perlu diubah.

---

# Recommended Workflow

Gunakan flow berikut:

```text
Design ready
↓
Add folder
↓
Add code
↓
Test locally
↓
Build
↓
Commit
↓
Create Vercel Project
↓
Set Root Directory
↓
Deploy
↓
Connect to portfolio
```

---

# Do Not

Jangan:

```text
create /saas route
create /fintech route
create /crypto route
```

di dalam satu web app jika tujuan utamanya adalah membuat isolated preview.

Lebih baik:

```text
apps/saas/
apps/fintech/
apps/crypto/
```

dan deploy secara independen.

---

# Migration from Existing Standalone Repositories

Existing repository seperti:

```text
community-landing-page
```

tidak harus dipindahkan.

Recommended:

```text
community-landing-page
→ keep as-is

portfolio-previews
→ use for new projects
```

Migration dapat dilakukan belakangan kalau memang diperlukan.
