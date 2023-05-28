import { AppLanguage } from '@/types/types';
import en from './en/common.json';
import ru from './ru/common.json';

export type TranslationKey = keyof typeof en | keyof typeof ru;

export type LanguageData = { [key in AppLanguage]: { [key in TranslationKey]?: string } };

export const translations: LanguageData = {
  en,
  ru,
};
