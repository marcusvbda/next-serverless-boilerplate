import { checkAuth, getLoginUrl, getUserInfo, logout } from '@/libs/keycloak'
import { NextRequest, NextResponse } from 'next/server'
import { isPublicRoute } from './routeMatcher';

const internalRoutesToSkip = [
  "/_next", "/_vercel", "/_static", "/_error", "/_middleware", "/favicon.ico"
];

export const keycloakMiddleware = async (req: NextRequest, publicRoutes: string[]): Promise<any> => {
  const pathname = req?.nextUrl?.pathname || ''

  if (internalRoutesToSkip.some(x => pathname.startsWith(x))) return NextResponse.next();
  if (isPublicRoute(pathname,publicRoutes)) return NextResponse.next();
  const requestHeaders = new Headers(req.headers)

  requestHeaders.set('x-user-info', 'teste')
  let response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  const authCheckedResult = await checkAuth(req)
  if (!authCheckedResult.success) {
    logout(req)
    return NextResponse.redirect(getLoginUrl(req))
  }

  const userInfoCheckResult = await getUserInfo(req, response)

  if (!userInfoCheckResult?.sub) {
    logout(req)
    return NextResponse.redirect(getLoginUrl(req))
  }

  requestHeaders.set('x-user-info', JSON.stringify(userInfoCheckResult))
  response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  return response
}