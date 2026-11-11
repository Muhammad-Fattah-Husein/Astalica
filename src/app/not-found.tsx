import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-4 py-16 text-center relative overflow-hidden">
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-primary-fixed/25 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-lg w-full bg-surface-container-lowest border border-border-champagne/70 rounded-3xl p-8 sm:p-12 shadow-xl">
        <div className="relative h-14 w-14 mx-auto overflow-hidden rounded-full border border-border-champagne bg-surface p-1 shadow-sm mb-6">
          <Image src={siteConfig.logo} alt={siteConfig.name} fill className="object-contain" />
        </div>

        <span className="text-xs uppercase tracking-[0.25em] text-primary font-bold">
          HALAMAN TIDAK DITEMUKAN • 404
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-on-surface mt-2">
          Halaman Tidak Tersedia
        </h1>
        <p className="text-sm text-on-surface-variant mt-3 leading-relaxed">
          Maaf, halaman yang Anda tuju mungkin telah dipindahkan atau tautannya tidak lagi aktif. Silakan kembali ke galeri utama kami.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-secondary hover:bg-secondary-hover text-on-secondary text-xs font-semibold uppercase tracking-wider shadow-md transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
          <Link
            href="/pesan"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-surface-container-low hover:bg-surface-container text-primary border border-border-champagne/70 text-xs font-semibold uppercase tracking-wider transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Pesan Koleksi</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
