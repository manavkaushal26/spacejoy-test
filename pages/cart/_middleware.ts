


import Cookie from 'js-cookie';
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server';



export function middleware(req: NextRequest) {

  const basicAuth = req.cookies['token'] || Cookie.get('token');

  if (basicAuth) {
    return NextResponse.next().cookie('basic-auth', basicAuth);
  }

  // return NextResponse.redirect('/unauthorised');
  return new Response('Auth required')
}