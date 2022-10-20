import { instance, endpoints } from '../../instance';
import { CreateChecklistItemRequest, UpdateChecklistItemRequest, ChecklistItemResponse } from './types';

export const create = (data: CreateChecklistItemRequest) => {
  return instance.post<ChecklistItemResponse>(endpoints.checklistItem, data);
}

export const update = (checklistItemID: number, data: UpdateChecklistItemRequest) => {
  return instance.put<ChecklistItemResponse>(`${endpoints.checklistItem}/${checklistItemID}`, data);
}

export const destroy = (checklistItemID: number) => {
  return instance.delete(`${endpoints.checklistItem}/${checklistItemID}`);
}