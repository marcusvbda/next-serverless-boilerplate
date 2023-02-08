import type { NextApiResponse } from 'next'
import { Route } from "@/pages/api/default-route";
import Email from "@/libs/email";
import clientPromise from "@/libs/mongodb";

const handler = async (req: any, res: NextApiResponse<any>) => {
  return Route("POST", req, res, async (req: any, res: NextApiResponse<any>) => {
    const json = JSON.parse(req.body);

    const client = await clientPromise;
    const db = client.db("users");
    const foundUser = await db
      .collection("users")
      .findOne({ email: json.email });

    if (!foundUser) {
      return res.status(401).json({ success: false, error: "User does not exist" } as any)
    }

    Email.send("auth/reset-password",
      { to: "bassalobre.vinicius@gmail.com" },
      { name: "vinicius" }
    ).then(console.log).catch(console.error);

    return res.status(200).json({
      success: true, message: "Password reset email has been sent"
    } as any);
  });
}

export default handler;