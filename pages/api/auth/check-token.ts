import type { NextApiResponse } from 'next'
import { Route } from "@/pages/api/default-route";
const jwt = require('jsonwebtoken');
import Mongo from "@/libs/mongodb";
import UserModel from "@/models/User";

const handler = async (req: any, res: NextApiResponse<any>) => {
  return Route("POST", req, res, async (req: any, res: NextApiResponse<any>) => {
    try {
      const json = JSON.parse(req.body);

      const decoded = jwt.verify(json.token, process.env.PRIVATE_KEY);

      await Mongo.connect();
      const foundUser = await UserModel.findOne({
        _id: decoded,
        activatedAt: { $ne: null }
      }).exec();

      if (!foundUser) {
        return res.status(401).json({ success: false, error: "Invalid token" } as any);
      }

      return res.status(200).json({ success: true } as any);
    } catch (error) {
      console.error(error);
      return res.status(401).json({ success: false, error: "Invalid token" } as any);
    }
  });
}

export default handler;