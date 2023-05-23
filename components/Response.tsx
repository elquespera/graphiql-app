import { basicSetup, codemirrorTheme } from '@/constants/codemiror';
import { useGraphQlMutation } from '@/hooks/useGraphQL';
import { selectGraphQlQuery } from '@/redux/graphQlQuery';
import { useAppSelector } from '@/redux/hooks';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { ClipboardIcon, PlayCircleIcon } from '@heroicons/react/24/solid';
import CodeMirror from '@uiw/react-codemirror';
import FlatButton from './FlatButton';
import Spinner from './Spinner';
import useTranslation from '@/hooks/useTranslation';

export default function Response() {
  const t = useTranslation();
  const query = useAppSelector(selectGraphQlQuery);
  const { data, error, isMutating: isLoading, trigger: fetchResponse } = useGraphQlMutation(query);

  const errorMsg = error && 'data' in error ? JSON.stringify(error.data, null, ' ') : '';

  return (
    <section className="flex flex-col p-4 gap-4">
      <div className="flex gap-2">
        <FlatButton round onClick={() => fetchResponse()}>
          <PlayCircleIcon className="w-5 h-5 text-[#de40a9]" />
        </FlatButton>
        <FlatButton round>
          <ClipboardIcon className="w-5 h-5" />
        </FlatButton>
      </div>
      <div className="overflow-auto flex-grow">
        {isLoading ? (
          <Spinner large center />
        ) : error || data ? (
          <CodeMirror
            className="w-full h-full cm-variables"
            value={error ? errorMsg : JSON.stringify(data, null, ' ')}
            extensions={error ? [json()] : [javascript()]}
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
          <p className="p-2 text-center">{t('click-to-fetch')}</p>
        )}
      </div>
    </section>
  );
}
