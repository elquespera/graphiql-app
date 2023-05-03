import Link from 'next/link';
import router from 'next/router';

export default function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 h-12 w-full px-8 flex gap-2 justify-between items-center bg-slate-800 text-slate-100">
      <h1>GraphiQL</h1>
      <div className="flex gap-8">
        <Link href={'/'} className={router.pathname == '/' ? 'underline underline-offset-8' : ''}>
          Home
        </Link>
        <Link
          href={'/editor'}
          className={router.pathname == '/editor' ? 'underline underline-offset-8' : ''}
        >
          IDE
        </Link>
      </div>
      <div className="flex gap-4">
        <Link
          href={'/sign-in'}
          className={router.pathname == '/sign-in' ? 'underline underline-offset-8' : ''}
        >
          Sign-in
        </Link>
        <Link
          href={'/sign-up'}
          className={router.pathname == '/sign-up' ? 'underline underline-offset-8' : ''}
        >
          Sign-up
        </Link>
      </div>
    </header>
  );
}
