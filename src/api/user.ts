import { post } from "../http/request";
export type loginRequest = {
  username: string;
  password: string;
};
export type reLoginRequest = {
  accessToken: string;
};
export type loginResponse = {
  accessToken: string;
  username: string;
  roles: [];
};
export const userLogin = async (data?: loginRequest) => {
  return await post<loginResponse>({}, "/api/user/login", data);
};

export const refreshUserInfo = async (data?: reLoginRequest) => {
  return await post<loginResponse>({}, "/api/user/refreshLogin", data);
};
