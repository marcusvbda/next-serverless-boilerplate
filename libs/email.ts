import path from "path";
const Email = require('email-templates');

const createEmail = (): any => {
    const root = path.join(__dirname, 'emails');
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
    const pathTemplate = process.env.NODE_ENV === 'production' ? path.join(__dirname, "../../../../../emails", template) : template;
    const email = createEmail();
    return email.send({
        template: pathTemplate,
        message,
        locals
    });
}

const email = { send };

export default email