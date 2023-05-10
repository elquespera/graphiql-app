import Documentation from '@/components/Documentation';
import Operations from '@/components/Operations';
import QueryOptions from '@/components/QueryOptions';
import Response from '@/components/Response';
import useTranslation from '@/hooks/useTranslation';
import { selectAuth } from '@/redux/auth';
import { useAppSelector } from '@/redux/hooks';
import Head from 'next/head';

export default function EditorPage() {
  const t = useTranslation();
  const { isAuth } = useAppSelector(selectAuth);

  if (!isAuth) return null;

  return (
    <>
      <Head>
        <title>{`${t('app-name')} - ${t('title-editor')}`}</title>
      </Head>

      <section className="mb-6 bg-slate-900 text-slate-300 ">
        <div className="flex flex-col md:flex-row h-full md:h-[calc(100vh-theme(spacing.footer)-theme(spacing.header))] justify-between">
          <Documentation />
          <section className="flex-1 flex flex-col justify-between basis-[40rem] md:basis-auto">
            <Operations />
            <div className="md:flex md:items-end md:flex-1">
              <QueryOptions />
            </div>
          </section>
          <Response />
        </div>
      </section>
    </>
  );
}

export { default as getServerSideProps } from '../lib/defaultServerProps';
