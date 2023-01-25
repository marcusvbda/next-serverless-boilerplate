import type { NextApiResponse } from 'next'
import clientPromise from "@/libs/mongodb";
import bcrypt from "bcrypt";

type Data = {
  name?: string,
  message?: string,
}

export default async function handler(
  req: any,
  res: NextApiResponse<Data>
) {
  if (!['POST'].includes(req.method)) {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  const client = await clientPromise;

  const json = JSON.parse(req.body);
  const password = bcrypt.hashSync(json.password, 10);
  delete json.confirmPassword;

  const db = client.db("users");
  const findUser = await db
    .collection("users")
    .findOne({ email: json.email });

  if (findUser) {
    return res.status(400).json({ success: false, error: "User already exist" } as any);
  }

  const user = { ...json, password: password };
  await db.collection("users").insertOne(user);

  res.status(200).json({ success: true, message: "User created succesfully" } as any);
}

