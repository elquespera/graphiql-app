import { Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { MouseEvent, useState } from 'react';
import QueryVariables from './QueryVariables';
import QueryHeaders from './QueryHeaders';

export default function QueryOptions() {
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
        aria-expanded="true"
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
            Variables
          </button>
          <button
            type="button"
            className={`${
              showHeaders ? 'text-gray-300 bg-gray-800' : ''
            } hover:bg-gray-800 p-2 rounded-lg`}
            onClick={handleShowSection}
            aria-label="headers"
          >
            Headers
          </button>
        </div>
        <button
          onClick={handleShowSection}
          aria-label="caret"
          className={`${showSection ? 'text-gray-200' : ''} hover:bg-gray-800 p-2 rounded-lg`}
        >
          {!showSection && <ChevronDownIcon className="w-6" />}
          {showSection && <ChevronUpIcon className="w-6" />}
        </button>
      </h2>
      <Transition
        show={showSection}
        enter="transition-all ease duration-200"
        enterFrom="h-0"
        enterTo="h-40"
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
