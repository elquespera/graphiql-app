import { selectGraphQlQuery, setQueryBody } from '@/redux/graphQlQuery';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React from 'react';

export default function Operations() {
  const dispatch = useAppDispatch();
  const { query } = useAppSelector(selectGraphQlQuery);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    dispatch(setQueryBody(event.target.value));
  };

  return (
    <div className="bg-slate-950 flex-[2] p-4 flex flex-col">
      <h2>Operations</h2>
      <div className="flex-1 flex flex-col overflow-y-scroll mt-2">
        <textarea
          className="flex-1 bg-inherit text-inherit"
          value={query}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
