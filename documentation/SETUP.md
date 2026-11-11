# Panduan Pengaturan Lokal & Google Apps Script Database (SETUP.md)

Dokumen ini berisi panduan lengkap menjalankan aplikasi secara lokal dan menghubungkan **Google Spreadsheet sebagai Database** melalui **Google Apps Script**.

---

## 1. Menjalankan Website Secara Lokal

1. Buka terminal pada folder proyek ini.
2. Pastikan dependensi sudah terpasang:
   ```bash
   npm install
   ```
3. Mulai server pengembangan:
   ```bash
   npm run dev
   ```
4. Buka di peramban (browser):
   ```
   http://localhost:3000
   ```

---

## 2. Akun Masuk Bawaan (Default Credentials)

Sistem telah diinisiasi dengan akun administrator awal:
- **Email:** `admin@gmail.com`
- **Password:** `123456`

> [!WARNING]
> **Peringatan Keamanan Kritis:**
> Kredensial di atas bersifat publik untuk kebutuhan inisiasi awal. **Wajib segera mengganti password admin** melalui menu **Dashboard > Akun & Keamanan** (`/dashboard/profile`) sebelum website dipublikasikan atau dideploy ke Vercel!

---

## 3. Menghubungkan Google Spreadsheet (Google Apps Script Database)

Arsitektur yang digunakan:
```
Browser ➔ Next.js (Server API) ➔ Google Apps Script Web App ➔ Google Spreadsheet
```
*Browser tidak pernah mengakses spreadsheet secara langsung demi melindungi data dari pihak ketiga.*

### Langkah Demi Langkah Setup di Google Spreadsheet:

#### Langkah 3.1: Buat Spreadsheet Baru
1. Buka [Google Sheets](https://sheets.new) di browser Anda.
2. Beri nama spreadsheet, misalnya: **Astalica Database**.

#### Langkah 3.2: Buka Apps Script Editor
1. Di menu atas Google Spreadsheet, klik **Extensions (Ekstensi) > Apps Script**.
2. Anda akan melihat file `Code.gs`.
3. Buka file [`code.gs`](file:///d:/School/10th%20grade%201st%20semester/Project%20IT/SKL/Company%20Profile/code.gs) di root proyek ini, salin seluruh kodenya, lalu tempelkan ke editor Apps Script menggantikan kode bawaan.
4. Klik tombol **+ (Add a file) > Script**, beri nama **setup.gs**.
5. Buka file [`setup.gs`](file:///d:/School/10th%20grade%201st%20semester/Project%20IT/SKL/Company%20Profile/setup.gs) di root proyek ini, salin kodenya, lalu tempelkan ke file `setup.gs` di editor Apps Script.
6. Klik ikon **Save (Simpan)**.

#### Langkah 3.3: Konfigurasi Secret Token di Script Properties
1. Di panel kiri Apps Script editor, klik ikon gerigi **Project Settings (Setelan Proyek)**.
2. Gulir ke bawah ke bagian **Script Properties (Properti Skrip)**.
3. Klik **Add script property**:
   - **Property:** `APPS_SCRIPT_SECRET`
   - **Value:** Buat string rahasia unik (contoh: `astalica_super_secret_token_2026`)
4. Klik **Save script properties**.

#### Langkah 3.4: Jalankan Inisiasi Tabel Otomatis (`initTables`)
1. Kembali ke editor kode (`setup.gs`).
2. Pada dropdown fungsi di toolbar atas, pilih **`initTables`**.
3. Klik tombol **Run (Jalankan)**.
4. Berikan izin otorisasi (*Review permissions > Pilih akun Google Anda > Advanced > Go to Untitled project (unsafe) > Allow*).
5. Periksa kembali Google Spreadsheet Anda: Sheet `Roles`, `Users`, `News`, dan `Orders` telah terbuat otomatis dengan header dan data awal tanpa duplikasi!

#### Langkah 3.5: Deploy sebagai Web App
1. Di pojok kanan atas Apps Script, klik tombol biru **Deploy > New deployment**.
2. Klik ikon gerigi di sebelah kiri (*Select type*), pilih **Web app**.
3. Isi konfigurasi:
   - **Description:** `Astalica Database Engine v1`
   - **Execute as:** `Me (email Anda)`
   - **Who has access:** `Anyone` (Siapa saja - aman karena diverifikasi oleh secret token)
4. Klik **Deploy**.
5. Salin **Web App URL** yang dihasilkan (berformat `https://script.google.com/macros/s/.../exec`).

#### Langkah 3.6: Sambungkan ke File `.env.local` di Website
Buat atau perbarui file `.env.local` di folder proyek website:
```env
APPS_SCRIPT_URL="https://script.google.com/macros/s/DEPLOYMENT_ID_ANDA/exec"
APPS_SCRIPT_SECRET="astalica_super_secret_token_2026"
AUTH_SECRET="kunci_rahasia_acak_jwt_anda"
```

> [!NOTE]
> **Mode Offline / Local Fallback:**
> Jika variabel `APPS_SCRIPT_URL` belum diisi, aplikasi secara otomatis menggunakan database lokal aman di `data/local-database.json`, sehingga Anda dapat langsung login, mencoba dashboard, mengelola user, dan membuat berita secara instan.

---

## 4. Cara Memperbarui Deployment Saat Kode Berubah
Jika di kemudian hari ada penambahan fitur (misalnya tabel baru di Step 3):
1. Salin kode terbaru dari `code.gs` atau `setup.gs`.
2. Tempelkan ke Apps Script editor.
3. Klik **Deploy > Manage deployments**.
4. Klik ikon pensil (**Edit**) pada deployment aktif.
5. Pada bagian **Version**, pilih **New version**.
6. Klik **Deploy**.

---

## 5. Panduan Publikasi ke Vercel (Production Checklist)

1. **Unggah Kode ke GitHub**: Buat repository GitHub baru dan push proyek ini (`.env*`, `code.gs`, `setup.gs`, `public/uploads/*`, dan `AKUN_UJICOBA.txt` otomatis terlewati oleh `.gitignore`).
2. **Import di Vercel**: Buka [vercel.com](https://vercel.com) ➔ **Add New > Project** ➔ pilih repository Anda.
3. **Isi Environment Variables**:
   - `AUTH_SECRET`: Teks acak panjang rahasia (minimal 32 karakter).
   - `NEXT_PUBLIC_APP_URL`: URL website Vercel Anda (misal `https://astalica.vercel.app`).
   - `APPS_SCRIPT_URL`: URL Web App Google Apps Script (`/exec`).
   - `APPS_SCRIPT_SECRET`: Token rahasia yang sama dengan Script Properties di Apps Script.
4. **Deploy & Ganti Password Admin**: Setelah deploy selesai, login menggunakan daftar akun di `AKUN_UJICOBA.txt`, uji alur pemesanan QRIS, lalu segera ubah kata sandi admin awal di `/dashboard/profile`.
