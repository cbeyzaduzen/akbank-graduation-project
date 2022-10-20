import { instance, endpoints } from '../../instance';
import { CommentRequest, CommentResponse } from './types';

export const create = (data: CommentRequest) => {
  return instance.post<CommentResponse>(endpoints.comment, data);
}

export const destroy = (commentID: number) => {
  return instance.delete(`${endpoints.comment}/${commentID}`);
}