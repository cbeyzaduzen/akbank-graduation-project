import { createAsyncThunk } from '@reduxjs/toolkit';
import checklistRequests, { CreateChecklistRequest, UpdateChecklistRequest } from '../../services/http/endpoints/checklist';
import checklistItemRequests, { CreateChecklistItemRequest, UpdateChecklistItemRequest } from '../../services/http/endpoints/checklistitem';

export const createCheckListRequest = createAsyncThunk(
  'checklistActions/createChecklist',
  async (arg: { data: CreateChecklistRequest }) => {
    return checklistRequests.create(arg.data).then((response:any) => response.data);
  }
);

export const updateCheckListRequest = createAsyncThunk(
  'checklistActions/updateChecklist',
  async (arg: { checklistID: number, data: UpdateChecklistRequest }) => {
    return checklistRequests.update(arg.checklistID, arg.data).then((response:any) => response.data);
  }
);

export const deleteCheckListRequest = createAsyncThunk(
  'checklistActions/deleteChecklist',
  async (arg: { checklistID: number }) => {
    return checklistRequests.destroy(arg.checklistID).then((response:any) => response.data);
  }
);

export const createCheckListItemRequest = createAsyncThunk(
  'checklistActions/createChecklistItem',
  async (arg: { data: CreateChecklistItemRequest }) => {
    return checklistItemRequests.create(arg.data).then((response:any) => response.data);
  }
)

export const updateCheckListItemRequest = createAsyncThunk(
  'checklistActions/updateChecklistItem',
  async (arg: { checklistID: number, checklistItemID: number, data: UpdateChecklistItemRequest }) => {
    return checklistItemRequests.update(arg.checklistItemID, arg.data).then((response:any) => response.data);
  }
)
export const deleteCheckListItemRequest = createAsyncThunk(
  'checklistActions/deleteChecklistItem',
  async (arg: { checklistID: number, checklistItemID: number }) => {
    return checklistItemRequests.destroy(arg.checklistItemID).then((response:any) => response.data);
  }
)