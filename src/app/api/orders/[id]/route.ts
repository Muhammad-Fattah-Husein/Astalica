import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { executeDb } from '@/lib/db';
import type { Order } from '@/types';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const session = await getSession();

    const result = await executeDb<Order[]>('query', 'Orders', null, { id });
    const order = result.data?.[0];

    if (!order) {
      return NextResponse.json({ success: false, error: 'Pesanan tidak ditemukan.' }, { status: 404 });
    }

    // Check permission:
    // 1. Admin can view any order
    // 2. Logged-in user who owns the order can view
    // 3. User with direct link can view their invoice
    if (session && session.role !== 'admin') {
      if (order.user_id && order.user_id !== session.id && order.customer_email !== session.email) {
        return NextResponse.json({ success: false, error: 'Akses terbatas untuk pesanan ini.' }, { status: 403 });
      }
    }

    return NextResponse.json({ success: true, data: order });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const session = await getSession();

    // Only admin can update order status
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Hanya admin yang memiliki wewenang memperbarui status pesanan.' }, { status: 403 });
    }

    const body = await request.json();
    const { status, admin_notes } = body;

    if (status && !['menunggu_konfirmasi', 'dikonfirmasi', 'dibatalkan'].includes(status)) {
      return NextResponse.json({ success: false, error: 'Status pesanan tidak valid.' }, { status: 400 });
    }

    const updatePayload: Record<string, any> = {
      id,
      updated_at: new Date().toISOString(),
    };

    if (status) updatePayload.status = status;
    if (typeof admin_notes === 'string') updatePayload.admin_notes = admin_notes.trim();

    const result = await executeDb('update', 'Orders', updatePayload, { id });
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error || 'Gagal memperbarui status pesanan.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Status pesanan berhasil diperbarui.' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
