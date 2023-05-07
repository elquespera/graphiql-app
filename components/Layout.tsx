import { PropsWithChildren, useEffect } from 'react';

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

  useEffect(() => {
    if (isAuth) {
      if (AUTH_PATHS.includes(router.asPath)) {
        router.replace('/editor');
      }
    } else {
      if (isPrivate) {
        router.replace('/');
      }
    }
  }, [router, isAuth, isPrivate]);

  useEffect(() => {
    onAuthChanged((user) => dispatch(setIsAuth({ isAuth: !!user, userEmail: user?.email })));
  }, [dispatch]);

  return (
    <>
      {isPrivate && <Header />}
      <main>{children}</main>
      <Footer />
    </>
  );
}
