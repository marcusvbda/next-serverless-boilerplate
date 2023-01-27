import type { NextApiResponse } from 'next'
import clientPromise from "@/libs/mongodb";
import { Route } from "@/pages/api/default-route";
const bcrypt = require("bcrypt");

type Data = {
  name?: string,
  message?: string,
}

const handler = async (req: any, res: NextApiResponse<Data>) => {
  return Route("POST", req, res, async (req: any, res: NextApiResponse<Data>) => {
    const json = JSON.parse(req.body);

    const password = bcrypt.hashSync(json.password, 10);
    delete json.confirmPassword;

    const client = await clientPromise;
    const db = client.db("users");
    const foundUser = await db
      .collection("users")
      .findOne({ email: json.email });

    if (foundUser) {
      return res.status(400).json({ success: false, error: "User already exist" } as any);
    }

    const user = { ...json, password: password };
    await db.collection("users").insertOne(user);

    res.status(200).json({ success: true, message: "User created succesfully" } as any);
  });
}

export default handler;