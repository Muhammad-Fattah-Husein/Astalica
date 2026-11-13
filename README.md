# Astalica Modest Atelier ✨
> **Haute Couture Modest Fashion & Bespoke Atelier Web Platform**  
> Proyek IT Kelas 10 Semester 1 — Pembuatan Website Company Profile Interaktif, Sistem Pemesanan QRIS, & Dashboard Admin Berbasis Supabase PostgreSQL.

[![Live on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://astalica.vercel.app)
[![Database](https://img.shields.io/badge/Database-Supabase%20PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com)
[![Framework](https://img.shields.io/badge/Framework-Next.js%2014-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

---

## 🌐 Demo & Tautan Penting
- **Website Live Produksi**: [https://astalica.vercel.app](https://astalica.vercel.app)
- **Dashboard Admin**: [https://astalica.vercel.app/dashboard](https://astalica.vercel.app/dashboard)
- **GitHub Repository**: [https://github.com/Muhammad-Fattah-Husein/Astalica](https://github.com/Muhammad-Fattah-Husein/Astalica)

---

## 📖 Tentang Astalica
**Astalica** adalah rumah mode adibusana santun (*haute couture modest fashion*) yang memadukan keanggunan sutra mulberry murni grade 6A, tenun wastra tradisional Nusantara, dan sentuhan modernitas Paris Fashion Week. 

Platform web ini dibangun sebagai solusi digital terintegrasi yang menghadirkan pengalaman visual mewah bergaya **Neo-skeuomorphic**, sistem reservasi busana *bespoke*, simulasi pembayaran QRIS instan, serta dashboard manajemen konten dan pesanan untuk pengelola atelier.

---

## 🌟 Fitur Utama

### 1. Pengalaman Pengunjung (Front-End)
- **Hero & Storytelling Interaktif**: Tipografi serif elegan (*Cinzel / Playfair*), palet warna *Forest Emerald* & *Gold Accent*, serta mikrointeraksi taktil.
- **Interactive Fabric & Drape Selector**: Eksplorasi material kain sutra (*Silk Satin, Organza, Jacquard, Velvet*) secara langsung.
- **Koleksi Mahakarya (Best Sellers & Showcase)**: Galeri busana dengan detail bahan, panduan ukuran, dan kurasi haute couture.
- **Formulir Konsultasi Busana (Bespoke Inquiries)**: Terintegrasi langsung dengan database untuk reservasi pengukuran privat.
- **Atelier Privilege Club (Newsletter)**: Pendaftaran buletin tren mode eksklusif.

### 2. Sistem Pemesanan & Pembayaran QRIS
- **Pemesanan Mandiri (`/pesan`)**: Formulir terstruktur dengan kalkulasi harga otomatis dan pembuatan **Nomor Tiket Pesanan Unik** (misal: `AST-202611-XXXX`).
- **Simulasi Pembayaran QRIS Instan (`/orders/[id]/payment`)**: 
  - Tampilan QRIS dinamis berstandar nasional dengan masa berlaku countdown.
  - Unggah bukti pembayaran (*proof of payment*) langsung ke sistem.
  - Pelacakan status pesanan secara *real-time* (*Menunggu Konfirmasi*, *Diproses*, *Selesai*).

### 3. Portal Autentikasi & Hak Akses (RBAC)
- **Login & Registrasi Klien (`/login`, `/register`)**: Autentikasi aman berbasis JWT (*JSON Web Token*) yang disimpan dalam cookie `httpOnly` terenkripsi.
- **Role-Based Access Control**:
  - `admin`: Akses penuh ke dashboard operasional, modul berita, pesanan, user management, dan data analitik.
  - `user`: Akses riwayat pesanan pribadi dan profil anggota atelier.

### 4. Dashboard Admin Terpadu (`/dashboard`)
- **Ringkasan Operasional**: Indikator status database (*Supabase PostgreSQL Cloud*), total pesanan, jumlah pengguna, dan artikel aktif.
- **Manajemen Warta & Tren (`/dashboard/news`)**: CRUD lengkap berita mode dan tips perawatan busana.
- **Manajemen Pesanan (`/dashboard/orders`)**: Verifikasi bukti transfer, pembaruan status pesanan klien, dan catatan kurator.
- **Manajemen Pengguna & Peran (`/dashboard/users`, `/dashboard/roles`)**: Kelola akun tim dan perizinan sistem.

---

## 🛠️ Arsitektur Teknologi

| Komponen | Teknologi | Keterangan |
| :--- | :--- | :--- |
| **Frontend Framework** | Next.js 14 (App Router) | Server-Side Rendering (SSR) & React Server Components |
| **Bahasa Pemrograman** | TypeScript (Strict Mode) | Menjamin kestabilan tipe data di seluruh modul |
| **Styling & Desain** | Tailwind CSS & PostCSS | Sistem desain *Neo-skeuomorphism* kustom |
| **Ikonografi** | Lucide React | Ikon modern, ringan, dan konsisten |
| **Database Cloud** | Supabase PostgreSQL | Hosting database di Singapura (`ap-southeast-1`) dengan Row Level Security |
| **Database Bridge** | Multi-Driver Fallback | `Supabase` (Utama) $\rightarrow$ `Google Sheets` $\rightarrow$ `Local JSON` (Fallback) |
| **Keamanan & Sandi** | bcryptjs & jose (JWT) | Hashing sandi terenkripsi & session cookie aman |
| **Deployment** | Vercel Platform | CI/CD otomatis terhubung langsung ke GitHub repo |

---

## 🗄️ Skema Database (Supabase PostgreSQL)

Database Astalica menggunakan 6 tabel relasional yang telah dioptimasi dengan index dan RLS:
1. `public.roles` — Struktur hak akses pengguna (`admin`, `user`).
2. `public.users` — Akun pengguna terdaftar dengan sandi ber-hash bcrypt.
3. `public.news` — Artikel warta tren mode dan tips atelier.
4. `public.orders` — Data transaksi busana, nomor tiket, status pembayaran, dan bukti transfer.
5. `public.inquiries` — Pesan reservasi konsultasi busana dari formulir publik.
6. `public.subscribers` — Daftar email anggota Atelier Privilege Club.

*(Skema lengkap dan query seed tersedia di [`supabase-schema.sql`](./supabase-schema.sql))*

---

## 🔑 Akun Uji Coba Bawaan

| Peran | Email | Kata Sandi | Kegunaan |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@gmail.com` | `123456` | Menguji dashboard admin penuh, approval pesanan, dan kelola berita |
| **Klien / Pelanggan** | `klien@astalica.id` | `123456` | Menguji alur pemesanan dan riwayat pesanan klien |

---

## 🚀 Panduan Menjalankan Proyek Secara Lokal

### Prasyarat
- [Node.js](https://nodejs.org) versi 18.18 atau lebih baru.
- Akun GitHub & Supabase (opsional jika ingin menggunakan cloud DB pribadi).

### 1. Clone Repositori
```bash
git clone https://github.com/Muhammad-Fattah-Husein/Astalica.git
cd Astalica
```

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Konfigurasi Variabel Lingkungan
Salin file `.env.example` menjadi `.env.local`:
```bash
cp .env.example .env.local
```
Isi variabel berikut:
```env
# Database Supabase
SUPABASE_URL="https://driuoafconaywlvkwroo.supabase.co"
SUPABASE_SECRET_KEY="sb_secret_your_secret_key"

# Kunci JWT & URL Aplikasi
AUTH_SECRET="kunci-rahasia-jwt-anda"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Jalankan Server Pengembangan
```bash
npm run dev
```
Buka browser di [http://localhost:3000](http://localhost:3000).

### 5. Build untuk Produksi
```bash
npm run build
npm run start
```

---

## 📂 Struktur Direktori Proyek
```
Astalica/
├── data/                      # File cadangan database lokal (JSON)
├── public/                    # Aset statis gambar, logo, ikon, & mockup
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/               # Server API Routes (auth, orders, news, inquiries, etc.)
│   │   ├── dashboard/         # Halaman Dashboard Admin & submodule
│   │   ├── login/             # Halaman Masuk Akun
│   │   ├── orders/            # Halaman Pelacakan & Pembayaran QRIS
│   │   ├── pesan/             # Formulir Pemesanan Busana
│   │   ├── register/          # Halaman Pendaftaran Akun
│   │   ├── layout.tsx         # Root Layout & Metadata
│   │   └── page.tsx           # Landing Page Utama Astalica
│   ├── components/            # Komponen UI Reusable (Navbar, Hero, Footer, FabricSelector)
│   └── lib/                   # Utilitas Sistem (db.ts, auth.ts, qris.ts, helpers.ts)
├── .env.example               # Contoh konfigurasi variabel lingkungan
├── next.config.js             # Konfigurasi Next.js
├── package.json               # Dependensi & script proyek
├── supabase-schema.sql        # DDL Skema PostgreSQL & seed data
└── README.md                  # Dokumentasi proyek ini
```

---

## 👨‍💻 Pengembang
**Muhammad Fattah Husein**  
*Project IT 10th Grade — Semester 1*  
Astalica Modest Atelier © 2026. All rights reserved.
