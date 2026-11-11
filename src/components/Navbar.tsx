'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, User, ShieldCheck, ShoppingBag, LogOut } from 'lucide-react';
import { siteConfig } from '@/config/site';

interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function checkUser() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            setUser(data.user);
          }
        }
      } catch {
        // Guest mode
      }
    }
    checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      window.location.href = '/';
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-surface/95 backdrop-blur-md shadow-md border-b border-border-champagne/40'
          : 'bg-surface/85 backdrop-blur-md border-b border-border-champagne/20'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="h-20 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <Link
            href="#beranda"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg p-1"
            aria-label={`${siteConfig.name} Beranda`}
          >
            <div className="relative h-10 w-10 sm:h-12 sm:w-12 shrink-0 overflow-hidden rounded-full border border-border-champagne bg-surface-container-lowest p-1 shadow-sm">
              <Image
                src={siteConfig.logo}
                alt={`${siteConfig.name} Logo`}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-semibold tracking-wider text-primary group-hover:text-primary-container transition-colors">
                {siteConfig.name}
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-outline -mt-1 font-medium hidden sm:inline">
                Haute Modesty Atelier
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 bg-surface-container-low/70 rounded-full border border-border-champagne/40"
            aria-label="Navigasi Utama"
          >
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3.5 py-1.5 text-xs lg:text-sm font-medium tracking-wide text-on-surface-variant hover:text-primary hover:bg-surface rounded-full transition-all"
              >
                {item.label}
              </a>
            ))}
            {/* Show "Pesanan Saya" link in nav for logged in user */}
            {user && user.role === 'user' && (
              <Link
                href="/orders"
                className="px-3.5 py-1.5 text-xs lg:text-sm font-semibold tracking-wide text-primary hover:bg-surface rounded-full transition-all inline-flex items-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Pesanan Saya</span>
              </Link>
            )}
          </nav>

          {/* Right Action: Auth & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {user ? (
              user.role === 'admin' ? (
                /* Admin Logged In Badge & Action */
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-on-secondary bg-secondary hover:bg-secondary-hover border border-border-champagne/60 rounded-full transition-all shadow-sm"
                  >
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span>Dashboard Admin</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    title="Keluar dari akun admin"
                    className="p-2 text-outline hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                    aria-label="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                /* Regular User Logged In */
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    href="/orders"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary bg-surface-container-low hover:bg-primary hover:text-on-primary border border-border-champagne/60 rounded-full transition-all shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Pesanan ({user.name.split(' ')[0]})</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    title="Keluar"
                    className="p-2 text-outline hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                    aria-label="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )
            ) : (
              /* Guest User */
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-primary bg-surface-container-low hover:bg-primary hover:text-on-primary border border-border-champagne/60 rounded-full transition-all shadow-sm"
              >
                <User className="w-3.5 h-3.5" />
                <span>Masuk / Akun</span>
              </Link>
            )}

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full bg-surface-container-low text-on-surface hover:text-primary hover:bg-surface-container transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label={mobileMenuOpen ? 'Tutup Menu' : 'Buka Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown / Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-border-champagne/60 px-5 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-2" aria-label="Navigasi Mobile">
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-on-surface hover:text-primary hover:bg-surface-container-low rounded-xl transition-colors"
              >
                {item.label}
              </a>
            ))}

            {user ? (
              user.role === 'admin' ? (
                <div className="pt-3 mt-2 border-t border-border-champagne/50 flex flex-col gap-2">
                  <div className="flex items-center justify-between px-2 text-xs text-outline">
                    <span>Admin: <strong className="text-on-surface">{user.name}</strong></span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary text-primary font-bold text-[10px]">ADMIN</span>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-on-secondary bg-secondary hover:bg-secondary-hover rounded-full transition-all shadow-md"
                  >
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span>Buka Dashboard Admin</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-red-700 bg-red-50 hover:bg-red-100 rounded-full transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Keluar (Logout)</span>
                  </button>
                </div>
              ) : (
                <div className="pt-3 mt-2 border-t border-border-champagne/50 flex flex-col gap-2">
                  <div className="px-2 text-xs text-outline">
                    Klien: <strong className="text-on-surface">{user.name}</strong>
                  </div>
                  <Link
                    href="/orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-on-primary bg-primary hover:bg-primary-container rounded-full transition-all shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Pesanan Saya</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-red-700 bg-red-50 hover:bg-red-100 rounded-full transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Keluar (Logout)</span>
                  </button>
                </div>
              )
            ) : (
              <div className="pt-3 mt-2 border-t border-border-champagne/50">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-on-primary bg-secondary hover:bg-secondary-hover rounded-full transition-all shadow-md"
                >
                  <User className="w-4 h-4" />
                  <span>Masuk ke Akun Atelier</span>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
