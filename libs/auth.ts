import { setCookie, getCookie, deleteCookie } from 'cookies-next';

const check = (): boolean => getCookie("jwtToken") ? true : false;

const logout = () => {
    deleteCookie("jwtToken");
    deleteCookie("user");
}

export interface IConfig {
    maxAge?: number;
}

const login = (token: string, user: any, config: IConfig = {}): void => {
    setCookie("jwtToken", token, config);
    setCookie("user", JSON.stringify(user), config);
}

const user = (): any => JSON.parse(check() ? getCookie("user") as any : "{}");

const getToken = (): string => check() ? getCookie("jwtToken") as any : "";

const auth = { getToken, check, user, logout, login };

export default auth;