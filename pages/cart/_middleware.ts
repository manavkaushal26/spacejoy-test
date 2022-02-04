

// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {

  const basicAuth = req.cookies['token'];

  if (basicAuth) {
    return NextResponse.next().cookie('basic-auth', basicAuth);
  }

  return NextResponse.redirect('/unauthorised');
  // return new Response('Auth required', {
  //   status: 401,
  //   headers: {
  //     'WWW-Authenticate': 'Basic realm="Secure Area"',
  //   },
  // })
}