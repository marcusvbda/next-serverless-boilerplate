import { middlewareResponseInterface } from "@/middleware";
import type { NextRequest } from 'next/server'
import Http from "@/libs/http";

const handler = async (request: NextRequest): Promise<middlewareResponseInterface> => {
    const failed = () => ({ success: false, redirect: "/auth/sign-in", message: "Unauthorized !!", statusCode: 403 });
    try {
        const token = request.cookies.get("jwtToken")?.value ?? "";
        const response = await Http("POST", `/api/auth/check-token`, { token });

        if (response.success) {
            return { success: true };

        }
        return failed();
    } catch (error) {
        console.error(error);
        return failed();
    }
}

export default handler