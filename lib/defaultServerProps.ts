import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const defaultServerProps: GetServerSideProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale || 'en');
  return {
    props: {
      ...translations,
    },
  };
};

export default defaultServerProps;
