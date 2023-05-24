import { API_URLS, DEFAULT_API_URL } from '@/constants/apiUrls';
import useTranslation from '@/hooks/useTranslation';
import { setQueryUrl } from '@/redux/graphQlQuery';
import { useAppDispatch } from '@/redux/hooks';
import { ApiUrlInfo } from '@/types/types';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Fragment, useState } from 'react';

export default function UrlSelect() {
  const dispatch = useAppDispatch();
  const t = useTranslation();

  const [selected, setSelected] = useState(DEFAULT_API_URL);
  const [query, setQuery] = useState('');

  const filtered =
    query === ''
      ? API_URLS
      : API_URLS.filter(({ url }) =>
          url.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  const handleSelect = (value: ApiUrlInfo) => {
    setSelected(value);
    dispatch(setQueryUrl(value));
  };

  return (
    <div className="flex-grow">
      <Combobox value={selected} onChange={handleSelect}>
        <div className="relative mt-1">
          <label className="relative flex w-full cursor-default text-slate-400 overflow-hidden focus-within:text-slate-300 ">
            <GlobeAltIcon className="w-5 h-5 ml-3" />
            <Combobox.Input
              className="w-full border-none py-0 pl-2 pr-10 text-sm leading-5 bg-transparent focus:ring-0"
              displayValue={({ url }: ApiUrlInfo) => url}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
            </Combobox.Button>
          </label>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {query.length > 0 && (
                <Combobox.Option value={{ id: null, url: padUrl(query) }}>{`Select ${padUrl(
                  query
                )}`}</Combobox.Option>
              )}
              {filtered.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-slate-400">
                  {t('nothing-found')}
                </div>
              ) : (
                filtered.map((url) => (
                  <Combobox.Option
                    key={url.id}
                    className={({ active }) =>
                      clsx(
                        `relative cursor-default select-none py-2 pl-10 pr-4`,
                        active ? 'bg-indigo-600 text-white' : 'text-slate-100'
                      )
                    }
                    value={url}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                        >
                          {url.url}
                        </span>
                        {selected ? (
                          <span className={`absolute inset-y-0 left-0 flex items-center pl-3`}>
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}

function padUrl(url: string) {
  const padding = 'https://';
  return url.startsWith(padding) ? url : `${padding}${url}`;
}
