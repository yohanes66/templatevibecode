# AGENTS.md

Aturan untuk agent (Codex, Claude Code, dll.) yang bekerja di repo ini. Baca sebelum mengubah apa pun.

## Repo ini apa

Kumpulan template website gratis (lisensi MIT) yang diambil orang lewat `npx degit yohanes66/templatevibecode/apps/<nama>`. Deployment Vercel hanya untuk showcase di portfolio [yohanesnick.site/work](https://yohanesnick.site/work).

Karena orang mengambil satu folder app saja, setiap app harus bisa di-install, di-build, dan dipahami tanpa file lain di repo.

```text
apps/<nama>/     1 folder = 1 app = 1 Vercel project
docs/            Panduan: ADD_NEW_PROJECT, README_TEMPLATE, VERCEL_SETUP
```

Tidak ada root `package.json`, workspace, atau shared package. Jalankan `npm` dari dalam `apps/<nama>/`.

## Aturan struktur

- **Semua app ada di `apps/<nama-kebab-case>/`.** Jangan membuat folder top-level baru seperti `templates/`, `projects/`, atau `sites/`.
- **Jangan menaruh file HTML, gambar, atau aset di root repo.** Katalog atau showcase template tidak dibuat di repo ini; showcase-nya ada di portfolio [yohanesnick.site/work](https://yohanesnick.site/work).
- **App harus self-contained.** Jangan import, `url()`, atau link ke file di luar folder app-nya (`../../...`). Vercel hanya membangun isi Root Directory, jadi file di luar folder itu tidak ikut ter-deploy.
- **Satu README per app.** Ikuti format [`docs/README_TEMPLATE.md`](docs/README_TEMPLATE.md) dan tulis dalam Bahasa Indonesia. Jangan membuat `PROJECT.md` atau file metadata lain.
- **Dokumen QA desain disimpan di `docs/design-qa.md` di dalam folder app.**
- **Jangan commit hasil build atau artefak lokal:** `dist/`, `.output/`, `.vercel/`, `node_modules/`, `output/`, `.playwright-cli/`. Semuanya sudah ada di `.gitignore`.

## Port lokal

Setiap app memakai port tetap (`--strictPort`) supaya bisa jalan bersamaan:

| App | Port |
|---|---|
| scalar-ai | 3000 |
| maren-botanical | 3200 |
| norte-studio | 3300 (QA 3301) |
| sorrel-studio | 3400 |

App baru memakai port kosong berikutnya: 3500, 3600, dan seterusnya. Tambahkan juga ke tabel ini.

## Menambah app baru

1. Buat `apps/<nama>/` dengan `package.json` sendiri.
2. Gunakan port baru di script `dev` dan `preview`.
3. Untuk SPA (Vite + TanStack Router), tambahkan `vercel.json` dengan rewrite ke `/index.html`.
4. Tulis `README.md` sesuai template.
5. Pastikan `npm run build` lolos di folder itu.
6. Tambahkan baris ke tabel **Projects** dan **Deployment** di `README.md` root, juga ke tabel port di atas.

Vercel project dibuat oleh pemilik repo. Agent cukup menuliskan Root Directory yang benar, yaitu `apps/<nama>`, di README.

## Deployment

- **Push ke `main` = deploy production** untuk semua Vercel project yang terhubung ke repo ini.
- **Jangan memindah atau mengganti nama folder `apps/<nama>` tanpa memberi tahu pemilik.** Root Directory di Vercel akan rusak, dan deploy langsung gagal dengan error `Root Directory ... does not exist`.
- **Sebelum push, jalankan `npm run build` di setiap app yang diubah.**
- **Kalau Vercel menolak deploy karena package rentan** (misalnya TanStack Start), update package itu dengan `npm update <pkg>`. Jangan pakai flag `DANGEROUSLY_*`.

## Git workflow

- **Untuk perubahan besar atau app baru, kerjakan di branch** (`codex/<topik>`, `claude/<topik>`), lalu buka PR ke `main`. Vercel otomatis membuat preview URL per branch.
- **Perubahan kecil** (typo, satu fix CSS) boleh langsung ke `main`.
- **Hapus branch setelah di-merge.** Jangan tinggalkan branch yang sudah tidak ahead dari `main`.
- **Satu commit, satu app.** Pesan commit pendek dengan huruf kecil, contoh: `fix mobile nav for norte studio`.
