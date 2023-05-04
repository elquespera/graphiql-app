import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth';
import { graphQlResponseSlice } from './graphQlResponse';
import { graphQlQueryReducer } from './graphQlQuery';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    graphQlQuery: graphQlQueryReducer,
    [graphQlResponseSlice.reducerPath]: graphQlResponseSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(graphQlResponseSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
