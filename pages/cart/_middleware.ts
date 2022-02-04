

// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {

  const basicAuth = req.cookies['token'];

  console.log('req', req.cookies);

  if (basicAuth) {
    return NextResponse.next();
  }

  // return new Response('Auth required', {
  //   status: 401,
  //   headers: {
  //     'WWW-Authenticate': 'Basic realm="Secure Area"',
  //   },
  // })
  return NextResponse.rewrite('/unauthorised');
}