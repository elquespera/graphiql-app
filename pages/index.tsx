import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-full">
      <h2 className="text-3xl">Welcome</h2>
      <div className="flex gap-4">
        <Link href="/sign-in">Sign in</Link>
        <Link href="/sign-up">Sign up</Link>
      </div>
    </main>
  );
}
