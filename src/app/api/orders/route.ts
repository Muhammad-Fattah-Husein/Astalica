import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { executeDb } from '@/lib/db';
import { siteConfig } from '@/config/site';
import type { Order } from '@/types';

// Helper to generate a unique luxurious ticket number: AST-YYYYMMDD-XXXX
function generateTicketNumber(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const random = Math.floor(1000 + Math.random() * 9000);
  return `AST-${year}${month}${day}-${random}`;
}

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Silakan masuk untuk melihat daftar pesanan.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get('status');

    let orders: Order[] = [];
    const result = await executeDb<Order[]>('query', 'Orders');
    if (result.success && Array.isArray(result.data)) {
      orders = result.data;
    }

    // Role-based filtering
    if (session.role === 'admin') {
      // Admin can filter by status
      if (statusFilter && statusFilter !== 'all') {
        orders = orders.filter((o) => o.status === statusFilter);
      }
    } else {
      // Regular user can only see their own orders (match by user_id or email)
      orders = orders.filter(
        (o) => (o.user_id && o.user_id === session.id) || (o.customer_email && o.customer_email.toLowerCase() === session.email.toLowerCase())
      );
    }

    // Sort newest first
    orders.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return NextResponse.json({ success: true, data: orders });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    const body = await request.json();

    const {
      product_id,
      service_product_name,
      quantity = 1,
      customer_name,
      customer_email,
      customer_phone,
      customer_address,
      notes = '',
    } = body;

    // Validation
    if (!customer_name || customer_name.trim().length < 2) {
      return NextResponse.json({ success: false, error: 'Nama pemesan wajib diisi minimal 2 karakter.' }, { status: 400 });
    }

    const phoneClean = (customer_phone || '').replace(/[^0-9+]/g, '');
    if (!phoneClean || phoneClean.length < 9) {
      return NextResponse.json({ success: false, error: 'Nomor WhatsApp aktif wajib diisi minimal 9 digit angka.' }, { status: 400 });
    }

    if (!customer_address || customer_address.trim().length < 5) {
      return NextResponse.json({ success: false, error: 'Alamat pengiriman / catatan lokasi wajib diisi lengkap.' }, { status: 400 });
    }

    const parsedQty = Math.max(1, parseInt(quantity, 10) || 1);

    // Calculate total price based on catalog or default
    let unitPrice = 385000;
    let finalItemName = service_product_name || 'Koleksi Hijab Astalica';

    if (product_id) {
      const foundCatalog = siteConfig.catalog.find((c) => c.id === product_id);
      if (foundCatalog) {
        unitPrice = foundCatalog.price;
        finalItemName = foundCatalog.name;
      }
    }

    const totalPrice = unitPrice * parsedQty;
    const ticketNumber = generateTicketNumber();
    const nowIso = new Date().toISOString();

    const newOrder: Order = {
      id: `ord-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      ticket_number: ticketNumber,
      user_id: session?.id || '',
      customer_name: customer_name.trim(),
      customer_email: customer_email ? customer_email.trim() : (session?.email || ''),
      customer_phone: phoneClean,
      customer_address: customer_address.trim(),
      service_product_name: finalItemName,
      product_id: product_id || '',
      quantity: parsedQty,
      total_price: totalPrice,
      status: 'menunggu_konfirmasi',
      notes: notes.trim(),
      admin_notes: '',
      created_at: nowIso,
      updated_at: nowIso,
    };

    const result = await executeDb('insert', 'Orders', newOrder);
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error || 'Gagal menyimpan pesanan ke database.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: newOrder });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
