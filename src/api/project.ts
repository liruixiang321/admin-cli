import { get } from '@/http/request';

export interface IProject {
  userId: string | number;
  id: string | number;
  title: string;
  introduce: string;
}

export const getProjectList = async () => {
  return get<IProject[]>({}, '/projects');
};
