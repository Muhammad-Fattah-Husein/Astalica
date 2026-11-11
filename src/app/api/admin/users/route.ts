import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { executeDb } from '@/lib/db';

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Akses ditolak.' }, { status: 403 });
    }

    const result = await executeDb<any[]>('query', 'Users');
    // Hide password hashes from payload
    const sanitized = (result.data || []).map((u) => {
      const { password_hash, ...rest } = u;
      return rest;
    });

    return NextResponse.json({ success: true, data: sanitized });
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
    const { id, role_id, status } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID user wajib diisi.' }, { status: 400 });
    }

    // Protection rule: Admin cannot deactivate or change role of oneself
    if (id === session.id) {
      if (status && status !== 'active') {
        return NextResponse.json(
          { success: false, error: 'Anda tidak dapat menonaktifkan akun admin Anda sendiri.' },
          { status: 400 }
        );
      }
      if (role_id && role_id !== 'admin') {
        return NextResponse.json(
          { success: false, error: 'Anda tidak dapat mencabut hak akses admin Anda sendiri.' },
          { status: 400 }
        );
      }
    }

    // Protection rule: Ensure there is always at least one active admin
    if (status === 'inactive' || (role_id && role_id !== 'admin')) {
      const allUsers = await executeDb<any[]>('query', 'Users');
      const activeAdmins = (allUsers.data || []).filter(
        (u) => u.role_id === 'admin' && u.status === 'active' && u.id !== id
      );
      if (activeAdmins.length === 0) {
        return NextResponse.json(
          { success: false, error: 'Sistem harus memiliki minimal satu admin aktif yang tersisa.' },
          { status: 400 }
        );
      }
    }

    const updatePayload: Record<string, any> = { id };
    if (role_id !== undefined) updatePayload.role_id = role_id;
    if (status !== undefined) updatePayload.status = status;

    const result = await executeDb('update', 'Users', updatePayload);
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
      return NextResponse.json({ success: false, error: 'ID user wajib diisi.' }, { status: 400 });
    }

    // Protection rule: Admin cannot delete themselves
    if (id === session.id) {
      return NextResponse.json(
        { success: false, error: 'Anda tidak dapat menghapus akun Anda sendiri saat sedang masuk.' },
        { status: 400 }
      );
    }

    // Protection rule: Ensure we don't delete the last admin
    const targetUser = await executeDb<any[]>('query', 'Users', null, { id });
    if (targetUser.data?.[0]?.role_id === 'admin') {
      const allUsers = await executeDb<any[]>('query', 'Users');
      const otherAdmins = (allUsers.data || []).filter(
        (u) => u.role_id === 'admin' && u.id !== id
      );
      if (otherAdmins.length === 0) {
        return NextResponse.json(
          { success: false, error: 'Tidak dapat menghapus admin terakhir pada sistem.' },
          { status: 400 }
        );
      }
    }

    const result = await executeDb('delete', 'Users', { id });
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
