import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { IAuth } from '@/types/types';

const initialState: IAuth = { isAuth: false };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth: (state, { payload }: PayloadAction<IAuth>) => {
      state.isAuth = payload.isAuth;
      state.userEmail = payload.userEmail;
    },
  },
});

export const { setIsAuth } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export const authReducer = authSlice.reducer;
