import { middlewareResponseInterface } from "@/middleware";
import type { NextRequest } from 'next/server'

const handler = (request: NextRequest): middlewareResponseInterface => {
    // console.log("validate", "token", request)
    // return { success: true };
    return { success: false, redirect: "/auth/sign-in", message: "unauthorized", statusCode: 403 };
}

export default handler