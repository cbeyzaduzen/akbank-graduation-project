import { AnyAction, createAction, createReducer, isAllOf, isAnyOf, isFulfilled, isPending, isRejected, PayloadAction } from '@reduxjs/toolkit'
import { getBoardRequest, getBoardListRequest } from '../boards/boardActions'

type Status = {
  appStatus: 'idle' | 'loading'
  pending: boolean
  pendingCount: number
  errorCode: number
}

const initialState: Status = {
  appStatus: 'idle',
  pending: false,
  pendingCount: 0,
  errorCode: 0
}

export const clearErrors = createAction('clearErrors');

const authAction = (action: AnyAction): action is PayloadAction<any> => {
  return action.type.startsWith('authActions/');
}

export const BoardStatusSlice = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(getBoardRequest.pending, (state) => {
        state.appStatus = 'loading';
        state.errorCode = 0
      })
      .addCase(getBoardRequest.fulfilled, (state) => {
        state.appStatus = 'idle';
      })
      .addCase(getBoardRequest.rejected, (state, action) => {
        if (typeof action.payload === 'number') {
          state.errorCode = action.payload
        }
        state.appStatus = 'idle';
      })
      .addCase(getBoardListRequest.pending, (state) => {
        state.appStatus = 'loading';
        state.errorCode = 0
      })
      .addCase(getBoardListRequest.fulfilled, (state) => {
        state.appStatus = 'idle';
      })
      .addCase(getBoardListRequest.rejected, (state, action) => {
        if (typeof action.payload === 'number') {
          state.errorCode = action.payload;
        }
        state.appStatus = 'idle'
      })
      .addCase(clearErrors, (state) => {
        state.errorCode = 0;
      })
      .addMatcher(isAllOf(authAction, isPending), (state) => {
        state.appStatus = 'loading'
        state.errorCode = 0
      })
      .addMatcher(isAllOf(authAction, isRejected), (state, action) => {
        if (typeof action.payload === 'number') {
          state.errorCode = action.payload;
        }
        state.appStatus = 'idle'
      })
      .addMatcher(isPending, (state) => {
        state.pendingCount++;
        state.pending = true;
      })
      .addMatcher(isAnyOf(isFulfilled, isRejected), (state) => {
        state.pendingCount--;
        if (state.pendingCount === 0) {
          state.pending = false;
        }
      })
      .addDefaultCase((state) => state)
  })