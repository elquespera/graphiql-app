import { logOut } from '@/auth/firebaseAuth';
import useTranslation from '@/hooks/useTranslation';
import { selectAuth } from '@/redux/auth';
import { useAppSelector } from '@/redux/hooks';
import GraphQLIcon from './GraphQLIcon';
import LanguageSwitch from './LanguageSwitch';
import NavLink from './NavLink';
import { UserCircleIcon } from '@heroicons/react/24/solid';

export default function Header() {
  const t = useTranslation();
  const { isAuth, userEmail } = useAppSelector(selectAuth);

  return (
    <header className="fixed left-0 right-0 top-0 h-14 w-full px-4 flex gap-4 items-center bg-slate-800 text-slate-100">
      <h1>
        <NavLink href="/" className="flex gap-2 items-center">
          <GraphQLIcon className="w-8 h-8" />
          {t('app-name')}
        </NavLink>
      </h1>
      {isAuth && <NavLink href="/editor">{t('title-editor')}</NavLink>}
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
