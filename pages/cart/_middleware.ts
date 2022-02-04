

// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Parse the cookie
  // const isAuthorised = req.cookies['token'] ? true : false;
  // const redirectTo = isAuthorised ? '/cart/cart' : '/unauthorised';

  // Rewrite to the correct page
  return NextResponse.next().cookie("redirect_path", JSON.stringify(req.cookies) + 'cookie' + req.nextUrl.pathname);


}