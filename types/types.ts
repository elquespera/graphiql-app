export interface IAuth {
  isAuth: boolean;
  userEmail?: string | null;
}

export interface ISettings {
  language: AppLanguage;
}

export type QueryHeader = [string, string];

export interface IGraphQLQuery {
  query: string;
  variables?: string;
  headers: Record<string, string>;
}

export const AppLanguages = ['en', 'ru'] as const;

export type AppLanguage = (typeof AppLanguages)[number];
