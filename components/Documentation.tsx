import { SCHEMA_QUERY } from '@/constants/schemaQuery';
import { useGraphQlQuery } from '@/hooks/useGraphQL';
import useTranslation from '@/hooks/useTranslation';
import { Suspense } from 'react';
import Spinner from './Spinner';

export default function Documentation() {
  const t = useTranslation();

  return (
    <section className="flex flex-col p-4 gap-2 overflow-hidden">
      <h3 className="font-semibold md:text-lg">{t('doc-explorer')}</h3>
      <div className="overflow-hidden h-full">
        <Suspense fallback={<Spinner large center />}>
          <Docs />
        </Suspense>
      </div>
    </section>
  );
}

function Docs() {
  const { data, error } = useGraphQlQuery({ query: SCHEMA_QUERY, headers: [] });

  console.log(data);
  return (
    <div className="bg-slate-950 border-[1px] border-slate-700 overflow-hidden h-full">
      <pre className="overflow-auto h-full">
        {data && JSON.stringify(data, null, ' ')}
        {error && JSON.stringify(data, null, ' ')}
      </pre>
    </div>
  );
}
