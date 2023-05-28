import useTranslation from '@/hooks/useTranslation';
import {
  addQueryHeader,
  deleteQueryHeader,
  selectGraphQlQuery,
  setQueryHeaders,
  updateQueryHeader,
} from '@/redux/graphQlQuery';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { QueryHeader } from '@/types/types';
import { MinusCircleIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useRef, useState } from 'react';
import FlatButton from './FlatButton';

export default function QueryHeaders() {
  const t = useTranslation();
  const dispatch = useAppDispatch();
  const { headers } = useAppSelector(selectGraphQlQuery);

  const handleAddHeader = () => {
    dispatch(addQueryHeader(['', '']));
  };

  const handleClearAll = () => {
    dispatch(setQueryHeaders([]));
  };

  const handleDeleteHeader = (key: string) => {
    dispatch(deleteQueryHeader(key));
  };

  const handleUpdateHeader = (id: string, key: string, value: string) => {
    dispatch(updateQueryHeader({ id, key, value }));
  };

  return (
    <div className="bg-slate-950 flex-1 p-4 flex flex-col border-[1px] border-t-0 border-slate-700 focus:border-slate-700 h-full">
      <ul className="flex flex-col p-1 overflow-auto">
        {headers.map((header, index) => (
          <HeaderEntry
            key={header.id}
            last={index === headers.length - 1}
            data={header}
            onDelete={handleDeleteHeader}
            onUpdate={handleUpdateHeader}
          />
        ))}
      </ul>
      <div className="mt-auto flex gap-2">
        <FlatButton onClick={handleAddHeader}>
          <PlusCircleIcon className="w-5 h-5" />
          {t('add-header')}
        </FlatButton>

        <FlatButton onClick={handleClearAll}>
          <MinusCircleIcon className="w-5 h-5" />
          {t('clear-all')}
        </FlatButton>
      </div>
    </div>
  );
}

interface HeaderEntryProps {
  data: QueryHeader;
  last?: boolean;
  onDelete: (id: string) => void;
  onUpdate: (id: string, key: string, value: string) => void;
}

function HeaderEntry({ data, last, onDelete, onUpdate }: HeaderEntryProps) {
  const t = useTranslation();

  const [key, setKey] = useState(data.key);
  const [value, setValue] = useState(data.value);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleUpdate = () => {
    onUpdate(data.id, key, value);
  };

  useEffect(() => {
    setKey(data.key);
    setValue(data.value);
  }, [data]);

  useEffect(() => {
    if (last) {
      inputRef.current?.focus();
    }
  }, [inputRef, last]);

  return (
    <li className="group relative grid grid-cols-[1fr,1fr,auto] gap-1">
      <input
        name="key"
        className="text-inherit min-w-min px-2 py-1 bg-inherit"
        ref={inputRef}
        value={key}
        size={3}
        pattern=".*"
        placeholder={t('key')}
        onBlur={handleUpdate}
        onChange={handleKeyChange}
      />
      <input
        name="value"
        size={5}
        className="text-inherit min-w-min px-2 py-1 bg-inherit"
        value={value}
        placeholder={t('value')}
        onBlur={handleUpdate}
        onChange={handleValueChange}
      />
      <FlatButton round onClick={() => onDelete(data.id)}>
        <TrashIcon className="w-5 h-5" />
      </FlatButton>
    </li>
  );
}
