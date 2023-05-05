import { logOut, signIn, signUp } from '@/auth/firebaseAuth';
import { selectAuth } from '@/redux/auth';
import { useAppSelector } from '@/redux/hooks';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const { t } = useTranslation();

  const { isAuth, userEmail } = useAppSelector(selectAuth);

  const signUpTest = () => {
    signUp('test@email.com', '12345678');
  };

  const signInTest = () => {
    signIn('test@email.com', '12345678');
  };

  const logOutTest = () => {
    logOut();
  };

  return (
    <>
      <Head>
        <title>GraphQL - Welcome</title>
      </Head>
      <main className="min-h-full">
        <h2 className="text-3xl">Welcome</h2>
        <div className="flex flex-col items-center gap-2">
          <button onClick={signUpTest}>{t('sign-up')}</button>
          {isAuth ? (
            <button onClick={logOutTest}>{t('log-out')}</button>
          ) : (
            <button onClick={signInTest}>{t('sign-in')}</button>
          )}
          <div>{userEmail}</div>
        </div>
      </main>
    </>
  );
}

export { default as getServerSideProps } from '../lib/defaultServerProps';
