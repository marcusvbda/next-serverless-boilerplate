import type { NextApiResponse } from 'next'
import { Route } from "@/pages/api/default-route";
import Mongo from "@/libs/mongodb";
import UserModel from "@/models/User";
const bcrypt = require("bcrypt");

const handler = async (req: any, res: NextApiResponse<any>) => {
    return Route("POST", req, res, async (req: any, res: NextApiResponse<any>) => {
        const errorMessage = () => res.status(401).json({ success: false, error: "Token not found" } as any);

        try {
            const json = JSON.parse(req.body);

            const { userId } = json;

            await Mongo.connect();
            const foundUser = await UserModel.findOne({ _id: userId }).exec();

            if (!foundUser) {
                return errorMessage();
            }

            const password = bcrypt.hashSync(json.password, 10);
            foundUser.password = password;
            foundUser.recovery = {
                token: null,
                expires: null
            };
            await foundUser.save();

            return res.status(200).json({ success: true, message: "Password created succesfully!" } as any);
        } catch (error) {
            console.error(error);
            return errorMessage();
        }
    });
}

export default handler;