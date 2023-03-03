const Email = require('email-templates');
import { resolve } from "path";

const createEmail = (): any => {
    const email = new Email({
        message: {
            from: process.env.EMAIL_FROM ?? '',
        },
        send: true,
        preview: false,
        transport: {
            host: process.env.EMAIL_HOST ?? 'smtp.mailtrap.io',
            port: process.env.EMAIL_PORT ?? 587,
            ssl: process.env.EMAIL_SSL ?? false,
            tls: process.env.EMAIL_FROM ?? false,
            auth: {
                user: process.env.EMAIL_USER ?? '',
                pass: process.env.EMAIL_PASSWORD ?? '',
            },
        },
    });

    return email;
}

const send = (template: string, message: any, locals: any = {}): any => {
    return new Promise((resolvePromise) => {
        const templateDir = resolve(process.cwd(), "emails") + `/${template}`;
        const email = createEmail();
        const result = email.send({
            template: templateDir,
            message,
            locals
        });
        resolvePromise(result);
    });
}

const email = { send };

export default email