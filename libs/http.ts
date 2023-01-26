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

    const response = await fetch(route, payload);

    return response.json();
}