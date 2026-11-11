import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pesanan Saya',
  description: 'Pantau riwayat pesanan dan status konfirmasi pembayaran QRIS Astalica Anda.',
};

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
