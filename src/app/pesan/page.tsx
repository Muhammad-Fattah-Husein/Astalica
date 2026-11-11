'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Phone,
  User,
  Mail,
  MapPin,
  FileText,
} from 'lucide-react';
import { siteConfig } from '@/config/site';

function OrderFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialProductId = searchParams.get('product') || siteConfig.catalog[0]?.id || '';

  const [selectedProductId, setSelectedProductId] = useState(initialProductId);
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [userSession, setUserSession] = useState<{ id: string; name: string; email: string } | null>(null);

  // Auto populate if user is logged in
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            setUserSession(data.user);
            setCustomerName(data.user.name || '');
            setCustomerEmail(data.user.email || '');
          }
        }
      } catch {
        // Guest mode
      }
    }
    loadUser();
  }, []);

  const selectedProduct = siteConfig.catalog.find((c) => c.id === selectedProductId) || siteConfig.catalog[0];
  const totalPrice = (selectedProduct?.price || 0) * quantity;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    if (!customerName.trim()) {
      setErrorMsg('Nama lengkap pemesan wajib diisi.');
      setLoading(false);
      return;
    }

    const cleanPhone = customerPhone.replace(/[^0-9+]/g, '');
    if (cleanPhone.length < 9) {
      setErrorMsg('Nomor WhatsApp wajib diisi minimal 9 digit angka.');
      setLoading(false);
      return;
    }

    if (!customerAddress.trim()) {
      setErrorMsg('Alamat pengiriman atau lokasi reservasi wajib diisi.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: selectedProduct.id,
          service_product_name: selectedProduct.name,
          quantity,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: cleanPhone,
          customer_address: customerAddress,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'Terjadi kesalahan saat memproses pesanan.');
        setLoading(false);
        return;
      }

      // Redirect directly to payment QRIS page
      router.push(`/orders/${data.data.id}/payment`);
    } catch {
      setErrorMsg('Terjadi gangguan jaringan server.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-low selection:bg-secondary-container selection:text-on-secondary-container">
      {/* Top Header */}
      <header className="bg-surface/90 backdrop-blur-md border-b border-border-champagne/40 py-4 sticky top-0 z-40">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="relative h-7 w-7 rounded-full border border-border-champagne overflow-hidden bg-surface-container-lowest p-0.5">
              <Image src={siteConfig.logo} alt="Astalica" fill className="object-contain" />
            </div>
            <span className="font-serif font-semibold text-primary text-sm sm:text-base tracking-wide">
              Astalica Concierge Order
            </span>
          </div>
          {userSession ? (
            <Link
              href="/orders"
              className="text-xs font-semibold text-primary hover:underline hidden sm:inline"
            >
              Pesanan Saya →
            </Link>
          ) : (
            <Link
              href="/login?from=/pesan"
              className="text-xs font-semibold text-primary hover:underline hidden sm:inline"
            >
              Masuk Akun
            </Link>
          )}
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 lg:py-14">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.25em] text-primary font-bold font-sans">
            PEMESANAN &amp; RESERVASI EKSKLUSIF
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-on-surface font-semibold mt-2">
            Formulir Pesanan Mahakarya Astalica
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-2">
            Nikmati kemewahan hijab sutra mulberry atau jadwalkan sesi private styling bersama konsultan kami.
          </p>
        </div>

        {/* Guest prompt banner if not logged in */}
        {!userSession && (
          <div className="max-w-3xl mx-auto mb-8 p-4 rounded-2xl bg-surface border border-border-champagne/70 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-on-surface-variant">
              <Sparkles className="w-4 h-4 text-primary shrink-0" />
              <span>
                Punya akun klien Astalica? Masuk terlebih dahulu untuk menyimpan riwayat pesanan ke akun Anda.
              </span>
            </div>
            <Link
              href="/login?from=/pesan"
              className="px-4 py-1.5 rounded-full bg-surface-container text-primary font-semibold hover:bg-primary hover:text-on-primary transition-colors shrink-0 text-center"
            >
              Masuk Akun
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form (8 Cols) */}
          <div className="lg:col-span-7 bg-surface rounded-3xl border border-border-champagne/70 p-6 sm:p-8 shadow-sm">
            <h2 className="font-serif text-xl font-semibold text-on-surface mb-6 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <span>Detail Pemesan &amp; Pengiriman</span>
            </h2>

            {errorMsg && (
              <div role="alert" className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Product Selection as accessible radio fieldset */}
              <fieldset>
                <legend className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-2">
                  Pilih Produk Hijab / Layanan Atelier <span aria-hidden="true">*</span>
                </legend>
                <div className="space-y-2.5">
                  {siteConfig.catalog.map((item) => {
                    const isSelected = selectedProductId === item.id;
                    const inputId = `catalog-${item.id}`;
                    return (
                      <label
                        key={item.id}
                        htmlFor={inputId}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 focus-within:ring-2 focus-within:ring-primary/50 ${
                          isSelected
                            ? 'border-primary bg-primary-fixed/20 shadow-sm'
                            : 'border-border-champagne/60 bg-surface-container-low hover:border-primary/40'
                        }`}
                      >
                        <input
                          id={inputId}
                          type="radio"
                          name="product_id"
                          value={item.id}
                          checked={isSelected}
                          onChange={() => setSelectedProductId(item.id)}
                          className="sr-only"
                        />
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative h-12 w-12 rounded-xl overflow-hidden shrink-0 border border-border-champagne/50">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-semibold text-on-surface truncate">
                              {item.name}
                            </p>
                            <span className="text-[10px] uppercase tracking-wider text-primary font-bold">
                              {item.category}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs sm:text-sm font-serif font-bold text-primary shrink-0">
                          {item.priceFormatted}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {/* Quantity Selector */}
              <div>
                <span
                  id="quantity-label"
                  className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5"
                >
                  Jumlah Pesanan (Qty)
                </span>
                <div className="flex items-center gap-3" role="group" aria-labelledby="quantity-label">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Kurangi jumlah pesanan"
                    className="w-11 h-11 rounded-full border border-border-champagne flex items-center justify-center font-bold text-on-surface hover:bg-surface-container transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  >
                    -
                  </button>
                  <output
                    aria-live="polite"
                    className="w-12 text-center font-serif text-lg font-bold text-on-surface"
                  >
                    {quantity}
                  </output>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Tambah jumlah pesanan"
                    className="w-11 h-11 rounded-full border border-border-champagne flex items-center justify-center font-bold text-on-surface hover:bg-surface-container transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  >
                    +
                  </button>
                  <span className="text-xs text-outline ml-2">
                    {selectedProduct.category === 'Layanan Atelier' ? 'sesi reservasi' : 'helai hijab'}
                  </span>
                </div>
              </div>

              {/* Name */}
              <div>
                <label
                  htmlFor="customerName"
                  className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5"
                >
                  Nama Lengkap Pemesan *
                </label>
                <div className="relative rounded-full">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="customerName"
                    name="customer_name"
                    type="text"
                    autoComplete="name"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Contoh: Siti Fatimah Az-Zahra"
                    className="w-full pl-11 pr-4 py-3 bg-surface-container-low border border-border-champagne/70 rounded-full text-base sm:text-sm text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary"
                  />
                </div>
              </div>

              {/* Phone WhatsApp */}
              <div>
                <label
                  htmlFor="customerPhone"
                  className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5"
                >
                  Nomor WhatsApp Aktif *
                </label>
                <div className="relative rounded-full">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    id="customerPhone"
                    name="customer_phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    required
                    aria-describedby="phone-help"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    className="w-full pl-11 pr-4 py-3 bg-surface-container-low border border-border-champagne/70 rounded-full text-base sm:text-sm text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary"
                  />
                </div>
                <p id="phone-help" className="text-[11px] text-outline mt-1 ml-3">
                  Nomor ini akan digunakan tim concierge Astalica untuk mengirim konfirmasi dan resi pengiriman.
                </p>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="customerEmail"
                  className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5"
                >
                  Alamat Email (Opsional)
                </label>
                <div className="relative rounded-full">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="customerEmail"
                    name="customer_email"
                    type="email"
                    autoComplete="email"
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck={false}
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="klien@example.com"
                    className="w-full pl-11 pr-4 py-3 bg-surface-container-low border border-border-champagne/70 rounded-full text-base sm:text-sm text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="customerAddress"
                  className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5"
                >
                  Alamat Lengkap Pengiriman / Lokasi Janji Temu *
                </label>
                <div className="relative">
                  <textarea
                    id="customerAddress"
                    name="customer_address"
                    autoComplete="street-address"
                    required
                    rows={3}
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Tuliskan nama jalan, nomor rumah, RT/RW, kecamatan, kota, dan kode pos..."
                    className="w-full p-4 bg-surface-container-low border border-border-champagne/70 rounded-2xl text-base sm:text-sm text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label
                  htmlFor="notes"
                  className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5"
                >
                  Catatan Khusus (Pilihan Warna, Jam Fitting, Ucapan Gifting)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: Warna Emerald Green, mohon cantumkan kartu ucapan pernikahan..."
                  className="w-full p-4 bg-surface-container-low border border-border-champagne/70 rounded-2xl text-base sm:text-sm text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full text-xs font-semibold uppercase tracking-wider text-on-primary bg-secondary hover:bg-secondary-hover shadow-lg transition-all disabled:opacity-70 mt-6"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Membuat Tiket Pesanan...</span>
                  </>
                ) : (
                  <>
                    <span>Lanjutkan ke Pembayaran QRIS</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Summary Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-surface rounded-3xl border border-border-champagne/70 p-6 sm:p-8 shadow-sm sticky top-24">
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">
                RINGKASAN BIAYA
              </span>
              <h3 className="font-serif text-xl font-semibold text-on-surface mt-1 mb-4">
                Pesanan Anda
              </h3>

              <div className="flex gap-4 pb-4 border-b border-border-champagne/40">
                <div className="relative h-16 w-16 rounded-2xl overflow-hidden shrink-0 border border-border-champagne">
                  <Image src={selectedProduct.image} alt={selectedProduct.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-on-surface">
                    {selectedProduct.name}
                  </h4>
                  <p className="text-[11px] text-outline mt-0.5">
                    {selectedProduct.category}
                  </p>
                  <p className="text-xs font-serif font-bold text-primary mt-1">
                    {selectedProduct.priceFormatted} × {quantity}
                  </p>
                </div>
              </div>

              <div className="space-y-2 py-4 border-b border-border-champagne/40 text-xs">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal Produk</span>
                  <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Biaya Pengiriman</span>
                  <span className="text-emerald-700 font-semibold">Gratis (Promo Atelier)</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Kemasan Beludru Eksklusif</span>
                  <span className="text-emerald-700 font-semibold">Termasuk</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-4 mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-on-surface">
                  Total Tagihan
                </span>
                <span className="font-serif text-2xl font-bold text-primary">
                  Rp {totalPrice.toLocaleString('id-ID')}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-low border border-border-champagne/40 text-[11px] text-on-surface-variant space-y-2">
                <div className="flex items-center gap-2 font-semibold text-on-surface">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Garansi Kualitas Sutra Murni</span>
                </div>
                <p>
                  Setelah menekan tombol lanjut, Anda akan mendapatkan <strong>Kode QRIS</strong> untuk transfer dari BCA, Mandiri, GoPay, OVO, ShopeePay, dll.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-surface flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }
    >
      <OrderFormContent />
    </Suspense>
  );
}
