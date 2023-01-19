import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name?: string,
  message?: string,
}

export default function handler(
  req: any,
  res: NextApiResponse<Data>
) {
  if (!['POST'].includes(req.method)) {
    return res.status(405).send({ message: 'Only POST requests allowed' })
  }
  const json = JSON.parse(req.body);
  res.status(200).json(json)
}
