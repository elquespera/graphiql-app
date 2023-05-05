import { PropsWithChildren } from 'react';

import Header from './Header';
import Footer from './Footer';
import { onAuthChanged } from '@/auth/firebaseAuth';
import { useAppDispatch } from '@/redux/hooks';
import { setIsAuth } from '@/redux/auth';

export default function Layout({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();

  onAuthChanged((user) => dispatch(setIsAuth({ isAuth: !!user, userEmail: user?.email })));

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
