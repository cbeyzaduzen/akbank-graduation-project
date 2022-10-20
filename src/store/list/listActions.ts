import { createAsyncThunk } from '@reduxjs/toolkit';
import listRequests, { CreateListRequest, UpdateListRequest } from '../../services/http/endpoints/list';

export const createListRequest = createAsyncThunk(
  'listActions/createList',
  async (arg: { data: CreateListRequest }) => {
    return listRequests.create(arg.data).then((response:any) => response.data);
  }
);

export const updateListRequest = createAsyncThunk(
  'listActions/updateList',
  async (arg: { listID: number, data: UpdateListRequest }) => {
    return listRequests.update(arg.listID, arg.data).then((response:any) => response.data);
  }
);

export const deleteListRequest = createAsyncThunk(
  'listActions/deleteList',
  async (arg: { listID: number }) => {
    return listRequests.destroy(arg.listID).then((response:any) => response.data);
  }
);

export const getListRequest = createAsyncThunk(
  'listActions/getList',
  async (arg: { listID: number }) => {
    return (listRequests.getById(arg.listID).then((response:any) => response.data))
  }
);
