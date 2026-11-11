import { NextResponse } from 'next/server';
import { executeDb } from '@/lib/db';

const ALLOWED_SERVICES = [
  'private-styling',
  'bespoke-bridal',
  'corporate-gifting',
  'care-restoration',
  'general',
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, whatsappNumber, emailAddress, serviceType, message } = body;

    const cleanName = String(fullName || '').trim();
    const cleanPhone = String(whatsappNumber || '').replace(/[^0-9+]/g, '');
    const cleanEmail = String(emailAddress || '').toLowerCase().trim();
    const cleanService = ALLOWED_SERVICES.includes(serviceType) ? serviceType : 'general';
    const cleanMessage = String(message || '').trim().slice(0, 1000);

    if (cleanName.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Nama lengkap wajib diisi minimal 2 karakter.' },
        { status: 400 }
      );
    }

    if (cleanPhone.length < 9) {
      return NextResponse.json(
        { success: false, error: 'Nomor WhatsApp aktif wajib diisi minimal 9 digit.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return NextResponse.json(
        { success: false, error: 'Format alamat email tidak valid.' },
        { status: 400 }
      );
    }

    const inquiryRecord = {
      id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      full_name: cleanName.slice(0, 120),
      whatsapp_number: cleanPhone.slice(0, 20),
      email_address: cleanEmail.slice(0, 120),
      service_type: cleanService,
      message: cleanMessage,
      status: 'new',
      created_at: new Date().toISOString(),
    };

    const result = await executeDb('insert', 'Inquiries', inquiryRecord);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Gagal menyimpan permintaan Anda.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: inquiryRecord });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}
