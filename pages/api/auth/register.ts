import type { NextApiResponse } from 'next'
import { Route } from "@/pages/api/default-route";
const bcrypt = require("bcrypt");
import Mongo from "@/libs/mongodb";
import UserModel from "@/models/User";
import Email from "@/libs/email";

const handler = async (req: any, res: NextApiResponse<any>) => {
  return Route("POST", req, res, async (req: any, res: NextApiResponse<any>) => {
    const json = JSON.parse(req.body);

    await Mongo.connect();
    const foundUser = await UserModel.findOne({
      email: json.email,
      activatedAt: { $ne: null }
    }).exec();
    if (foundUser) {
      return res.status(400).json({ success: false, error: "User already exist" } as any);
    }

    const password = bcrypt.hashSync(json.password, 10);
    delete json.confirmPassword;

    const user = { ...json, password: password };
    const savedUser = await new UserModel(user).save();

    const host = process.env.HOST;
    const link = `${host}/auth/confirm-register/${savedUser._id.toString()}`;
    Email.send("auth/confirm-register", { to: savedUser.email }, {
      name: savedUser.firstname,
      link
    })

    res.status(200).json({ success: true, message: "User created succesfully, check your email inbox to activate it" } as any);
  });
}

export default handler;