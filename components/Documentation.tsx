import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { DocumentIcon } from '@heroicons/react/24/solid';
import FlatButton from './FlatButton';
import useTranslation from '@/hooks/useTranslation';

export default function Documentation() {
  const t = useTranslation();
  const [showDocs, setShowDocs] = useState(false);
  return (
    <>
      <button
        className="absolute left-36 top-16 z-0 p-1 border border-gray-700 rounded-xl"
        title={t('doc-explorer')}
        onClick={() => setShowDocs((prev) => !prev)}
      >
        <DocumentIcon className="w-6" />
      </button>
      <Transition
        show={showDocs}
        enter="transition-all ease duration-200"
        enterFrom="h-0 md:w-0 "
        enterTo="h-96 md:w-[25vw]"
        leave="transition-all ease duration-200"
        leaveFrom="h-96 md:w-48 xl:w-96"
        leaveTo="h-0 md:w-0"
        id="accordion-collapse-body1"
        aria-labelledby="accordion-collapse-head"
        className="flex flex-col md:h-full"
      >
        <h3 className="m-4">{t('doc-explorer')}</h3>
        <div className="m-4 flex-1 mt-2">for documentation here</div>
      </Transition>
    </>
  );
}
