


// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {

  const basicAuth = req.cookies['token'];

  if (basicAuth?.length) {
    return NextResponse.next();
  }

  return NextResponse.redirect('/unauthorised');

}