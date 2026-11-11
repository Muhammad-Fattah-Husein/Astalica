'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import {
  QrCode,
  Copy,
  Check,
  Download,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowLeft,
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import type { Order } from '@/types';

export default function OrderPaymentPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedTicket, setCopiedTicket] = useState(false);
  const [copiedRekening, setCopiedRekening] = useState(false);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        const data = await res.json();
        if (!res.ok || !data.success) {
          setErrorMsg(data.error || 'Pesanan tidak ditemukan.');
          return;
        }
        setOrder(data.data);
      } catch {
        setErrorMsg('Gagal memuat rincian pesanan.');
      } finally {
        setLoading(false);
      }
    }
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const copyToClipboard = (text: string, type: 'ticket' | 'rekening') => {
    navigator.clipboard.writeText(text);
    if (type === 'ticket') {
      setCopiedTicket(true);
      setTimeout(() => setCopiedTicket(false), 2000);
    } else {
      setCopiedRekening(true);
      setTimeout(() => setCopiedRekening(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="text-xs text-outline">Menyiapkan instruksi pembayaran QRIS...</span>
      </div>
    );
  }

  if (errorMsg || !order) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-2xl font-semibold text-on-surface">Pesanan Tidak Ditemukan</h1>
        <p className="text-xs text-on-surface-variant max-w-md mt-2">{errorMsg}</p>
        <Link
          href="/"
          className="mt-6 px-6 py-2.5 rounded-full bg-primary text-on-primary text-xs font-semibold uppercase tracking-wider"
        >
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Halo Concierge Astalica, saya sudah melakukan pembayaran QRIS untuk tiket pesanan ${order.ticket_number} atas nama ${order.customer_name} sebesar Rp ${order.total_price.toLocaleString('id-ID')}. Mohon verifikasi dan info pengirimannya. Terima kasih.`
  );
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-surface-container-low pb-20 selection:bg-secondary-container selection:text-on-secondary-container">
      {/* Top Navbar */}
      <header className="bg-surface/90 backdrop-blur-md border-b border-border-champagne/40 py-4 sticky top-0 z-40">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 flex items-center justify-between">
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
              Instruksi Pembayaran QRIS
            </span>
          </div>
          <Link
            href="/orders"
            className="text-xs font-semibold text-primary hover:underline"
          >
            Pesanan Saya →
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1100px] mx-auto px-4 sm:px-6 pt-10">
        {/* Status Notification Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 sm:p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-full bg-amber-100 text-amber-700 shrink-0 mt-0.5">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                  Status: Menunggu Pembayaran
                </span>
                <span className="text-xs text-amber-800">Tiket: <strong>{order.ticket_number}</strong></span>
              </div>
              <p className="text-xs text-amber-900 mt-1">
                Silakan lakukan transfer atau scan kode QRIS di bawah ini untuk menyelesaikan pesanan Anda.
              </p>
            </div>
          </div>

          <button
            onClick={() => copyToClipboard(order.ticket_number, 'ticket')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface border border-amber-300 text-xs font-semibold text-amber-950 hover:bg-amber-100 transition-colors shrink-0"
          >
            {copiedTicket ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedTicket ? 'Tersalin!' : 'Salin Nomor Tiket'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: QRIS Card (6 cols) */}
          <div className="lg:col-span-6 bg-surface rounded-3xl border border-border-champagne/70 p-6 sm:p-8 shadow-sm flex flex-col items-center text-center">
            <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">
              SCAN UNTUK MEMBAYAR
            </span>
            <h2 className="font-serif text-2xl font-semibold text-on-surface mt-1 mb-2">
              QRIS Nasional Astalica
            </h2>
            <p className="text-xs text-on-surface-variant max-w-sm mb-6">
              Mendukung semua bank nasional (BCA, Mandiri, BRI, BNI) dan dompet digital (GoPay, OVO, Dana, ShopeePay, LinkAja).
            </p>

            {/* QRIS SVG Image Display */}
            <div className="relative w-full max-w-[320px] aspect-[400/550] rounded-2xl overflow-hidden border-2 border-border-champagne/80 shadow-md bg-white p-2">
              <Image
                src={siteConfig.qris.image}
                alt="QRIS Astalica Haute Modesty"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="w-full max-w-[320px] mt-4 flex items-center justify-between gap-3">
              <a
                href={siteConfig.qris.image}
                download="qris-astalica-atelier.svg"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-surface-container text-xs font-semibold text-primary hover:bg-primary hover:text-on-primary transition-all border border-border-champagne/60"
              >
                <Download className="w-4 h-4" />
                <span>Unduh Gambar QR</span>
              </a>
            </div>

            {/* Alternative Direct Bank Transfer */}
            <div className="w-full mt-6 pt-6 border-t border-border-champagne/40 text-left">
              <span className="text-[10px] uppercase tracking-wider text-outline font-semibold block mb-2">
                ATAU TRANSFER MANUAL REKENING RESMI
              </span>
              <div className="p-3.5 rounded-2xl bg-surface-container-low border border-border-champagne/50 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-on-surface">BCA • Atelier Astalica Modest</p>
                  <p className="font-mono text-sm font-bold text-primary tracking-wider mt-0.5">
                    {siteConfig.qris.accountNumber}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(siteConfig.qris.accountNumber, 'rekening')}
                  className="p-2 rounded-full hover:bg-surface border border-border-champagne/50 text-outline hover:text-primary transition-colors"
                  title="Salin No Rekening"
                >
                  {copiedRekening ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Right: Order Summary & Steps (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Amount Box */}
            <div className="bg-surface rounded-3xl border border-border-champagne/70 p-6 sm:p-8 shadow-sm">
              <span className="text-xs uppercase tracking-wider text-outline font-semibold">
                TOTAL PEMBAYARAN PERSIS
              </span>
              <div className="flex items-baseline justify-between mt-1 mb-4">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-primary">
                  Rp {order.total_price.toLocaleString('id-ID')}
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Bebas Biaya Admin
                </span>
              </div>

              <div className="space-y-3 pt-4 border-t border-border-champagne/40 text-xs">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Produk / Layanan</span>
                  <span className="font-semibold text-on-surface text-right max-w-[200px] truncate">
                    {order.service_product_name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Jumlah</span>
                  <span className="font-semibold text-on-surface">{order.quantity} Helai / Sesi</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Nama Pemesan</span>
                  <span className="font-semibold text-on-surface">{order.customer_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Nomor WhatsApp</span>
                  <span className="font-semibold text-on-surface">{order.customer_phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Alamat Pengiriman</span>
                  <span className="font-semibold text-on-surface text-right max-w-[220px] truncate">
                    {order.customer_address}
                  </span>
                </div>
              </div>
            </div>

            {/* How to Pay Steps */}
            <div className="bg-surface rounded-3xl border border-border-champagne/70 p-6 sm:p-8 shadow-sm">
              <h3 className="font-serif text-lg font-semibold text-on-surface mb-4">
                Panduan Langkah Pembayaran
              </h3>
              <ol className="space-y-3 text-xs text-on-surface-variant">
                <li className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-secondary text-primary font-bold flex items-center justify-center shrink-0 text-[10px]">
                    1
                  </span>
                  <span>Buka aplikasi m-Banking (BCA, Mandiri, BRI, BNI) atau e-Wallet favorit Anda.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-secondary text-primary font-bold flex items-center justify-center shrink-0 text-[10px]">
                    2
                  </span>
                  <span>Pilih menu <strong>Bayar</strong> atau <strong>Scan QRIS</strong>.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-secondary text-primary font-bold flex items-center justify-center shrink-0 text-[10px]">
                    3
                  </span>
                  <span>Arahkan kamera ponsel ke kode QRIS di samping atau pilih dari galeri jika mengunduh gambar.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-secondary text-primary font-bold flex items-center justify-center shrink-0 text-[10px]">
                    4
                  </span>
                  <span>Pastikan penerima adalah <strong>ASTALICA HAUTE MODESTY</strong> dan masukkan nominal <strong>Rp {order.total_price.toLocaleString('id-ID')}</strong>.</span>
                </li>
              </ol>

              {/* Action Buttons */}
              <div className="mt-6 pt-6 border-t border-border-champagne/40 space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-full text-xs font-semibold uppercase tracking-wider text-on-primary bg-emerald-700 hover:bg-emerald-800 shadow-md transition-all text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Kirim Konfirmasi Bayar via WhatsApp</span>
                </a>

                <Link
                  href="/orders"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full text-xs font-semibold uppercase tracking-wider text-primary bg-surface-container-low hover:bg-surface-container border border-border-champagne/60 transition-all text-center"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Pantau Status di Halaman Pesanan Saya</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
