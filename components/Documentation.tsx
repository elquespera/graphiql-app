import { SCHEMA_QUERY } from '@/constants/schemaQuery';
import useTranslation from '@/hooks/useTranslation';
import { useLazyGraphQLQuery } from '@/redux/graphQlResponse';
import { Transition } from '@headlessui/react';
import { DocumentIcon } from '@heroicons/react/24/solid';
import { Suspense, useEffect, useState } from 'react';
import Spinner from './Spinner';

export default function Documentation() {
  const t = useTranslation();
  const [showDocs, setShowDocs] = useState(true);
  const [fetchSchema, { data, error }] = useLazyGraphQLQuery();

  useEffect(() => {
    fetchSchema({ query: SCHEMA_QUERY });
  }, []);
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
        <pre className="mt-2 break-all whitespace-pre-wrap overflow-y-auto h-[calc(100vh-12rem)]">
          <Suspense fallback={<Spinner />}>
            {data && JSON.stringify(data, null, ' ')}
            Loaded
            {error && JSON.stringify(data, null, ' ')}
          </Suspense>
        </pre>
      </Transition>
    </>
  );
}
