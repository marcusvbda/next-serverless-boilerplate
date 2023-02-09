import type { NextApiResponse } from 'next'
import { Route } from "@/pages/api/default-route";
import Email from "@/libs/email";
import Mongo from "@/libs/mongodb";
import UserModel from "@/models/User";

const handler = async (req: any, res: NextApiResponse<any>) => {
  return Route("POST", req, res, async (req: any, res: NextApiResponse<any>) => {
    const json = JSON.parse(req.body);

    await Mongo.connect();

    const foundUser = await UserModel.findOne({ email: json.email }).exec();
    if (!foundUser) {
      return res.status(401).json({ success: false, error: "User does not exist" } as any)
    }

    foundUser.recovery = {
      token: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      expires: new Date().getTime() + 1000 * 60 * 60 * 24
    };

    foundUser.save();

    const host = process.env.HOST;
    const link = `${host}/auth/new-password/${foundUser?.recovery?.token ?? ""}`;
    Email.send("auth/reset-password", { to: foundUser.email }, {
      name: foundUser.firstname,
      link
    }).then(console.log).catch(console.error);

    return res.status(200).json({
      success: true, message: "Password reset email has been sent"
    } as any);
  });
}

export default handler;