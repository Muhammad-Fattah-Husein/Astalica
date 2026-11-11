# Maintenance Log - Astalica Modest Atelier

Dokumen ini mencatat rencana pengembangan lanjutan (*feature backlog*), kendala atau *bug* yang dilaporkan, serta riwayat perubahan pada sistem website Astalica.

---

## Backlog Fitur (Pengembangan Lanjutan)
- [ ] **Payment Gateway Otomatis**: Integrasi Midtrans / Xendit untuk verifikasi otomatis status pembayaran QRIS tanpa konfirmasi manual admin.
- [ ] **Notifikasi Otomatis**: Pengiriman email otomatis (via Resend) atau notifikasi WhatsApp (via Fonnte / WhatsApp Cloud API) saat tiket pesanan dibuat atau dikonfirmasi.
- [ ] **Cloud Media Storage**: Migrasi penyimpanan berkas upload dari disk lokal (`/public/uploads`) ke cloud storage (Vercel Blob / Cloudinary / Google Drive) agar gambar bertahan permanen di server serverless Vercel.
- [ ] **Kustomisasi Domain**: Menghubungkan domain resmi butik (misal: `astalica.id` atau `astalica.com`) di dashboard Vercel.

---

## Bug Diketahui
*Saat ini seluruh fitur utama telah diuji dan tidak ada bug aktif yang dilaporkan.*

---

## Riwayat Perubahan (Changelog)

### [11 November 2026] - Peningkatan Interaktivitas React Bits & Kesiapan Rilis Publik (Step 4 QA)
- Menambahkan 5 komponen resmi React Bits (TS + Tailwind CSS) di `src/components/reactbits/`: `ShinyText.tsx`, `BlurText.tsx`, `CountUp.tsx`, `SpotlightCard.tsx`, dan `Magnet.tsx` (dengan dependensi `motion`).
- Menerapkan efek shimmer emas hangat (`ShinyText`), magnetik tombol CTA (`Magnet`), serta animasi penghitung kredibilitas (`CountUp`) pada `src/components/Hero.tsx`, disertai tombol aksesibel Jeda/Putar untuk marquee ticker (WCAG 2.2.2).
- Menerapkan animasi judul `BlurText` pada bagian `About`, `Services`, `NewsSection`, dan `ContactSection` serta kartu sorot emas `SpotlightCard` pada pilar keunggulan dan layanan utama.
- Menyempurnakan kesiapan publikasi: halaman 404 kustom (`src/app/not-found.tsx`), SEO `robots.ts` & `sitemap.ts`, favicon SVG + PNG (`public/images/logo.png` via `sharp`), Skip Link, modal `<dialog>` native di `NewsSection.tsx`, dan metadata judul per rute.
- Menghapus paparan tombol autofill kredensial admin dari halaman publik `/login`, menambahkan toggle tampil/sembunyi kata sandi aksesibel, menghubungkan Concierge (`POST /api/inquiries`) & Newsletter (`POST /api/newsletter`), serta memvalidasi fallback `/tmp` untuk server read-only Vercel (`src/lib/db.ts`, `src/lib/storage.ts`).
- Menyiapkan `AKUN_UJICOBA.txt` (ditambahkan ke `.gitignore`) dan akun klien uji coba (`klien@astalica.id`).

### [10 November 2026] - Step 4: Deploy & Maintenance Readiness
- Membuat dokumen panduan pemeliharaan `documentation/MAINTENANCE.md`.
- Memverifikasi kesiapan deployment Vercel: konfigurasi `.gitignore`, `.env.example`, build Next.js App Router yang bersih.
- Menyiapkan panduan langkah demi langkah deploy ke Vercel untuk pengguna desainer UI/UX.

### [9 November 2026] - Step 3: Sistem Pemesanan & Pembayaran QRIS
- Menambahkan barcode resmi QRIS Astalica berstandar nasional ASPI/GPN (`/images/astalica-qris.svg`).
- Membangun formulir pemesanan & reservasi adibusana (`/pesan`) dengan integrasi katalog sutra & sesi styling.
- Membangun halaman invoice & instruksi pembayaran QRIS (`/orders/[id]/payment`) dengan tombol unduh QR dan konfirmasi WhatsApp.
- Membangun halaman member "Pesanan Saya" (`/orders`) dengan status dinamis dan pesan konfirmasi selamat.
- Menambahkan modul Manajemen Tiket Pesanan di dashboard admin (`/dashboard/orders`) lengkap dengan tombol Konfirmasi, Tolak/Batal, dan tautan WhatsApp langsung.
- Memperbaiki persistensi sesi admin pada navbar di halaman beranda.

### [9 November 2026] - Step 2: User Management, Dashboard & Database
- Mengembangkan lapisan database Google Spreadsheet via Google Apps Script (`code.gs` & `setup.gs`) dan fallback JSON lokal (`data/local-database.json`).
- Membangun autentikasi aman dengan bcrypt password hashing dan cookie session httpOnly JWT (`jose`).
- Membangun halaman `/login` dan `/register` dengan penanganan role otomatis (`user`).
- Membangun Dashboard Admin (`/dashboard`, `/dashboard/users`, `/dashboard/roles`, `/dashboard/news`, `/dashboard/profile`).
- Membangun sistem CRUD Berita/Warta dengan unggahan thumbnail lokal dan modal baca artikel lengkap.
- Mengganti logo raster dengan format SVG monogram emas tajam (`/images/logo.svg`).

### [9 November 2026] - Step 1: Landing Page Astalica Haute Modesty
- Membangun landing page lengkap dengan estetika mewah Astalica (Playfair Display + Plus Jakarta Sans, Satin Gold `#C5A059`, Royal Emerald `#1B3B2B`, Pearl Ivory `#FDFBF7`).
- Section: Navbar, Hero 4:5 visual, About & Filosofi, Interaktif Fabric Selector (Satin, Voile, Chiffon), Bento Services, Warta & Tren, Kontak & Embed Google Maps, Newsletter, Footer.
- Menyusun dokumentasi awal: `/documentation/PROGRESS.md`, `/documentation/SETUP.md`, `/documentation/DECISIONS.md`.
