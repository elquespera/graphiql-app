import clsx from 'clsx';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        `flex justify-center items-center gap-2 rounded-md
         w-full px-3 py-1.5 text-sm font-semibold leading-6
         bg-indigo-600  text-white shadow-sm             
         hover:bg-indigo-500 disabled:bg-slate-600 
        focus-visible:outline focus-visible:outline-2 
        focus-visible:outline-offset-2 focus-visible:outline-indigo-600`,
        className
      )}
    >
      {children}
    </button>
  );
}
