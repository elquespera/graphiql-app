import { PropsWithChildren } from 'react';

import Header from './Header';
import Footer from './Footer';

export default function EditorPage({ children }: PropsWithChildren) {
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
