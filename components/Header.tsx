import { logOut } from '@/auth/firebaseAuth';
import useTranslation from '@/hooks/useTranslation';
import { selectAuth } from '@/redux/auth';
import { useAppSelector } from '@/redux/hooks';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import LanguageSwitch from './LanguageSwitch';
import Logo from './Logo';
import NavLink from './NavLink';

export default function Header() {
  const t = useTranslation();
  const { isAuth, userEmail } = useAppSelector(selectAuth);

  return (
    <header className="fixed left-0 right-0 top-0 w-full h-header px-4 flex gap-4 items-center bg-slate-800 text-slate-100">
      <Logo />
      <LanguageSwitch className="ml-auto" />
      {isAuth ? (
        <div className="flex gap-2">
          <UserCircleIcon className="w-6 h-6" /> {userEmail}
          <button onClick={logOut}>{t('log-out')}</button>
        </div>
      ) : (
        <NavLink href="/sign-up">{t('sign-up')}</NavLink>
      )}
    </header>
  );
}
