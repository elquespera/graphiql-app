import useTranslation from '@/hooks/useTranslation';
import { Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { MouseEvent, useState } from 'react';
import FlatButton from './FlatButton';
import QueryHeaders from './QueryHeaders';
import QueryVariables from './QueryVariables';

export default function QueryOptions() {
  const t = useTranslation();

  const [showSection, setShowSection] = useState(false);
  const [showVars, setShowVars] = useState(false);
  const [showHeaders, setShowHeaders] = useState(false);

  function handleShowSection(event: MouseEvent) {
    const btnLabel = event.currentTarget.ariaLabel;
    if (btnLabel === 'caret') {
      setShowSection((prev) => !prev);
      setShowVars(true);
      if (showSection) {
        setShowVars(false);
        setShowHeaders(false);
      }
    }
    if (btnLabel === 'vars') {
      if (!showSection) setShowSection(true);
      setShowVars(true);
      setShowHeaders(false);
    }
    if (btnLabel === 'headers') {
      if (!showSection) setShowSection(true);
      setShowVars(false);
      setShowHeaders(true);
    }
  }

  return (
    <div className="bg-slate-950 flex-1 p-4 flex flex-col" aria-expanded={showSection}>
      <h2
        id="accordion-collapse-head"
        className="flex justify-between items-center w-full text-gray-500 p-2 border rounded-t-xl focus:ring-4 focus:ring-gray-800 border-gray-700"
        aria-controls="accordion-collapse-body"
      >
        <div className="space-x-4">
          <button
            type="button"
            className={`${
              showVars ? 'text-gray-300 bg-gray-800' : ''
            } hover:bg-gray-800 p-2 rounded-lg`}
            onClick={handleShowSection}
            aria-label="vars"
          >
            {t('variables')}
          </button>
          <button
            type="button"
            className={`${
              showHeaders ? 'text-gray-300 bg-gray-800' : ''
            } hover:bg-gray-800 p-2 rounded-lg`}
            onClick={handleShowSection}
            aria-label="headers"
          >
            {t('headers')}
          </button>
        </div>
        <FlatButton round onClick={handleShowSection} aria-label="caret">
          <ChevronDownIcon className={clsx('w-6', !showSection && 'rotate-180')} />
        </FlatButton>
      </h2>
      <Transition
        show={showSection}
        enter="transition-all ease duration-200"
        enterFrom="h-0"
        enterTo="h-[20vh]"
        leave="transition-all ease duration-200"
        leaveFrom="h-40"
        leaveTo="h-0"
        id="accordion-collapse-body1"
        aria-labelledby="accordion-collapse-head"
      >
        {showVars && <QueryVariables />}
        {showHeaders && <QueryHeaders />}
      </Transition>
    </div>
  );
}
