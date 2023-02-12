import axios, { Method } from 'axios';
import { getConfig } from './env';

//common request
const request = async ({ url, options = {} }) => {
  try {
    return axios.request({url, ...options});
  } catch (err) {
    throw err;
  };
};

interface Options {
  url: string;
  method?: Method;
  headers?: { [key: string]: string };
  params?: Record<string, unknown>;
  query?: Record<string, unknown>;
}

//request for contact feishu
const requestFeishu = (options: Options) => {
  const { url, method = 'GET', headers, params, query } = options;
  const sendUrl = url || getConfig()?.FEISHU_CONFIG.FEISHU_URL;
  return async () => {
    try {
      const res = await axios({
        url: sendUrl,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          ...headers,
        },
        method,
        params: query,
        data: params,
      });
      const { data, status } = res;
      return {
        data,
        code: status,
      }
    } catch (error) {
      throw error;
    }
  }
}

export {
  request,
  requestFeishu,
} 