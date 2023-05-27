import useTranslation from '@/hooks/useTranslation';
import Button from '@/components/Button';

const NotFound: React.FC = () => {
  const t = useTranslation();
  return (
    <div className="flex flex-col items-center h-screen justify-center gap-16">
      <h2 className="md:text-7xl text-4xl text-center">404: {t('not-found')}</h2>
      <Button href="/" className="whitespace-nowrap">
        {t('go-to-main')}
      </Button>
    </div>
  );
};

export default NotFound;
