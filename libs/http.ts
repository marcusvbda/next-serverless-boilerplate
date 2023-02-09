export default async function handler(method: string, route: string, body: any = null) {
    interface IPayload {
        method: string,
        body?: string,
    }

    let payload: IPayload = {
        method: method
    }

    if (body) {
        payload.body = JSON.stringify(body);
    }

    const host = process.env.HOST;
    const url = typeof window === 'undefined' ? `${host}${route}` : route;
    const response = await fetch(url, payload);

    return response.json();
}