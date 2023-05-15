export interface IAuth {
  isAuth: boolean;
  userEmail?: string | null;
}

export interface ISettings {
  language: AppLanguage;
}

export interface QueryHeader {
  id: string;
  key: string;
  value: string;
}

export interface IGraphQLQuery {
  query: string;
  variables?: string;
  headers: QueryHeader[];
}

export const AppLanguages = ['en', 'ru'] as const;

export type AppLanguage = (typeof AppLanguages)[number];
