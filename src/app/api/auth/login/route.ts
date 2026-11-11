import { NextResponse } from 'next/server';
import { executeDb } from '@/lib/db';
import { verifyPassword, createSessionToken, setSessionCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email dan kata sandi wajib diisi.' },
        { status: 400 }
      );
    }

    // Query user by email
    const result = await executeDb<any[]>('query', 'Users', null, { email: email.toLowerCase().trim() });
    const user = result.data?.[0];

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Email atau kata sandi tidak sesuai.' },
        { status: 401 }
      );
    }

    if (user.status !== 'active') {
      return NextResponse.json(
        { success: false, error: 'Akun Anda sedang dinonaktifkan. Hubungi admin.' },
        { status: 403 }
      );
    }

    // Verify bcrypt hash
    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Email atau kata sandi tidak sesuai.' },
        { status: 401 }
      );
    }

    // Create session token
    const token = await createSessionToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role_id,
    });

    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role_id,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}
