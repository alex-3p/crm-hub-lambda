import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session');
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith('/login');
  const isProtectedPage = !isAuthPage && pathname !== '/';

  if (isAuthPage) {
    if (sessionCookie) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return null;
  }

  if (isProtectedPage) {
     if (!sessionCookie) {
        return NextResponse.redirect(new URL('/login', request.url));
     }
  }

  return NextResponse.next();
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
