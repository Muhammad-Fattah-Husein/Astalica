import { NextResponse } from 'next/server';
import { executeDb } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cleanEmail = String(body.email || '').toLowerCase().trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return NextResponse.json(
        { success: false, error: 'Masukkan alamat email yang valid.' },
        { status: 400 }
      );
    }

    const existing = await executeDb<any[]>('query', 'Subscribers', null, { email: cleanEmail });
    if (existing.success && existing.data && existing.data.length > 0) {
      return NextResponse.json({
        success: true,
        alreadySubscribed: true,
        message: 'Alamat email Anda sudah terdaftar di Atelier Privilege Club.',
      });
    }

    const subscriber = {
      id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      email: cleanEmail.slice(0, 120),
      created_at: new Date().toISOString(),
    };

    const result = await executeDb('insert', 'Subscribers', subscriber);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Gagal mendaftarkan email Anda.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Terima kasih! Anda telah terdaftar di Atelier Privilege Club.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}
