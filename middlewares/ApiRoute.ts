export const ValidateMethod = (method: string, handler: any) => {
  return async (req: any, res: any) => {
    if (req.method !== method) return res.status(405).send({ message: `Only ${method} requests allowed` });
    return await handler(req, res)
  }
}

export const GET = (handler: any) => ValidateMethod('GET', handler)
export const POST = (handler: any) => ValidateMethod('POST', handler)
export const PUT = (handler: any) => ValidateMethod('PUT', handler)
export const DELETE = (handler: any) => ValidateMethod('DELETE', handler)
export const PATH = (handler: any) => ValidateMethod('PATH', handler)