import { createAsyncThunk } from '@reduxjs/toolkit';
import cardRequests, { CreateCardRequest, UpdateCardRequest } from '../../services/http/endpoints/card';
import commentRequests, { CommentRequest } from '../../services/http/endpoints/comment';
import labelRequests, { AddLabelRequest } from '../../services/http/endpoints/label';


export const createCardRequest = createAsyncThunk(
  'cardActions/createCard',
  async (arg: { data: CreateCardRequest }) => {
    return cardRequests.create(arg.data).then((res:any) => res.data);
  }
);

export const updateCardRequest = createAsyncThunk(
  'cardActions/updateCard',
  async (arg: { cardID: number, data: UpdateCardRequest }) => {
    return cardRequests.update(arg.cardID, arg.data).then((res:any) => res.data);
  }
);

export const deleteCardRequest = createAsyncThunk(
  'cardActions/deleteCard',
  async (arg: { cardID: number }) => {
    return cardRequests.destroy(arg.cardID).then((res:any) => res.data);
  }
);

export const getCardRequest = createAsyncThunk(
  'cardActions/getCard',
  async (arg: { cardID: number }) => {
    return cardRequests.get(arg.cardID).then((res:any) => res.data)
  }
)

export const addLabelRequest = createAsyncThunk(
  'cardActions/addLabel',
  async (arg: { data: AddLabelRequest }) => {
    return labelRequests.create(arg.data).then((res:any) => res.data);
  }
)

export const removeLabelRequest = createAsyncThunk(
  'cardActions/removeLabel',
  async (arg: { cardLabelID: number, cardID: number }) => {
    return labelRequests.destroy(arg.cardLabelID).then((res:any) => res.data);
  }
)

export const addCommentRequest = createAsyncThunk(
  'cardActions/addComment',
  async (arg: { username: string, data: CommentRequest }) => {
    return commentRequests.create(arg.data).then((res:any) => res.data);
  }
)

