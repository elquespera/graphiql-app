import { API_BASE_URL } from '@/constants/constants';
import { IGraphQLQueryPartial, QueryHeader } from '@/types/types';
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
    .filter(([key]) => /^\S+$/.test(key))
    .forEach(([key, value]) => (axiosHeaders[key] = value));

  try {
    response = await api.post<object>('/', { query, variables }, { headers: axiosHeaders });
    result = response.data;
  } catch (e) {
    result = e;
  }
  return result;
}

export default function useGraphQlQuery(query: IGraphQLQueryPartial, manual = false) {
  const result = manual
    ? useSWRMutation<object>(query, fetcher)
    : useSWR<object>(query, fetcher, { suspense: true });

  return result;
}
