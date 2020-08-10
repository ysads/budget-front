import Axios from 'axios'
import JsonApi from './json-api'
import snakecaseKeys from 'snakecase-keys'

const apiUrl = process.env.VUE_APP_API_URL || 'http://localhost:9091'

async function request (method, endpoint, params = {}, customOptions = {}) {
  const options = {
    headers: { Accept: 'application/json' },
    withCredentials: true,
    ...customOptions,
  }

  const requestParams = snakecaseKeys(params) || {}

  if (['get', 'delete'].includes(method)) {
    options.params = requestParams
  } else {
    options.data = requestParams
  }

  const response = await Axios.request({
    url: `${apiUrl}/api/${endpoint}`,
    method,
    ...options,
  })

  return JsonApi.parse(response.data)
}

export const get = (...args) => request('get', ...args)
export const post = (...args) => request('post', ...args)
export const put = (...args) => request('put', ...args)
export const del = (...args) => request('delete', ...args)
