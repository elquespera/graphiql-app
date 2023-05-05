import { logOut, signIn, signUp } from '@/auth/firebaseAuth';
import { selectAuth } from '@/redux/auth';
import { useAppSelector } from '@/redux/hooks';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const { t } = useTranslation();

  const { isAuth, userEmail } = useAppSelector(selectAuth);

  const signUpTest = async () => {
    const res = await signUp('test@email.com', '12345678');
    console.log(res);
  };

  const signInTest = async () => {
    const res = await signIn('test@email.com', '12345678');
    console.log(res);
  };

  const logOutTest = async () => {
    const res = await logOut();
    console.log(res);
  };

  return (
    <>
      <Head>
        <title>GraphQL - Welcome</title>
      </Head>
      <main className="min-h-full">
        <h2 className="text-3xl">Welcome</h2>
        <div className="flex gap-4">
          <Link href="/sign-in">{t('sign-in')}</Link>
          <Link href="/sign-up">Sign up</Link>
          <Link href="/editor">Editor</Link>
        </div>

        <div className="flex flex-col gap-2">
          <button onClick={signUpTest}>Sign Up</button>
          {isAuth ? (
            <button onClick={logOutTest}>Log out</button>
          ) : (
            <button onClick={signInTest}>Sign In</button>
          )}

          <div>{userEmail}</div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale || 'en');
  return {
    props: {
      ...translations,
    },
  };
};
