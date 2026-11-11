'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Plus, Trash2, Lock, Check, AlertCircle, Loader2 } from 'lucide-react';

export default function RolesManagementPage() {
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDesc, setNewRoleDesc] = useState('');
  const [newRolePerms, setNewRolePerms] = useState({
    manage_news: true,
    manage_orders: false,
    manage_users: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchRoles = async () => {
    try {
      const res = await fetch('/api/admin/roles');
      const data = await res.json();
      if (data.success) {
        setRoles(data.data || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchRoles().finally(() => setLoading(false));
  }, []);

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/admin/roles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newRoleName,
          description: newRoleDesc,
          permissions: newRolePerms,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setFeedback({ type: 'error', text: data.error || 'Gagal menambahkan role.' });
      } else {
        setFeedback({ type: 'success', text: `Role "${newRoleName}" berhasil dibuat.` });
        setShowModal(false);
        setNewRoleName('');
        setNewRoleDesc('');
        await fetchRoles();
      }
    } catch {
      setFeedback({ type: 'error', text: 'Terjadi gangguan jaringan.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteRole = async (roleId: string, roleName: string) => {
    if (!confirm(`Hapus role "${roleName}"? Role non-sistem ini akan dicabut permanen.`)) {
      return;
    }

    setFeedback(null);
    try {
      const res = await fetch(`/api/admin/roles?id=${roleId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setFeedback({ type: 'error', text: data.error || 'Gagal menghapus role.' });
      } else {
        setFeedback({ type: 'success', text: `Role "${roleName}" berhasil dihapus.` });
        await fetchRoles();
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
            Manajemen Role &amp; Hak Akses
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Konfigurasi tingkat wewenang untuk administrator, staf atelier, dan pengguna.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary hover:bg-primary-container text-xs font-semibold uppercase tracking-wider rounded-full shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Role Kustom</span>
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
          <AlertCircle className="w-4 h-4 text-primary shrink-0" />
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Roles List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-16 flex flex-col items-center justify-center gap-3 text-outline">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="text-xs">Memuat daftar role...</span>
          </div>
        ) : (
          roles.map((role) => {
            const isSystem = String(role.is_system) === 'true';
            let parsedPerms = {};
            try {
              parsedPerms = typeof role.permissions === 'string' ? JSON.parse(role.permissions) : role.permissions || {};
            } catch {
              parsedPerms = {};
            }

            return (
              <div
                key={role.id}
                className="bg-surface rounded-3xl p-6 border border-border-champagne/70 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-serif text-lg font-bold text-on-surface uppercase tracking-wide">
                      {role.name}
                    </span>
                    {isSystem ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20">
                        <Lock className="w-3 h-3" /> Sistem
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-surface-container text-outline">
                        Kustom
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                    {role.description || 'Tidak ada deskripsi khusus.'}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-border-champagne/40">
                    <span className="text-[10px] uppercase tracking-wider text-outline font-semibold block mb-1">
                      Wewenang:
                    </span>
                    {Object.keys(parsedPerms).length === 0 ? (
                      <span className="text-xs text-outline italic">Akses baca standar</span>
                    ) : (
                      Object.entries(parsedPerms).map(([key, val]) => (
                        <div key={key} className="flex items-center gap-2 text-xs text-on-surface">
                          <Check className="w-3.5 h-3.5 text-secondary shrink-0" />
                          <span className="capitalize">{key.replace('_', ' ')}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-border-champagne/40 flex justify-end">
                  {!isSystem && (
                    <button
                      onClick={() => handleDeleteRole(role.id, role.name)}
                      className="inline-flex items-center gap-1.5 text-xs text-red-600 hover:text-red-800 font-semibold transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus Role</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal Tambah Role */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface rounded-3xl p-6 sm:p-8 max-w-md w-full border border-border-champagne/70 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="font-serif text-xl font-semibold text-on-surface mb-2">
              Tambah Role Akses Baru
            </h3>
            <p className="text-xs text-on-surface-variant mb-6">
              Tentukan nama wewenang non-sistem untuk didelegasikan ke staf atelier.
            </p>

            <form onSubmit={handleCreateRole} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">
                  Nama Role (Contoh: editor, styling-staff)
                </label>
                <input
                  type="text"
                  required
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  placeholder="editor"
                  className="w-full px-4 py-2.5 bg-surface-container-low text-on-surface text-xs rounded-full border border-border-champagne focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">
                  Deskripsi Tanggung Jawab
                </label>
                <textarea
                  rows={2}
                  value={newRoleDesc}
                  onChange={(e) => setNewRoleDesc(e.target.value)}
                  placeholder="Bertanggung jawab atas kurasi artikel warta & berita..."
                  className="w-full px-4 py-2.5 bg-surface-container-low text-on-surface text-xs rounded-2xl border border-border-champagne focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-2">
                  Hak Akses Permission
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs text-on-surface cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newRolePerms.manage_news}
                      onChange={(e) =>
                        setNewRolePerms({ ...newRolePerms, manage_news: e.target.checked })
                      }
                      className="rounded text-secondary focus:ring-secondary"
                    />
                    <span>Kelola CRUD Berita &amp; Artikel</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-on-surface cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newRolePerms.manage_orders}
                      onChange={(e) =>
                        setNewRolePerms({ ...newRolePerms, manage_orders: e.target.checked })
                      }
                      className="rounded text-secondary focus:ring-secondary"
                    />
                    <span>Lihat &amp; Konfirmasi Pesanan Tiket</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-on-surface cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newRolePerms.manage_users}
                      onChange={(e) =>
                        setNewRolePerms({ ...newRolePerms, manage_users: e.target.checked })
                      }
                      className="rounded text-secondary focus:ring-secondary"
                    />
                    <span>Kelola Status Pengguna</span>
                  </label>
                </div>
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
                  className="px-6 py-2.5 bg-primary text-on-primary hover:bg-primary-container text-xs font-semibold uppercase tracking-wider rounded-full shadow-sm disabled:opacity-50"
                >
                  {submitting ? 'Menyimpan...' : 'Simpan Role'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
