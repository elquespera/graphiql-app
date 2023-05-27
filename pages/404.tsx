import useTranslation from '@/hooks/useTranslation';
import Button from '@/components/Button';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const t = useTranslation();
  const [notFound, setNotFound] = useState('');
  const [goToMain, setGoToMain] = useState('');

  useEffect(() => {
    setNotFound(t('not-found'));
    setGoToMain(t('go-to-main'));
  }, []);

  return (
    <div className="flex flex-col items-center h-screen justify-center gap-16 p-4 md:p-8">
      <h2 className="md:text-6xl text-4xl text-center">404: {notFound}</h2>
      <Button href="/" className="whitespace-nowrap">
        {goToMain}
      </Button>
    </div>
  );
}
