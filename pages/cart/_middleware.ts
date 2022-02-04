

// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Parse the cookie
  const isAuthorised = req.cookies['token'] ? true : false;
  const redirectTo = isAuthorised ? '/cart/cart' : '/unauthorised';

  // Rewrite to the correct page
  if (isAuthorised) {
    return NextResponse.rewrite(redirectTo).cookie("token", req.cookies['token']);
  }

  return NextResponse.rewrite(redirectTo);



}