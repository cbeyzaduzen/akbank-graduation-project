import { instance, endpoints } from '../../instance';
import { ListResponse, NestedListResponse, CreateListRequest, UpdateListRequest } from './types';

export const create = (data: CreateListRequest) => {
  return instance.post<ListResponse>(endpoints.list, data);
}

export const update = (listID: number, data: UpdateListRequest) => {
  return instance.put<ListResponse>(`${endpoints.list}/${listID}`, data);
}

export const destroy = (listID: number) => {
  return instance.delete(`${endpoints.list}/${listID}`);
}

export const getById = (listID: number) => {
  return instance.get<NestedListResponse>(`${endpoints.list}/${listID}`);
}

export const getList = (boardId: number) => {
  return instance.get<ListResponse[]>(`${endpoints.list}?boardId=${boardId}`);
}