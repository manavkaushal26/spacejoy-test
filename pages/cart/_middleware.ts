

// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Only rewrite requests to `/`, as _middleware on the `/pages` root will be executed in every request of the app.
  if (req.nextUrl.pathname === '/cart') {
    // Parse the cookie
    const isAuthorised = req.cookies['token'] ? false : false
    const redirectTo = isAuthorised ? '/cart/cart' : '/unauthorised';

    // Rewrite to the correct page
    return NextResponse.rewrite(redirectTo).cookie("redirect_path", "cart");
  }
}