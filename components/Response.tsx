import { selectGraphQlQuery } from '@/redux/graphQlQuery';
import { useGraphQLMutation } from '@/redux/graphQlResponse';
import { useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';

export default function Response() {
  const query = useAppSelector(selectGraphQlQuery);

  const [queryGraphQL, response] = useGraphQLMutation();

  useEffect(() => {
    queryGraphQL(query);
  }, [query, queryGraphQL]);

  return (
    <div className="flex-1 p-4 flex flex-col">
      <h1>Response</h1>
      <div className="flex-1 overflow-y-scroll mt-2 overflow-hidden break-all">
        {response.data ? JSON.stringify(response.data) : 'Not fetched'}
      </div>
    </div>
  );
}
