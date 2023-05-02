import Header from '@/components/Header';
import Head from 'next/head';

export default function EditorPage() {
  return (
    <>
      <Head>
        <title>GraphQL - Query Editor</title>
      </Head>
      <Header />
      <main>Editor Page</main>
    </>
  );
}
