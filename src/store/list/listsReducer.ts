import { createReducer } from '@reduxjs/toolkit';
import { AppState } from '../app/appSlice';
import { createListRequest, updateListRequest, deleteListRequest } from './listActions';

export type List = {
  id: number;
  title: string;
  order: number;
  boardId: number;
  updatedAt?: string;
  createdAt?: string;
  cardIDs: number[]
}

const initialAppState: AppState = {
  boardKey: [],
  labelTypes: [],
  boards: {},
  lists: {},
  cards: {},
  checklists: {}
}

export const listsReducer = createReducer(
  initialAppState,
  (builder) => {
    builder
      .addCase(createListRequest.fulfilled, (state, action) => {
        const boardId = action.payload.boardId;
        const listID = action.payload.id;
        const list = action.payload;
        state.lists[listID] = { ...list, cardIDs: [] };
        state.boards[boardId].listIDs.push(listID);
      })
      .addCase(updateListRequest.fulfilled, (state, action) => {
        const listID = action.meta.arg.listID;
        const updateData = action.meta.arg.data;
        let listData = state.lists[listID];
        listData = { ...listData, ...updateData }
        state.lists[listID] = listData
      })
      .addCase(deleteListRequest.fulfilled, (state, action) => {
        const listID = action.meta.arg.listID;
        const boardId = state.lists[listID].boardId;
        const cardIDs = state.lists[listID].cardIDs;
        cardIDs.forEach((cardID:any) => {
          const checklistIDs = state.cards[cardID].checklistIDs
          checklistIDs.forEach((checklistID:any) => {
            delete state.checklists[checklistID];
          })
          delete state.cards[cardID];
        })
        delete state.lists[listID];
        const listIDs = state.boards[boardId].listIDs;
        const index = listIDs.indexOf(listID);
        listIDs.splice(index, 1);
      })
  })