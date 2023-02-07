import type { NextApiResponse } from 'next'
import clientPromise from "@/libs/mongodb";
import { Route } from "@/pages/api/default-route";
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const handler = async (req: any, res: NextApiResponse<any>) => {
  return Route("POST", req, res, async (req: any, res: NextApiResponse<any>) => {
    const json = JSON.parse(req.body);

    const client = await clientPromise;
    const db = client.db("users");
    const foundUser = await db
      .collection("users")
      .findOne({ email: json.email });

    const unauthorize = () => res.status(401).json({ success: false, error: "Incorrect username or password" } as any)

    if (!foundUser) {
      return unauthorize();
    }

    const passMatch = await bcrypt.compare(json.password, foundUser.password);
    if (!passMatch) {
      return unauthorize();
    }

    const token = await jwt.sign(foundUser._id.toString(), process.env.PRIVATE_KEY);

    return res.status(200).json({ success: true, token } as any);
  });
}

export default handler;