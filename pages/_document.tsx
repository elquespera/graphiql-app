import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <body className="min-h-screen bg-slate-200 flex flex-col items-center justify-center">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
