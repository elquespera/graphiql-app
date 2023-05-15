import clsx from 'clsx';
import React from 'react';

interface FlatButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  round?: boolean;
}

export default function FlatButton({ round, className, children, ...props }: FlatButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        `relative flex justify-center overflow-hidden items-center gap-2
         text-sm font-semibold leading-6
       text-white shadow-sm
         before:absolute before:inset-0 before:bg-slate-300 before:opacity-[0.15]
         hover:enabled:before:opacity-30 disabled:opacity-50         
         focus-visible:outline focus-visible:outline-2 
         focus-visible:outline-offset-2 focus-visible:outline-slate-300`,
        round ? 'p-1.5 rounded-full' : 'px-3 py-1.5 rounded-md',
        className
      )}
    >
      {children}
    </button>
  );
}
