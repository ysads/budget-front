import Axios, { AxiosRequestConfig, Method } from 'axios';
import JsonApi from './json-api';
import snakecaseKeys from 'snakecase-keys';

async function request(method: Method, endpoint: string, params = {}) {
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

export const get = (endpoint: string, params = {}) =>
  request('get', endpoint, params);
export const post = (endpoint: string, params = {}) =>
  request('post', endpoint, params);
export const put = (endpoint: string, params = {}) =>
  request('put', endpoint, params);
export const del = (endpoint: string, params = {}) =>
  request('delete', endpoint, params);
