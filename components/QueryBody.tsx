import useTranslation from '@/hooks/useTranslation';
import { selectGraphQlQuery, setQueryBody } from '@/redux/graphQlQuery';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React from 'react';

export default function QueryBody() {
  const t = useTranslation();
  const dispatch = useAppDispatch();
  const { query } = useAppSelector(selectGraphQlQuery);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    dispatch(setQueryBody(event.target.value));
  };

  return (
    <div className="bg-slate-950 flex-[2] p-4 flex flex-col basis-full">
      <h2>{t('query')}</h2>
      <div className="flex-1 flex flex-col mt-2">
        <textarea
          className="flex-1 bg-inherit text-inherit border-gray-700 focus:border-gray-700 resize-none focus:ring-4 focus:ring-gray-800"
          value={query}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
