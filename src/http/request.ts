import axios from "axios";
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASEURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
