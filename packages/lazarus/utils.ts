import { LZ_RESOLVER_ROUTE } from 'lzConstants'

export const makeRequestHeader = () => {
  return {
    'Content-Type': 'application/json',
  }
}

export const isClientSide = () => typeof window !== 'undefined'

export const request = (method: string, url: string, body: any) => {
  return fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: makeRequestHeader()
  }).then(res => res.json())
}

export const lzResolver = (action: string, body: any) => {
  let prefix = '';
  if (!isClientSide()) prefix = `${process.env.HOST as string}/`;
  const fullRoute = `${prefix}${LZ_RESOLVER_ROUTE}/${action}`;
  return request('POST', fullRoute, body)
}

export const setUrlParam = (key: string, value: any) => {
  const url = new URL(window.location.href);
  url.searchParams.set(key, String(value));
  window.history.pushState({ path: url.href }, '', url.href);
}

export const getUrlParam = (key: string, fallback: any = null) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const value = urlParams.get(key)
  return value ? value : fallback;
}
