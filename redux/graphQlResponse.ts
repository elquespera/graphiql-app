import { IGraphQLQuery } from '@/types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const graphQlResponseSlice = createApi({
  reducerPath: 'graphQlResponse',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://graphqlpokemon.favware.tech',
  }),
  endpoints: (builder) => ({
    graphQL: builder.mutation<object, IGraphQLQuery>({
      query: (payload: IGraphQLQuery) => ({
        url: '/',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json',
        },
      }),
    }),
  }),
});

export const { useGraphQLMutation } = graphQlResponseSlice;
