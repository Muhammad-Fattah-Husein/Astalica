'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, ArrowRight, Loader2, AlertCircle, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { siteConfig } from '@/config/site';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/dashboard';
  const unauthorizedError = searchParams.get('error') === 'unauthorized';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [errorMsg, setErrorMsg] = useState(
    unauthorizedError ? 'Akses ditolak. Rute dashboard hanya dapat dibuka oleh role admin.' : ''
  );

  React.useEffect(() => {
    async function checkExistingSession() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            if (data.user.role === 'admin') {
              router.replace(from.startsWith('/dashboard') ? from : '/dashboard');
              return;
            } else {
              router.replace('/');
              return;
            }
          }
        }
      } catch {
        // Not logged in
      } finally {
        setCheckingSession(false);
      }
    }
    checkExistingSession();
  }, [from, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'Gagal masuk. Periksa kembali email dan kata sandi Anda.');
        setLoading(false);
        return;
      }

      if (data.user.role === 'admin') {
        router.push(from.startsWith('/dashboard') ? from : '/dashboard');
      } else {
        router.push('/');
      }
      router.refresh();
    } catch {
      setErrorMsg('Terjadi gangguan koneksi server.');
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="bg-surface-container-lowest py-16 px-6 sm:px-10 shadow-xl rounded-3xl border border-border-champagne/70 flex flex-col items-center justify-center gap-3 text-outline">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <span className="text-xs">Memeriksa status sesi...</span>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest py-8 px-6 sm:px-10 shadow-xl rounded-3xl border border-border-champagne/70">
      {errorMsg && (
        <div role="alert" className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5"
          >
            Alamat Email
          </label>
          <div className="relative rounded-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="block w-full pl-11 pr-4 py-3 bg-surface text-on-surface text-sm rounded-full border border-border-champagne focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition-all placeholder:text-outline-variant"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5"
          >
            Kata Sandi
          </label>
          <div className="relative rounded-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="block w-full pl-11 pr-12 py-3 bg-surface text-on-surface text-sm rounded-full border border-border-champagne focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition-all placeholder:text-outline-variant"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-pressed={showPassword}
              aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-outline hover:text-primary transition-colors focus-visible:outline-none focus-visible:text-primary"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-full text-xs font-semibold uppercase tracking-wider text-on-primary bg-secondary hover:bg-secondary-hover shadow-md transition-all disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Memverifikasi...</span>
            </>
          ) : (
            <>
              <span>Masuk Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-border-champagne/40 text-center">
        <p className="text-xs text-on-surface-variant">
          Belum memiliki akun?{' '}
          <Link href="/register" className="font-semibold text-primary hover:underline">
            Daftar akun baru
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative selection:bg-secondary-container selection:text-on-secondary-container">
      {/* Background Glow */}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-primary-fixed/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-outline hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>

        <div className="text-center">
          <div className="relative h-14 w-14 mx-auto overflow-hidden rounded-full border border-border-champagne bg-surface-container-lowest p-1 shadow-sm mb-4">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name}
              fill
              className="object-contain"
            />
          </div>
          <h1 className="font-serif text-3xl font-semibold text-on-surface tracking-tight">
            Masuk ke Portal Atelier
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-on-surface-variant">
            Silakan masuk untuk mengakses panel administrasi dan layanan pribadi Anda.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Suspense
          fallback={
            <div className="bg-surface-container-lowest py-16 px-6 text-center rounded-3xl border border-border-champagne/70 shadow-xl">
              <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto mb-2" />
              <span className="text-xs text-outline">Memuat formulir...</span>
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
