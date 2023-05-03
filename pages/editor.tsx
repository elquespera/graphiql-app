import Documentation from '@/components/Documentation';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Operations from '@/components/Operations';
import Response from '@/components/Response';
import Variables from '@/components/Variables';
import Head from 'next/head';

export default function EditorPage() {
  return (
    <>
      <Head>
        <title>GraphQL - Query Editor</title>
      </Head>

      <Header />

      <main className="w-screen my-12 bg-slate-900 text-slate-300 ">
        <div className="flex flex-col sm:flex-row gap-2 h-[calc(100vh-6rem)] justify-between">
          <Documentation />
          <section className="flex-[2] flex flex-col justify-between">
            <Operations />
            <hr className="border-slate-700" />
            <Variables />
          </section>
          <Response />
        </div>
      </main>

      <Footer />
    </>
  );
}
