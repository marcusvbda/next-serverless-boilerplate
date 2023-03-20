import type { NextApiResponse } from 'next'
import { Route } from "@/pages/api/default-route";
import Mongo from "@/libs/mongodb";
import PollModel from "@/models/Poll";

const handler = async (req: any, res: NextApiResponse<any>) => {
  return Route("GET", req, res, async (req: any, res: NextApiResponse<any>) => {
    const { pollId } = req.query;
    await Mongo.connect();
    const poll = await PollModel.findById(pollId).exec();
    return res.status(200).json({ success: true, poll } as any);
  });
}

export default handler;