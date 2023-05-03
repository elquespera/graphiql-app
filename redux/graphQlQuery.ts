import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { IGraphQLQuery } from "@/types/types";

const initialState: IGraphQLQuery = { query: "" };

export const graphQlQuerySlice = createSlice({
  name: "graphQlQuery",
  initialState,
  reducers: {
    setQuery: (state, { payload }: PayloadAction<IGraphQLQuery>) => {
      state.query = payload.query;
      state.variables = payload.variables;
    },

    setQueryBody: (state, { payload }: PayloadAction<string>) => {
      state.query = payload;
    },
  },
});

export const { setQuery, setQueryBody } = graphQlQuerySlice.actions;

export const selectGraphQlQuery = (state: RootState) => state.graphQlQuery;

export const graphQlQueryReducer = graphQlQuerySlice.reducer;
