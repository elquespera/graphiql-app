import { storeWrapper } from '@/redux/store';
import { GetServerSideProps } from 'next';

const defaultServerProps: GetServerSideProps = storeWrapper.getServerSideProps(() => async () => {
  return { props: {} };
});

export default defaultServerProps;
