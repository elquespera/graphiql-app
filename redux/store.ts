import { COOKIE_MAX_AGE, LANGUAGE_COOKIE } from '@/constants/constants';
import { configureStore } from '@reduxjs/toolkit';
import { nextReduxCookieMiddleware, wrapMakeStore } from 'next-redux-cookie-wrapper';
import { createWrapper } from 'next-redux-wrapper';
import { authReducer } from './auth';
import { graphQlQueryReducer } from './graphQlQuery';
import { settingsReducer, settingsSlice } from './settings';

const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer: {
      auth: authReducer,
      settings: settingsReducer,
      graphQlQuery: graphQlQueryReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(
        nextReduxCookieMiddleware({
          subtrees: [
            {
              subtree: `${settingsSlice.name}.language`,
              cookieName: LANGUAGE_COOKIE,
              maxAge: COOKIE_MAX_AGE,
              sameSite: true,
              serializationFunction: String,
              deserializationFunction: String,
              defaultState: settingsSlice.getInitialState().language,
            },
          ],
        })
      ),
  })
);

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];

export const storeWrapper = createWrapper<AppStore>(makeStore);
