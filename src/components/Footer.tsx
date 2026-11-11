import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Camera, Video, Youtube, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/config/site';

const socialIcons: Record<string, React.ReactNode> = {
  Instagram: <Camera className="w-4 h-4" />,
  TikTok: <Video className="w-4 h-4" />,
  YouTube: <Youtube className="w-4 h-4" />,
  WhatsApp: <MessageCircle className="w-4 h-4" />,
};

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low text-on-surface-variant pt-16 pb-12 border-t border-border-champagne/50">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-14">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link href="#beranda" className="flex items-center gap-3">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border-champagne bg-surface-container-lowest p-1 shadow-sm">
                <Image
                  src={siteConfig.logo}
                  alt={`${siteConfig.name} Logo`}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-serif text-2xl font-semibold tracking-wide text-primary">
                {siteConfig.name}
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-on-surface-variant max-w-sm leading-relaxed">
              {siteConfig.slogan}. Menghadirkan siluet anggun dan keindahan modest busana adibusana modern untuk keanggunan sejati perempuan Indonesia.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {siteConfig.socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-10 h-10 rounded-full bg-surface border border-border-champagne/70 flex items-center justify-center text-secondary hover:bg-secondary hover:text-on-secondary transition-all shadow-sm"
                >
                  {socialIcons[social.name] || <MessageCircle className="w-4 h-4" />}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Nav */}
          <div className="flex flex-col gap-3">
            <h4 className="font-serif text-base font-semibold text-on-surface tracking-wide mb-1">
              Navigasi Cepat
            </h4>
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs sm:text-sm text-on-surface-variant hover:text-primary transition-colors py-0.5"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Collections */}
          <div className="flex flex-col gap-3">
            <h4 className="font-serif text-base font-semibold text-on-surface tracking-wide mb-1">
              Koleksi Adibusana
            </h4>
            <Link
              href="#layanan-solusi"
              className="text-xs sm:text-sm text-on-surface-variant hover:text-primary transition-colors py-0.5"
            >
              Sutera Signature 6A
            </Link>
            <Link
              href="#layanan-solusi"
              className="text-xs sm:text-sm text-on-surface-variant hover:text-primary transition-colors py-0.5"
            >
              Voile Eksklusif
            </Link>
            <Link
              href="#layanan-solusi"
              className="text-xs sm:text-sm text-on-surface-variant hover:text-primary transition-colors py-0.5"
            >
              Pashmina Atelier
            </Link>
            <Link
              href="#layanan-solusi"
              className="text-xs sm:text-sm text-on-surface-variant hover:text-primary transition-colors py-0.5"
            >
              Aksesori Pin &amp; Bros
            </Link>
          </div>

          {/* Assistance & Care */}
          <div className="flex flex-col gap-3">
            <h4 className="font-serif text-base font-semibold text-on-surface tracking-wide mb-1">
              Bantuan &amp; Layanan
            </h4>
            <Link
              href="#hubungi-kami"
              className="text-xs sm:text-sm text-on-surface-variant hover:text-primary transition-colors py-0.5"
            >
              Hubungi Konsultan
            </Link>
            <Link
              href="#warta-tren"
              className="text-xs sm:text-sm text-on-surface-variant hover:text-primary transition-colors py-0.5"
            >
              Panduan Perawatan
            </Link>
            <Link
              href="#hubungi-kami"
              className="text-xs sm:text-sm text-on-surface-variant hover:text-primary transition-colors py-0.5"
            >
              Pengiriman &amp; Retur
            </Link>
            <Link
              href="#hubungi-kami"
              className="text-xs sm:text-sm text-on-surface-variant hover:text-primary transition-colors py-0.5"
            >
              Kebijakan Privasi
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border-champagne/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-on-surface-variant">
            &copy; {new Date().getFullYear()} Astalica Modest Atelier. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <p className="text-[11px] uppercase tracking-widest text-outline font-semibold">
            Kemewahan Kesantunan dalam Setiap Helai
          </p>
        </div>
      </div>
    </footer>
  );
}
