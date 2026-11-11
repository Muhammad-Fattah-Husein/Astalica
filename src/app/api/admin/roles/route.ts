import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { executeDb } from '@/lib/db';

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Akses ditolak.' }, { status: 403 });
    }

    const result = await executeDb<any[]>('query', 'Roles');
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Akses ditolak.' }, { status: 403 });
    }

    const body = await request.json();
    const { name, description, permissions } = body;

    if (!name) {
      return NextResponse.json({ success: false, error: 'Nama role wajib diisi.' }, { status: 400 });
    }

    const cleanName = name.toLowerCase().trim().replace(/\s+/g, '-');

    // Check if role name already exists
    const existing = await executeDb<any[]>('query', 'Roles', null, { name: cleanName });
    if (existing.data && existing.data.length > 0) {
      return NextResponse.json({ success: false, error: 'Nama role sudah digunakan.' }, { status: 409 });
    }

    const newRole = {
      name: cleanName,
      description: description?.trim() || '',
      permissions: typeof permissions === 'string' ? permissions : JSON.stringify(permissions || {}),
      is_system: 'false',
    };

    const result = await executeDb('insert', 'Roles', newRole);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Akses ditolak.' }, { status: 403 });
    }

    const body = await request.json();
    const { id, description, permissions } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID role wajib diisi.' }, { status: 400 });
    }

    const roleResult = await executeDb<any[]>('query', 'Roles', null, { id });
    const role = roleResult.data?.[0];

    if (!role) {
      return NextResponse.json({ success: false, error: 'Role tidak ditemukan.' }, { status: 404 });
    }

    const updatePayload: Record<string, any> = { id };
    if (description !== undefined) updatePayload.description = description;
    if (permissions !== undefined) {
      updatePayload.permissions = typeof permissions === 'string' ? permissions : JSON.stringify(permissions);
    }

    const result = await executeDb('update', 'Roles', updatePayload);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Akses ditolak.' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID role wajib diisi.' }, { status: 400 });
    }

    // Role system protection
    const roleResult = await executeDb<any[]>('query', 'Roles', null, { id });
    const role = roleResult.data?.[0];

    if (!role) {
      return NextResponse.json({ success: false, error: 'Role tidak ditemukan.' }, { status: 404 });
    }

    if (String(role.is_system) === 'true') {
      return NextResponse.json(
        { success: false, error: 'Role bawaan sistem tidak boleh dihapus demi integritas otorisasi.' },
        { status: 400 }
      );
    }

    const result = await executeDb('delete', 'Roles', { id });
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
