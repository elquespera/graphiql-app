import { configureStore } from '@reduxjs/toolkit';
import { nextReduxCookieMiddleware, wrapMakeStore } from 'next-redux-cookie-wrapper';
import { authReducer } from './auth';
import { graphQlQueryReducer } from './graphQlQuery';
import { graphQlResponseSlice } from './graphQlResponse';
import { settingsReducer, settingsSlice } from './settings';

import { createWrapper } from 'next-redux-wrapper';

const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer: {
      auth: authReducer,
      settings: settingsReducer,
      graphQlQuery: graphQlQueryReducer,
      [graphQlResponseSlice.reducerPath]: graphQlResponseSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(
          nextReduxCookieMiddleware({
            subtrees: [
              {
                subtree: `${settingsSlice.name}.language`,
                cookieName: 'APP_LANGUAGE',
                maxAge: 7 * 24 * 3600,
                sameSite: true,
                serializationFunction: String,
                deserializationFunction: String,
                defaultState: settingsSlice.getInitialState().language,
              },
            ],
          })
        )
        .concat(graphQlResponseSlice.middleware),
  })
);

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];

export const storeWrapper = createWrapper<AppStore>(makeStore);
