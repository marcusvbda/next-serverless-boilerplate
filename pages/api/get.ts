import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name?: string,
  message?: string,
}

export const getResponse = (request: any) => request

export default function handler(
  req: any,
  res: NextApiResponse<Data>
) {
  if (!['GET'].includes(req.method)) {
    return res.status(405).send({ message: 'Only GET requests allowed' })
  }

  const response = getResponse({ name: "GET CLIENTSIDE RESULT" })
  res.status(200).json(response)
}
