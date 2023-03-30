import type { NextApiResponse } from 'next'
import { Route } from "@/pages/api/default-route";

const handler = async (req: any, res: NextApiResponse<any>) => {
  return Route("GET", req, res, async (req: any, res: NextApiResponse<any>) => {
    return res.status(200).json({ success: true, content: "lorem ipsum from api client side" } as any);
  });
}

export default handler;
