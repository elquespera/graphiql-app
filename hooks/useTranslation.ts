import { TranslationKey, translations } from '@/assets/locales/translations';
import { DEFAULT_LANGUAGE } from '@/constants/constants';
import { useAppSelector } from '@/redux/hooks';
import { selectSettings } from '@/redux/settings';

export default function useTranslation() {
  const { language } = useAppSelector(selectSettings);

  return (translationKey: TranslationKey) => {
    let translation = translations[language]?.[translationKey];
    if (!translation) {
      translation = translations[DEFAULT_LANGUAGE][translationKey];
    }
    return translation || translationKey;
  };
}
