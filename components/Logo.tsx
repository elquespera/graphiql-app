import Link from 'next/link';
import GraphQLIcon from './GraphQLIcon';
import useTranslation from '@/hooks/useTranslation';

export default function Logo() {
  const t = useTranslation();

  return (
    <h1>
      <Link href="/" className="flex gap-2 items-center">
        <GraphQLIcon className="w-8 h-9" />
        {t('app-name')}
      </Link>
    </h1>
  );
}
