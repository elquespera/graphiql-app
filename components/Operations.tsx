import { setQueryBody } from '@/redux/graphQlQuery';
import { useAppDispatch } from '@/redux/hooks';
import React, { useState } from 'react';

export default function Operations() {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    dispatch(setQueryBody(value));
  };

  return (
    <div className="bg-slate-950 flex-[2] p-4 flex flex-col">
      <h2>Operations</h2>
      <div className="flex flex-col flex-1 overflow-y-scroll mt-2">
        <textarea
          className="flex-1 bg-inherit text-inherit"
          value={value}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
