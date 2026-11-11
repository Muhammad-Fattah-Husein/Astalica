import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pesan Koleksi & Reservasi QRIS',
  description: 'Formulir pemesanan koleksi hijab sutra mulberry dan reservasi private styling Astalica.',
};

export default function PesanLayout({ children }: { children: React.ReactNode }) {
  return children;
}
