import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';
import { executeDb } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const showAll = searchParams.get('all') === 'true';

    const session = await getSession();
    const isAdmin = session?.role === 'admin';

    const query: Record<string, any> = {};
    if (!showAll || !isAdmin) {
      query.status = 'published';
    }

    const result = await executeDb<any[]>('query', 'News', null, query);
    // Sort newest first
    const articles = (result.data || []).sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return NextResponse.json({ success: true, data: articles });
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
    const { title, excerpt, content, thumbnail_path, status, category } = body;

    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { success: false, error: 'Judul, ringkasan, dan konten wajib diisi.' },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const newArticle = {
      title: title.trim(),
      slug: `${slug}-${Date.now().toString().slice(-4)}`,
      excerpt: excerpt.trim(),
      content: content.trim(),
      category: category?.trim() || 'Warta & Tren',
      thumbnail_path: thumbnail_path || '/images/news-1.webp',
      status: status || 'draft',
      author_id: session.id,
    };

    const result = await executeDb('insert', 'News', newArticle);

    // Revalidate caches so landing page updates instantly
    revalidatePath('/');
    revalidatePath('/dashboard/news');

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
    if (!body.id) {
      return NextResponse.json({ success: false, error: 'ID berita wajib disertakan.' }, { status: 400 });
    }

    const result = await executeDb('update', 'News', body);

    // Revalidate caches so landing page updates instantly
    revalidatePath('/');
    revalidatePath('/dashboard/news');

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
      return NextResponse.json({ success: false, error: 'ID berita wajib disertakan.' }, { status: 400 });
    }

    const result = await executeDb('delete', 'News', { id });

    // Revalidate caches so landing page updates instantly
    revalidatePath('/');
    revalidatePath('/dashboard/news');

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
