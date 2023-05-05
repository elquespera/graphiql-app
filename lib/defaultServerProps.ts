import { AppLanguages } from '@/types/types';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const defaultServerProps: GetServerSideProps = async ({ locale, defaultLocale }) => {
  const translations = await serverSideTranslations(locale || 'en', ['common'], undefined);
  return {
    props: {
      ...translations,
    },
  };
};

export default defaultServerProps;
