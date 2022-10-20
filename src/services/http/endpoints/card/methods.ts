import { instance, endpoints } from '../../instance';
import { CardResponse, NestedCardResponse, CreateCardRequest, UpdateCardRequest } from './types';

export const create = (data: CreateCardRequest) => {
  return instance.post<CardResponse>(endpoints.card, data);
}

export const update = (cardID: number, data: UpdateCardRequest) => {
  return instance.put<CardResponse>(`${endpoints.card}/${cardID}`, data);
}

export const destroy = (cardID: number) => {
  return instance.delete(`${endpoints.card}/${cardID}`);
}

export const get = (cardID: number) => {
  return instance.get<NestedCardResponse>(`${endpoints.card}/${cardID}`);
}

export const getList = (listID: number) => {
  return instance.get<NestedCardResponse[]>(`${endpoints.list}?listId=${listID}`);
}