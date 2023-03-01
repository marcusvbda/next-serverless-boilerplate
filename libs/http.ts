import Auth from "@/libs/auth";

export const withParams = (url: string, params: any) => {
    const keys = Object.keys(params)
    const query = keys.length
        ? "?" + keys
            .map((key: any) => encodeURIComponent(key)
                + "=" + encodeURIComponent(params[key]))
            .join("&")
        : ""
    return url + query
}

export default async function handler(method: string, route: string, body: any = null) {
    interface IPayload {
        method: string,
        body?: string,
        headers?: any
    }

    const isGet = ['get', 'GET'].includes(method);

    let payload: IPayload = {
        method: method
    }

    if (body && !isGet) {
        payload.body = JSON.stringify(body);
    }

    const token = Auth.getToken();
    if (token) {
        payload.headers = {
            Authentication: `Bearer ${token}`
        };
    }

    const host = process.env.HOST;
    let url = typeof window === 'undefined' ? `${host}${route}` : route;
    if (body && Object.keys(body).length > 0 && isGet) {
        url = withParams(url, body);
    }

    const response = await fetch(url, payload);

    return response.json();
}