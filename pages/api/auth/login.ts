import type { NextApiResponse } from 'next'
import { Route } from "@/pages/api/default-route";
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
import Mongo from "@/libs/mongodb";
import UserModel from "@/models/User";

const handler = async (req: any, res: NextApiResponse<any>) => {
  return Route("POST", req, res, async (req: any, res: NextApiResponse<any>) => {
    const unauthorize = () => res.status(401).json({ success: false, error: "Incorrect username or password" } as any)

    try {
      const json = JSON.parse(req.body);

      await Mongo.connect();
      const foundUser = await UserModel.findOne({
        email: json.email,
        activatedAt: { $ne: null }
      }).exec();

      if (!foundUser) {
        return unauthorize();
      }

      const passMatch = await bcrypt.compare(json.password, foundUser.password);
      if (!passMatch) {
        return unauthorize();
      }

      const token = await jwt.sign(foundUser._id.toString(), process.env.PRIVATE_KEY);
      return res.status(200).json({ success: true, token, user: foundUser } as any);
    } catch (err) {
      console.log(err);
      return unauthorize();
    }
  });
}

export default handler;
