import { PropsWithChildren, useEffect, useState } from 'react';

import { onAuthChanged } from '@/auth/firebaseAuth';
import { AUTH_PATHS } from '@/constants/constants';
import { selectAuth, setIsAuth } from '@/redux/auth';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/router';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuth } = useAppSelector(selectAuth);
  const isPrivate = router.asPath === '/editor';
  const [authTouched, setAuthTouched] = useState(false);

  useEffect(() => {
    if (!authTouched) return;

    if (isAuth) {
      if (AUTH_PATHS.includes(router.asPath)) {
        router.replace('/editor');
      }
    } else {
      if (isPrivate) {
        router.replace('/');
      }
    }
  }, [router, isAuth, isPrivate, authTouched]);

  useEffect(() => {
    onAuthChanged((user) => {
      setAuthTouched(true);
      dispatch(setIsAuth({ isAuth: !!user, userEmail: user?.email }));
    });
  }, [dispatch]);

  return (
    <>
      {isPrivate && <Header />}
      <main>{children}</main>
      <Footer />
    </>
  );
}
