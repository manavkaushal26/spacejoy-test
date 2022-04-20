// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const basicAuth = req.cookies['token'];
  const path = req.nextUrl.pathname;
  const pathName = 'Checkout';

  const userAgent = req?.ua;

  const isMobile = Boolean(userAgent?.ua?.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));

  if (path === '/checkout/store' || path === '/wishlist') {
    if (basicAuth && basicAuth?.length) {
      return NextResponse.next().cookie('isMobile', isMobile.toString());
    }

    return NextResponse.rewrite('/unauthorised').cookie('isMobile', isMobile.toString());
  }

  return NextResponse.next().cookie('isMobile', isMobile.toString());
}
