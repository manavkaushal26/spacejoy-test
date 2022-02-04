


// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server';



export function middleware(req: NextRequest) {

  const basicAuth = req.cookies['token'];
  let start = Date.now()

  if (basicAuth) {
    return NextResponse.next();
  }

  // return NextResponse.redirect('/unauthorised');
  // return new Response('Auth required')
  return NextResponse.redirect(
    `/unauthorised?l=${Date.now() - start}`
  )
}