import useTranslation from '@/hooks/useTranslation';
import { Suspense, lazy } from 'react';
import ErrorBoundary from './ErrorBoundary';
import Spinner from './Spinner';

const Docs = lazy(() => import('./Docs'));

export default function Documentation() {
  const t = useTranslation();

  return (
    <ErrorBoundary fallback={<div>{t('unspecified-error')}</div>}>
      <Suspense fallback={<Spinner large center />}>
        <section className="flex flex-col p-4 gap-2 overflow-hidden">
          <h3 className="font-semibold md:text-lg">{t('doc-explorer')}</h3>
          <div className="overflow-hidden h-full">
            <Docs />
          </div>
        </section>
      </Suspense>
    </ErrorBoundary>
  );
}
