import { LANGUAGE_NAMES } from '@/constants/constants';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectSettings, setAppLanguage } from '@/redux/settings';
import { AppLanguage } from '@/types/types';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import React from 'react';

type LanguageSwitchProps = React.HTMLProps<HTMLDivElement>;

export default function LanguageSwitch({ className, ...props }: LanguageSwitchProps) {
  const { language } = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();

  const setLanguage = (value: AppLanguage) => {
    dispatch(setAppLanguage(value));
  };

  return (
    <div {...props} className={className}>
      <Listbox value={language} onChange={setLanguage}>
        <div className="relative">
          <Listbox.Button className="relative flex gap-1 items-center cursor-default rounded-lg py-2 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300">
            <span>{language}</span>
            <ChevronUpDownIcon className="h-5 w-5 text-slate-300" aria-hidden="true" />
          </Listbox.Button>
          <Transition
            as={React.Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 min-w-[8rem] overflow-auto rounded-md bg-slate-950  py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {Object.entries(LANGUAGE_NAMES).map(([lang, name]) => (
                <Listbox.Option
                  key={lang}
                  className={({ active }) =>
                    clsx(
                      `relative cursor-default select-none py-2 pl-10 pr-4`,
                      active ? 'bg-indigo-800 text-white' : 'text-slate-100'
                    )
                  }
                  value={lang}
                >
                  {({ selected }) => (
                    <>
                      <span className={clsx(selected ? 'font-medium' : 'font-normal')}>{name}</span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-100">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
