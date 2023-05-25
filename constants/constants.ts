import { AppLanguage } from '@/types/types';

export const API_BASE_URL = 'https://graphqlpokemon.favware.tech';

export const LANGUAGE_NAMES: { [key in AppLanguage]: string } = {
  en: 'English',
  ru: 'Русский',
};

export const DEFAULT_LANGUAGE: AppLanguage = 'en';

export const LANGUAGE_COOKIE = 'APP_LANGUAGE';

export const COOKIE_MAX_AGE = 7 * 24 * 3600;

export const AUTH_PATHS = ['/sign-in', '/sign-up'];

export const AUTH_USER_NOT_FOUND = 'auth/user-not-found';
export const AUTH_INVALID_PASSWORD = 'auth/wrong-password';
