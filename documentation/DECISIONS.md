# Keputusan Teknis & Arsitektur - Astalica

## 1. Stack Pilihan
- **Next.js (App Router)**: Sesuai aturan wajib nomor 1 (Vercel-friendly), mendukung Server Components, route handlers, dan optimasi gambar.
- **Tailwind CSS**: Menggunakan sistem token warna (*Satin Gold, Forest Emerald, Pearl Ivory, Sand Champagne*) yang diekstrak langsung dari spesifikasi desain `DESIGN.md`.
- **TypeScript**: Menjamin kejelasan kontrak data antar komponen dan persiapan untuk integrasi API di Step 2.

## 2. Manajemen Data Terpusat
Semua konten teks yang berpotensi diubah oleh klien/pengguna disimpan di `src/config/site.ts`. Hal ini mencakup:
- Identitas brand (nama, tagline, deskripsi, alamat, kontak, jam operasional).
- Daftar navigasi header & footer.
- Data pilar filosofi (About section).
- Data interaktif pemilih kain sutra (*Fabric & Texture selector*).
- Daftar layanan utama (*Services*).
- Daftar artikel & warta awal (*News / Articles* - disiapkan untuk digantikan data dinamis di Step 2).
- Google Maps embed URL dan informasi gerai flagship.

## 3. Penanganan Aset Visual
- Sesuai panduan Step 1, aset visual disimpan lokal di `public/images/` agar website dapat berjalan mandiri, cepat, dan tidak mudah rusak akibat tautan eksternal yang kedaluwarsa.
- Ukuran rasio dipertahankan sesuai desain:
  - 4:5 untuk hero visual model busana modest.
  - 3:4 untuk editorial lookbook di About.
  - 16:10 untuk kartu artikel berita dan showcase kain.
  - 4:3 untuk dokumentasi galeri butik fisik.
