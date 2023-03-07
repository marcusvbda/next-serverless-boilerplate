import type { NextApiResponse } from 'next'
import { Route } from "@/pages/api/default-route";
import Mongo from "@/libs/mongodb";
import PollModel from "@/models/Poll";
const md5 = require('md5');
import Email from "@/libs/email";

const handler = async (req: any, res: NextApiResponse<any>) => {
  return Route("PUT", req, res, async (req: any, res: NextApiResponse<any>) => {
    const { id } = req.query;
    const json = JSON.parse(req.body);
    await Mongo.connect();
    const poll = await PollModel.findById(id).exec();

    let voters: any = {};
    for (let i = 0; i < json.voters.length; i++) {
      const email = json.voters[i];
      voters[email] = md5(email);
    }

    json.voters = voters;

    poll.title = json.title;
    poll.description = json.description;
    poll.options = json.options || [];
    poll.voters = voters;

    await poll.save();

    const host = process.env.HOST;
    Object.keys(poll.voters).forEach(async (email: string) => {
      const token = poll.voters[email];
      const link = `${host}/poll/${poll._id.toString()}/voting?token=${token}`;
      Email.send("polls/invite", { to: email }, {
        link,
        title: poll.title,
      });
    });

    res.status(200).json({ success: true, message: "Poll updated successfully!", poll } as any);
  });
}

export default handler;