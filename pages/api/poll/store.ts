import type { NextApiResponse } from 'next'
import { Route } from "@/pages/api/default-route";
import Mongo from "@/libs/mongodb";
import PollModel from "@/models/Poll";
import { getUserByToken } from '@/pages/api/auth/check-token';

const handler = async (req: any, res: NextApiResponse<any>) => {
  return Route("POST", req, res, async (req: any, res: NextApiResponse<any>) => {
    const json = JSON.parse(req.body);
    const user = await getUserByToken(req.headers?.authentication ?? "");

    await Mongo.connect();
    const poll = new PollModel({ ...json, userId: user._id, status: "WA", createdAt: new Date() });
    await poll.save();
    res.status(200).json({ success: true, message: "Poll created successfully!", poll } as any);
  });
}

export default handler;