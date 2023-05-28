'use client';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

import { signIn, signUp } from '@/auth/firebaseAuth';
import useTranslation from '@/hooks/useTranslation';
import { TranslationKey } from '@/assets/locales/translations';
import { AUTH_INVALID_PASSWORD, AUTH_USER_NOT_FOUND } from '@/constants/constants';
import Spinner from './Spinner';
import Button from './Button';

interface AuthFormProps {
  type: 'sign-up' | 'sign-in';
}

type IFormData = {
  email: string;
  password: string;
  password2: string;
};

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const LETTER_PATTERN = /[a-zA-Z]/;
const DIGIT_PATTERN = /[0-9]/;
const SPECIAL_CHAR_PATTERN = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

export default function AuthForm({ type }: AuthFormProps) {
  const t = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<TranslationKey>();

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    criteriaMode: 'all',
  });

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    const { email, password } = data;

    const signInOrUp = type === 'sign-up' ? signUp : signIn;

    try {
      setIsLoading(true);
      const { error } = await signInOrUp(email, password);
      if (error) {
        setError(
          error.code === AUTH_USER_NOT_FOUND || error.code === AUTH_INVALID_PASSWORD
            ? 'login-invalid-credentials'
            : 'login-error'
        );
      } else {
        setError(undefined);
      }
    } catch {
      setError('login-error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email" className="block text-white text-sm font-medium leading-6">
          {t('email-address')}
        </label>
        <div className="mt-2">
          <input
            type="email"
            className="block bg-white/[.05] w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/[.1] placeholder:text-white-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register('email', {
              required: t('email-is-required'),
              pattern: {
                value: EMAIL_PATTERN,
                message: t('email-is-invalid'),
              },
            })}
          />
        </div>
        {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
      </div>

      <div>
        <div>
          <label htmlFor="password" className="block text-white text-sm font-medium leading-6">
            {t('password')}
          </label>
        </div>
        <div className="mt-2">
          <input
            type="password"
            className="block bg-white/[.05] w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/[.1] placeholder:text-white-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register('password', {
              required: t('password-is-required'),
              validate:
                type === 'sign-up'
                  ? {
                      eightCharacters: (value) => value.length > 7,
                      oneLetter: (value) => LETTER_PATTERN.test(value),
                      oneDigit: (value) => DIGIT_PATTERN.test(value),
                      oneSpecialCharacter: (value) => SPECIAL_CHAR_PATTERN.test(value),
                    }
                  : undefined,
            })}
          />
          {errors.password && type === 'sign-in' && (
            <span className="text-sm text-red-500">{errors.password.message}</span>
          )}
        </div>
        {type === 'sign-up' && (
          <div className="my-6">
            <div>
              <label htmlFor="password2" className="block text-white text-sm font-medium leading-6">
                {t('repeat-password')}
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password2"
                type="password"
                className="block bg-white/[.05] w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/[.1] placeholder:text-white-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('password2', {
                  validate: {
                    matchPassword: (value) => value?.length > 0 && value === getValues('password'),
                  },
                })}
              />
            </div>
          </div>
        )}
        {errors.password && type === 'sign-up' && (
          <ul className="flex flex-col gap-2 mt-1">
            <ValidationMessage
              isError={!!errors.password?.types?.eightCharacters}
              message={t('password-8-characters')}
            />
            <ValidationMessage
              isError={!!errors.password?.types?.oneLetter}
              message={t('password-1-letter')}
            />
            <ValidationMessage
              isError={!!errors.password?.types?.oneDigit}
              message={t('password-1-digit')}
            />
            <ValidationMessage
              isError={!!errors.password?.types?.oneSpecialCharacter}
              message={t('password-1-special-character')}
            />
          </ul>
        )}
        {errors.password2 && (
          <ul className="flex flex-col gap-1 mt-2">
            <ValidationMessage
              isError={!!errors.password2?.types?.matchPassword}
              message={t('password-not-match')}
            />
          </ul>
        )}
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading && <Spinner />}
        {t(type === 'sign-up' ? 'sign-up' : 'sign-in')}
      </Button>
      {error && <ValidationMessage isError message={t(error)} />}
    </form>
  );
}

interface ValidationMessageProps {
  isError: boolean;
  message: string;
}

function ValidationMessage({ isError, message }: ValidationMessageProps) {
  return (
    <li className="flex items-center gap-x-1.5">
      {isError ? (
        <ExclamationCircleIcon className="h-5 w-5 flex-shrink-0 text-red-500" />
      ) : (
        <CheckCircleIcon className="h-5 w-5 flex-shrink-0 text-green-500" />
      )}

      <span className={clsx('text-sm', isError ? 'text-red-500' : 'text-green-500')}>
        {message}
      </span>
    </li>
  );
}
