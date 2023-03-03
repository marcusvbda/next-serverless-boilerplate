import type { NextApiResponse } from 'next'
import { Route } from "@/pages/api/default-route";
import Mongo from "@/libs/mongodb";
import UserModel from "@/models/User";

const handler = async (req: any, res: NextApiResponse<any>) => {
    return Route("GET", req, res, async (req: any, res: NextApiResponse<any>) => {
        const errorMessage = () => res.status(401).json({ success: false, error: "Token not found" } as any);

        try {
            const { rememberToken } = req.query

            await Mongo.connect();
            const foundUser = await UserModel.findOne({
                "recovery.token": rememberToken,
                "recovery.expires": { $gt: new Date() }
            }).exec();

            if (!foundUser) {
                return errorMessage();
            }

            return res.status(200).json({ success: true, user: foundUser } as any);
        } catch (error) {
            console.error(error);
            return errorMessage();
        }
    });
}

export default handler;