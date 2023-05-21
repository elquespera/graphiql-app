import { selectGraphQlQuery } from '@/redux/graphQlQuery';
import { useLazyGraphQLQuery } from '@/redux/graphQlResponse';
import { useAppSelector } from '@/redux/hooks';
import { ClipboardIcon, PlayCircleIcon } from '@heroicons/react/24/solid';
import FlatButton from './FlatButton';
import Spinner from './Spinner';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { codemirrorTheme, basicSetup } from '@/constants/codemiror';

export default function Response() {
  const query = useAppSelector(selectGraphQlQuery);
  const [queryGraphQL, { data, error, isError, isLoading }] = useLazyGraphQLQuery();

  const errorMsg = error && 'data' in error ? JSON.stringify(error.data, null, ' ') : '';

  const handleSubmit = () => {
    queryGraphQL(query);
  };

  return (
    <div className="flex-1 p-4 flex flex-col">
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
          ) : isError || data ? (
            <CodeMirror
              className="w-full h-full cm-variables"
              value={isError ? errorMsg : JSON.stringify(data, null, ' ')}
              extensions={isError ? [json()] : [javascript()]}
              theme={codemirrorTheme}
              basicSetup={{
                ...basicSetup,
                highlightActiveLine: false,
                highlightSelectionMatches: false,
              }}
              readOnly={true}
              editable={false}
            />
          ) : (
            'Click to fetch response'
          )}
        </pre>
      </div>
    </div>
  );
}
