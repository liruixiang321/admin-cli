import { get } from '@/http/request';

export interface IAuth {
  name: string;
  roleId: string;
  viewRole: string;
  roleList: Array<IAuth> | null;
}

export const getAuthList = async () => {
  return await get<IAuth[]>({}, '/getAuthList', {});
};
