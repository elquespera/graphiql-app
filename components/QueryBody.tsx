import useTranslation from '@/hooks/useTranslation';
import { selectGraphQlQuery, setQueryBody } from '@/redux/graphQlQuery';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { codemirrorTheme, basicSetup } from '@/constants/codemiror';

export default function QueryBody() {
  const t = useTranslation();
  const dispatch = useAppDispatch();
  const { query } = useAppSelector(selectGraphQlQuery);

  const handleChange = (value: string) => {
    dispatch(setQueryBody(value));
  };

  return (
    <div className="bg-slate-950 flex-[2] p-4 flex flex-col basis-full">
      <h2>{t('query')}</h2>
      <CodeMirror
        className="flex-1 flex flex-col mt-2"
        value={query}
        onChange={handleChange}
        extensions={[javascript()]}
        theme={codemirrorTheme}
        basicSetup={basicSetup}
      />
    </div>
  );
}
