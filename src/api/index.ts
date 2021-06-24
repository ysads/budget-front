import JsonApi from './json-api';
import snakecaseKeys from 'snakecase-keys';
import Axios, { AxiosRequestConfig, Method } from 'axios';

async function request(
  method: Method,
  endpoint: string,
  params: Record<string, unknown>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  const apiUrl: string = process.env.VUE_APP_API_URL || 'http://localhost:9091';
  const options: AxiosRequestConfig = {
    headers: {
      Accept: 'application/json',
    },
    withCredentials: true,
  };

  const requestParams = snakecaseKeys(params);

  if (['get', 'delete'].includes(method)) {
    options.params = requestParams;
  } else {
    options.data = requestParams;
  }

  const response = await Axios.request({
    url: `${apiUrl}/api/${endpoint}`,
    method,
    ...options,
  });

  return JsonApi.parse(response.data);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const get = (endpoint: string, params = {}): Promise<any> =>
  request('get', endpoint, params);
export const post = (endpoint: string, params = {}): Promise<any> =>
  request('post', endpoint, params);
export const put = (endpoint: string, params = {}): Promise<any> =>
  request('put', endpoint, params);
export const del = (endpoint: string, params = {}): Promise<any> =>
  request('delete', endpoint, params);
/* eslint-enable @typescript-eslint/no-explicit-any */
