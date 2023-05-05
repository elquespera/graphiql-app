import { storeWrapper } from '@/redux/store';

const defaultServerProps = storeWrapper.getServerSideProps(() => async () => ({ props: {} }));

export default defaultServerProps;
