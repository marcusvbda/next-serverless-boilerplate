import { setCookie, parseCookies } from 'nookies';
import keycloak from 'keycloak-connect';

const ACCESS_TOKEN_INDEX = "access_token";
const REFRESH_TOKEN_INDEX = "refresh_token";

const keycloakConfig = {
  clientId: process.env.KEYCLOAK_CLIENT_ID,
  bearerOnly: true,
  serverUrl: process.env.KEYCLOAK_URL,
  realm: process.env.KEYCLOAK_REALM,
  credentials: {
    secret: process.env.KEYCLOAK_SECRET
  },
};

export const Keycloak: any = new keycloak({ cookies: true }, keycloakConfig as any);

export const getKcRedirectUri = (redirect: any = null): string => {
  const url = `${process.env.HOST}/api/auth/keycloak-callback`;
  if (redirect) return `${url}?redirect=${redirect}`;
  return url;
}

export const getLoginUrl = (req: any) => {
  const redirectUri = req.nextUrl.pathname;
  const redirectBack = getKcRedirectUri(redirectUri);
  return Keycloak.loginUrl("login", redirectBack);
}

export const checkAuth = async (req: any) => {
  let token = req.cookies.get('access_token')?.value ?? ''
  let refreshToken = req.cookies.get('refresh_token')?.value ?? ''
  if ((!token || !refreshToken)) {
    return {
      redirect: { destination: getLoginUrl(req), permanent: false }
    }
  }

  return { success: true };
}
export const fallbackCheck = async (res: any, code: string, redirectBack: string) => {
  const payload: any = {
    code,
    redirect_uri: getKcRedirectUri(redirectBack),
    grant_type: 'authorization_code',
    client_id: process.env.KEYCLOAK_CLIENT_ID as any,
    client_secret: process.env.KEYCLOAK_SECRET as any,
  };

  const formData = new URLSearchParams();
  Object.keys(payload).forEach((key) => formData.append(key, payload[key]));

  const keycloakUrl = process.env.KEYCLOAK_URL;
  const realm = process.env.KEYCLOAK_REALM;
  let url = `${keycloakUrl}/realms/${realm}/protocol/openid-connect/token`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData
  });

  if (!response.ok) {
    return res.status(response.status).json({
      status: response.status,
      error: `Keycloak error: ${response.statusText}`
    });
  }

  const result = await response.json();
  defineKcCookie(res, result);
  return res.redirect(redirectBack);
}

export const defineKcCookie = (res: any, data: any) => {
  if (res?.cookies?.set) {
    res.cookies.set(ACCESS_TOKEN_INDEX, data[ACCESS_TOKEN_INDEX])
    res.cookies.set(REFRESH_TOKEN_INDEX, data[REFRESH_TOKEN_INDEX])
  } else {
    setCookie({ res }, ACCESS_TOKEN_INDEX, data[ACCESS_TOKEN_INDEX], {
      path: "/",
      maxAge: (data?.expires_in ?? 1) * 1000,
    });
    setCookie({ res }, REFRESH_TOKEN_INDEX, data[REFRESH_TOKEN_INDEX], {
      path: "/",
      maxAge: (data?.refresh_expires_in ?? 1) * 1000,
    });
  }
}

export const refreshToken = async (rtoken: string, res: any) => {
  const route = `${keycloakConfig.serverUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`;
  const payload: any = {
    grant_type: 'refresh_token',
    client_id: keycloakConfig.clientId,
    client_secret: keycloakConfig.credentials.secret,
    refresh_token: rtoken,
  }
  const formData = new URLSearchParams();
  Object.keys(payload).forEach((key) => formData.append(key, payload[key]));

  const request = await fetch(route, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData
  });

  if (!request.ok) {
    return false;
  }

  const data = await request.json();
  defineKcCookie(res, data);
  return data;
}

export const logout = (req: any) => {
  req.cookies.delete(ACCESS_TOKEN_INDEX)
  req.cookies.delete(REFRESH_TOKEN_INDEX)
}

export const getUserInfo = async (req: any, res: any, newToken: any = null, newRefreshToken: any = null): Promise<any> => {
  let token = newToken ?? (req.cookies.get('access_token')?.value ?? '')
  let rtoken = newRefreshToken ?? (req.cookies.get('refresh_token')?.value ?? '')
  const route = `${keycloakConfig.serverUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/userinfo`;
  const response = await fetch(route, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let data = {};
  if (!response.ok) {
    const newTokenResult = await refreshToken(rtoken, res) as any;
    data = await getUserInfo(req, res, newTokenResult[ACCESS_TOKEN_INDEX], newTokenResult[REFRESH_TOKEN_INDEX]) as any;
  } else {
    data = await response.json();
  }
  return data;
}