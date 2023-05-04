import { selectGraphQlQuery } from '@/redux/graphQlQuery';
import { useGraphQLMutation } from '@/redux/graphQlResponse';
import { useAppSelector } from '@/redux/hooks';

export default function Response() {
  const query = useAppSelector(selectGraphQlQuery);
  const [queryGraphQL, { data, error, isError, isLoading }] = useGraphQLMutation();

  const errorMsg = error && 'data' in error ? JSON.stringify(error.data, null, ' ') : '';

  const handleSubmit = () => {
    queryGraphQL(query);
  };

  return (
    <div className="flex-1 p-4 flex flex-col">
      <h1>Response</h1>
      <div className="flex flex-col">
        <button onClick={handleSubmit} className="bg-slate-100 text-slate-800 p-2">
          Submit
        </button>
        <pre className="mt-2 break-all whitespace-pre-wrap overflow-y-auto h-[calc(100vh-12rem)]">
          {isLoading
            ? 'Loading...'
            : isError
            ? errorMsg
            : data
            ? JSON.stringify(data, null, ' ')
            : 'Click Submit to fetch data'}
        </pre>
      </div>
    </div>
  );
}
