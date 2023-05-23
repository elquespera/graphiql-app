import { SCHEMA_QUERY } from '@/constants/schemaQuery';
import { useGraphQlQuery } from '@/hooks/useGraphQL';
import useTranslation from '@/hooks/useTranslation';
import { Suspense } from 'react';
import Spinner from './Spinner';

export default function Documentation() {
  const t = useTranslation();

  return (
    <div className="flex-1 p-4">
      <h3>{t('doc-explorer')}</h3>
      <pre className="mt-2 break-all whitespace-pre-wrap overflow-auto h-full md:h-[calc(100vh-theme(spacing.footer)-theme(spacing.header))]">
        <Suspense fallback={<Spinner large center />}>
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
