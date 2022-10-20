import { instance, endpoints } from '../../instance';
import { BoardResponse, BoardRequest, NestedBoardResponse, BoardListResponse } from './types';

export const create = (data: BoardRequest) => {
  return instance.post<BoardResponse>(endpoints.board, data);
}

export const update = (boardId: number, data: BoardRequest) => {
  return instance.put<BoardResponse>(`${endpoints.board}/${boardId}`, data);
}

export const destroy = (boardId: number) => {
  return instance.delete(`${endpoints.board}/${boardId}`);
}

export const getById = (boardId: number) => {
  return instance.get<NestedBoardResponse>(`${endpoints.board}/${boardId}`);
}

export const getList = () => {
  return instance.get<BoardListResponse[]>(endpoints.board);
}