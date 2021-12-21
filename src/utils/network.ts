import { message } from 'antd';
import axios, { AxiosRequestConfig } from 'axios';
import { get, isEmpty } from 'lodash';

const responseDefaultHandles = {
  401: {
    errorMsg: '用户登录信息过期 或 没有访问权限，请重新登录 或 联系管理员分配权限',
    handle: () => {

    },
  },
};

axios.interceptors.response.use((response) => {
  const { status } = response;
  const defaultHandle = get(responseDefaultHandles, status);
  if (!isEmpty(defaultHandle)) {
    const { errorMsg, handle } = defaultHandle || {};
    errorMsg && message.error(errorMsg);
    handle && handle();
  }
  return response;
},
(error) => Promise.reject(error));

export function getRequest(url: string, config?: AxiosRequestConfig): Promise<any> {
  return axios.get(url, config);
}

export function postRequest(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
  return axios.post(url, data, config);
}
