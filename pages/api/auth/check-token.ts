import type { NextApiResponse } from 'next'
import clientPromise from "@/libs/mongodb";
import { Route } from "@/pages/api/default-route";
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

type Data = {
  name?: string,
  message?: string,
}

const handler = async (req: any, res: NextApiResponse<Data>) => {
  Route("POST", req, res, async (req: any, res: NextApiResponse<Data>) => {
    try {
      const json = JSON.parse(req.body);

      const decoded = jwt.verify(json.token, process.env.PRIVATE_KEY);

      const client = await clientPromise;
      const db = client.db("users");
      const foundUser = await db
        .collection("users")
        .findOne({ "_id": ObjectId(decoded) });

      if (!foundUser) {
        return res.status(401).json({ success: false, error: "Invalid token" } as any);
      }

      res.status(200).json({ success: true } as any);
    } catch (error) {
      console.error(error);
      res.status(401).json({ success: false, error: "Invalid token" } as any);
    }
  });
}

export default handler;