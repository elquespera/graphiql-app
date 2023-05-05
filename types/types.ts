export interface IAuth {
  isAuth: boolean;
  userEmail?: string | null;
}

export interface ISettings {
  language: AppLanguage;
}

export interface IGraphQLQuery {
  query: string;
  variables?: string;
}

export const AppLanguages = ['en', 'ru'] as const;

export type AppLanguage = (typeof AppLanguages)[number];
