

// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Parse the cookie
  const isAuthorised = req.cookies['token'] ? true : false;
  const redirectTo = isAuthorised ? '/cart/cart' : '/unauthorised';

  // Rewrite to the correct page
  return NextResponse.rewrite(redirectTo).cookie("token", isAuthorised ? req.cookies['token'] : null);


}