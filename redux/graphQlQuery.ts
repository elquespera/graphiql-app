import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { IGraphQLQuery } from '@/types/types';
import { QUERY_EXAMPLE, VARIABLES_EXAMPLE } from '@/constants/queryExample';

const initialState: IGraphQLQuery = {
  query: QUERY_EXAMPLE,
  variables: VARIABLES_EXAMPLE,
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
  },
});

export const { setQuery, setQueryBody, setQueryVariables } = graphQlQuerySlice.actions;

export const selectGraphQlQuery = (state: RootState) => state.graphQlQuery;

export const graphQlQueryReducer = graphQlQuerySlice.reducer;
