import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { IGraphQLQuery, QueryHeader } from '@/types/types';
import { QUERY_EXAMPLE, VARIABLES_EXAMPLE } from '@/constants/queryExample';

const initialState: IGraphQLQuery = {
  query: QUERY_EXAMPLE,
  variables: VARIABLES_EXAMPLE,
  headers: { something: 'something' },
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

    addQueryHeader: (state, { payload: [key, value] }: PayloadAction<QueryHeader>) => {
      state.headers[key] = value;
    },

    removeQueryHeader: (state, { payload: key }: PayloadAction<string>) => {
      delete state.headers[key];
    },
  },
});

export const { setQuery, setQueryBody, setQueryVariables, addQueryHeader, removeQueryHeader } =
  graphQlQuerySlice.actions;

export const selectGraphQlQuery = (state: RootState) => state.graphQlQuery;

export const graphQlQueryReducer = graphQlQuerySlice.reducer;
