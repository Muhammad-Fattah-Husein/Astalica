'use client';

import React, { useState } from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;

    setLoading(true);
    setIsError(false);
    setStatusMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        setIsError(true);
        setStatusMessage(json.error || 'Gagal mendaftar. Periksa kembali alamat email Anda.');
        return;
      }

      setIsSubscribed(true);
      setStatusMessage(json.message || 'Terdaftar di Atelier Privilege Club.');
      setEmail('');
      setTimeout(() => {
        setIsSubscribed(false);
      }, 4500);
    } catch {
      setIsError(true);
      setStatusMessage('Gangguan jaringan server. Silakan coba kembali.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-16 bg-surface-container border-t border-border-champagne/40">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="rounded-3xl bg-surface p-8 sm:p-12 lg:p-14 border border-border-champagne/60 shadow-md flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Text Info */}
          <div className="flex flex-col max-w-xl text-center lg:text-left">
            <span className="text-xs uppercase tracking-widest text-primary font-bold mb-2">
              ATELIER PRIVILEGE CLUB
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-on-surface font-semibold mb-3">
              Dapatkan Undangan Koleksi Perdana
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Jadilah yang pertama menerima lookbook digital edisi terbatas Hari Raya dan undangan privat peragaan busana adibusana Astalica.
            </p>
          </div>

          {/* Form */}
          <div className="w-full lg:w-auto flex flex-col gap-2 shrink-0">
            <form
              onSubmit={handleSubmit}
              aria-labelledby="newsletter-heading"
              className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch gap-3"
            >
              <span id="newsletter-heading" className="sr-only">
                Formulir Langganan Atelier Privilege Club
              </span>
              <label htmlFor="newsletter-email" className="sr-only">
                Alamat Email
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (isError) {
                    setIsError(false);
                    setStatusMessage('');
                  }
                }}
                aria-invalid={isError ? 'true' : undefined}
                aria-describedby={statusMessage ? 'newsletter-feedback' : undefined}
                placeholder="Masukkan alamat email Anda"
                className="px-5 py-3.5 min-h-[48px] bg-surface-container-low text-on-surface text-sm min-w-[280px] sm:min-w-[320px] rounded-full border border-border-champagne/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition-all placeholder:text-outline-variant"
              />
              <button
                type="submit"
                disabled={loading || isSubscribed}
                className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 min-h-[48px] text-xs font-semibold uppercase tracking-wider rounded-full shadow-sm transition-all disabled:opacity-80 ${
                  isSubscribed
                    ? 'bg-secondary text-on-secondary'
                    : 'bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Mendaftar...</span>
                  </>
                ) : isSubscribed ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Terdaftar</span>
                  </>
                ) : (
                  <>
                    <span>Berlangganan</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
            {statusMessage && (
              <p
                id="newsletter-feedback"
                role={isError ? 'alert' : 'status'}
                className={`text-xs px-3 text-center sm:text-left ${
                  isError ? 'text-red-700 font-medium' : 'text-secondary font-medium'
                }`}
              >
                {statusMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
