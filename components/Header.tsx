import { useAppSelector } from '@/redux/hooks';
import { selectAuth } from '@/redux/auth';
import { logOut } from '@/auth/firebaseAuth';
import NavLink from './NavLink';
import { useRouter } from 'next/router';

export default function Header() {
  const { isAuth } = useAppSelector(selectAuth);
  const router = useRouter();

  const logOutUser = async () => {
    await logOut();
    router.replace('/');
  };

  return (
    <header className="fixed left-0 right-0 top-0 h-12 w-full px-8 flex gap-2 justify-between items-center bg-slate-800 text-slate-100">
      <h1>GraphiQL</h1>
      <div className="flex gap-8">
        <NavLink label="Home" pathName="/" />
        <NavLink label="IDE" pathName="/editor" />
      </div>
      {isAuth && (
        <button onClick={logOutUser} className="basis-[7.6rem]">
          Log out
        </button>
      )}
      {!isAuth && (
        <div className="flex gap-4">
          <NavLink label="Sign-in" pathName="/sign-in" />
          <NavLink label="Sign-up" pathName="/sign-up" />
        </div>
      )}
    </header>
  );
}
