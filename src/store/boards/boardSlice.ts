import { createReducer } from '@reduxjs/toolkit';
import { formatBoardData } from '../../helpers/dataFormatter';
import { AppState } from '../app/appSlice';
import { createBoardRequest, updateBoardRequest, deleteBoardRequest, getBoardRequest, getBoardListRequest, addMemberRequest, removeMemberRequest } from './boardActions';

type Member = {
  id?: number;
  username: string;
  createdAt?: string;
  updatedAt?: string;
  BoardMember: {
    id: number;
    boardId: number;
    userId: number;
    updatedAt: string;
    createdAt: string;
  }
}

export type Board = {
  id: number;
  ownerId: number;
  title: string;
  updatedAt?: string;
  createdAt?: string;
  listIDs: number[]
  members: Member[]
  owner?: {
    id: number;
    username: string;
    createdAt?: string;
    updatedAt?: string;
  }
}
const initialAppState: AppState = {
  boardKey: [],
  labelTypes: [],
  boards: {},
  lists: {},
  cards: {},
  checklists: {}
}

export const boardsReducer = createReducer(
  initialAppState,
  (builder) => {
    builder
      .addCase(createBoardRequest.fulfilled, (state, action) => {
        const boardId = action.payload.id;
        const board = action.payload;
        state.boards[boardId] = { ...board, listIDs: [], members: [] };
        state.boardKey.push(action.payload.id);
      })
      .addCase(updateBoardRequest.fulfilled, (state, action) => {
        const boardId = action.meta.arg.boardId;
        const updateData = action.meta.arg.data;
        let boardData = state.boards[boardId];
        boardData = { ...boardData, ...updateData }
        state.boards[boardId] = boardData
      })
      .addCase(deleteBoardRequest.fulfilled, (state, action) => {
        const boardId = action.meta.arg.boardId;
        const listIDs = state.boards[boardId].listIDs;
        listIDs.forEach(listID => {
          const cardIDs = state.lists[listID].cardIDs;
          cardIDs.forEach(cardID => {
            const checklistIDs = state.cards[cardID].checklistIDs;
            checklistIDs.forEach(checklistID => {
              delete state.checklists[checklistID];
            })
            delete state.cards[cardID];
          })
          delete state.lists[listID];
        })
        delete state.boards[boardId];
        const index = state.boardKey.indexOf(boardId);
        state.boardKey.splice(index, 1);
      })
      .addCase(getBoardRequest.pending, (state) => {
      })
      .addCase(getBoardRequest.fulfilled, (state, action) => {
        const { boardData, listsData, cardsData, checklistsData } = formatBoardData(action.payload);
        state.boards = { ...state.boards, ...boardData }
        state.lists = { ...state.lists, ...listsData }
        state.cards = { ...state.cards, ...cardsData }
        state.checklists = { ...state.checklists, ...checklistsData }
      })
      .addCase(getBoardListRequest.pending, (state) => {
      })
      .addCase(getBoardListRequest.fulfilled, (state, action) => {
        const boardKey: number[] = []
        action.payload.forEach((board:any) => {
          state.boards[board.id] = { ...board, listIDs: [] };
          boardKey.push(board.id);
        });
        state.boardKey = boardKey;
      })
      .addCase(addMemberRequest.fulfilled, (state, action) => {
        const boardId = action.meta.arg.data.boardId;
        const username = action.meta.arg.data.username;
        state.boards[boardId].members.push({ username, BoardMember: { ...action.payload } })
      })
      .addCase(removeMemberRequest.fulfilled, (state, action) => {
        const boardId = action.meta.arg.boardId;
        const memberID = action.meta.arg.memberID;
        const memberIndex = state.boards[boardId].members.findIndex(member => member.BoardMember.id === memberID);
        state.boards[boardId].members.splice(memberIndex, 1);
      })
  }
);
