import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import auth, { LoginRequest, RegisterRequest } from '../../services/http/endpoints/auth';


export const loginRequest = createAsyncThunk(
  'authActions/login',
  async (arg: { data: LoginRequest }, { rejectWithValue }) => {
    return auth.login(arg.data).then(response => response.data).catch(error => {
      return rejectWithValue(error.response.status)
    })
  }
);

export const registerRequest = createAsyncThunk(
  'authActions/register',
  async (arg: { data: RegisterRequest }, { rejectWithValue }) => {
    return auth.register(arg.data).then(response => response.data).catch(error => {
      return rejectWithValue(error.response.status)
    })
  }
);

export const logoutRequest = createAction('authActions/logout');
