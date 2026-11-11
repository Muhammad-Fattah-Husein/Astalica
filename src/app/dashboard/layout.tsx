import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { siteConfig } from '@/config/site';
import DashboardSidebar from './DashboardSidebar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session || session.role !== 'admin') {
    redirect('/login?from=/dashboard');
  }

  return (
    <div className="min-h-screen bg-surface-container-low flex flex-col md:flex-row">
      <DashboardSidebar user={session} />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top bar warning banner if using default password warning */}
        <div className="bg-primary-fixed/60 border-b border-primary/20 px-6 py-2.5 text-xs text-on-primary-fixed flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>
              <strong>Perhatian Keamanan:</strong> Pastikan Anda telah mengubah kata sandi akun admin awal (<code>admin@gmail.com</code>) sebelum merilis ke publik.
            </span>
          </div>
          <Link
            href="/dashboard/profile"
            className="underline font-semibold hover:text-primary transition-colors shrink-0"
          >
            Ubah Kata Sandi →
          </Link>
        </div>

        {/* Main Content Area */}
        <main className="p-6 sm:p-8 lg:p-10 flex-1">{children}</main>
      </div>
    </div>
  );
}
