import { NextResponse } from 'next/server';
export const config = {
  matcher: ['/', '/dashboard/:path*', '/auth/:path*', '/([^/.]*)'],
};

export default function Middleware(req) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host');
  const host = hostname
    .replace(`.ducklabs.xyz`, '')
    .replace(`.localhost:3000`, '');
  const cookies =
    req.cookies.get('next-auth.session-token') ||
    req.cookies.get('__Secure-next-auth.session-token') ||
    req.cookies.get('_duckpass.session-token') ||
    req.cookies.get('_duckpass.session');

  if (url.pathname.startsWith('/auth') && cookies) {
    url.pathname = '/dashboard';
    return NextResponse.redirect(url, req.url);
  }
  if (url.pathname.startsWith('/dashboard') && !cookies) {
    url.pathname = '/auth';
    return NextResponse.redirect(url, req.url);
  }
}
