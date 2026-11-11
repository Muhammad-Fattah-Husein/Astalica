import os from 'os';
import fs from 'fs/promises';
import path from 'path';

export interface QueryOptions {
  [key: string]: any;
}

export interface DbResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;
const APPS_SCRIPT_SECRET = process.env.APPS_SCRIPT_SECRET;
const LOCAL_DB_PATH = path.join(process.cwd(), 'data', 'local-database.json');
const TMP_DB_PATH = path.join(os.tmpdir(), 'astalica-local-database.json');

export function isGoogleSheetsConnected(): boolean {
  return Boolean(process.env.APPS_SCRIPT_URL && process.env.APPS_SCRIPT_URL.startsWith('http'));
}

// Initial seed data for fallback local storage
const DEFAULT_SEED_DATA = {
  Roles: [
    {
      id: 'role-admin',
      name: 'admin',
      description: 'Administrator Utama Atelier Astalica (Akses Penuh)',
      permissions: JSON.stringify({ all: true, manage_users: true, manage_roles: true, manage_news: true, manage_orders: true }),
      is_system: 'true',
      created_at: '2026-11-09T00:00:00.000Z',
    },
    {
      id: 'role-user',
      name: 'user',
      description: 'Klien / Pengguna Terdaftar Astalica',
      permissions: JSON.stringify({ read: true, create_order: true, view_own_orders: true }),
      is_system: 'true',
      created_at: '2026-11-09T00:00:00.000Z',
    },
  ],
  Users: [
    {
      id: 'user-admin-1',
      name: 'Administrator Astalica',
      email: 'admin@gmail.com',
      password_hash: '$2b$10$bv1fW3W44EmZWt0LbNyL/eL.v2GvANNFJX1BBogPHC3UckvPQl8T6', // bcrypt for 123456
      role_id: 'admin',
      status: 'active',
      created_at: '2026-11-09T00:00:00.000Z',
      updated_at: '2026-11-09T00:00:00.000Z',
    },
    {
      id: 'user-client-demo',
      name: 'Sarah Anindya (Klien Uji Coba)',
      email: 'klien@astalica.id',
      password_hash: '$2b$10$qbpmoFMgsgvU2cKF.e8WpO7/ogDqXlcqfwRz0OzQ85hFmjtHfSZNq', // bcrypt for user123
      role_id: 'user',
      status: 'active',
      created_at: '2026-11-09T00:00:00.000Z',
      updated_at: '2026-11-09T00:00:00.000Z',
    },
  ],
  News: [
    {
      id: 'news-1',
      title: 'Tren Hijab Draped 2025: Mengapa Silk Satin Emerald Jadi Primadona Panggung Paris',
      slug: 'tren-hijab-draped-2025-emerald-silk-paris',
      excerpt: 'Eksplorasi siluet drape asimetris yang memikat pecinta modest adibusana internasional dengan paduan palet zamrud mulia dan kemilau satin alami.',
      content: "Panggung adibusana modest di Paris Fashion Week musim ini diramaikan oleh gelombang keanggunan baru: siluet draped silk satin dengan sentuhan warna royal forest emerald. Desain ini menawarkan keseimbangan sempurna antara kesantunan syar'i dan modernitas haute couture tingkat dunia.\n\nAstalica Atelier mengangkat tren ini ke dalam koleksi mahakarya terbaru dengan memadukan serat sutra mulberry murni grade 6A yang diproses tenun tangan oleh perajin tradisional Indonesia.",
      category: 'Tren Modest 2025',
      thumbnail_path: '/images/news-1.webp',
      status: 'published',
      author_id: 'user-admin-1',
      created_at: '2025-05-18T10:00:00.000Z',
      updated_at: '2025-05-18T10:00:00.000Z',
    },
    {
      id: 'news-2',
      title: 'Panduan Merawat Hijab Sutra Mulberry Agar Kilau dan Lembutnya Bertahan Bertahun-tahun',
      slug: 'panduan-merawat-hijab-sutra-mulberry',
      excerpt: 'Kiat esensial suhu pencucian, jenis sabun pH netral khusus sutra, serta trik menyetrika tanpa merusak tenunan mikro sutra organik.',
      content: 'Sutra mulberry murni adalah mahakarya alam yang memerlukan sentuhan lembut dalam perawatannya. Hindari penggunaan detergen berbahan kimia keras atau pemutih yang dapat memecah ikatan protein alami serat sutra.\n\nGunakan sabun khusus ber-pH netral atau sampo bayi lembut, cuci secara perlahan dengan air dingin tanpa diperas, dan keringkan di tempat teduh yang tidak terpapar sinar matahari langsung.',
      category: 'Atelier Care',
      thumbnail_path: '/images/news-2.webp',
      status: 'published',
      author_id: 'user-admin-1',
      created_at: '2025-05-10T08:30:00.000Z',
      updated_at: '2025-05-10T08:30:00.000Z',
    },
    {
      id: 'news-3',
      title: 'Astalica Gandeng Pengrajin Tenun Sutra Lokal dalam Program Pemberdayaan Modest Artisans',
      slug: 'astalica-gandeng-pengrajin-tenun-sutra-lokal',
      excerpt: 'Inisiatif sirkular kami untuk memberdayakan lebih dari 120 perajin tenun wanita di Jawa Barat dan Sulawesi Selatan dengan upah berkeadilan.',
      content: 'Komitmen Astalica bukan sekadar menciptakan adibusana santun, melainkan juga menyejahterakan rantai produksi hulu melalui kemitraan berkeadilan bersama kelompok perajin tenun wastra wanita di pelosok Nusantara.\n\nMelalui program pendampingan teknik tenun presisi dan standarisasi ekspor, karya artisan lokal kini mampu bersaing dan dipamerkan di galeri internasional.',
      category: 'Pemberdayaan Sosial',
      thumbnail_path: '/images/news-3.webp',
      status: 'published',
      author_id: 'user-admin-1',
      created_at: '2025-04-28T14:15:00.000Z',
      updated_at: '2025-04-28T14:15:00.000Z',
    },
  ],
  Orders: [],
  Inquiries: [],
  Subscribers: [],
};

async function getLocalDatabase(): Promise<Record<string, any[]>> {
  // Check writable tmp copy first when running on serverless read-only environments (e.g. Vercel)
  if (process.env.VERCEL) {
    try {
      const tmpData = await fs.readFile(TMP_DB_PATH, 'utf-8');
      return JSON.parse(tmpData);
    } catch {
      // Seed from bundled read-only data/local-database.json or DEFAULT_SEED_DATA
      try {
        const bundled = await fs.readFile(LOCAL_DB_PATH, 'utf-8');
        await fs.writeFile(TMP_DB_PATH, bundled, 'utf-8');
        return JSON.parse(bundled);
      } catch {
        return JSON.parse(JSON.stringify(DEFAULT_SEED_DATA));
      }
    }
  }

  try {
    const data = await fs.readFile(LOCAL_DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    try {
      await fs.mkdir(path.dirname(LOCAL_DB_PATH), { recursive: true });
      await fs.writeFile(LOCAL_DB_PATH, JSON.stringify(DEFAULT_SEED_DATA, null, 2), 'utf-8');
    } catch {
      // Read-only fallback
    }
    return JSON.parse(JSON.stringify(DEFAULT_SEED_DATA));
  }
}

async function saveLocalDatabase(data: Record<string, any[]>): Promise<void> {
  const payload = JSON.stringify(data, null, 2);
  if (process.env.VERCEL) {
    await fs.writeFile(TMP_DB_PATH, payload, 'utf-8');
    return;
  }

  try {
    await fs.mkdir(path.dirname(LOCAL_DB_PATH), { recursive: true });
    await fs.writeFile(LOCAL_DB_PATH, payload, 'utf-8');
  } catch (err: any) {
    if (err?.code === 'EROFS' || err?.code === 'EACCES') {
      await fs.writeFile(TMP_DB_PATH, payload, 'utf-8');
    } else {
      throw err;
    }
  }
}

/**
 * Universal Database Bridge
 * Automatically uses Google Apps Script Web App if configured,
 * otherwise falls back to local database storage for seamless local testing.
 */
export async function executeDb<T = any>(
  action: 'query' | 'insert' | 'update' | 'delete',
  table: string,
  data?: any,
  query?: QueryOptions
): Promise<DbResult<T>> {
  // If Google Apps Script is configured with valid URL
  if (APPS_SCRIPT_URL && APPS_SCRIPT_URL.startsWith('http')) {
    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: APPS_SCRIPT_SECRET,
          action,
          table,
          data,
          query,
        }),
        cache: 'no-store',
      });

      if (!response.ok) {
        return {
          success: false,
          error: `Apps Script request failed: ${response.statusText}`,
        };
      }

      const json = await response.json();
      return json;
    } catch (err: any) {
      console.warn('Apps Script failed, falling back to local database:', err.message);
    }
  }

  // Local fallback implementation
  try {
    const db = await getLocalDatabase();
    if (!db[table]) {
      db[table] = [];
    }

    if (action === 'query') {
      let rows = [...db[table]];
      if (query && Object.keys(query).length > 0) {
        rows = rows.filter((row) => {
          for (const key of Object.keys(query)) {
            if (String(row[key]) !== String(query[key])) return false;
          }
          return true;
        });
      }
      return { success: true, data: rows as unknown as T };
    }

    if (action === 'insert') {
      const item = { ...data };
      if (!item.id) {
        item.id = `${table.toLowerCase()}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      }
      const now = new Date().toISOString();
      if (!item.created_at) item.created_at = now;
      item.updated_at = now;

      db[table].push(item);
      await saveLocalDatabase(db);
      return { success: true, data: item as unknown as T };
    }

    if (action === 'update') {
      const targetId = data?.id || query?.id;
      if (!targetId) return { success: false, error: 'Missing ID for update' };
      const idx = db[table].findIndex((r) => String(r.id) === String(targetId));
      if (idx === -1) return { success: false, error: 'Record not found' };

      db[table][idx] = {
        ...db[table][idx],
        ...data,
        id: targetId,
        updated_at: new Date().toISOString(),
      };
      await saveLocalDatabase(db);
      return { success: true, data: db[table][idx] as unknown as T };
    }

    if (action === 'delete') {
      const id = data?.id || data;
      if (!id) return { success: false, error: 'Missing ID for delete' };
      const initialLength = db[table].length;
      db[table] = db[table].filter((r) => String(r.id) !== String(id));
      if (db[table].length === initialLength) {
        return { success: false, error: 'Record not found' };
      }
      await saveLocalDatabase(db);
      return { success: true, data: { id, deleted: true } as unknown as T };
    }

    return { success: false, error: `Invalid action: ${action}` };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
