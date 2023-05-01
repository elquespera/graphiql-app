import { signIn, signUp } from "@/auth/firebaseAuth";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const signUpTest = async () => {
    const res = await signUp("test@email.com", "12345678");
    console.log(res);
  };

  const signInTest = async () => {
    const res = await signIn("test@email.com", "12345678");
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
          <Link href="/sign-in">Sign in</Link>
          <Link href="/sign-up">Sign up</Link>
          <Link href="/editor">Editor</Link>
        </div>

        <div className="flex flex-col gap-2">
          <button onClick={signUpTest}>Sign Up</button>
          <button onClick={signInTest}>Sign In</button>
        </div>
      </main>
    </>
  );
}
