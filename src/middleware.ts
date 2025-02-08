import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  console.log(`🟢 Middleware triggered: ${req.method} ${req.nextUrl.pathname}`);

  // `/v1/` 경로에만 적용
  if (req.nextUrl.pathname.startsWith('/v1/')) {
    console.log(`🔄 Rewriting to API Proxy: ${req.nextUrl.pathname}`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
