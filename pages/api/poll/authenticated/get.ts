import type { NextApiResponse } from 'next'
import { Route } from "@/pages/api/default-route";
import Mongo from "@/libs/mongodb";
import PollModel from "@/models/Poll";
import { getUserByToken } from '@/pages/api/auth/check-token';

const handler = async (req: any, res: NextApiResponse<any>) => {
  return Route("GET", req, res, async (req: any, res: NextApiResponse<any>) => {
    const json = req.query;
    const page = Number(json.page ?? 1);
    const perPage = Number(json.per_page ?? 1);
    const orderBy = json.orderBy || 'desc';
    const status = json.status || 'WA';
    const search = json.search || '';
    const user = await getUserByToken(req.headers?.authentication ?? "");

    await Mongo.connect();
    const filter: any = { userId: user._id };
    let messages = [];

    const { action } = json;

    if (!["undefined", null, undefined].includes(action)) {
      const actionData = action.split(",");
      if (actionData[0] === "delete") {
        await PollModel.deleteOne({ _id: actionData[1] });
        messages.push({ type: "success", content: "Poll deleted successfully" });
      }
    }


    if (status && status !== "ALL") {
      filter.status = status;
    }

    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    const query = PollModel.find(filter).sort({ createdAt: orderBy });

    const total = await PollModel.find(filter).count();

    const foundPolls = await query.skip((page - 1) * perPage).limit(perPage).exec();
    const lastPage = Math.ceil(total / perPage);

    res.status(200).json({ total, page, perPage, lastPage, data: foundPolls, messages } as any);
  });
}

export default handler;