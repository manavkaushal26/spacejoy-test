// eslint-disable-next-line @next/next/no-server-import-in-page
import { newSpacejoyStoreUrl } from '@utils/config';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const basicAuth = req.cookies['token'];
  const path = req.nextUrl.pathname;
  const pathName = 'Checkout';

  const userAgent = req?.ua;

  const isMobile = Boolean(userAgent?.ua?.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));

  if (path === '/checkout/store' || path === '/wishlist' || path === '/design-cart') {
    if (basicAuth && basicAuth?.length) {
      return NextResponse.next().cookie('isMobile', isMobile.toString());
    }

    return NextResponse.rewrite('/unauthorised').cookie('isMobile', isMobile.toString());
  }

  if (path.startsWith('/quiz')) {
    return NextResponse.redirect('https://designs.spacejoy.com/new-project?quiz=start&plan=bliss');
  }
  if (path.includes('/return-policies')) {
    return NextResponse.redirect(newSpacejoyStoreUrl + '/pages/return-policies');
  }
  if (path.includes('/room-select')) {
    return NextResponse.redirect('/', 307);
  }
  if (path.includes('/design-sets')) {
    return NextResponse.redirect('/', 307);
  }

  return NextResponse.next().cookie('isMobile', isMobile.toString());
}
