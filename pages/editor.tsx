import Documentation from '@/components/Documentation';
import QueryBody from '@/components/QueryBody';
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

      <div
        className={`
          bg-slate-900 text-slate-300 mb-[theme(spacing.footer)] 
            grid grid-rows-[.8fr,1.1fr,1fr]
            md:grid-cols-[2fr,3fr,2fr] md:grid-rows-[calc(100vh-theme(spacing.header)-theme(spacing.footer))]
        `}
      >
        <Documentation />
        <section className="flex flex-col">
          <QueryBody />
          <QueryOptions />
        </section>
        <Response />
      </div>
    </>
  );
}

export { default as getServerSideProps } from '../lib/defaultServerProps';
