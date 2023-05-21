import { API_BASE_URL } from '@/constants/constants';
import { IGraphQLQuery } from '@/types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const graphQlResponseSlice = createApi({
  reducerPath: 'graphQlResponse',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (builder) => ({
    graphQL: builder.query<object, IGraphQLQuery>({
      query: (payload: IGraphQLQuery) => ({
        url: '/',
        method: 'POST',
        body: {
          query: payload.query,
          variables: payload.variables,
        },
        headers: payload.headers
          ? [
              ...payload.headers
                .map(({ key, value }) => [key.trim(), value.trim()])
                .filter(([key]) => /^\S+$/.test(key)),
            ]
          : undefined,
      }),
    }),
  }),
});

export const { useLazyGraphQLQuery } = graphQlResponseSlice;
