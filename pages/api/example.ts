import type { NextApiResponse } from 'next'
import { Route } from "@/pages/api/default-route";
import UserModel from "@/models/User";

const handler = async (req: any, res: NextApiResponse<any>) => {
  return Route("GET", req, res, async (req: any, res: NextApiResponse<any>) => {
    // const user = await UserModel.create({ firstname: "Vinicius", lastname: "bassalobre" });
    const users = await UserModel.scan().exec();
    return res.status(200).json({ success: true, content: "lorem ipsum from api server side", users } as any);
  });
}

export default handler;
