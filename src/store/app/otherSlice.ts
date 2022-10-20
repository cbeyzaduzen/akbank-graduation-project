import { createReducer } from '@reduxjs/toolkit';
import { logoutRequest } from '../auth/authActions';
import { AppState } from './appSlice';
import { changeListOrderRequest, changeCardOrderRequest, moveCardToAnotherListRequest, getLabelTypesRequest } from './otherActions';

const initialAppState: AppState = {
  boardKey: [],
  labelTypes: [],
  boards: {},
  lists: {},
  cards: {},
  checklists: {}
}

export const OtherReducer = createReducer(
  initialAppState,
  (builder) => {
    builder
      .addCase(changeListOrderRequest.fulfilled, (state, action) => {
        const boardId = action.meta.arg.boardId;
        const newListIDs = action.meta.arg.newListIDs;
        state.boards[boardId].listIDs = newListIDs;
        newListIDs.forEach((listID, index) => {
          state.lists[listID].order = index + 1;
        })
      })
      .addCase(changeCardOrderRequest.fulfilled, (state, action) => {
        const listID = action.meta.arg.listID;
        const newCardIDs = action.meta.arg.newCardIDs;
        state.lists[listID].cardIDs = newCardIDs;
        newCardIDs.forEach((cardID, index) => {
          state.cards[cardID].order = index + 1;
        })
      })
      .addCase(moveCardToAnotherListRequest.fulfilled, (state, action) => {
        const source = action.meta.arg.source;
        const target = action.meta.arg.target;
        state.lists[source.listID].cardIDs = source.newCardIDs;
        state.lists[target.listID].cardIDs = target.newCardIDs;
        source.newCardIDs.forEach((cardID, index) => {
          state.cards[cardID].order = index + 1
        })
        target.newCardIDs.forEach((cardID, index) => {
          state.cards[cardID].order = index + 1;
          state.cards[cardID].listId = target.listID;
        })
      })
      .addCase(getLabelTypesRequest.fulfilled, (state, action) => {
        state.labelTypes = action.payload;
      })
      .addCase(logoutRequest, () => {
        return initialAppState;
      })
  })

