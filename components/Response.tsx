import { basicSetup, codemirrorTheme } from '@/constants/codemiror';
import { useGraphQlMutation } from '@/hooks/useGraphQL';
import useTranslation from '@/hooks/useTranslation';
import { selectGraphQlQuery } from '@/redux/graphQlQuery';
import { useAppSelector } from '@/redux/hooks';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { PlayCircleIcon } from '@heroicons/react/24/solid';
import CodeMirror from '@uiw/react-codemirror';
import { useEffect, useState } from 'react';
import FlatButton from './FlatButton';
import Spinner from './Spinner';

export default function Response() {
  const t = useTranslation();
  const query = useAppSelector(selectGraphQlQuery);
  const { data, isMutating: isLoading, trigger: fetchResponse, reset } = useGraphQlMutation(query);

  const [error, setError] = useState<object>();

  const handleSubmit = async () => {
    try {
      await fetchResponse();
    } catch (e) {
      if (e instanceof Object) setError(e);
    }
  };

  useEffect(() => {
    reset();
  }, [query.url]);

  useEffect(() => {
    if (data) setError(undefined);
  }, [data]);

  return (
    <section className="flex flex-col p-4 gap-4">
      <FlatButton onClick={handleSubmit}>
        <PlayCircleIcon className="w-7 h-7 text-fuchsia-600" />
        {t('run-query')}
      </FlatButton>
      <div className="overflow-auto flex-grow">
        {isLoading ? (
          <Spinner large center />
        ) : error || data ? (
          <CodeMirror
            className="w-full h-full cm-variables"
            value={JSON.stringify(error || data, null, ' ')}
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
          <p className="p-2 text-center">
            {t('click')}
            {' "'}
            <span className="italic font-semibold text-slate-100">{t('run-query')}</span>
            {'" '}
            {t('click-to-fetch')}
          </p>
        )}
      </div>
    </section>
  );
}
