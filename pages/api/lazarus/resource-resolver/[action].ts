import type { NextApiResponse } from 'next'
import { resource } from "@/packages/lazarus"
import { POST } from '@/middlewares/ApiRoute';

const handler = POST(async (req: any, res: NextApiResponse<any>) => {
  const result = await resource.resolve(req.query.action, req.body);
  return res.status(200).json({ result } as any);
});

export default handler;