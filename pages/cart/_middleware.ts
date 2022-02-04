

// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  console.log('request intercepted --------------', req.cookies, req.nextUrl.pathname);
  // Only rewrite requests to `/`, as _middleware on the `/pages` root will be executed in every request of the app.
  if (req.nextUrl.pathname === '/cart') {
    // Parse the cookie
    const isAuthorised = req.cookies['token'] ? true : false;
    const redirectTo = isAuthorised ? '/cart/cart' : '/unauthorised';

    // Rewrite to the correct page
    return NextResponse.rewrite(redirectTo).cookie("redirect_path", "cart");
  }
}