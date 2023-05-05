import AuthForm from '@/components/AuthForm';
import Head from 'next/head';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <>
      <Head>
        <title>GraphQL - Sign in</title>
      </Head>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-white text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <AuthForm type="sign-in" />
          <p className="mt-10 text-center text-sm text-gray-500">
            Do not have an account?{' '}
            <Link
              href="/sign-up"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export { default as getServerSideProps } from '../lib/defaultServerProps';
