import type { NextApiResponse } from 'next'
import { Route } from "@/pages/api/default-route";
const Email = require('email-templates');

const handler = async (req: any, res: NextApiResponse<any>) => {
  return Route("POST", req, res, async (req: any, res: NextApiResponse<any>) => {
    const json = JSON.parse(req.body);

    const email = new Email({
    message: {
      from: 'hi@example.com'
    },
    send: true,
    transport: {
      host: 'sandbox.smtp.mailtrap.io', 
      port: 587,
      ssl: false,
      tls: false,
      auth: {
        user: 'd8b07fad2e1c39', // your Mailtrap username
        pass: '771b1c29beb02c' //your Mailtrap password
      },
    },
    });

    email.send({
      template: 'auth/reset-password',
      message: {
        to: 'test@example.com'
      },
      locals :  {name: 'Diana'}
    })
    .then(console.log)
    .catch(console.error);

    return res.status(200).json({ success: true, json } as any);
  });
}

export default handler;