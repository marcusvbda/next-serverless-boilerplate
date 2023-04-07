import { fallbackCheck } from "@/libs/keycloak";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = String(req.query.code);
  const redirectBack = String(req.query.redirect);
  return await fallbackCheck(res, code, redirectBack);
}