import React from 'react';
import Image from 'next/image';
import { Quote, Feather, Scissors, Palette } from 'lucide-react';
import { siteConfig } from '@/config/site';
import BlurText from '@/components/reactbits/BlurText';
import SpotlightCard from '@/components/reactbits/SpotlightCard';

const pillarIcons: Record<string, React.ReactNode> = {
  'pillar-1': <Feather className="w-6 h-6 text-primary" />,
  'pillar-2': <Scissors className="w-6 h-6 text-secondary" />,
  'pillar-3': <Palette className="w-6 h-6 text-tertiary" />,
};

const pillarBgs: Record<string, string> = {
  'pillar-1': 'bg-primary/10',
  'pillar-2': 'bg-secondary/15',
  'pillar-3': 'bg-tertiary/15',
};

export default function About() {
  const { about } = siteConfig;

  return (
    <section id="tentang-kami" className="w-full py-20 lg:py-28 bg-surface">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header with React Bits BlurText */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-3 font-sans">
            {about.badge}
          </span>
          <BlurText
            as="h2"
            text={about.heading}
            delay={60}
            stepDuration={0.35}
            animateBy="words"
            direction="bottom"
            distance={24}
            blur={6}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl text-on-surface max-w-2xl leading-tight font-semibold justify-center text-center"
          />
          <div className="w-16 h-0.5 bg-primary mt-5" aria-hidden="true" />
        </div>

        {/* Content Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          {/* Narrative Story */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <p className="text-base sm:text-lg text-on-surface leading-relaxed font-normal">
              {about.paragraph1}
            </p>
            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              {about.paragraph2}
            </p>

            {/* Editorial Quote Box */}
            <div className="p-6 sm:p-8 rounded-2xl bg-surface-container-low border border-border-champagne/60 shadow-sm flex items-start gap-4 mt-2">
              <Quote className="w-8 h-8 text-primary shrink-0 rotate-180 opacity-80" />
              <blockquote className="flex flex-col">
                <p className="font-serif text-base sm:text-lg italic text-on-surface leading-snug">
                  &ldquo;{about.quote.text}&rdquo;
                </p>
                <footer className="text-xs uppercase tracking-widest text-primary font-bold mt-3">
                  {about.quote.author}
                </footer>
              </blockquote>
            </div>
          </div>

          {/* Staggered Editorial Imagery */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 sm:gap-6">
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-lg border border-border-champagne/40 bg-surface-container-low">
              <Image
                src={about.images.textile}
                alt={about.images.textileAlt}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-lg border border-border-champagne/40 bg-surface-container-low translate-y-6 sm:translate-y-8">
              <Image
                src={about.images.gallery}
                alt={about.images.galleryAlt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* 3 Key Pillars with React Bits SpotlightCard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-6">
          {about.pillars.map((pillar) => (
            <SpotlightCard
              key={pillar.id}
              theme="light"
              spotlightColor="#C5A059"
              intensity={0.55}
              borderGlow={0.85}
              spotlightSize={250}
              style={
                {
                  '--spotlight-card-surface': '#f6f3f2',
                  '--spotlight-card-border': 'rgba(232, 222, 200, 0.75)',
                } as React.CSSProperties
              }
              className="!rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-start group"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${
                  pillarBgs[pillar.id] || 'bg-primary/10'
                } flex items-center justify-center mb-6 group-hover:scale-105 transition-transform`}
              >
                {pillarIcons[pillar.id]}
              </div>
              <h3 className="text-lg font-serif font-semibold text-on-surface mb-3">
                {pillar.title}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {pillar.description}
              </p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
