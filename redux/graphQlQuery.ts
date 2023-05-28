import { DEFAULT_API_URL } from '@/constants/apiUrls';
import { ApiUrlInfo, IGraphQLQuery, QueryHeader } from '@/types/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState: IGraphQLQuery = {
  url: DEFAULT_API_URL.url,
  query: DEFAULT_API_URL.exampleQuery || '',
  variables: DEFAULT_API_URL.exampleVariables,
  headers: [],
};

export const graphQlQuerySlice = createSlice({
  name: 'graphQlQuery',
  initialState,
  reducers: {
    setQueryUrl: (
      state,
      { payload: { url, exampleQuery, exampleVariables } }: PayloadAction<ApiUrlInfo>
    ) => {
      state.url = url;
      state.query = exampleQuery || '';
      state.variables = exampleVariables;
    },

    setQueryBody: (state, { payload }: PayloadAction<string>) => {
      state.query = payload;
    },

    setQueryVariables: (state, { payload }: PayloadAction<string>) => {
      state.variables = payload;
    },

    setQueryHeaders: (state, { payload }: PayloadAction<QueryHeader[]>) => {
      state.headers = payload;
    },

    addQueryHeader: (state, { payload: [key, value] }: PayloadAction<[string, string]>) => {
      state.headers.push({
        id: crypto.randomUUID(),
        key,
        value,
      });
    },

    deleteQueryHeader: (state, { payload: id }: PayloadAction<string>) => {
      const index = state.headers.findIndex((header) => header.id === id);
      if (index >= 0) state.headers.splice(index, 1);
    },

    updateQueryHeader: (state, { payload: header }: PayloadAction<QueryHeader>) => {
      const index = state.headers.findIndex(({ id }) => id === header.id);
      if (index >= 0) {
        state.headers[index].key = header.key;
        state.headers[index].value = header.value;
      }
    },
  },
});

export const {
  setQueryUrl,
  setQueryBody,
  setQueryVariables,
  setQueryHeaders,
  addQueryHeader,
  updateQueryHeader,
  deleteQueryHeader,
} = graphQlQuerySlice.actions;

export const selectGraphQlQuery = (state: RootState) => state.graphQlQuery;

export const graphQlQueryReducer = graphQlQuerySlice.reducer;
