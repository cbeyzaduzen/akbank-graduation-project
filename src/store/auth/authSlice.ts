import { createReducer } from '@reduxjs/toolkit';
import { clearUserData } from '../../helpers/userDataFormatter';
import { getCookie } from '../../helpers/cookies';
import { saveUserData } from '../../helpers/userDataFormatter';
import {  loginRequest, logoutRequest, registerRequest } from './authActions';
import auth from '../../services/http/endpoints/auth';

export type AuthState = {
  userId: number | null;
  username: string | null;
}

export const initialAuthState: AuthState = {
  userId: Number(getCookie('userId')),
  username: getCookie('username')
}

export const authSlice = createReducer(
  initialAuthState,
  (builder) => {
    builder
      .addCase(loginRequest.fulfilled, (state, action) => {
        saveUserData(action.payload);
        state.userId = action.payload.id;
        state.username = action.payload.username;
      })
      .addCase(registerRequest.fulfilled, (state, action) => {
        saveUserData(action.payload);
        state.userId = action.payload.id;
        state.username = action.payload.username;
      })
      .addCase(logoutRequest, (state) => {
        auth.logout();
        clearUserData();
        state.userId = null;
        state.username = null;
      })
  }
);
