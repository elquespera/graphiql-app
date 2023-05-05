import { LANGUAGE_NAMES } from '@/constants/constants';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectSettings, setAppLanguage } from '@/redux/settings';
import { AppLanguage } from '@/types/types';
import React from 'react';

export default function LanguageSwitch() {
  const { language } = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();

  const handleLanguageChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    dispatch(setAppLanguage(event.target.value as AppLanguage));
  };

  return (
    <select className="text-black" value={language} onChange={handleLanguageChange}>
      {Object.entries(LANGUAGE_NAMES).map(([lang, name]) => (
        <option key={lang} value={lang}>{`${name} (${lang})`}</option>
      ))}
    </select>
  );
}
