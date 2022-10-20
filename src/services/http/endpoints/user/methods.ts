import { instance, endpoints } from '../../instance';
import { UserListRes, UserRequest, UserRes } from './types';

export const create = (data: UserRequest) => {
  return instance.post<UserRes>(endpoints.member, data);
}

export const getList = (boardId: number) => {
  return instance.get<UserListRes[]>(`${endpoints.member}?boardId=${boardId}`);
}

export const destroy = (memberID: number) => {
  return instance.delete(`${endpoints.member}/${memberID}`);
}