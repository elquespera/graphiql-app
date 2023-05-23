import { SCHEMA_QUERY } from '@/constants/schemaQuery';
import useTranslation from '@/hooks/useTranslation';
import { Suspense } from 'react';
import Spinner from './Spinner';

import useGraphQlQuery from '@/hooks/useGraphQlQuery';

export default function Documentation() {
  const t = useTranslation();

  return (
    <div className="flex-1">
      <h3 className="m-4">{t('doc-explorer')}</h3>
      <pre className="mt-2 break-all whitespace-pre-wrap overflow-auto h-[calc(100vh-12rem)]">
        <Suspense fallback={<Spinner />}>
          <Docs />
        </Suspense>
      </pre>
    </div>
  );
}

function Docs() {
  const { data, error } = useGraphQlQuery({ query: SCHEMA_QUERY, headers: [] });

  return (
    <>
      {data && JSON.stringify(data, null, ' ')}
      {error && JSON.stringify(data, null, ' ')}
    </>
  );
}
