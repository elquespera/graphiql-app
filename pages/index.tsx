import { logOut, signIn } from '@/auth/firebaseAuth';
import useTranslation from '@/hooks/useTranslation';
import { selectAuth } from '@/redux/auth';
import { useAppSelector } from '@/redux/hooks';
import Head from 'next/head';

export default function Home() {
  const t = useTranslation();

  const { isAuth, userEmail } = useAppSelector(selectAuth);

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
