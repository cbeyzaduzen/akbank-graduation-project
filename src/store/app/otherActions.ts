import { createAsyncThunk } from '@reduxjs/toolkit';
import labelRequests from '../../services/http/endpoints/label';
import cardRequests from '../../services/http/endpoints/card';
import listRequests from '../../services/http/endpoints/list';

export const getLabelTypesRequest = createAsyncThunk(
  'getLabelTypes',
  async () => {
    return labelRequests.getLabelTypes().then((res:any) => res.data);
  }
)

export const moveCardToAnotherListRequest = createAsyncThunk(
  'moveCardToAnotherList',
  async (arg: { source: { listID: number, newCardIDs: number[] }, target: { listID: number, newCardIDs: number[] } }) => {
    arg.source.newCardIDs.forEach((cardID, index) => {
      cardRequests.update(cardID, { order: index + 1 })
    })
    arg.target.newCardIDs.forEach((cardID, index) => {
      cardRequests.update(cardID, { order: index + 1, listId: arg.target.listID })
    })
  }
)

export const changeCardOrderRequest = createAsyncThunk(
  'changeCardOrder',
  async (arg: { listID: number, newCardIDs: number[] }) => {
    arg.newCardIDs.forEach((cardID, index) => {
      cardRequests.update(cardID, { order: index + 1 })
    })
  }
)

export const changeListOrderRequest = createAsyncThunk(
  'changeListOrder',
  async (arg: { boardId: number, newListIDs: number[] }) => {
    arg.newListIDs.forEach((listID, index) => {
      listRequests.update(listID, { order: index + 1 })
    })
  }
)