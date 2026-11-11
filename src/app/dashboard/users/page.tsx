'use client';

import React, { useState, useEffect } from 'react';
import { Users, Search, Shield, Trash2, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function UsersManagementPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (data.success) {
        setUsers(data.data || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

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
    Promise.all([fetchUsers(), fetchRoles()]).finally(() => setLoading(false));
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    setActionLoadingId(userId);
    setFeedback(null);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, role_id: newRole }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setFeedback({ type: 'error', text: data.error || 'Gagal mengubah role.' });
      } else {
        setFeedback({ type: 'success', text: 'Role pengguna berhasil diperbarui.' });
        await fetchUsers();
      }
    } catch {
      setFeedback({ type: 'error', text: 'Terjadi gangguan jaringan.' });
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleStatusToggle = async (userId: string, currentStatus: string) => {
    setActionLoadingId(userId);
    setFeedback(null);
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setFeedback({ type: 'error', text: data.error || 'Gagal mengubah status.' });
      } else {
        setFeedback({
          type: 'success',
          text: `Status berhasil diubah menjadi ${newStatus === 'active' ? 'Aktif' : 'Nonaktif'}.`,
        });
        await fetchUsers();
      }
    } catch {
      setFeedback({ type: 'error', text: 'Terjadi gangguan jaringan.' });
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus akun ${userName}? Tindakan ini permanen.`)) {
      return;
    }

    setActionLoadingId(userId);
    setFeedback(null);
    try {
      const res = await fetch(`/api/admin/users?id=${userId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setFeedback({ type: 'error', text: data.error || 'Gagal menghapus user.' });
      } else {
        setFeedback({ type: 'success', text: `Pengguna ${userName} telah dihapus.` });
        await fetchUsers();
      }
    } catch {
      setFeedback({ type: 'error', text: 'Terjadi gangguan jaringan.' });
    } finally {
      setActionLoadingId(null);
    }
  };

  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    return u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-on-surface">
            Manajemen Pengguna
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Kelola daftar akun terdaftar, peran akses, dan status keaktifan akun.
          </p>
        </div>
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

      {/* Filter and Search Bar */}
      <div className="bg-surface rounded-2xl p-4 border border-border-champagne/70 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-outline absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari berdasarkan nama atau email..."
            className="w-full pl-10 pr-4 py-2 bg-surface-container-low text-on-surface text-xs rounded-full border border-border-champagne/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <div className="text-xs text-outline font-medium">
          Total: {filteredUsers.length} pengguna
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-surface rounded-3xl border border-border-champagne/70 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-outline">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="text-xs">Memuat data pengguna...</span>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="py-16 text-center text-on-surface-variant text-xs">
            Tidak ada pengguna yang cocok dengan kriteria pencarian.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-low border-b border-border-champagne/60 text-outline uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-6 py-4">Pengguna</th>
                  <th className="px-6 py-4">Role Akses</th>
                  <th className="px-6 py-4">Status Akun</th>
                  <th className="px-6 py-4">Waktu Terdaftar</th>
                  <th className="px-6 py-4 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-champagne/40">
                {filteredUsers.map((user) => {
                  const isLoading = actionLoadingId === user.id;
                  return (
                    <tr key={user.id} className="hover:bg-surface-container-low/40 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-on-surface">{user.name}</span>
                          <span className="text-outline text-[11px]">{user.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          disabled={isLoading}
                          value={user.role_id}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          className="px-3 py-1.5 rounded-full bg-surface-container text-on-surface text-xs border border-border-champagne font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50"
                        >
                          <option value="admin">admin</option>
                          <option value="user">user</option>
                          {roles
                            .filter((r) => r.name !== 'admin' && r.name !== 'user')
                            .map((r) => (
                              <option key={r.id} value={r.name}>
                                {r.name}
                              </option>
                            ))}
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          disabled={isLoading}
                          onClick={() => handleStatusToggle(user.id, user.status)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                            user.status === 'active'
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          {user.status === 'active' ? (
                            <>
                              <CheckCircle className="w-3 h-3" />
                              <span>Aktif</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3" />
                              <span>Nonaktif</span>
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-outline">
                        {user.created_at
                          ? new Date(user.created_at).toLocaleDateString('id-ID', {
                              dateStyle: 'medium',
                            })
                          : '-'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          disabled={isLoading}
                          onClick={() => handleDeleteUser(user.id, user.name)}
                          className="p-2 rounded-full text-red-600 hover:bg-red-50 hover:text-red-800 transition-colors disabled:opacity-40"
                          title="Hapus Pengguna"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
