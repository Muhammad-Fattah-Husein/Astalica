'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, Sparkles, Diamond, Store, Pause, Play } from 'lucide-react';
import { siteConfig } from '@/config/site';
import ShinyText from '@/components/reactbits/ShinyText';
import Magnet from '@/components/reactbits/Magnet';
import CountUp from '@/components/reactbits/CountUp';

export default function Hero() {
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  return (
    <section id="beranda" className="relative w-full overflow-hidden bg-surface pt-28 pb-16 lg:py-28">
      {/* Ambient background glow orbs */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary-fixed/25 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 -right-40 w-[30rem] h-[30rem] rounded-full bg-secondary-fixed/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Hero Text Content */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* Eyebrow Badge with React Bits ShinyText */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high border border-border-champagne/60 text-primary mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
              <ShinyText
                text="Haute Modesty Atelier • Indonesia"
                color="#775a19"
                shineColor="#f4dfb4"
                speed={3}
                delay={1}
                className="text-xs uppercase tracking-widest font-semibold font-sans"
              />
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-on-surface font-semibold tracking-tight leading-[1.15] mb-6">
              Kemurnian Anggun, <br />
              <ShinyText
                text="Kemewahan Modest"
                color="#775a19"
                shineColor="#e9c176"
                speed={3.6}
                delay={1.4}
                className="italic font-normal"
              />{' '}
              Indonesia
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-on-surface-variant max-w-xl mb-8 leading-relaxed">
              {siteConfig.description}
            </p>

            {/* CTA Action Buttons with React Bits Magnet */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Magnet padding={36} magnetStrength={5} maxOffset={8} scale={1.02} wrapperClassName="w-full sm:w-auto" innerClassName="w-full sm:w-auto">
                <Link
                  href="/pesan"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary font-semibold text-sm rounded-full shadow-[0_8px_24px_rgba(119,90,25,0.28)] hover:shadow-[0_12px_32px_rgba(119,90,25,0.4)] hover:-translate-y-0.5 transition-all"
                >
                  <span>Pesan Koleksi &amp; QRIS</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Magnet>
              <Link
                href="#hubungi-kami"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-surface-container-low text-secondary border border-border-champagne hover:bg-secondary hover:text-on-secondary font-semibold text-sm rounded-full shadow-sm hover:-translate-y-0.5 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Konsultasi Butik Privat</span>
              </Link>
            </div>

            {/* Micro Credibility Indicators with React Bits CountUp */}
            <div className="grid grid-cols-3 gap-6 pt-10 mt-6 border-t border-border-champagne/40 w-full">
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl text-on-surface font-semibold">
                  <CountUp to={100} suffix="%" duration={1.5} />
                </span>
                <span className="text-[11px] sm:text-xs text-outline uppercase tracking-wider font-semibold mt-0.5">
                  Mulberry Silk 6A
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl text-on-surface font-semibold">
                  <CountUp to={12} suffix="+" duration={1.3} />
                </span>
                <span className="text-[11px] sm:text-xs text-outline uppercase tracking-wider font-semibold mt-0.5">
                  Atelier Butik
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl text-on-surface font-semibold">
                  <CountUp to={4.9} from={3.5} decimals={1} suffix="/5" duration={1.4} />
                </span>
                <span className="text-[11px] sm:text-xs text-outline uppercase tracking-wider font-semibold mt-0.5">
                  Kepuasan VIP
                </span>
              </div>
            </div>
          </div>

          {/* Hero Visual Element with Floating Glass Badges */}
          <div className="lg:col-span-6 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer soft glow backdrop */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-secondary/15 via-primary/20 to-transparent rounded-2xl transform rotate-1 scale-95 blur-md"
                aria-hidden="true"
              />

              {/* 4:5 portrait ratio image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] bg-surface-container-low border border-border-champagne/50">
                <Image
                  src="/images/hero-model.webp"
                  alt="Model berhijab Astalica mengenakan gaun adibusana modest hijau zamrud dan hijab sutra champagne"
                  fill
                  className="object-cover object-center"
                  priority
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-inverse-surface/40 via-transparent to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              </div>

              {/* Floating Badge 1: Top Left */}
              <div className="absolute -top-4 -left-3 sm:top-6 sm:-left-6 bg-surface/90 backdrop-blur-md px-4 py-2.5 shadow-xl border border-border-champagne/60 flex items-center gap-3 rounded-full">
                <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed shrink-0">
                  <Diamond className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-on-surface">100% Pure Mulberry Silk</span>
                  <span className="text-[10px] text-on-surface-variant">Grade 6A Sutra Murni</span>
                </div>
              </div>

              {/* Floating Badge 2: Middle Right */}
              <div className="absolute top-1/2 -right-3 sm:-right-6 -translate-y-1/2 bg-surface/90 backdrop-blur-md px-4 py-2.5 shadow-xl border border-border-champagne/60 flex items-center gap-3 rounded-full">
                <div className="w-9 h-9 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-on-surface">Handcrafted Embroidery</span>
                  <span className="text-[10px] text-on-surface-variant">Bordir Monogram Artisan</span>
                </div>
              </div>

              {/* Floating Badge 3: Bottom Left */}
              <div className="absolute -bottom-4 left-4 sm:bottom-6 sm:-left-4 bg-surface/90 backdrop-blur-md px-4 py-2.5 shadow-xl border border-border-champagne/60 flex items-center gap-3 rounded-full">
                <div className="w-9 h-9 rounded-full bg-surface-container-highest flex items-center justify-center text-primary shrink-0">
                  <Store className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-on-surface">Tersedia di 12 Butik</span>
                  <span className="text-[10px] text-on-surface-variant">Jakarta, Bandung, Surabaya</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Luxury Ticker with accessible Pause/Play control */}
      <div className="relative w-full bg-surface-container-low border-y border-border-champagne/40 py-3.5 mt-16 overflow-hidden flex items-center">
        <div
          className={`animate-marquee flex items-center gap-12 whitespace-nowrap text-on-surface-variant/90 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium ${
            isMarqueePaused ? 'marquee-paused' : ''
          }`}
        >
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Pure Organic Mulberry Silk
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Laser Cut Hand-Finished
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Royal Color Harmony
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Private Concierge Service
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Indonesian Heritage Wastra
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Bespoke Bridal Veils
          </span>
          {/* Repeated for continuous smooth looping */}
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Pure Organic Mulberry Silk
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Laser Cut Hand-Finished
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Royal Color Harmony
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Private Concierge Service
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Indonesian Heritage Wastra
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Bespoke Bridal Veils
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsMarqueePaused((prev) => !prev)}
          aria-label={isMarqueePaused ? 'Putar teks berjalan' : 'Jeda teks berjalan'}
          title={isMarqueePaused ? 'Putar teks berjalan' : 'Jeda teks berjalan'}
          className="absolute right-3 z-10 inline-flex items-center justify-center w-8 h-8 rounded-full bg-surface/95 border border-border-champagne/70 text-primary hover:bg-primary hover:text-on-primary shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          {isMarqueePaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
        </button>
      </div>
    </section>
  );
}
