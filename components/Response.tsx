import { selectGraphQlQuery } from '@/redux/graphQlQuery';
import { useGraphQLMutation } from '@/redux/graphQlResponse';
import { useAppSelector } from '@/redux/hooks';
import { ClipboardIcon, PlayCircleIcon } from '@heroicons/react/24/solid';
import FlatButton from './FlatButton';
import Spinner from './Spinner';

export default function Response() {
  const query = useAppSelector(selectGraphQlQuery);
  const [queryGraphQL, { data, error, isError, isLoading }] = useGraphQLMutation();

  const errorMsg = error && 'data' in error ? JSON.stringify(error.data, null, ' ') : '';

  const handleSubmit = () => {
    queryGraphQL(query);
  };

  return (
    <div className="flex-1 p-4 md:pb-footer flex flex-col">
      <h1>Response</h1>
      <div className="flex flex-col">
        <div className="flex gap-2">
          <FlatButton round onClick={handleSubmit}>
            <PlayCircleIcon className="w-5 h-5" />
          </FlatButton>
          <FlatButton round>
            <ClipboardIcon className="w-5 h-5" />
          </FlatButton>
        </div>
        <pre className="mt-2 break-all whitespace-pre-wrap overflow-y-auto h-[calc(100vh-12rem)]">
          {isLoading ? (
            <Spinner />
          ) : isError ? (
            errorMsg
          ) : data ? (
            JSON.stringify(data, null, ' ')
          ) : (
            'Click Submit to fetch data'
          )}
        </pre>
      </div>
    </div>
  );
}
