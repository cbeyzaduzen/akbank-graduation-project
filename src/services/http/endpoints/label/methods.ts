import { instance, endpoints } from '../../instance';
import { AddLabelRequest, LabelResponse, LabelTypeResponse } from './types';

export const create = (data: AddLabelRequest) => {
  return instance.post<LabelResponse>(endpoints.label, data);
}

export const destroy = (cardLabelID: number) => {
  return instance.delete(`${endpoints.label}/${cardLabelID}`);
}

export const getLabelTypes = () => {
  return instance.get<LabelTypeResponse[]>(endpoints.labelTypes);
}