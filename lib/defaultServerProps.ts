import { GetServerSideProps } from 'next';

const defaultServerProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default defaultServerProps;
