import type { NextRequest } from 'next/server'
const redirectTo = "/auth/sign-in";

const failed = () => ({ success: false, redirectTo, message: "Unauthorized !!", statusCode: 403 });

const handler = async (request: NextRequest): Promise<any> => {
    try {
        // validation logic
        const success = false;

        if (success) {
            return { success: true };
        }
        return failed();
    } catch (error) {
        console.error(error);
        return failed();
    }
}

export default handler