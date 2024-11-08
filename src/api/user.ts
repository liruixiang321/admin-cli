import { get, post } from '@/http/request';

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
export type userItem = {
  id: number;
  nickname: string;
  username: string;
  roles: Array<{
    role: number;
    roleName: string;
  }>;
};
export const userLogin = async (data?: loginRequest) => {
  return await post<loginResponse>({}, '/login', data);
};

export const refreshUserInfo = async (data?: reLoginRequest) => {
  return await post<loginResponse>({}, '/refreshLogin', data);
};

export const getUserList = async () => {
  return await get<Array<userItem>>({}, '/getUserList');
};
