import AuthForm from '@/components/AuthForm';
import useTranslation from '@/hooks/useTranslation';
import Head from 'next/head';
import Link from 'next/link';

export default function SignInPage() {
  const t = useTranslation();

  return (
    <>
      <Head>
        <title>{`${t('app-name')} - ${t('sign-in')}`}</title>
      </Head>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-white text-2xl font-bold leading-9 tracking-tight">
            {t('sign-in')}
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <AuthForm type="sign-in" />
          <p className="mt-10 text-center text-sm text-gray-500">
            {`${t('do-not-have-account')} `}
            <Link
              href="/sign-up"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              {t('sign-up')}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export { default as getServerSideProps } from '../lib/defaultServerProps';
