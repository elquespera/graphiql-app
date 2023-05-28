import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface NavLinkProps extends LinkProps {
  children?: React.ReactNode;
  className?: string;
}

export default function NavLink({ href, children, className, ...props }: NavLinkProps) {
  const { pathname } = useRouter();
  return (
    <Link
      {...props}
      href={href}
      className={clsx(className, pathname == href && 'underline underline-offset-8')}
    >
      {children}
    </Link>
  );
}
