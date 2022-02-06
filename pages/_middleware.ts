


// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {

  const basicAuth = req.cookies['token'];
  const path = req.nextUrl.pathname;
  const pathName = path === '/cart' ? 'Cart' : 'Checkout';

  if ((path === '/cart' || path === '/checkout/store')) {
    if (basicAuth && basicAuth?.length) {
      return NextResponse.next().cookie('redirect_path', pathName);
    }

    return NextResponse.rewrite('/unauthorised');
  }

  return NextResponse.next();

}