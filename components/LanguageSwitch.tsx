import { LANGUAGE_NAMES } from '@/constants/constants';

export default function LanguageSwitch() {
  return (
    <select className="text-black">
      {Object.entries(LANGUAGE_NAMES).map(([lang, name]) => (
        <option>{`${name} (${lang})`}</option>
      ))}
    </select>
  );
}
