import React from 'react';
import Link from 'next/link';
import { executeDb, getDatabaseProvider } from '@/lib/db';
import { Users, ShieldAlert, Newspaper, PlusCircle, ArrowRight, Database, ExternalLink, ShoppingBag, Clock } from 'lucide-react';

export default async function DashboardOverviewPage() {
  const dbProvider = getDatabaseProvider();
  const usersResult = await executeDb<any[]>('query', 'Users');
  const rolesResult = await executeDb<any[]>('query', 'Roles');
  const newsResult = await executeDb<any[]>('query', 'News');
  const ordersResult = await executeDb<any[]>('query', 'Orders');

  const usersCount = usersResult.data?.length || 0;
  const rolesCount = rolesResult.data?.length || 0;
  const newsCount = newsResult.data?.length || 0;
  const publishedNewsCount = (newsResult.data || []).filter((n) => n.status === 'published').length;
  const orders = ordersResult.data || [];
  const ordersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'menunggu_konfirmasi').length;

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="font-serif text-3xl font-semibold text-on-surface">
          Ringkasan Atelier &amp; Panel Kontrol
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
          Selamat datang di pusat manajemen data terintegrasi Astalica.
        </p>
      </div>

      {/* Metrics Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Orders */}
        <div className="p-6 rounded-3xl bg-surface border border-border-champagne/70 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-outline">
              Tiket Pesanan
            </span>
            <p className="text-3xl font-serif font-bold text-on-surface mt-1">{ordersCount}</p>
            <span className="text-[11px] text-amber-700 font-semibold mt-1 inline-block">
              {pendingOrdersCount} menunggu bayar
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2: Users */}
        <div className="p-6 rounded-3xl bg-surface border border-border-champagne/70 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-outline">
              Total Pengguna
            </span>
            <p className="text-3xl font-serif font-bold text-on-surface mt-1">{usersCount}</p>
            <span className="text-[11px] text-secondary mt-1 inline-block">Terdaftar di sistem</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3: News */}
        <div className="p-6 rounded-3xl bg-surface border border-border-champagne/70 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-outline">
              Artikel Berita
            </span>
            <p className="text-3xl font-serif font-bold text-on-surface mt-1">{newsCount}</p>
            <span className="text-[11px] text-tertiary mt-1 inline-block">
              {publishedNewsCount} diterbitkan
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-tertiary/15 flex items-center justify-center text-tertiary">
            <Newspaper className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 4: Database */}
        <div className="p-6 rounded-3xl bg-surface border border-border-champagne/70 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-outline">
              Database Backend
            </span>
            <p className="text-base font-serif font-bold text-on-surface mt-1">
              {dbProvider === 'supabase'
                ? 'Supabase'
                : dbProvider === 'apps-script'
                  ? 'Google Sheets'
                  : 'Mode Lokal (JSON)'}
            </p>
            <span
              className={`text-[11px] mt-1 inline-block ${
                dbProvider === 'local' ? 'text-amber-700 font-medium' : 'text-green-700'
              }`}
            >
              {dbProvider === 'supabase'
                ? 'PostgreSQL Cloud Aktif'
                : dbProvider === 'apps-script'
                  ? 'via Apps Script Web App'
                  : 'Mode fallback lokal'}
            </span>
          </div>
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              dbProvider === 'local' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
            }`}
          >
            <Database className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Action & Architecture Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Quick Actions */}
        <div className="lg:col-span-7 bg-surface rounded-3xl p-6 sm:p-8 border border-border-champagne/70 shadow-sm space-y-6">
          <h2 className="font-serif text-xl font-semibold text-on-surface">Aksi Cepat Manajemen</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/dashboard/orders"
              className="p-5 rounded-2xl bg-surface-container-low hover:bg-surface-container border border-border-champagne/60 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-semibold text-on-surface group-hover:text-primary transition-colors">
                  Kelola Tiket Pesanan &amp; QRIS
                </h3>
                <p className="text-xs text-on-surface-variant mt-1">
                  Verifikasi pembayaran masuk, konfirmasi tiket, dan hubungi klien via WhatsApp.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary mt-4 group-hover:translate-x-1 transition-transform">
                Buka Pesanan ({pendingOrdersCount} menunggu) <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <Link
              href="/dashboard/news"
              className="p-5 rounded-2xl bg-surface-container-low hover:bg-surface-container border border-border-champagne/60 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-semibold text-on-surface group-hover:text-secondary transition-colors">
                  Tulis Berita Baru
                </h3>
                <p className="text-xs text-on-surface-variant mt-1">
                  Publikasikan warta tren, rilis koleksi, atau inspirasi gaya hijab terbaru.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-secondary mt-4 group-hover:translate-x-1 transition-transform">
                Kelola Berita <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <Link
              href="/dashboard/users"
              className="p-5 rounded-2xl bg-surface-container-low hover:bg-surface-container border border-border-champagne/60 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-semibold text-on-surface group-hover:text-secondary transition-colors">
                  Kelola Pengguna
                </h3>
                <p className="text-xs text-on-surface-variant mt-1">
                  Atur hak akses akun anggota, cari data pengguna, atau sesuaikan status aktif.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-secondary mt-4 group-hover:translate-x-1 transition-transform">
                Daftar User ({usersCount}) <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>

          {/* Recent Articles Overview */}
          <div className="pt-4 border-t border-border-champagne/40">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-on-surface">Artikel Terbaru</h3>
              <Link href="/dashboard/news" className="text-xs text-primary font-semibold hover:underline">
                Lihat Semua ({newsCount})
              </Link>
            </div>
            <div className="space-y-3">
              {(newsResult.data || []).slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-surface-container-low/60 border border-border-champagne/40 flex items-center justify-between gap-4"
                >
                  <div className="truncate">
                    <p className="text-xs sm:text-sm font-medium text-on-surface truncate">{item.title}</p>
                    <span className="text-[11px] text-outline">
                      {new Date(item.created_at).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                    </span>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold shrink-0 uppercase tracking-wider ${
                      item.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Architecture and Security */}
        <div className="lg:col-span-5 space-y-6">
          {/* Security Banner */}
          <div className="p-6 rounded-3xl bg-secondary text-on-secondary shadow-md space-y-3">
            <span className="text-[10px] uppercase tracking-widest text-primary font-bold">
              PROTEKSI AKSES MULTI-ROLE
            </span>
            <h3 className="font-serif text-lg font-semibold text-on-secondary">
              Keamanan Terverifikasi Server-Side
            </h3>
            <p className="text-xs text-on-secondary-container leading-relaxed">
              Setiap rute <code>/dashboard/*</code> dikawal ketat oleh Middleware Next.js dan verifikasi JWT token dengan algoritma HS256. Akun selain admin dicegat secara otomatis.
            </p>
          </div>

          {/* System Info */}
          <div className="p-6 rounded-3xl bg-surface border border-border-champagne/70 shadow-sm space-y-4">
            <h3 className="font-serif text-base font-semibold text-on-surface">
              Status Integrasi &amp; Database
            </h3>
            <div className="space-y-2.5 text-xs text-on-surface-variant">
              <div className="flex justify-between py-1.5 border-b border-border-champagne/40">
                <span>Database Utama</span>
                <span
                  className={`font-mono font-semibold ${
                    dbProvider === 'supabase'
                      ? 'text-emerald-700'
                      : dbProvider === 'apps-script'
                        ? 'text-sky-700'
                        : 'text-amber-700'
                  }`}
                >
                  {dbProvider === 'supabase'
                    ? 'Supabase PostgreSQL'
                    : dbProvider === 'apps-script'
                      ? 'Google Apps Script'
                      : 'Local JSON Fallback'}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border-champagne/40">
                <span>Penyimpanan Media</span>
                <span className="font-mono">Local Disk (/public/uploads)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border-champagne/40">
                <span>Format QRIS</span>
                <span className="font-mono text-emerald-700 font-semibold">Standar ASPI / GPN</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Status Deployment</span>
                <span className="font-mono text-primary font-semibold">Vercel Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
