import Documentation from '@/components/Documentation';
import Operations from '@/components/Operations';
import Response from '@/components/Response';
import Variables from '@/components/Variables';
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

      <main className="w-screen my-12 bg-slate-900 text-slate-300 ">
        <div className="flex flex-col sm:flex-row gap-2 h-[calc(100vh-6rem)] justify-between">
          <Documentation />
          <section className="flex-[2] flex flex-col justify-between">
            <Operations />
            <hr className="border-slate-700" />
            <Variables />
          </section>
          <Response />
        </div>
      </main>
    </>
  );
}

export { default as getServerSideProps } from '../lib/defaultServerProps';
