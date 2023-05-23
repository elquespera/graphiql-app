import { basicSetup, codemirrorTheme } from '@/constants/codemiror';
import { useGraphQlMutation } from '@/hooks/useGraphQL';
import useTranslation from '@/hooks/useTranslation';
import { selectGraphQlQuery } from '@/redux/graphQlQuery';
import { useAppSelector } from '@/redux/hooks';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { PlayCircleIcon } from '@heroicons/react/24/solid';
import CodeMirror from '@uiw/react-codemirror';
import { useEffect } from 'react';
import FlatButton from './FlatButton';
import Spinner from './Spinner';

export default function Response() {
  const t = useTranslation();
  const query = useAppSelector(selectGraphQlQuery);
  const { data, error, isMutating: isLoading, trigger: fetchResponse } = useGraphQlMutation(query);

  const errorMsg = error && 'data' in error ? JSON.stringify(error.data, null, ' ') : '';

  useEffect(() => {}, [query.url]);

  return (
    <section className="flex flex-col p-4 gap-4">
      <FlatButton className="flex-shrink-0" onClick={() => fetchResponse()}>
        <PlayCircleIcon className="w-5 h-5 text-fuchsia-600" />
        {t('run-query')}
      </FlatButton>
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
