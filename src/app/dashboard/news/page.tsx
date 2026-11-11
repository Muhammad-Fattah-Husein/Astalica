'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Newspaper,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Upload,
  CheckCircle,
  AlertCircle,
  Loader2,
  X,
  Calendar,
  Tag,
} from 'lucide-react';

export default function NewsManagementPage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form Modal state
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Tren Modest 2026');
  const [thumbnailPath, setThumbnailPath] = useState('');
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Preview Modal state
  const [previewArticle, setPreviewArticle] = useState<any | null>(null);

  const fetchNews = async () => {
    try {
      const res = await fetch('/api/news?all=true');
      const data = await res.json();
      if (data.success) {
        setNews(data.data || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchNews().finally(() => setLoading(false));
  }, []);

  const openCreateModal = () => {
    setIsEditing(false);
    setEditId(null);
    setTitle('');
    setExcerpt('');
    setContent('');
    setCategory('Tren Modest 2026');
    setThumbnailPath('/images/news-1.webp');
    setStatus('published');
    setShowModal(true);
  };

  const openEditModal = (article: any) => {
    setIsEditing(true);
    setEditId(article.id);
    setTitle(article.title);
    setExcerpt(article.excerpt);
    setContent(article.content || '');
    setCategory(article.category || 'Warta & Tren');
    setThumbnailPath(article.thumbnail_path || '/images/news-1.webp');
    setStatus(article.status || 'draft');
    setShowModal(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setThumbnailPath(data.filePath);
      } else {
        alert(data.error || 'Gagal mengunggah gambar.');
      }
    } catch {
      alert('Terjadi kesalahan saat mengunggah gambar.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    const payload = {
      id: editId,
      title,
      excerpt,
      content,
      category,
      thumbnail_path: thumbnailPath,
      status,
    };

    try {
      const res = await fetch('/api/news', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setFeedback({ type: 'error', text: data.error || 'Gagal menyimpan berita.' });
      } else {
        setFeedback({
          type: 'success',
          text: `Artikel berhasil ${isEditing ? 'diperbarui' : 'diterbitkan'}. Tampilan di halaman depan (landing page) telah disinkronkan otomatis!`,
        });
        setShowModal(false);
        await fetchNews();
      }
    } catch {
      setFeedback({ type: 'error', text: 'Terjadi gangguan jaringan.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, articleTitle: string) => {
    if (!confirm(`Hapus artikel "${articleTitle}"? Tindakan ini tidak dapat dibatalkan.`)) {
      return;
    }

    setFeedback(null);
    try {
      const res = await fetch(`/api/news?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setFeedback({ type: 'error', text: data.error || 'Gagal menghapus berita.' });
      } else {
        setFeedback({ type: 'success', text: `Artikel "${articleTitle}" telah dihapus.` });
        await fetchNews();
      }
    } catch {
      setFeedback({ type: 'error', text: 'Terjadi gangguan jaringan.' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-on-surface">
            Manajemen Berita &amp; Warta Atelier
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Publikasikan warta tren, rilis koleksi hijab sutra, dan panduan adibusana. Setiap perubahan langsung tampil di landing page.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary hover:bg-primary-container text-xs font-semibold uppercase tracking-wider rounded-full shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tulis Artikel Baru</span>
        </button>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-2xl text-xs flex items-center gap-3 border ${
            feedback.type === 'success'
              ? 'bg-green-50 text-green-800 border-green-200'
              : 'bg-red-50 text-red-800 border-red-200'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* News Table */}
      <div className="bg-surface rounded-3xl border border-border-champagne/70 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-outline">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="text-xs">Memuat artikel...</span>
          </div>
        ) : news.length === 0 ? (
          <div className="py-16 text-center text-on-surface-variant text-xs">
            Belum ada artikel berita. Klik &quot;Tulis Artikel Baru&quot; untuk memulai.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-low border-b border-border-champagne/60 text-outline uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-6 py-4">Thumbnail</th>
                  <th className="px-6 py-4">Kategori</th>
                  <th className="px-6 py-4">Judul &amp; Ringkasan</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Tanggal Buat</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-champagne/40">
                {news.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="px-6 py-4 w-24">
                      <div className="relative w-16 h-12 rounded-xl overflow-hidden bg-surface-container border border-border-champagne/60">
                        <Image
                          src={item.thumbnail_path || '/images/news-1.webp'}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-surface-container border border-border-champagne text-primary">
                        <Tag className="w-3 h-3" />
                        {item.category || 'Warta & Tren'}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-sm">
                      <h4 className="font-serif font-semibold text-sm text-on-surface line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-on-surface-variant line-clamp-2 mt-0.5">
                        {item.excerpt}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                          item.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-outline whitespace-nowrap">
                      {new Date(item.created_at).toLocaleDateString('id-ID', {
                        dateStyle: 'medium',
                      })}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setPreviewArticle(item)}
                          className="p-1.5 rounded-lg text-outline hover:text-primary hover:bg-surface-container transition-colors"
                          title="Pratinjau Artikel"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1.5 rounded-lg text-outline hover:text-secondary hover:bg-surface-container transition-colors"
                          title="Ubah Artikel"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.title)}
                          className="p-1.5 rounded-lg text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors"
                          title="Hapus Artikel"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Form Tambah/Ubah Berita */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-surface rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-border-champagne/80 shadow-2xl my-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border-champagne/40">
              <h3 className="font-serif text-2xl font-semibold text-on-surface">
                {isEditing ? 'Ubah Artikel Berita' : 'Tulis Artikel Berita Baru'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-full hover:bg-surface-container text-outline"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">
                    Judul Artikel *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Kilau Kemurnian Hijab Sutra Mulberry di Tren 2026"
                    className="w-full px-4 py-2.5 bg-surface-container-low text-on-surface text-sm rounded-full border border-border-champagne focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">
                    Kategori Label *
                  </label>
                  <input
                    type="text"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Tren Modest 2026"
                    className="w-full px-4 py-2.5 bg-surface-container-low text-on-surface text-sm rounded-full border border-border-champagne focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">
                  Ringkasan Singkat (Excerpt) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Ringkasan 1-2 kalimat untuk kartu depan..."
                  className="w-full px-4 py-2.5 bg-surface-container-low text-on-surface text-xs rounded-2xl border border-border-champagne focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">
                  Isi Konten Lengkap *
                </label>
                <textarea
                  rows={5}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tuliskan isi artikel narasi lengkap..."
                  className="w-full px-4 py-3 bg-surface-container-low text-on-surface text-xs rounded-2xl border border-border-champagne focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              {/* Upload Thumbnail Lokal */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">
                  Thumbnail Media (Disimpan Lokal di public/uploads)
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-16 rounded-xl overflow-hidden bg-surface-container border border-border-champagne shrink-0">
                    <Image
                      src={thumbnailPath || '/images/news-1.webp'}
                      alt="Thumbnail preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-surface-container text-on-surface text-xs font-semibold rounded-full border border-border-champagne hover:bg-surface-container-high transition-colors">
                      <Upload className="w-3.5 h-3.5 text-primary" />
                      <span>{uploadingImage ? 'Mengunggah...' : 'Pilih Gambar Lokal'}</span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-[10px] text-outline mt-1 truncate">
                      Path: {thumbnailPath}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">
                  Status Publikasi
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="px-4 py-2 bg-surface-container-low text-on-surface text-xs rounded-full border border-border-champagne focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium"
                >
                  <option value="published">Published (Ditampilkan di Landing Page)</option>
                  <option value="draft">Draft (Arsip Internal)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-champagne/40">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-on-surface-variant hover:text-on-surface"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-7 py-2.5 bg-primary text-on-primary hover:bg-primary-container text-xs font-semibold uppercase tracking-wider rounded-full shadow-sm disabled:opacity-50"
                >
                  {submitting ? 'Menyimpan...' : isEditing ? 'Simpan Perubahan' : 'Terbitkan Artikel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Pratinjau (Preview) */}
      {previewArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-surface rounded-3xl p-6 sm:p-10 max-w-xl w-full border border-border-champagne shadow-2xl my-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] uppercase tracking-widest text-primary font-bold">
                PRATINJAU ARTIKEL
              </span>
              <button
                onClick={() => setPreviewArticle(null)}
                className="p-1 rounded-full hover:bg-surface-container text-outline"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-border-champagne">
              <Image
                src={previewArticle.thumbnail_path || '/images/news-1.webp'}
                alt={previewArticle.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex items-center gap-2 text-outline text-xs mb-2">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span>
                {new Date(previewArticle.created_at).toLocaleDateString('id-ID', {
                  dateStyle: 'long',
                })}
              </span>
              <span>•</span>
              <span className="uppercase text-[10px] font-semibold text-primary">
                {previewArticle.category || 'Warta & Tren'}
              </span>
              <span>•</span>
              <span className="uppercase text-[10px] font-semibold text-secondary">
                {previewArticle.status}
              </span>
            </div>

            <h3 className="font-serif text-2xl font-semibold text-on-surface leading-snug mb-4">
              {previewArticle.title}
            </h3>

            <p className="text-xs sm:text-sm text-on-surface-variant font-medium italic border-l-2 border-primary pl-4 mb-4">
              {previewArticle.excerpt}
            </p>

            <div className="text-xs sm:text-sm text-on-surface leading-relaxed whitespace-pre-line border-t border-border-champagne/40 pt-4">
              {previewArticle.content}
            </div>

            <div className="mt-8 pt-4 border-t border-border-champagne/40 flex justify-end">
              <button
                onClick={() => setPreviewArticle(null)}
                className="px-6 py-2 bg-surface-container text-on-surface text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-surface-container-high transition-colors"
              >
                Tutup Pratinjau
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
