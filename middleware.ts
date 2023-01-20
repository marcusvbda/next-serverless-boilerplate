import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import authMiddleware from "@/middlewares/auth";

export interface middlewareResponseInterface {
    success: boolean,
    redirect?: string,
    message?: string,
    statusCode?: number,
}

interface protectedRoutesInterface {
    [index: string]: any[]
}

const isApiRequest = (pathName: string): boolean => pathName.includes("/api")

const protectedRoutes: protectedRoutesInterface = {
    "/admin": [
        authMiddleware
    ],
}

export function middleware(request: NextRequest) {
    const protectedRoutesIndexes = Object.keys(protectedRoutes) as any;
    const pathName: string = request.nextUrl.pathname ?? "";

    if (!protectedRoutesIndexes.includes(pathName)) {
        return NextResponse.next();
    }

    const middlewares = (protectedRoutes[pathName] ?? []) as any;

    for (let midd of middlewares) {
        let middResponse: middlewareResponseInterface = midd(request)
        if (!middResponse.success) {
            const redirectUrl = new URL(middResponse.redirect ?? "", request.url)
            redirectUrl.searchParams.set('from', request.nextUrl.pathname)
            if (isApiRequest(request.nextUrl.pathname) && (middResponse.message && middResponse.statusCode)) {
                return new NextResponse(middResponse.message, { status: middResponse.statusCode })
            } else {
                return NextResponse.redirect(redirectUrl)
            }
        }

        return NextResponse.next();
    }
}