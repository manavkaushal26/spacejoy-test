


// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {

  const basicAuth = req.cookies['token'];
  const path = req.nextUrl.pathname;

  if ((path === '/cart' || path === '/checkout/store')) {
    if (basicAuth && basicAuth?.length) {
      return NextResponse.next();
    }

    return NextResponse.rewrite('/unauthorised');
  }

  return NextResponse.next();

}