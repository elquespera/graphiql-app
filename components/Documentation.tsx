import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { DocumentIcon } from '@heroicons/react/24/solid';

export default function Documentation() {
  const [showDocs, setShowDocs] = useState(false);
  return (
    <>
      <button
        className="absolute left-36 top-16 z-0 p-1 border border-gray-700 rounded-xl"
        title="Documentations"
        onClick={() => setShowDocs((prev) => !prev)}
      >
        <DocumentIcon className="w-6" />
      </button>
      <Transition
        show={showDocs}
        enter="transition-all ease duration-200"
        enterFrom="h-0 md:w-0 "
        enterTo="h-96 md:w-96"
        leave="transition-all ease duration-200"
        leaveFrom="h-96 md:w-96"
        leaveTo="h-0 md:w-0"
        id="accordion-collapse-body1"
        aria-labelledby="accordion-collapse-head"
        className="flex flex-col md:h-full"
      >
        <h1 className="m-4">Documentation</h1>
        <div className="m-4 flex-1 mt-2">for documentation here</div>
      </Transition>
    </>
  );
}
