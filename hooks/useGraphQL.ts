import { API_BASE_URL } from '@/constants/constants';
import { IGraphQLQueryPartial } from '@/types/types';
import axios, { AxiosHeaders } from 'axios';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

export const api = axios.create({ baseURL: API_BASE_URL });

async function fetcher({ query, variables, headers }: IGraphQLQueryPartial) {
  let result = undefined;
  let response;
  const axiosHeaders = new AxiosHeaders();

  headers
    ?.map(({ key, value }) => [key.trim(), value.trim()])
    .forEach(([key, value]) => (axiosHeaders[key] = value));

  try {
    response = await api.post<object>('/', { query, variables }, { headers: axiosHeaders });
    result = response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      result = e.response?.data || e.request?.data;
    } else {
      if (e instanceof Error) {
        const error = e as Error;
        result = error.message;
      } else {
        result = e;
      }
    }
  }
  return result;
}

export function useGraphQlQuery(query: IGraphQLQueryPartial) {
  return useSWR<object>(query, fetcher, { suspense: true });
}

export function useGraphQlMutation(query: IGraphQLQueryPartial) {
  return useSWRMutation<object>(query, fetcher);
}
