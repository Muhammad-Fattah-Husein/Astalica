import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Masuk Akun Atelier',
  description: 'Masuk ke portal anggota atau panel administrasi Astalica.',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
