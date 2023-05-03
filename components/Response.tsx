import { selectGraphQlQuery } from '@/redux/graphQlQuery';
import { useGraphQLMutation } from '@/redux/graphQlResponse';
import { useAppSelector } from '@/redux/hooks';

export default function Response() {
  const query = useAppSelector(selectGraphQlQuery);
  const [queryGraphQL, { data, error, isError, isLoading }] = useGraphQLMutation();

  const errorMsg = error && 'data' in error ? JSON.stringify(error.data) : '';

  const handleSubmit = () => {
    queryGraphQL(query);
  };

  return (
    <div className="flex-1 p-4 flex flex-col overflow-hidden">
      <h1>Response</h1>
      <div className="flex flex-col">
        <button onClick={handleSubmit} className="bg-slate-100 text-slate-800 p-2">
          Submit
        </button>
        <div className="mt-2 break-all overflow-y-scroll">
          {isLoading
            ? 'Loading...'
            : isError
            ? errorMsg
            : data
            ? JSON.stringify(data)
            : 'Click Submit to fetch data'}
        </div>
      </div>
    </div>
  );
}
