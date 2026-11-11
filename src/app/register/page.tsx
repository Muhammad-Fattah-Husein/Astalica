'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, Mail, User, ArrowRight, Loader2, AlertCircle, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  React.useEffect(() => {
    async function checkExistingSession() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            router.replace(data.user.role === 'admin' ? '/dashboard' : '/');
            return;
          }
        }
      } catch {
        // Not logged in
      } finally {
        setCheckingSession(false);
      }
    }
    checkExistingSession();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'Gagal mendaftar. Silakan coba lagi.');
        setLoading(false);
        return;
      }

      router.push('/');
      router.refresh();
    } catch (err: any) {
      setErrorMsg('Terjadi gangguan koneksi server.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative selection:bg-secondary-container selection:text-on-secondary-container">
      {/* Background Glow */}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-secondary-fixed/20 blur-3xl pointer-events-none"
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
            Daftar Akun Anggota
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-on-surface-variant">
            Bergabunglah dengan komunitas eksklusif pencinta busana modest adibusana.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {checkingSession ? (
          <div className="bg-surface-container-lowest py-16 px-6 sm:px-10 shadow-xl rounded-3xl border border-border-champagne/70 flex flex-col items-center justify-center gap-3 text-outline">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="text-xs">Memeriksa status sesi...</span>
          </div>
        ) : (
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
                htmlFor="name"
                className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5"
              >
                Nama Lengkap
              </label>
              <div className="relative rounded-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Aisyah Ramadhani"
                  className="block w-full pl-11 pr-4 py-3 bg-surface text-on-surface text-sm rounded-full border border-border-champagne focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition-all placeholder:text-outline-variant"
                />
              </div>
            </div>

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
                  placeholder="aisyah@domain.com"
                  className="block w-full pl-11 pr-4 py-3 bg-surface text-on-surface text-sm rounded-full border border-border-champagne focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition-all placeholder:text-outline-variant"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5"
              >
                Kata Sandi <span className="text-[11px] font-normal normal-case text-outline">(minimal 6 karakter)</span>
              </label>
              <div className="relative rounded-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  minLength={6}
                  aria-describedby="register-password-hint"
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
              <p id="register-password-hint" className="text-[11px] text-outline mt-1.5 ml-3">
                Gunakan minimal 6 karakter kombinasi huruf dan angka.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-full text-xs font-semibold uppercase tracking-wider text-on-primary bg-secondary hover:bg-secondary-hover shadow-md transition-all disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Mendaftarkan...</span>
                </>
              ) : (
                <>
                  <span>Daftar Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-on-surface-variant">
              Sudah memiliki akun?{' '}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
