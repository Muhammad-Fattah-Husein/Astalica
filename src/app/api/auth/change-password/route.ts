import { NextResponse } from 'next/server';
import { getSession, hashPassword, verifyPassword } from '@/lib/auth';
import { executeDb } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'Kata sandi lama dan baru wajib diisi.' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Kata sandi baru minimal 6 karakter.' },
        { status: 400 }
      );
    }

    // Get current user data
    const userResult = await executeDb<any[]>('query', 'Users', null, { id: session.id });
    const user = userResult.data?.[0];

    if (!user) {
      return NextResponse.json({ success: false, error: 'Pengguna tidak ditemukan.' }, { status: 404 });
    }

    // Verify current password
    const isMatch = await verifyPassword(currentPassword, user.password_hash);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: 'Kata sandi saat ini tidak sesuai.' },
        { status: 400 }
      );
    }

    // Hash new password
    const newHash = await hashPassword(newPassword);
    await executeDb('update', 'Users', {
      id: session.id,
      password_hash: newHash,
    });

    return NextResponse.json({
      success: true,
      message: 'Kata sandi berhasil diperbarui.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}
