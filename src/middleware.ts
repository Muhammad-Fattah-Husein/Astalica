import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose/jwt/verify';

const JWT_SECRET_STRING = process.env.AUTH_SECRET || 'astalica-atelier-luxury-secret-key-2026';
const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_STRING);
const COOKIE_NAME = 'astalica_session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /dashboard routes
  if (pathname.startsWith('/dashboard')) {
    const sessionCookie = request.cookies.get(COOKIE_NAME);

    if (!sessionCookie?.value) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const { payload } = await jwtVerify(sessionCookie.value, JWT_SECRET);
      const role = payload.role as string;

      // Strict role check: Only admin can access the dashboard
      if (role !== 'admin') {
        const homeUrl = new URL('/', request.url);
        homeUrl.searchParams.set('error', 'unauthorized');
        return NextResponse.redirect(homeUrl);
      }
    } catch {
      // Invalid or expired token
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
