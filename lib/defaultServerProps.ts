import { LANGUAGE_COOKIE } from '@/constants/constants';
import { setAppLanguage } from '@/redux/settings';
import { storeWrapper } from '@/redux/store';
import { AppLanguage, AppLanguages } from '@/types/types';

const defaultServerProps = storeWrapper.getServerSideProps((store) => async ({ req }) => {
  if (!req.cookies[LANGUAGE_COOKIE]) {
    const userLanguage = req.headers['accept-language']?.slice(0, 2) as AppLanguage;
    if (AppLanguages.includes(userLanguage)) {
      store.dispatch(setAppLanguage(userLanguage));
    }
  }

  return { props: {} };
});

export default defaultServerProps;
