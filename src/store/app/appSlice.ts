import { AnyAction, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { LabelTypeResponse } from '../../services/http/endpoints/label';
import { Board, boardsReducer } from '../boards/boardSlice';
import { Checklist, checklistsReducer } from '../checklist/checklistSlice';
import { Card, cardsReducer } from '../cards/cardSlice';
import { List, listsReducer } from '../list/listsReducer';
import { OtherReducer } from './otherSlice';

export type AppState = {
  boardKey: number[]
  labelTypes: LabelTypeResponse[]
  boards: { [key: number]: Board }
  lists: { [key: number]: List }
  cards: { [key: number]: Card }
  checklists: { [key: number]: Checklist }
}

export const initialAppState: AppState = {
  boardKey: [],
  labelTypes: [],
  boards: {},
  lists: {},
  cards: {},
  checklists: {}
}

// This part is for splitting the reducer code
const passToBoardsReducer = (action: AnyAction): action is PayloadAction<any> => {
  return action.type.startsWith('boardActions/');
}
const passToListsReducer = (action: AnyAction): action is PayloadAction<any> => {
  return action.type.startsWith('listActions/');
}
const passToCardsReducer = (action: AnyAction): action is PayloadAction<any> => {
  return action.type.startsWith('cardActions/');
}
const passToChecklistsReducer = (action: AnyAction): action is PayloadAction<any> => {
  return action.type.startsWith('checklistActions/');
}

export const AppSlice = createReducer(
  initialAppState,
  (builder) => {
    builder
      .addMatcher(passToBoardsReducer, (state, action) => {
        return boardsReducer(state, action);
      })
      .addMatcher(passToListsReducer, (state, action) => {
        return listsReducer(state, action);
      })
      .addMatcher(passToCardsReducer, (state, action) => {
        return cardsReducer(state, action);
      })
      .addMatcher(passToChecklistsReducer, (state, action) => {
        return checklistsReducer(state, action);
      })
      .addDefaultCase((state, action) => {
        return OtherReducer(state, action)
      })
  }
)


