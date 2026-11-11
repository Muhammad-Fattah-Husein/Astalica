'use client';

import React, { useState } from 'react';
import { Lock, CheckCircle, AlertCircle, Loader2, KeyRound, ShieldAlert } from 'lucide-react';

export default function ProfilePage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (newPassword !== confirmPassword) {
      setFeedback({ type: 'error', text: 'Konfirmasi kata sandi baru tidak cocok.' });
      return;
    }

    if (newPassword.length < 6) {
      setFeedback({ type: 'error', text: 'Kata sandi baru minimal harus 6 karakter.' });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setFeedback({ type: 'error', text: data.error || 'Gagal mengubah kata sandi.' });
      } else {
        setFeedback({
          type: 'success',
          text: 'Kata sandi berhasil diperbarui! Silakan gunakan kata sandi baru untuk login berikutnya.',
        });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch {
      setFeedback({ type: 'error', text: 'Terjadi gangguan koneksi server.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-on-surface">
          Keamanan &amp; Kata Sandi Akun
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
          Ubah kata sandi akun admin untuk menjaga kerahasiaan data atelier dan pelanggan.
        </p>
      </div>

      {/* Security notice banner */}
      <div className="p-5 rounded-3xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3.5">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold">Peringatan Keamanan Kredensial Awal:</p>
          <p className="text-[11px] leading-relaxed text-amber-800">
            Kredensial bawaan (<code>admin@gmail.com</code> / <code>123456</code>) bersifat publik. Sebelum website ini dideploy ke Vercel atau dipublikasikan, Anda **wajib** mengubah kata sandi admin ke kombinasi yang kuat dan unik.
          </p>
        </div>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-2xl text-xs flex items-center gap-3 border ${
            feedback.type === 'success'
              ? 'bg-green-50 text-green-800 border-green-200'
              : 'bg-red-50 text-red-800 border-red-200'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Change Password Form */}
      <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-border-champagne/70 shadow-sm">
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5">
              Kata Sandi Saat Ini *
            </label>
            <div className="relative rounded-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Masukkan kata sandi lama (misal: 123456)"
                className="w-full pl-11 pr-4 py-2.5 bg-surface-container-low text-on-surface text-xs rounded-full border border-border-champagne focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5">
              Kata Sandi Baru * (Minimal 6 karakter)
            </label>
            <div className="relative rounded-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Masukkan kombinasi kata sandi baru yang aman"
                className="w-full pl-11 pr-4 py-2.5 bg-surface-container-low text-on-surface text-xs rounded-full border border-border-champagne focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5">
              Konfirmasi Kata Sandi Baru *
            </label>
            <div className="relative rounded-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ulangi kata sandi baru"
                className="w-full pl-11 pr-4 py-2.5 bg-surface-container-low text-on-surface text-xs rounded-full border border-border-champagne focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border-champagne/40 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-7 py-3 bg-secondary text-on-secondary hover:bg-secondary-hover text-xs font-semibold uppercase tracking-wider rounded-full shadow-md transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <span>Perbarui Kata Sandi</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
