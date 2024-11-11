import { get } from '@/http/request';

export interface IRole {
  roleName: string;
  roleId: string | number;
  authority: Array<number>;
}

export const getRoleList = () => {
  return get<Array<IRole>>({}, '/getRoleList');
};
