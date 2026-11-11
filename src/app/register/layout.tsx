import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daftar Akun Anggota',
  description: 'Buat akun klien Astalica untuk menyimpan riwayat pemesanan dan konsultasi pribadi.',
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
