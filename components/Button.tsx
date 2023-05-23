import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  href?: string;
  target?: string;
}

export default function Button({
  className,
  children,
  type,
  disabled,
  href,
  target,
  ...props
}: ButtonProps) {
  const cls = clsx(
    `flex justify-center items-center gap-2 rounded-md
     px-3 py-1.5 text-sm font-semibold leading-6
     bg-indigo-600  text-white shadow-sm             
     hover:bg-indigo-500 disabled:bg-slate-600 
     focus-visible:outline focus-visible:outline-2 
     focus-visible:outline-offset-2 focus-visible:outline-indigo-600`,
    className
  );

  return href ? (
    <Link href={href} className={cls} target={target}>
      {children}
    </Link>
  ) : (
    <button {...props} type={type} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
