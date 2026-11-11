'use client';

import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  MessageCircle,
  Eye,
  Loader2,
  AlertCircle,
  X,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Check,
} from 'lucide-react';
import type { Order } from '@/types';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');
  const [actionErrorMsg, setActionErrorMsg] = useState('');
  const [cancelModalOrder, setCancelModalOrder] = useState<Order | null>(null);
  const [cancelReason, setCancelReason] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setOrders(json.data);
      }
    } catch {
      setActionErrorMsg('Gagal mengambil data pesanan.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: 'dikonfirmasi' | 'dibatalkan', notes?: string) => {
    setUpdatingId(orderId);
    setActionSuccessMsg('');
    setActionErrorMsg('');

    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          admin_notes: notes || '',
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        setActionErrorMsg(json.error || 'Gagal memperbarui status pesanan.');
        return;
      }

      setActionSuccessMsg(
        newStatus === 'dikonfirmasi'
          ? 'Pembayaran berhasil dikonfirmasi! Status tiket telah diperbarui.'
          : 'Pesanan telah dibatalkan.'
      );
      setCancelModalOrder(null);
      setCancelReason('');
      fetchOrders();
    } catch {
      setActionErrorMsg('Terjadi kesalahan jaringan.');
    } finally {
      setUpdatingId(null);
    }
  };

  // Metrics
  const totalOrdersCount = orders.length;
  const pendingCount = orders.filter((o) => o.status === 'menunggu_konfirmasi').length;
  const confirmedCount = orders.filter((o) => o.status === 'dikonfirmasi').length;
  const cancelledCount = orders.filter((o) => o.status === 'dibatalkan').length;
  const totalRevenue = orders
    .filter((o) => o.status === 'dikonfirmasi')
    .reduce((sum, o) => sum + (Number(o.total_price) || 0), 0);

  // Filtered List
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      String(order.ticket_number || '').toLowerCase().includes(q) ||
      String(order.customer_name || '').toLowerCase().includes(q) ||
      String(order.customer_phone || '').includes(q) ||
      String(order.service_product_name || '').toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-bold font-sans">
            MODUL TRANSAKSI
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-on-surface font-semibold mt-1">
            Manajemen Tiket Pesanan &amp; QRIS
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Pantau dan verifikasi pembayaran pesanan hijab serta reservasi klien butik.
          </p>
        </div>

        <button
          onClick={fetchOrders}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface border border-border-champagne/70 text-xs font-semibold text-on-surface hover:text-primary transition-colors shadow-sm"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Segarkan Data</span>
        </button>
      </div>

      {/* Toast Alert */}
      {actionSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{actionSuccessMsg}</span>
          </div>
          <button onClick={() => setActionSuccessMsg('')} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {actionErrorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span>{actionErrorMsg}</span>
          </div>
          <button onClick={() => setActionErrorMsg('')} className="text-red-700 hover:text-red-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-surface rounded-2xl border border-border-champagne/60 p-4 shadow-sm">
          <span className="text-[10px] uppercase tracking-wider text-outline font-semibold">Total Pesanan</span>
          <p className="font-serif text-2xl font-bold text-on-surface mt-1">{totalOrdersCount}</p>
        </div>

        <div className="bg-surface rounded-2xl border border-amber-200 p-4 shadow-sm bg-amber-50/40">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-amber-800 font-semibold">Menunggu Bayar</span>
            {pendingCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            )}
          </div>
          <p className="font-serif text-2xl font-bold text-amber-900 mt-1">{pendingCount}</p>
        </div>

        <div className="bg-surface rounded-2xl border border-emerald-200 p-4 shadow-sm bg-emerald-50/40">
          <span className="text-[10px] uppercase tracking-wider text-emerald-800 font-semibold">Dikonfirmasi</span>
          <p className="font-serif text-2xl font-bold text-emerald-900 mt-1">{confirmedCount}</p>
        </div>

        <div className="bg-surface rounded-2xl border border-border-champagne/60 p-4 shadow-sm">
          <span className="text-[10px] uppercase tracking-wider text-outline font-semibold">Dibatalkan</span>
          <p className="font-serif text-2xl font-bold text-outline mt-1">{cancelledCount}</p>
        </div>

        <div className="col-span-2 lg:col-span-1 bg-surface rounded-2xl border border-border-champagne/60 p-4 shadow-sm bg-primary-fixed/20">
          <span className="text-[10px] uppercase tracking-wider text-primary font-bold">Total Omset Sukses</span>
          <p className="font-serif text-lg sm:text-xl font-bold text-primary mt-1">
            Rp {totalRevenue.toLocaleString('id-ID')}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-surface rounded-3xl border border-border-champagne/70 p-4 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-surface-container-low rounded-full border border-border-champagne/50 w-full sm:w-auto">
            {[
              { id: 'all', label: 'Semua Status' },
              { id: 'menunggu_konfirmasi', label: `Menunggu (${pendingCount})` },
              { id: 'dikonfirmasi', label: 'Dikonfirmasi' },
              { id: 'dibatalkan', label: 'Dibatalkan' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filterStatus === tab.id
                    ? 'bg-secondary text-on-secondary shadow-sm'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-outline">
              <Search className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari tiket, nama, WA..."
              className="w-full pl-9 pr-4 py-2 bg-surface-container-low border border-border-champagne/70 rounded-full text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto rounded-2xl border border-border-champagne/50">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low border-b border-border-champagne/60 text-outline uppercase tracking-wider font-semibold text-[10px]">
              <tr>
                <th className="py-3 px-4">Nomor Tiket</th>
                <th className="py-3 px-4">Pemesan</th>
                <th className="py-3 px-4">Item &amp; Qty</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-champagne/40">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-outline">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary mb-2" />
                    <span>Memuat data pesanan...</span>
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-on-surface-variant">
                    <ShoppingBag className="w-8 h-8 text-outline mx-auto mb-2 opacity-50" />
                    <p className="font-semibold">Tidak ada data pesanan yang cocok.</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const isUpdating = updatingId === order.id;
                  const isPending = order.status === 'menunggu_konfirmasi';
                  const isConfirmed = order.status === 'dikonfirmasi';
                  const isCancelled = order.status === 'dibatalkan';

                  const phoneStr = String(order.customer_phone || '');
                  const whatsappUrl = `https://wa.me/${phoneStr.replace(/^0/, '62')}?text=${encodeURIComponent(
                    `Halo Ibu/Bapak ${order.customer_name}, kami dari Concierge Astalica ingin mengonfirmasi pesanan tiket ${order.ticket_number} (${order.service_product_name}).`
                  )}`;

                  return (
                    <tr key={order.id} className="hover:bg-surface-container-low/50 transition-colors">
                      {/* Ticket Number & Date */}
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-primary block">{order.ticket_number}</span>
                        <span className="text-[10px] text-outline">
                          {new Date(order.created_at).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </td>

                      {/* Customer Name & Phone */}
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-on-surface block">{order.customer_name}</span>
                        <span className="text-[11px] text-on-surface-variant">{order.customer_phone}</span>
                      </td>

                      {/* Product Name */}
                      <td className="py-3.5 px-4 max-w-[200px]">
                        <span className="font-medium text-on-surface block truncate" title={order.service_product_name}>
                          {order.service_product_name}
                        </span>
                        <span className="text-[10px] text-outline">Qty: {order.quantity}</span>
                      </td>

                      {/* Total */}
                      <td className="py-3.5 px-4 font-serif font-bold text-primary">
                        Rp {order.total_price.toLocaleString('id-ID')}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {isConfirmed && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Dikonfirmasi</span>
                          </span>
                        )}
                        {isPending && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                            <Clock className="w-3 h-3 text-amber-600" />
                            <span>Menunggu</span>
                          </span>
                        )}
                        {isCancelled && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-red-100 text-red-800 border border-red-300">
                            <XCircle className="w-3 h-3 text-red-600" />
                            <span>Batal</span>
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Confirm Button */}
                          {isPending && (
                            <button
                              type="button"
                              disabled={isUpdating}
                              onClick={() => handleUpdateStatus(order.id, 'dikonfirmasi')}
                              title="Konfirmasi Pembayaran Diterima"
                              className="px-2.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] inline-flex items-center gap-1 shadow-sm transition-colors disabled:opacity-50"
                            >
                              <Check className="w-3 h-3" />
                              <span>Konfirmasi</span>
                            </button>
                          )}

                          {/* Cancel Button */}
                          {isPending && (
                            <button
                              type="button"
                              disabled={isUpdating}
                              onClick={() => setCancelModalOrder(order)}
                              title="Tolak / Batalkan Pesanan"
                              className="p-1.5 rounded-full hover:bg-red-50 text-red-600 transition-colors"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}

                          {/* WhatsApp Chat Shortcut */}
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Hubungi Pemesan via WhatsApp"
                            className="p-1.5 rounded-full hover:bg-emerald-50 text-emerald-700 transition-colors"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>

                          {/* Detail Button */}
                          <button
                            type="button"
                            onClick={() => setSelectedOrder(order)}
                            title="Lihat Detail Pesanan"
                            className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface rounded-3xl border border-border-champagne max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-surface-container-low text-outline hover:text-on-surface transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] uppercase tracking-wider text-primary font-bold">
              RINCIAN TIKET PESANAN
            </span>
            <h2 className="font-serif text-2xl font-semibold text-on-surface mt-1">
              {selectedOrder.ticket_number}
            </h2>

            <div className="mt-6 space-y-3 text-xs border-y border-border-champagne/40 py-4">
              <div className="flex justify-between">
                <span className="text-outline">Produk / Layanan:</span>
                <span className="font-semibold text-on-surface">{selectedOrder.service_product_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Jumlah (Qty):</span>
                <span className="font-semibold text-on-surface">{selectedOrder.quantity} helai / sesi</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Total Tagihan:</span>
                <span className="font-serif font-bold text-primary text-sm">
                  Rp {selectedOrder.total_price.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Nama Pemesan:</span>
                <span className="font-semibold text-on-surface">{selectedOrder.customer_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Nomor WhatsApp:</span>
                <span className="font-semibold text-on-surface">{selectedOrder.customer_phone}</span>
              </div>
              {selectedOrder.customer_email && (
                <div className="flex justify-between">
                  <span className="text-outline">Email:</span>
                  <span className="text-on-surface">{selectedOrder.customer_email}</span>
                </div>
              )}
              <div>
                <span className="text-outline block mb-1">Alamat Pengiriman / Reservasi:</span>
                <p className="p-3 rounded-xl bg-surface-container-low border border-border-champagne/40 text-on-surface">
                  {selectedOrder.customer_address}
                </p>
              </div>
              {selectedOrder.notes && (
                <div>
                  <span className="text-outline block mb-1">Catatan Khusus Klien:</span>
                  <p className="p-3 rounded-xl bg-surface-container-low border border-border-champagne/40 text-on-surface italic">
                    &ldquo;{selectedOrder.notes}&rdquo;
                  </p>
                </div>
              )}
              {selectedOrder.admin_notes && (
                <div>
                  <span className="text-outline block mb-1">Catatan Admin:</span>
                  <p className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-[11px]">
                    {selectedOrder.admin_notes}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <a
                href={`https://wa.me/${String(selectedOrder.customer_phone || '').replace(/^0/, '62')}?text=${encodeURIComponent(
                  `Halo Ibu/Bapak ${selectedOrder.customer_name}, terkait tiket pesanan ${selectedOrder.ticket_number}...`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Hubungi via WA</span>
              </a>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Order Confirmation Modal */}
      {cancelModalOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface rounded-3xl border border-red-200 max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
            <h3 className="font-serif text-xl font-semibold text-red-900">
              Batalkan Pesanan {cancelModalOrder.ticket_number}?
            </h3>
            <p className="text-xs text-on-surface-variant mt-2">
              Berikan alasan pembatalan (misal: pembayaran tidak masuk atau stok habis) agar dapat diketahui klien:
            </p>

            <textarea
              rows={3}
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Contoh: Bukti transfer tidak valid atau melewati batas waktu reservasi..."
              className="w-full mt-4 p-3 bg-surface-container-low border border-border-champagne/70 rounded-2xl text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-red-400"
            />

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setCancelModalOrder(null)}
                className="px-4 py-2 rounded-full text-xs font-semibold text-on-surface-variant hover:bg-surface-container transition-colors"
              >
                Kembali
              </button>
              <button
                type="button"
                onClick={() => handleUpdateStatus(cancelModalOrder.id, 'dibatalkan', cancelReason)}
                className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
              >
                Ya, Batalkan Pesanan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
