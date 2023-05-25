import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { IGraphQLQuery, QueryHeader } from '@/types/types';
import { QUERY_EXAMPLE, VARIABLES_EXAMPLE } from '@/constants/exampleQuery';

const initialState: IGraphQLQuery = {
  query: QUERY_EXAMPLE,
  variables: VARIABLES_EXAMPLE,
  headers: [],
};

export const graphQlQuerySlice = createSlice({
  name: 'graphQlQuery',
  initialState,
  reducers: {
    setQuery: (state, { payload }: PayloadAction<IGraphQLQuery>) => {
      state.query = payload.query;
      state.variables = payload.variables;
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
  setQuery,
  setQueryBody,
  setQueryVariables,
  setQueryHeaders,
  addQueryHeader,
  updateQueryHeader,
  deleteQueryHeader,
} = graphQlQuerySlice.actions;

export const selectGraphQlQuery = (state: RootState) => state.graphQlQuery;

export const graphQlQueryReducer = graphQlQuerySlice.reducer;
