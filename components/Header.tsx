import { useEffect, useState } from 'react';
import { UserCircleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

import { useAppSelector } from '@/redux/hooks';
import { selectAuth } from '@/redux/auth';
import { logOut } from '@/auth/firebaseAuth';
import useTranslation from '@/hooks/useTranslation';
import LanguageSwitch from './LanguageSwitch';
import Logo from './Logo';
import NavLink from './NavLink';

export default function Header() {
  const [isHamOpen, setIsHamOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslation();
  const { isAuth, userEmail } = useAppSelector(selectAuth);

  const handleScroll = () => {
    if (window.scrollY > 60) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function handleHamburger() {
    setIsHamOpen((prev) => !prev);
  }

  return (
    <header
      className={`${
        scrolled && !isHamOpen ? 'h-10' : 'h-header'
      } sticky left-0 z-10 right-0 top-0 w-full transition-all duration-200 px-8 flex justify-between items-center bg-slate-800 text-slate-100`}
    >
      <Logo />
      <nav>
        {!isHamOpen && (
          <Bars3Icon className="w-6 h-6 md:hidden cursor-pointer" onClick={handleHamburger} />
        )}
        {isHamOpen && (
          <XMarkIcon className="w-6 h-6 md:hidden cursor-pointer" onClick={handleHamburger} />
        )}
        <ul
          className={`${
            isHamOpen ? '' : 'translate-x-full'
          } md:translate-x-0 fixed left-0 right-0 md:top-0 top-header min-h-screen bg-slate-800 space-y-4 p-4 pt-8 transform transition duration-200 md:relative md:flex md:min-h-0 md:space-y-0 md:gap-6 md:p-0 md:items-center`}
        >
          {isAuth ? (
            <>
              <li className="flex gap-2">
                <UserCircleIcon className="w-6 h-6" /> <span>{userEmail}</span>
              </li>
              <li>
                <button onClick={logOut}>{t('log-out')}</button>
              </li>
            </>
          ) : (
            <li>
              <NavLink href="/sign-up">{t('sign-up')}</NavLink>
            </li>
          )}
          <li>
            <LanguageSwitch className="ml-auto" />
          </li>
        </ul>
      </nav>
    </header>
  );
}
