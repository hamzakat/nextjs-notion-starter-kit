import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /examples (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api/|_next/|_static/|examples/|[\\w-]+\\.\\w+).*)'
  ]
}

export default async function middleware(req: NextRequest) {
  /*


    for "/' requests:
    1. take the notion root page id out of the req headers
    2. create siteConfig object
    3. rewrite index + pass the siteConfig to it
  */
  const url = req.nextUrl
  const path = url.pathname

  const domain = req.headers.get('domain')
  const rootNotionPageId = req.headers.get('root-notion-page-id')

  if (domain && rootNotionPageId) {
    console.log('headers included', req.headers)
    return NextResponse.rewrite(new URL(path, url), {
      headers: req.headers
    })
  } else {
    console.log('no headers included', req.headers)

    return NextResponse.rewrite(new URL('/404', url))
  }
}
