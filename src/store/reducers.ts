import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { AppSlice } from './app/appSlice';
import { authSlice } from './auth/authSlice';
import { BoardStatusSlice } from './boardStatus/boardStatusSlice';

export const store = configureStore({
  reducer: {
    'app': AppSlice,
    'auth': authSlice,
    'status': BoardStatusSlice
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;