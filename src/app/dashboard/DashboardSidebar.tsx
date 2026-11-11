'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  ShieldAlert,
  Newspaper,
  UserCheck,
  ShoppingBag,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';
import { siteConfig } from '@/config/site';

interface DashboardSidebarProps {
  user: {
    name: string;
    email: string;
    role: string;
  };
}

export default function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'Ringkasan', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Tiket Pesanan', href: '/dashboard/orders', icon: ShoppingBag },
    { label: 'Manajemen User', href: '/dashboard/users', icon: Users },
    { label: 'Manajemen Role', href: '/dashboard/roles', icon: ShieldAlert },
    { label: 'CRUD Berita', href: '/dashboard/news', icon: Newspaper },
    { label: 'Akun & Keamanan', href: '/dashboard/profile', icon: UserCheck },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } catch {
      router.push('/login');
    }
  };

  return (
    <>
      {/* Mobile Top Navigation */}
      <div className="md:hidden bg-surface border-b border-border-champagne px-5 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="relative h-8 w-8 rounded-full border border-border-champagne overflow-hidden bg-surface-container-lowest p-0.5">
            <Image src={siteConfig.logo} alt="Astalica" fill className="object-contain" />
          </div>
          <span className="font-serif font-semibold text-primary">Astalica Admin</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-surface-container text-on-surface hover:text-primary"
          aria-label="Toggle Dashboard Menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Desktop & Mobile */}
      <aside
        className={`${
          mobileOpen ? 'block' : 'hidden'
        } md:flex flex-col w-full md:w-64 lg:w-72 bg-surface border-r border-border-champagne/60 shrink-0 min-h-screen`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-border-champagne/50 hidden md:block">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-10 rounded-full border border-border-champagne overflow-hidden bg-surface-container-lowest p-1 shadow-sm">
              <Image src={siteConfig.logo} alt="Astalica" fill className="object-contain" />
            </div>
            <div>
              <span className="font-serif text-lg font-semibold text-primary block leading-none">
                Astalica
              </span>
              <span className="text-[10px] tracking-wider uppercase text-outline mt-1 block">
                Panel Administrasi
              </span>
            </div>
          </Link>
        </div>

        {/* Current User Card */}
        <div className="p-4 mx-4 my-4 rounded-2xl bg-surface-container-low border border-border-champagne/50">
          <p className="text-xs font-semibold text-on-surface truncate">{user.name}</p>
          <p className="text-[11px] text-on-surface-variant truncate">{user.email}</p>
          <span className="inline-block mt-2 px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-semibold uppercase tracking-wider rounded-md">
            Role: {user.role}
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 space-y-1 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all ${
                  isActive
                    ? 'bg-secondary text-on-secondary shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-border-champagne/50 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2.5 text-xs text-on-surface-variant hover:text-primary rounded-xl hover:bg-surface-container-low transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Lihat Website</span>
            </span>
            <span className="text-[10px] text-outline">↗</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-red-700 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Keluar Sesi</span>
          </button>
        </div>
      </aside>
    </>
  );
}
