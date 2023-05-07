import AuthForm from '@/components/AuthForm';
import useTranslation from '@/hooks/useTranslation';
import Head from 'next/head';
import Link from 'next/link';

export default function SignUpPage() {
  const t = useTranslation();

  return (
    <>
      <Head>
        <title>{`${t('app-name')} - ${t('sign-up')}`}</title>
      </Head>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-white text-2xl font-bold leading-9 tracking-tight">
            {t('sign-up')}
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <AuthForm type="sign-up" />
          <p className="mt-10 text-center text-sm text-gray-500">
            {`${t('already-have-account')} `}
            <Link
              href="/sign-in"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              {t('sign-in')}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export { default as getServerSideProps } from '../lib/defaultServerProps';
