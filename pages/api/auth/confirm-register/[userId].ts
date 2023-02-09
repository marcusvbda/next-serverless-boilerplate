import type { NextApiResponse } from 'next'
import { Route } from "@/pages/api/default-route";
const jwt = require('jsonwebtoken');
import Mongo from "@/libs/mongodb";
import UserModel from "@/models/User";

const handler = async (req: any, res: NextApiResponse<any>) => {
    return Route("GET", req, res, async (req: any, res: NextApiResponse<any>) => {
        try {
            const { userId } = req.query

            await Mongo.connect();
            const foundUser = await UserModel.findOne({
                _id: userId,
                activatedAt: null
            }).exec();

            if (!foundUser) {
                return res.status(401).json({ success: false, error: "User not found" } as any);
            }

            foundUser.activatedAt = new Date().getTime();
            foundUser.save();

            return res.status(200).json({ success: true } as any);
        } catch (error) {
            console.error(error);
            return res.status(401).json({ success: false, error: "User not found" } as any);
        }
    });
}

export default handler;