import { PropsWithChildren, useEffect } from 'react';

import Header from './Header';
import Footer from './Footer';
import { onAuthChanged } from '@/auth/firebaseAuth';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectAuth, setIsAuth } from '@/redux/auth';
import { useRouter } from 'next/router';
import { AUTH_PATHS } from '@/constants/constants';

export default function Layout({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuth } = useAppSelector(selectAuth);

  onAuthChanged((user) => dispatch(setIsAuth({ isAuth: !!user, userEmail: user?.email })));

  useEffect(() => {
    if (isAuth) {
      if (AUTH_PATHS.includes(router.asPath)) {
        router.replace('/');
      }
    } else {
      if (router.asPath === '/editor') {
        router.replace('/sign-in');
      }
    }
  }, [router, isAuth]);

  return (
    <>
      <Header />
      <main className="w-screen my-12 bg-slate-900 text-slate-300 h-[calc(100vh-6rem)]">
        {children}
      </main>
      <Footer />
    </>
  );
}
