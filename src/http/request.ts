import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { ElMessage } from "element-plus";
import { getStatusInfo } from "./status";

interface BaseResponse<T = any> {
  code: number | string;
  data: T;
  message: string;
}

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASEURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return response.data;
    }
    ElMessage({
      type: "error",
      message: getStatusInfo(response.status),
      duration: 3000,
    });
    return response.data;
  },
  (error) => {
    const { response } = error;
    if (response) {
      ElMessage({
        type: "error",
        message: getStatusInfo(response.status),
        duration: 3000,
      });
      return Promise.reject(error);
    }

    ElMessage({
      type: "error",
      message: "Network Error",
      duration: 3000,
    });
  }
);

export default service;

const requestInstance = <T = any>(config: AxiosRequestConfig): Promise<T> => {
  const conf = config;
  return new Promise((resolve, reject) => {
    service
      .request<any, AxiosResponse<BaseResponse>>(conf)
      .then((res: AxiosResponse<BaseResponse>) => {
        const data = res.data; // 如果data.code为错误代码返回message信息
        if (data.code != 0) {
          ElMessage({
            message: data.message,
            type: "error",
          });
          reject(data.message);
        } else {
          ElMessage({
            message: data.message,
            type: "success",
          }); // 此处返回data信息 也就是 api 中配置好的 Response类型
          resolve(data as T);
        }
      });
  });
};

export function get<T = any, U = any>(
  config: AxiosRequestConfig,
  url: string,
  parms?: U
): Promise<T> {
  return requestInstance({
    ...config,
    method: "GET",
    url,
    params: parms,
  });
}

export function post<T = any, U = any>(
  config: AxiosRequestConfig,
  url: string,
  data: U
): Promise<T> {
  return requestInstance({
    ...config,
    method: "POST",
    url,
    data: data,
  });
}

export function put<T = any, U = any>(
  config: AxiosRequestConfig,
  url: string,
  parms: U
): Promise<T> {
  return requestInstance({
    ...config,
    method: "PUT",
    url,
    params: parms,
  });
}

export function del<T = any, U = any>(
  config: AxiosRequestConfig,
  url: string,
  data: U
): Promise<T> {
  return requestInstance({
    ...config,
    method: "DELETE",
    url,
    data: data,
  });
}
