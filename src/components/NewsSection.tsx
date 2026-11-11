'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, Newspaper, X, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import BlurText from '@/components/reactbits/BlurText';

export interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category?: string;
  thumbnail_path?: string;
  status: string;
  created_at: string;
}

interface NewsSectionProps {
  initialArticles?: ArticleItem[];
}

export default function NewsSection({ initialArticles = [] }: NewsSectionProps) {
  const [articles, setArticles] = useState<ArticleItem[]>(initialArticles);
  const [loading, setLoading] = useState(initialArticles.length === 0);
  const [showAll, setShowAll] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selectedArticle && !dialog.open) {
      dialog.showModal();
    } else if (!selectedArticle && dialog.open) {
      dialog.close();
    }
  }, [selectedArticle]);

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/news');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setArticles(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch published news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const displayedArticles = showAll ? articles : articles.slice(0, 3);

  return (
    <section id="warta-tren" className="w-full py-20 lg:py-28 bg-surface-container-low border-t border-border-champagne/40">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-primary font-bold font-sans">
              WARTA &amp; INSPIRASI
            </span>
            <BlurText
              as="h2"
              text="Warta, Tren & Inspirasi Gaya"
              delay={60}
              stepDuration={0.35}
              animateBy="words"
              direction="bottom"
              distance={24}
              blur={6}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl text-on-surface mt-2 font-semibold"
            />
          </div>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-md leading-relaxed">
            Ulasan berkala seputar dinamika modest fashion global, panduan adibusana, serta kisah di balik mahakarya kain Nusantara.
          </p>
        </div>

        {/* Loading State if empty */}
        {loading && articles.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-outline">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="text-xs">Memuat warta atelier terbaru...</span>
          </div>
        ) : articles.length === 0 ? (
          <div className="py-16 text-center text-on-surface-variant text-sm bg-surface rounded-3xl border border-border-champagne p-8 max-w-lg mx-auto shadow-sm">
            <p className="font-serif text-base font-semibold text-on-surface">Belum ada artikel warta yang dipublikasikan.</p>
            <p className="text-xs text-outline mt-1">Admin dapat menerbitkan artikel baru melalui Dashboard News.</p>
          </div>
        ) : (
          /* Articles Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedArticles.map((item) => (
              <article
                key={item.id}
                className="flex flex-col rounded-3xl bg-surface border border-border-champagne/60 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
                  <Image
                    src={item.thumbnail_path || '/images/news-1.webp'}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1 rounded-full bg-surface/90 backdrop-blur-md text-on-surface text-[11px] font-semibold border border-border-champagne/50 shadow-sm">
                      {item.category || 'Warta & Tren'}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Meta items */}
                    <div className="flex items-center gap-3 text-outline text-xs mb-3 font-medium">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        {new Date(item.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        4 Menit Baca
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-on-surface group-hover:text-primary transition-colors leading-snug mb-3 line-clamp-2">
                      {item.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6 line-clamp-3">
                      {item.excerpt}
                    </p>
                  </div>

                  {/* Read more button opening reader modal */}
                  <div className="pt-4 border-t border-border-champagne/40">
                    <button
                      type="button"
                      onClick={() => setSelectedArticle(item)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:translate-x-1 transition-all focus:outline-none"
                    >
                      <span>Baca Selengkapnya</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Center Toggle Action Button */}
        {articles.length > 3 && (
          <div className="flex justify-center mt-14">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-surface text-on-surface border border-border-champagne hover:bg-surface-container hover:text-primary font-semibold text-xs uppercase tracking-wider rounded-full shadow-sm transition-all"
            >
              <Newspaper className="w-4 h-4 text-primary" />
              <span>
                {showAll
                  ? 'Tampilkan Lebih Sedikit'
                  : `Lihat Semua Warta & Rilis Pers (${articles.length})`}
              </span>
              {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>

      {/* Native Accessible Reader Modal */}
      <dialog
        ref={dialogRef}
        aria-labelledby="news-modal-title"
        onClose={() => setSelectedArticle(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) {
            setSelectedArticle(null);
          }
        }}
        className="backdrop:bg-black/60 backdrop:backdrop-blur-sm bg-transparent p-4 max-w-2xl w-full m-auto rounded-3xl open:animate-in open:zoom-in-95 open:duration-200 focus:outline-none"
      >
        {selectedArticle && (
          <div className="bg-surface rounded-3xl p-6 sm:p-10 w-full border border-border-champagne shadow-2xl text-left">
            {/* Header info */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-[11px] uppercase tracking-widest text-primary font-bold">
                {selectedArticle.category || 'WARTA & TREN'}
              </span>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="p-2 rounded-full hover:bg-surface-container text-outline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                aria-label="Tutup Artikel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-border-champagne">
              <Image
                src={selectedArticle.thumbnail_path || '/images/news-1.webp'}
                alt={selectedArticle.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Date metadata */}
            <div className="flex items-center gap-2 text-outline text-xs mb-3">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span>
                {new Date(selectedArticle.created_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <span>•</span>
              <span className="text-secondary font-medium">Astalica Editorial</span>
            </div>

            {/* Title */}
            <h3 id="news-modal-title" className="font-serif text-2xl sm:text-3xl font-semibold text-on-surface leading-snug mb-4">
              {selectedArticle.title}
            </h3>

            {/* Excerpt quote */}
            <p className="text-xs sm:text-sm text-on-surface-variant font-medium italic border-l-2 border-primary pl-4 mb-6">
              {selectedArticle.excerpt}
            </p>

            {/* Content Body */}
            <div className="text-sm text-on-surface leading-relaxed whitespace-pre-line border-t border-border-champagne/40 pt-5 space-y-4">
              {selectedArticle.content}
            </div>

            {/* Close Button */}
            <div className="mt-8 pt-4 border-t border-border-champagne/40 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-2.5 bg-secondary text-on-secondary text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-secondary-hover transition-colors shadow-sm"
              >
                Selesai Membaca
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
