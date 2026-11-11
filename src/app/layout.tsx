import type { Metadata, Viewport } from 'next';
import './globals.css';
import { siteConfig } from '@/config/site';

export const viewport: Viewport = {
  themeColor: '#775a19',
  width: 'device-width',
  initialScale: 1,
};

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://astalica.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Astalica',
    'Hijab Sutra',
    'Haute Modesty',
    'Mulberry Silk',
    'Adibusana Muslim',
    'Koleksi Hijab Eksklusif',
    'Voile de Luxe',
    'Butik Hijab Jakarta',
  ],
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: appUrl,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: '/images/hero-model.webp',
        width: 800,
        height: 1000,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ['/images/hero-model.webp'],
  },
  icons: {
    icon: [
      { url: '/images/logo.svg', type: 'image/svg+xml' },
      { url: '/images/logo.png', type: 'image/png' },
    ],
    apple: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="min-h-screen bg-surface font-sans text-on-surface flex flex-col antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-5 focus:py-2.5 focus:rounded-full focus:bg-secondary focus:text-on-secondary focus:text-xs focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Lewati ke konten utama
        </a>
        {children}
      </body>
    </html>
  );
}
