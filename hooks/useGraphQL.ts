import { selectGraphQlQuery } from '@/redux/graphQlQuery';
import { useAppSelector } from '@/redux/hooks';
import { IGraphQLQueryPartial } from '@/types/types';
import axios, { AxiosHeaders } from 'axios';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

export async function fetcher({ url, query, variables, headers }: IGraphQLQueryPartial) {
  let response;
  const axiosHeaders = new AxiosHeaders();

  headers
    ?.map(({ key, value }) => [key.trim(), value.trim()])
    .forEach(([key, value]) => (axiosHeaders[key] = value));

  try {
    const api = axios.create({ baseURL: url });
    response = await api.post<object>('/', { query, variables }, { headers: axiosHeaders });
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.response?.data || e.request?.data || { error: e.message };
    } else {
      if (e instanceof Error) {
        return { error: e.message };
      } else {
        return e;
      }
    }
  }
}

export function useGraphQlQuery(query: IGraphQLQueryPartial) {
  const { url } = useAppSelector(selectGraphQlQuery);

  return useSWR<object>({ ...query, url }, fetcher, {
    suspense: true,
    onError(err, key, config) {
      console.log(err);
    },
  });
}

export function useGraphQlMutation(query: IGraphQLQueryPartial) {
  return useSWRMutation<object>(query, fetcher);
}
