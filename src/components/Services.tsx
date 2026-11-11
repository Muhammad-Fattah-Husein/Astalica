import React from 'react';
import Link from 'next/link';
import { Heart, Sparkles, Gift, ShieldCheck, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import BlurText from '@/components/reactbits/BlurText';
import SpotlightCard from '@/components/reactbits/SpotlightCard';

const serviceIcons: Record<string, React.ReactNode> = {
  'bespoke-bridal': <Heart className="w-6 h-6 text-on-primary-fixed" />,
  'private-styling': <Sparkles className="w-6 h-6 text-on-secondary-fixed" />,
  'corporate-gifting': <Gift className="w-6 h-6 text-on-tertiary-fixed" />,
  'atelier-care': <ShieldCheck className="w-6 h-6 text-primary" />,
};

const serviceIconBgs: Record<string, string> = {
  'bespoke-bridal': 'bg-primary-fixed',
  'private-styling': 'bg-secondary-fixed',
  'corporate-gifting': 'bg-tertiary-fixed',
  'atelier-care': 'bg-surface-container-highest',
};

export default function Services() {
  return (
    <section id="layanan-solusi" className="w-full py-20 lg:py-28 bg-surface">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header with React Bits BlurText */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-3 font-sans">
            LAYANAN &amp; SOLUSI KHUSUS
          </span>
          <BlurText
            as="h2"
            text="Layanan Eksklusif Kami"
            delay={60}
            stepDuration={0.35}
            animateBy="words"
            direction="bottom"
            distance={24}
            blur={6}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl text-on-surface max-w-2xl leading-tight font-semibold justify-center text-center"
          />
          <p className="text-sm sm:text-base text-on-surface-variant max-w-xl mt-4 leading-relaxed">
            Dedikasi pelayanan menyeluruh untuk melengkapi kebutuhan busana santun personal hingga korporasi.
          </p>
          <div className="w-16 h-0.5 bg-primary mt-5" aria-hidden="true" />
        </div>

        {/* 4 Luxury Service Cards with React Bits SpotlightCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {siteConfig.services.map((service) => (
            <SpotlightCard
              key={service.id}
              theme="light"
              spotlightColor="#C5A059"
              intensity={0.6}
              borderGlow={0.9}
              spotlightSize={260}
              style={
                {
                  '--spotlight-card-surface': '#f6f3f2',
                  '--spotlight-card-border': 'rgba(232, 222, 200, 0.75)',
                } as React.CSSProperties
              }
              className="group !p-7 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-transform duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Icon Container */}
                <div
                  className={`w-14 h-14 rounded-2xl ${
                    serviceIconBgs[service.id] || 'bg-primary-fixed'
                  } flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform`}
                >
                  {serviceIcons[service.id]}
                </div>

                {/* Category Pill */}
                <span className="text-[11px] uppercase tracking-wider font-semibold text-primary block mb-2">
                  {service.category}
                </span>

                {/* Title */}
                <h3 className="font-serif text-xl font-semibold text-on-surface mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-6 mt-6 border-t border-border-champagne/40">
                <Link
                  href={
                    service.id === 'bespoke-bridal'
                      ? '/pesan?product=layanan-bespoke-bridal'
                      : service.id === 'private-styling'
                      ? '/pesan?product=layanan-private-styling'
                      : '/pesan'
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary group-hover:text-primary-container group-hover:translate-x-1 transition-all"
                >
                  <span>{service.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
