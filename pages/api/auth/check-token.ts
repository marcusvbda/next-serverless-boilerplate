import type { NextApiResponse } from 'next'
import { Route } from "@/pages/api/default-route";
const jwt = require('jsonwebtoken');
import Mongo from "@/libs/mongodb";
import UserModel from "@/models/User";

export const getUserByToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.PRIVATE_KEY);

    await Mongo.connect();
    const foundUser = await UserModel.findOne({
      _id: decoded,
      activatedAt: { $ne: null }
    }).exec();

    return foundUser;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const handler = async (req: any, res: NextApiResponse<any>) => {
  return Route("POST", req, res, async (req: any, res: NextApiResponse<any>) => {
    const json = JSON.parse(req.body);
    const foundUser = await getUserByToken(json.token);

    if (!foundUser) {
      return res.status(401).json({ success: false, error: "Invalid token" } as any);
    }

    return res.status(200).json({ success: true, user: foundUser } as any);
  });
}

export default handler;