import { instance, endpoints } from '../../instance';
import { CreateChecklistRequest, UpdateChecklistRequest, ChecklistResponse } from './types';

export const create = (data: CreateChecklistRequest) => {
  return instance.post<ChecklistResponse>(endpoints.checklist, data);
}

export const update = (checklistID: number, data: UpdateChecklistRequest) => {
  return instance.put<ChecklistResponse>(`${endpoints.checklist}/${checklistID}`, data);
}

export const destroy = (checklistID: number) => {
  return instance.delete(`${endpoints.checklist}/${checklistID}`);
}