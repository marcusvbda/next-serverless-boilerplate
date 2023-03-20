import type { NextApiResponse } from 'next'
import { Route } from "@/pages/api/default-route";
import Mongo from "@/libs/mongodb";
import pollModel from '@/models/Poll';
import voteModel from '@/models/Vote';

const handler = async (req: any, res: NextApiResponse<any>) => {
  return Route("POST", req, res, async (req: any, res: NextApiResponse<any>) => {
    const errorMessage = () => res.status(401).json({ success: false, error: "Token not found" } as any);
    try {
      const { pollId, token } = req.query
      const json = JSON.parse(req.body);
      const votes = json.votes;
      await Mongo.connect();
      const foundPoll = await pollModel.findById(pollId).exec();

      if (!foundPoll) {
        return errorMessage();
      }

      let vote = await voteModel.findOne({
        guestToken: token,
        pollId: pollId
      }).exec();

      if (!vote) {
        vote = new voteModel({
          guestToken: token,
          pollId: pollId,
        });
      }

      vote.votes = votes;
      await vote.save();

      res.status(200).json({ success: true, votes } as any);
    } catch (error) {
      console.error(error);
      return errorMessage();
    }
  });
}

export default handler;