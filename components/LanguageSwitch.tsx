import { LANGUAGE_NAMES } from '@/constants/constants';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectSettings, setAppLanguage } from '@/redux/settings';
import { AppLanguage } from '@/types/types';
import React from 'react';
import { useTranslation } from 'next-i18next';

export default function LanguageSwitch() {
  const { i18n } = useTranslation();
  const { language } = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();

  const handleLanguageChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const newLanguage = event.target.value as AppLanguage;
    dispatch(setAppLanguage(newLanguage));
    i18n.changeLanguage(newLanguage);
  };

  return (
    <select className="text-black" value={language} onChange={handleLanguageChange}>
      {Object.entries(LANGUAGE_NAMES).map(([lang, name]) => (
        <option key={lang} value={lang}>{`${name} (${lang})`}</option>
      ))}
    </select>
  );
}
