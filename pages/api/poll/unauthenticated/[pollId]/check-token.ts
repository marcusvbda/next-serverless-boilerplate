import type { NextApiResponse } from 'next'
import { Route } from "@/pages/api/default-route";
import Mongo from "@/libs/mongodb";
import pollModel from '@/models/Poll';
import userModel from '@/models/User';

const handler = async (req: any, res: NextApiResponse<any>) => {
  return Route("GET", req, res, async (req: any, res: NextApiResponse<any>) => {
    const errorMessage = () => res.status(401).json({ success: false, error: "Token not found" } as any);
    try {
      const { pollId, token } = req.query
      await Mongo.connect();
      const foundPoll = await pollModel.findById(pollId).exec();
      const foundAuthor = await userModel.findById(foundPoll.userId).exec();

      if (!foundPoll) {
        return errorMessage();
      }

      const email = Object.keys(foundPoll.voters).find((voter: any) => foundPoll.voters[voter] === token) ?? null;

      if (!email) {
        return errorMessage();
      }

      res.status(200).json({ success: true, foundPoll, foundAuthor, email } as any);
    } catch (error) {
      console.error(error);
      return errorMessage();
    }
  });
}

export default handler;