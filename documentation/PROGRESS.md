# Progres Proyek - Astalica

Terakhir diperbarui: 10 November 2026  
Posisi saat ini: **Step 4 - Deploy ke Vercel & Maintenance**

## Checklist
- [x] Inisiasi (data usaha & desain terkumpul)
- [x] STEP 1 - Landing page
  - [x] Hero (Judul kuat, subjudul, CTA ganda, visual 4:5, badge melayang, running ticker)
  - [x] About (Filosofi & latar belakang Astalica, kutipan desainer, 3 pilar keunggulan)
  - [x] Interaktif Tekstur & Bahan Sutra (Mulberry Silk Satin, Fine Voile de Luxe, Chiffon Crepe Royale)
  - [x] Service (Bespoke Bridal, Private Styling, Corporate Gifting, Atelier Care)
  - [x] Berita/Post (Kartu warta & tren adibusana)
  - [x] Contact + Google Maps (Info alamat, nomor WA/telepon, form concierge, iframe embed Google Maps, galeri butik)
  - [x] Responsif & aksesibilitas dicek (Mobile 375px, Tablet 768px, Desktop 1280px)
  - [x] Dikonfirmasi pengguna
- [x] STEP 2 - User management & dashboard
  - [x] Apps Script (`code.gs`, `setup.gs`) + inisiasi tabel otomatis & idempoten
  - [x] Login & register (Validasi form, cookie httpOnly JWT, hashing password bcrypt)
  - [x] Role admin & user (Role bawaan berstatus `is_system`, register otomatis menjadi `user`)
  - [x] Dashboard: manajemen user, manajemen role, CRUD berita
  - [x] Upload media lokal (`public/uploads/` via `src/lib/storage.ts`)
  - [x] Persistensi sesi login (Admin tetap login saat kembali ke beranda, auto-redirect `/login`)
  - [x] Dikonfirmasi pengguna
- [x] STEP 3 - Pemesanan / Booking dengan QRIS
  - [x] Aset resmi barcode QRIS Astalica (`/images/astalica-qris.svg`) berstandar nasional
  - [x] Formulir pemesanan & reservasi adibusana (`/pesan`) dengan pilihan katalog produk & layanan
  - [x] Halaman pembayaran QRIS (`/orders/[id]/payment`) dengan nomor tiket unik, total persis, dan panduan transfer
  - [x] Halaman akun "Pesanan Saya" (`/orders`) khusus user login dengan status dinamis & pesan konfirmasi hangat
  - [x] Dashboard admin: Manajemen Tiket Pesanan (`/dashboard/orders`) dengan aksi konfirmasi pembayaran, pembatalan, dan tautan WhatsApp langsung
  - [x] Proteksi keamanan server-side (user hanya bisa melihat pesanannya sendiri, admin dapat mengelola semua)
  - [x] Dikonfirmasi pengguna
- [x] STEP 4 - Deploy & maintenance
  - [x] Kebutuhan lanjutan ditanyakan (Payment gateway, notifikasi WA/email, cloud storage)
  - [x] Panduan deploy Vercel & Google Sheets (`Database_Astalica.xlsx` + `code.gs`) disiapkan
  - [x] Checklist QA rilis publik: halaman 404 (`not-found.tsx`), `robots.ts`, `sitemap.ts`, favicon PNG+SVG valid, form concierge & newsletter terhubung API, proteksi `/login` tanpa paparan sandi admin, dukungan fallback `/tmp` read-only Vercel
  - [x] Dokumen `MAINTENANCE.md` dan `AKUN_UJICOBA.txt` dibuat
  - [ ] Siap rilis & konfirmasi akhir pengguna

## Catatan & Keputusan
- **Alur Transaksi & QRIS Astalica**:
  1. Pengunjung/klien mengisi form di `/pesan` (auto-fill jika akun login).
  2. Sistem menerbitkan nomor tiket unik (format `AST-YYYYMMDD-XXXX`) dengan status `menunggu_konfirmasi`.
  3. Klien diarahkan ke `/orders/[id]/payment` untuk scan QRIS atau transfer bank.
  4. Tersedia tombol pintas kirim bukti bayar ke WhatsApp Concierge Astalica.
  5. Admin memvalidasi dana masuk di `/dashboard/orders` dan menekan tombol **Konfirmasi**.
  6. Status tiket berubah menjadi `dikonfirmasi` dan di halaman klien `/orders` muncul ucapan selamat serta instruksi lanjutan.
- **Persistensi Sesi Login**:
  - Navbar mendeteksi sesi login secara dinamis via `/api/auth/me`.
  - Jika admin kembali ke beranda, navbar menampilkan tombol **Dashboard Admin** (berwarna emas mewah) dan tombol Logout. Sesi tidak akan hilang saat berpindah antar halaman.
  - Jika pengguna terautentikasi membuka `/login` atau `/register`, sistem secara cerdas langsung mengarahkannya kembali ke dashboard (untuk admin) atau beranda (untuk user).
- **Arsitektur Database Google Spreadsheet**:
  ```
  Browser ➔ Next.js (Server API) ➔ Apps Script Web App (Secret Token) ➔ Google Spreadsheet
  ```
  *Alasan arsitektur*: Browser tidak pernah mengakses Google Apps Script / Spreadsheet langsung agar rahasia dan struktur database tidak terekspos ke publik.
- **Akun Admin Awal**:
  - Email: `admin@gmail.com`
  - Password: `123456` (Disimpan dalam bentuk hash bcrypt di database, teks asli tidak pernah disimpan).
  - Fitur ubah kata sandi tersedia di `/dashboard/profile`.

## Panduan Pengujian yang Telah Dilakukan
1. **Persistensi Login Admin**: Admin login di `/login`, kembali ke beranda `http://localhost:3000`, navbar tetap menampilkan tombol "Dashboard Admin", dan sesi tidak logout.
2. **Auto-redirect Login**: Membuka `/login` saat sesi admin aktif langsung dialihkan ke `/dashboard`.
3. **Formulir Pemesanan**: Mengisi formulir di `http://localhost:3000/pesan` menghasilkan nomor tiket resmi (contoh: `AST-20261109-4034`).
4. **Halaman Pembayaran QRIS**: Halaman `/orders/[id]/payment` menampilkan barcode QRIS tajam, nominal pembayaran persis, tombol unduh QR, nomor rekening alternatif, dan tombol konfirmasi WhatsApp.
5. **Dashboard Pesanan Admin**: Admin membuka `/dashboard/orders`, melihat pesanan masuk, memfilter status, dan berhasil menekan tombol **Konfirmasi** sehingga status pesanan menjadi `dikonfirmasi`.
6. **Halaman "Pesanan Saya"**: Klien membuka `/orders` dan melihat status pesanan terkonfirmasi lengkap dengan pesan konfirmasi hangat dari atelier.
7. **Keamanan Otorisasi**: Akses PATCH status pesanan di server terproteksi ketat; non-admin tidak dapat memanipulasi status tiket.

## Cara Menjalankan
1. Server lokal aktif di `http://localhost:3000`.
2. Form Pemesanan / Reservasi: `http://localhost:3000/pesan`
3. Halaman Pesanan Klien: `http://localhost:3000/orders`
4. Dashboard Admin Pesanan: `http://localhost:3000/dashboard/orders`
