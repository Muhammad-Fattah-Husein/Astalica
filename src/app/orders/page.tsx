'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  ArrowLeft,
  Clock,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Loader2,
  MessageCircle,
  Calendar,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import type { Order } from '@/types';

export default function UserOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        // Check session
        const meRes = await fetch('/api/auth/me');
        if (!meRes.ok) {
          router.replace('/login?from=/orders');
          return;
        }
        const meData = await meRes.json();
        if (!meData.success || !meData.user) {
          router.replace('/login?from=/orders');
          return;
        }
        setUser(meData.user);

        // Fetch user's orders
        const ordersRes = await fetch('/api/orders');
        const ordersData = await ordersRes.json();
        if (ordersData.success && Array.isArray(ordersData.data)) {
          setOrders(ordersData.data);
        } else {
          setErrorMsg(ordersData.error || 'Gagal mengambil riwayat pesanan.');
        }
      } catch {
        setErrorMsg('Terjadi gangguan saat menghubungkan ke basis data pesanan.');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [router]);

  return (
    <div className="min-h-screen bg-surface-container-low pb-24 selection:bg-secondary-container selection:text-on-secondary-container">
      {/* Top Navbar */}
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
              Pesanan Saya
            </span>
          </div>
          <Link
            href="/pesan"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-on-primary bg-primary hover:bg-primary-container rounded-full transition-all shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Pesan Baru</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-10">
        {/* Header Title */}
        <div className="mb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-primary font-bold font-sans">
            RIWAYAT TRANSAKSI KLIEN
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-on-surface font-semibold mt-1">
            Pesanan &amp; Reservasi Anda
          </h1>
          {user && (
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
              Masuk sebagai <strong className="text-on-surface">{user.name}</strong> ({user.email})
            </p>
          )}
        </div>

        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3 text-outline">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="text-xs">Memuat daftar pesanan Anda...</span>
          </div>
        ) : errorMsg ? (
          <div className="p-6 rounded-3xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-3 max-w-xl mx-auto">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Terjadi Kesalahan</p>
              <p className="mt-1">{errorMsg}</p>
            </div>
          </div>
        ) : orders.length === 0 ? (
          /* Empty State */
          <div className="bg-surface rounded-3xl border border-border-champagne/70 p-12 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-outline mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-on-surface">Belum Ada Pesanan</h3>
            <p className="text-xs text-on-surface-variant mt-2 max-w-sm mx-auto">
              Anda belum memiliki riwayat pemesanan hijab atau reservasi sesi styling atelier.
            </p>
            <Link
              href="/pesan"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary hover:bg-secondary-hover text-on-secondary text-xs font-semibold uppercase tracking-wider shadow-md transition-all"
            >
              <span>Pesan Koleksi Perdana</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-6">
            {orders.map((order) => {
              const isConfirmed = order.status === 'dikonfirmasi';
              const isPending = order.status === 'menunggu_konfirmasi';
              const isCancelled = order.status === 'dibatalkan';

              const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                `Halo Concierge Astalica, saya ingin menanyakan status tiket pesanan saya ${order.ticket_number} (${order.service_product_name}).`
              )}`;

              return (
                <div
                  key={order.id}
                  className="bg-surface rounded-3xl border border-border-champagne/70 p-6 sm:p-8 shadow-sm transition-all hover:shadow-md"
                >
                  {/* Top Bar: Ticket & Date & Status Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-border-champagne/40 gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-sm sm:text-base font-bold text-primary bg-primary/10 px-3 py-1 rounded-xl">
                        {order.ticket_number}
                      </span>
                      <span className="text-xs text-outline flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
                          {new Date(order.created_at).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div>
                      {isConfirmed && (
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Pembayaran Dikonfirmasi</span>
                        </span>
                      )}
                      {isPending && (
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                          <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                          <span>Menunggu Konfirmasi Admin</span>
                        </span>
                      )}
                      {isCancelled && (
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-300">
                          <XCircle className="w-3.5 h-3.5 text-red-600" />
                          <span>Pesanan Dibatalkan</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Confirmed Welcome Message per SKILL requirements */}
                  {isConfirmed && (
                    <div className="mt-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-emerald-950">
                          Selamat, pembayaran Anda telah dikonfirmasi!
                        </p>
                        <p className="mt-0.5 text-emerald-800">
                          Silakan tunggu informasi selanjutnya dari admin melalui email/WhatsApp. Tim concierge kami sedang menyiapkan pesanan Anda dengan penuh ketelitian.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Order Details Body */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b border-border-champagne/40">
                    <div className="md:col-span-2 space-y-2">
                      <p className="text-[11px] uppercase tracking-wider text-outline font-semibold">
                        Rincian Item
                      </p>
                      <h3 className="font-serif text-lg font-semibold text-on-surface">
                        {order.service_product_name}
                      </h3>
                      <p className="text-xs text-on-surface-variant">
                        Jumlah: <strong>{order.quantity}</strong> helai / sesi
                      </p>
                      {order.notes && (
                        <p className="text-xs text-outline italic">
                          Catatan: &ldquo;{order.notes}&rdquo;
                        </p>
                      )}
                    </div>

                    <div className="md:text-right space-y-1">
                      <p className="text-[11px] uppercase tracking-wider text-outline font-semibold">
                        Total Tagihan
                      </p>
                      <p className="font-serif text-2xl font-bold text-primary">
                        Rp {order.total_price.toLocaleString('id-ID')}
                      </p>
                      <p className="text-[11px] text-emerald-700">Pembayaran via QRIS / Bank Transfer</p>
                    </div>
                  </div>

                  {/* Shipping & Actions Footer */}
                  <div className="pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                    <div className="text-on-surface-variant">
                      <span>Alamat: <strong>{order.customer_address}</strong></span>
                      <span className="mx-2">•</span>
                      <span>WA: <strong>{order.customer_phone}</strong></span>
                    </div>

                    <div className="flex items-center gap-3">
                      {isPending && (
                        <Link
                          href={`/orders/${order.id}/payment`}
                          className="px-4 py-2 rounded-full bg-primary text-on-primary font-semibold hover:bg-primary-container transition-colors"
                        >
                          Buka Kode QRIS →
                        </Link>
                      )}
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container-low border border-border-champagne text-on-surface hover:text-emerald-700 hover:border-emerald-300 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Hubungi Concierge</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
