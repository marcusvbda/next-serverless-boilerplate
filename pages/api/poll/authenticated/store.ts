import type { NextApiResponse } from 'next'
import { Route } from "@/pages/api/default-route";
import Mongo from "@/libs/mongodb";
import PollModel from "@/models/Poll";
import { getUserByToken } from '@/pages/api/auth/check-token';
const md5 = require('md5');
import Email from "@/libs/email";

const handler = async (req: any, res: NextApiResponse<any>) => {
  return Route("POST", req, res, async (req: any, res: NextApiResponse<any>) => {
    const json = JSON.parse(req.body);
    const user = await getUserByToken(req.headers?.authentication ?? "");

    let voters: any = {};
    for (let i = 0; i < json.voters.length; i++) {
      const email = json.voters[i];
      voters[email] = md5(email);
    }
    console.log(voters)
    json.voters = voters;

    await Mongo.connect();
    const poll = new PollModel({ ...json, userId: user._id, status: "WA", createdAt: new Date() });
    const createdPoll = await poll.save();

    const host = process.env.HOST;

    Object.keys(createdPoll.voters).forEach(async (email: string) => {
      const token = createdPoll.voters[email];
      const link = `${host}/poll/${createdPoll._id.toString()}/voting?token=${token}`;
      Email.send("polls/invite", { to: email }, {
        link,
        title: createdPoll.title,
      });
    });

    res.status(200).json({ success: true, message: "Poll created successfully!", poll } as any);
  });
}

export default handler;