-- ASTALICA SUPABASE POSTGRESQL SCHEMA & INITIAL SEED
-- Jalankan SQL ini satu kali di Supabase SQL Editor (Project: Astalica)

create table if not exists public.roles (
  id text primary key,
  name text not null unique,
  description text not null default '',
  permissions text not null default '{}',
  is_system text not null default 'false',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.users (
  id text primary key,
  name text not null,
  email text not null unique,
  password_hash text not null,
  role_id text not null default 'user',
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_users_role_id on public.users (role_id);

create table if not exists public.news (
  id text primary key,
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  category text not null default 'Warta & Tren',
  thumbnail_path text not null default '/images/news-1.webp',
  status text not null default 'draft',
  author_id text not null default 'user-admin-1',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_news_status_created_at on public.news (status, created_at desc);

create table if not exists public.orders (
  id text primary key,
  ticket_number text not null unique,
  user_id text not null default '',
  customer_name text not null,
  customer_email text not null default '',
  customer_phone text not null,
  customer_address text not null,
  service_product_name text not null,
  product_id text not null default '',
  quantity integer not null default 1 check (quantity > 0),
  total_price bigint not null default 0 check (total_price >= 0),
  status text not null default 'menunggu_konfirmasi',
  payment_proof_path text not null default '',
  notes text not null default '',
  admin_notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_orders_user_id on public.orders (user_id);
create index if not exists idx_orders_customer_email on public.orders (customer_email);
create index if not exists idx_orders_status_created_at on public.orders (status, created_at desc);

create table if not exists public.inquiries (
  id text primary key,
  full_name text not null,
  whatsapp_number text not null,
  email_address text not null,
  service_type text not null default 'general',
  message text not null default '',
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subscribers (
  id text primary key,
  email text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Aktifkan Row Level Security (RLS) di seluruh tabel
alter table public.roles enable row level security;
alter table public.users enable row level security;
alter table public.news enable row level security;
alter table public.orders enable row level security;
alter table public.inquiries enable row level security;
alter table public.subscribers enable row level security;

-- Artikel berstatus published boleh dibaca publik; tabel lain diakses eksklusif lewat server Next.js (secret/service_role key)
drop policy if exists "Public can read published news" on public.news;
create policy "Public can read published news"
  on public.news
  for select
  to anon, authenticated
  using (status = 'published');

-- Seed Role Bawaan
insert into public.roles (id, name, description, permissions, is_system, created_at, updated_at)
values
  ('role-admin', 'admin', 'Administrator Utama Atelier Astalica (Akses Penuh)', '{"all":true,"manage_users":true,"manage_roles":true,"manage_news":true,"manage_orders":true}', 'true', '2026-11-09T00:00:00.000Z', '2026-11-09T00:00:00.000Z'),
  ('role-user', 'user', 'Klien / Pengguna Terdaftar Astalica', '{"read":true,"create_order":true,"view_own_orders":true}', 'true', '2026-11-09T00:00:00.000Z', '2026-11-09T00:00:00.000Z')
on conflict (id) do nothing;

-- Seed Akun Uji Coba & Admin Awal
insert into public.users (id, name, email, password_hash, role_id, status, created_at, updated_at)
values
  ('user-admin-1', 'Administrator Astalica', 'admin@gmail.com', '$2b$10$bv1fW3W44EmZWt0LbNyL/eL.v2GvANNFJX1BBogPHC3UckvPQl8T6', 'admin', 'active', '2026-11-09T00:00:00.000Z', '2026-11-09T00:00:00.000Z'),
  ('user-client-demo', 'Sarah Anindya (Klien Uji Coba)', 'klien@astalica.id', '$2b$10$qbpmoFMgsgvU2cKF.e8WpO7/ogDqXlcqfwRz0OzQ85hFmjtHfSZNq', 'user', 'active', '2026-11-09T00:00:00.000Z', '2026-11-09T00:00:00.000Z')
on conflict (id) do nothing;

-- Seed 3 Artikel Berita Awal
insert into public.news (id, title, slug, excerpt, content, category, thumbnail_path, status, author_id, created_at, updated_at)
values
  (
    'news-1',
    'Tren Hijab Draped 2025: Mengapa Silk Satin Emerald Jadi Primadona Panggung Paris',
    'tren-hijab-draped-2025-emerald-silk-paris',
    'Eksplorasi siluet drape asimetris yang memikat pecinta modest adibusana internasional dengan paduan palet zamrud mulia dan kemilau satin alami.',
    E'Panggung adibusana modest di Paris Fashion Week musim ini diramaikan oleh gelombang keanggunan baru: siluet draped silk satin dengan sentuhan warna royal forest emerald. Desain ini menawarkan keseimbangan sempurna antara kesantunan syar''i dan modernitas haute couture tingkat dunia.\n\nAstalica Atelier mengangkat tren ini ke dalam koleksi mahakarya terbaru dengan memadukan serat sutra mulberry murni grade 6A yang diproses tenun tangan oleh perajin tradisional Indonesia.',
    'Tren Modest 2025',
    '/images/news-1.webp',
    'published',
    'user-admin-1',
    '2025-05-18T10:00:00.000Z',
    '2025-05-18T10:00:00.000Z'
  ),
  (
    'news-2',
    'Panduan Merawat Hijab Sutra Mulberry Agar Kilau dan Lembutnya Bertahan Bertahun-tahun',
    'panduan-merawat-hijab-sutra-mulberry',
    'Kiat esensial suhu pencucian, jenis sabun pH netral khusus sutra, serta trik menyetrika tanpa merusak tenunan mikro sutra organik.',
    E'Sutra mulberry murni adalah mahakarya alam yang memerlukan sentuhan lembut dalam perawatannya. Hindari penggunaan detergen berbahan kimia keras atau pemutih yang dapat memecah ikatan protein alami serat sutra.\n\nGunakan sabun khusus ber-pH netral atau sampo bayi lembut, cuci secara perlahan dengan air dingin tanpa diperas, dan keringkan di tempat teduh yang tidak terpapar sinar matahari langsung.',
    'Atelier Care',
    '/images/news-2.webp',
    'published',
    'user-admin-1',
    '2025-05-10T08:30:00.000Z',
    '2025-05-10T08:30:00.000Z'
  ),
  (
    'news-3',
    'Astalica Gandeng Pengrajin Tenun Sutra Lokal dalam Program Pemberdayaan Modest Artisans',
    'astalica-gandeng-pengrajin-tenun-sutra-lokal',
    'Inisiatif sirkular kami untuk memberdayakan lebih dari 120 perajin tenun wanita di Jawa Barat dan Sulawesi Selatan dengan upah berkeadilan.',
    E'Komitmen Astalica bukan sekadar menciptakan adibusana santun, melainkan juga menyejahterakan rantai produksi hulu melalui kemitraan berkeadilan bersama kelompok perajin tenun wastra wanita di pelosok Nusantara.\n\nMelalui program pendampingan teknik tenun presisi dan standarisasi ekspor, karya artisan lokal kini mampu bersaing dan dipamerkan di galeri internasional.',
    'Pemberdayaan Sosial',
    '/images/news-3.webp',
    'published',
    'user-admin-1',
    '2025-04-28T14:15:00.000Z',
    '2025-04-28T14:15:00.000Z'
  )
on conflict (id) do nothing;
