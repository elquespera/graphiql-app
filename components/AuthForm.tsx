'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { useEffect } from 'react';

interface AuthFormProps {
  type: 'sign-up' | 'sign-in';
}

type IFormData = {
  email: string;
  password: string;
};

export default function AuthForm({ type }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IFormData>({
    criteriaMode: 'all',
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [reset, isSubmitSuccessful]);

  const onSubmit: SubmitHandler<IFormData> = (data) => console.log(data);

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor="email"
          className="block text-white text-sm font-medium leading-6 text-gray-900"
        >
          Email address
        </label>
        <div className="mt-2">
          <input
            type="email"
            className="block bg-white/[.05] w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/[.1] placeholder:text-white-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address',
              },
            })}
          />
        </div>
        {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
      </div>

      <div>
        <div>
          <label
            htmlFor="password"
            className="block text-white text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
        </div>
        <div className="mt-2">
          <input
            type="password"
            className="block bg-white/[.05] w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/[.1] placeholder:text-white-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register('password', {
              validate: {
                eightCharacters: (value) => value.length > 8,
                oneLetter: (value) => /[a-zA-Z]/.test(value),
                oneDigit: (value) => /[0-9]/.test(value),
                oneSpecialCharacter: (value) =>
                  /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value),
              },
            })}
          />
        </div>
        {errors.password && (
          <ul className="list-none mt-2">
            <li className="flex items-center gap-x-1.5">
              {errors.password?.types?.eightCharacters ? (
                <>
                  <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
                  <span className="text-sm text-red-500">At least 8 characters</span>
                </>
              ) : (
                <>
                  <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  <span className="text-sm text-green-500">At least 8 characters</span>
                </>
              )}
            </li>
            <li className="flex items-center gap-x-1.5">
              {errors.password?.types?.oneLetter ? (
                <>
                  <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
                  <span className="text-sm text-red-500">At least 1 letter</span>
                </>
              ) : (
                <>
                  <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  <span className="text-sm text-green-500">At least 1 letter</span>
                </>
              )}
            </li>
            <li className="flex items-center gap-x-1.5">
              {errors.password?.types?.oneDigit ? (
                <>
                  <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
                  <span className="text-sm text-red-500">At least 1 digit</span>
                </>
              ) : (
                <>
                  <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  <span className="text-sm text-green-500">At least 1 digit</span>
                </>
              )}
            </li>
            <li className="flex items-center gap-x-1.5">
              {errors.password?.types?.oneSpecialCharacter ? (
                <>
                  <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
                  <span className="text-sm text-red-500">
                    At least 1 special character (!%#$ etc.)
                  </span>
                </>
              ) : (
                <>
                  <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  <span className="text-sm text-green-500">
                    At least 1 special character (!%#$ etc.)
                  </span>
                </>
              )}
            </li>
          </ul>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {type === 'sign-up' ? 'Sign up' : 'Sign in'}
        </button>
      </div>
    </form>
  );
}
