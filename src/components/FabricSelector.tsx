'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function FabricSelector() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeFabric = siteConfig.fabrics[selectedIndex];

  return (
    <section className="w-full py-20 bg-surface-container-low border-y border-border-champagne/40">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="bg-surface rounded-3xl shadow-sm border border-border-champagne/60 p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Interactive Selector */}
            <div className="lg:col-span-5 flex flex-col">
              <span className="text-xs uppercase tracking-widest text-primary font-bold mb-2">
                PENGALAMAN ATELIER INTERAKTIF
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-on-surface font-semibold mb-3">
                Eksplorasi Tekstur &amp; Bahan Sutra
              </h3>
              <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                Sentuh dan pilih ragam karakter tenun kain khas Astalica untuk menemukan padanan paling sempurna bagi kebutuhan hari istimewa Anda.
              </p>

              {/* Fabric Option Buttons */}
              <div className="flex flex-col gap-3">
                {siteConfig.fabrics.map((fabric, idx) => {
                  const isActive = idx === selectedIndex;
                  return (
                    <button
                      key={fabric.id}
                      type="button"
                      onClick={() => setSelectedIndex(idx)}
                      className={`text-left p-4 rounded-2xl transition-all flex items-center justify-between border ${
                        isActive
                          ? 'bg-surface-container-high border-primary/50 shadow-sm'
                          : 'bg-surface hover:bg-surface-container-low border-border-champagne/40'
                      }`}
                    >
                      <div className="pr-3">
                        <h4 className="font-serif text-base font-semibold text-on-surface">
                          {fabric.name}
                        </h4>
                        <p className="text-xs text-on-surface-variant mt-1 leading-normal">
                          {fabric.subtitle}
                        </p>
                      </div>
                      <div className="shrink-0">
                        {isActive ? (
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        ) : (
                          <Circle className="w-5 h-5 text-outline-variant" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Visual Preview & Spec Badge */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] shadow-md bg-surface-container border border-border-champagne/60 group">
                <Image
                  src={activeFabric.image}
                  alt={activeFabric.imageAlt}
                  fill
                  className="object-cover transition-all duration-700 ease-out"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 via-transparent to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                {/* Characteristics Spec Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-surface/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-border-champagne/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-primary font-bold block">
                      Karakteristik Terpilih
                    </span>
                    <p className="text-sm font-medium text-on-surface mt-0.5">
                      {activeFabric.tagline}
                    </p>
                  </div>
                  <Link
                    href="#hubungi-kami"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-container shrink-0 transition-colors"
                  >
                    <span>Minta Sampel Kain</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
