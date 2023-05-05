import { DEFAULT_LANGUAGE } from '@/constants/constants';
import { AppLanguage, ISettings } from '@/types/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from './store';

const initialState: ISettings = { language: DEFAULT_LANGUAGE };

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setAppLanguage: (state, { payload }: PayloadAction<AppLanguage>) => {
      state.language = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase<typeof HYDRATE, PayloadAction<RootState, typeof HYDRATE>>(
      HYDRATE,
      (state, { payload }) => ({ ...state, ...payload.settings })
    );
  },
});

export const { setAppLanguage } = settingsSlice.actions;

export const selectSettings = (state: RootState) => state.settings;

export const settingsReducer = settingsSlice.reducer;
