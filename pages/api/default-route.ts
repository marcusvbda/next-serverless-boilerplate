import type { NextApiResponse } from 'next'

export const Route = async (method: string, req: any, res: any, callback: any) => {
    const upperethod = method.toUpperCase();

    if (![upperethod].includes(req.method)) {
        return res.status(405).send({ message: `Only ${upperethod} requests allowed` });
    }

    return await callback(req, res);
}

const handler = async (req: any, res: NextApiResponse) => {
    Route("GET", req, res, (req: any, res: NextApiResponse) => {
        res.status(404).send("not found");
    });
}

export default handler;