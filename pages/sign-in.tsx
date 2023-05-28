import AuthForm from '@/components/AuthForm';
import LanguageSwitch from '@/components/LanguageSwitch';
import Logo from '@/components/Logo';
import useTranslation from '@/hooks/useTranslation';
import { selectAuth } from '@/redux/auth';
import { useAppSelector } from '@/redux/hooks';
import Head from 'next/head';
import Link from 'next/link';

export default function SignInPage() {
  const t = useTranslation();
  const { isAuth } = useAppSelector(selectAuth);

  if (isAuth) return null;

  return (
    <>
      <Head>
        <title>{`${t('app-name')} - ${t('sign-in')}`}</title>
      </Head>
      <div className="flex items-center gap-4 p-4 sm:p-8 sm:gap-8">
        <Logo />
        <LanguageSwitch />
      </div>
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 mb-footer">
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
