import { NextResponse } from 'next/server';
import { executeDb } from '@/lib/db';
import { hashPassword, createSessionToken, setSessionCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Semua kolom wajib diisi.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Kata sandi minimal harus 6 karakter.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if email already registered
    const existing = await executeDb<any[]>('query', 'Users', null, { email: cleanEmail });
    if (existing.data && existing.data.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Alamat email ini sudah terdaftar. Silakan masuk.' },
        { status: 409 }
      );
    }

    // Hash password with bcrypt before sending to storage
    const passwordHash = await hashPassword(password);

    // Register always creates account with role 'user'
    const newUser = {
      name: name.trim(),
      email: cleanEmail,
      password_hash: passwordHash,
      role_id: 'user',
      status: 'active',
    };

    const insertResult = await executeDb<any>('insert', 'Users', newUser);
    if (!insertResult.success || !insertResult.data) {
      return NextResponse.json(
        { success: false, error: insertResult.error || 'Gagal mendaftarkan akun.' },
        { status: 500 }
      );
    }

    const createdUser = insertResult.data;

    // Create and set session cookie
    const token = await createSessionToken({
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.role_id,
    });

    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      user: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role_id,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}
