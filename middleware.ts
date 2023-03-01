import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import authMiddleware from "@/middlewares/auth";

export interface middlewareResponseInterface {
    success: boolean,
    redirect?: string,
    message?: string,
    statusCode?: number,
    user?: any
}

interface protectedRoutesInterface {
    [index: string]: any[]
}

const isApiRequest = (pathName: string): boolean => pathName.includes("/api")

const protectedRoutes: protectedRoutesInterface = {
    "/admin/*": [
        authMiddleware
    ],
    "/api/poll/*": [
        authMiddleware
    ],
}

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

const getMiddlewareList = (pathName: string, list: string[]) => {
    let middlewares = (protectedRoutes[pathName] ?? []) as any;
    for (let route of list) {
        if (protectedRoutes[route]) {
            middlewares = [...middlewares, ...protectedRoutes[route]]
        }
    }
    return middlewares;
}

export async function middleware(request: NextRequest) {
    const protectedRoutesIndexes = Object.keys(protectedRoutes) as any;
    const pathName: string = request.nextUrl.pathname ?? "";
    const possibleRouteMatchList = makePossibleRouteIndex(pathName);
    const middlewares = getMiddlewareList(pathName, possibleRouteMatchList);

    if ((!protectedRoutesIndexes.includes(pathName) && !possibleRouteMatchList.includes(pathName + "/*")) || !middlewares.length) {
        return NextResponse.next();
    }

    for (let midd of middlewares) {
        let middResponse: middlewareResponseInterface = await midd(request)
        if (!middResponse.success) {
            const redirectUrl = new URL(middResponse.redirect ?? "", request.url)
            redirectUrl.searchParams.set('continue', request.nextUrl.pathname)
            if (isApiRequest(request.nextUrl.pathname) && (middResponse.message && middResponse.statusCode)) {
                return new NextResponse(middResponse.message, { status: middResponse.statusCode })
            } else {
                return NextResponse.redirect(redirectUrl)
            }
        }

        return NextResponse.next();
    }
}