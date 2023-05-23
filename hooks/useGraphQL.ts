import { selectGraphQlQuery } from '@/redux/graphQlQuery';
import { useAppSelector } from '@/redux/hooks';
import { IGraphQLQueryPartial } from '@/types/types';
import axios, { AxiosHeaders } from 'axios';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

async function fetcher({ url, query, variables, headers }: IGraphQLQueryPartial) {
  let result = undefined;
  let response;
  const axiosHeaders = new AxiosHeaders();

  headers
    ?.map(({ key, value }) => [key.trim(), value.trim()])
    .forEach(([key, value]) => (axiosHeaders[key] = value));

  try {
    const api = axios.create({ baseURL: url });
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
  const { url } = useAppSelector(selectGraphQlQuery);

  return useSWR<object>({ ...query, url }, fetcher, { suspense: true });
}

export function useGraphQlMutation(query: IGraphQLQueryPartial) {
  const { url } = useAppSelector(selectGraphQlQuery);

  return useSWRMutation<object>({ ...query, url }, fetcher);
}
