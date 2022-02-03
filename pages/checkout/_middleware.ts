

// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Only rewrite requests to `/`, as _middleware on the `/pages` root will be executed in every request of the app.
  if (req.nextUrl.pathname === '/checkout/store') {
    // Parse the cookie
    const isAuthorised = req.cookies['token'] ? true : false;
    const redirectTo = isAuthorised ? '/checkout/[type]' : '/unauthorised?redirect=cart';

    // Rewrite to the correct page
    return NextResponse.rewrite(redirectTo);
  }
}