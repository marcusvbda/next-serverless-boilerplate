import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import authMiddleware from "@/middlewares/auth";

export const DefaultMiddleware = (request: NextRequest, publicRoutes: any) => {
  const isApiRequest = (path: string): boolean => path.includes("/api")

  const internalRoutesToSkip = [
    "/_next", "/_vercel", "/_static", "/_error", "/_middleware", "/favicon.ico"
  ];

  const isInternalRoute = (path: string) => internalRoutesToSkip.some((route) => path.startsWith(route));

  const makePossibleRouteIndex = (pathName: string) => {
    const pathNameArray = pathName.split("/").filter(x => x)
    const possibleList: string[] = [];
    const possibleRouteList: string[] = [];
    for (let i in pathNameArray) {
      let value = pathNameArray[i];
      let route = (`/${possibleList.join("/")}/${value}/*`).replace("//", "/")
      possibleList.push(value);
      possibleRouteList.push(route);
    }
    possibleRouteList.push(pathName);
    return possibleRouteList
  }

  async function middleware(request: NextRequest) {
    const pathname: string = request.nextUrl.pathname ?? "";
    if (isInternalRoute(pathname)) return NextResponse.next();

    const possibleRouteMatchList = makePossibleRouteIndex(pathname);
    const isPublic = possibleRouteMatchList.some((route) => publicRoutes.includes(route));

    if (isPublic) return NextResponse.next();

    let middResponse: any = await authMiddleware(request)

    if (!middResponse.success) {
      const redirectUrl = new URL(middResponse.redirectTo ?? "", request.url)
      redirectUrl.searchParams.set('continue', request.nextUrl.pathname)
      if (isApiRequest(pathname)) {
        return new NextResponse(middResponse?.message || "Error", { status: middResponse?.statusCode || 500 })
      }
      return NextResponse.redirect(redirectUrl)
    }

    return NextResponse.next();
  }

  return middleware(request)
}