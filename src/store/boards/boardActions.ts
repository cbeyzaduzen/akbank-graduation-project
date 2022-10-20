import { createAsyncThunk } from '@reduxjs/toolkit';
import boardRequests, { BoardRequest } from '../../services/http/endpoints/board';
import memberRequests, { UserRequest } from '../../services/http/endpoints/user';

export const createBoardRequest = createAsyncThunk(
  'boardActions/createBoard',
  async (arg: { data: BoardRequest }) => {
    return boardRequests.create(arg.data).then((res:any) => res.data);
  }
);

export const updateBoardRequest = createAsyncThunk(
  'boardActions/updateBoard',
  async (arg: { boardId: number, data: BoardRequest }) => {
    return boardRequests.update(arg.boardId, arg.data).then((res:any) => res.data);
  }
);

export const deleteBoardRequest = createAsyncThunk(
  'boardActions/deleteBoard',
  async (arg: { boardId: number }) => {
    return boardRequests.destroy(arg.boardId).then((res:any) => res.data);
  }
);

export const getBoardRequest = createAsyncThunk(
  'boardActions/getBoard',
  async (arg: { boardId: number }) => {
    return boardRequests.getById(arg.boardId).then((res:any) => res.data);
  }
);

export const getBoardListRequest = createAsyncThunk(
  'boardActions/getBoardList',
  async () => {
    return boardRequests.getList().then((res:any) => res.data);
  }
);

export const addMemberRequest = createAsyncThunk(
  'boardActions/addMember',
  async (arg: { data: UserRequest }) => {
    return memberRequests.create(arg.data).then((res:any) => res.data);
  }
);

export const removeMemberRequest = createAsyncThunk(
  'boardActions/removeMember',
  async (arg: { memberID: number, boardId: number }) => {
    return memberRequests.destroy(arg.memberID).then((res:any) => res.data);
  }
);

export const getMemberListRequest = createAsyncThunk(
  'boardActions/getMemberList',
  async (arg: { boardId: number }) => {
    return memberRequests.getList(arg.boardId).then((res:any) => res.data);
  }
);