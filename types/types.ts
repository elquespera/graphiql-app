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
  url: string;
  query: string;
  variables?: string;
  headers: QueryHeader[];
}

export interface IGraphQlTypeDescription {
  kind: string;
  name: string;
  ofType?: IGraphQlTypeDescription;
}

export interface IGraphQlArg {
  name: string;
  description?: string;
  defaultValue?: string;
  type?: IGraphQlTypeDescription;
}

export interface IGraphQlField {
  name: string;
  description?: string;
  args?: IGraphQlArg[];
  type?: IGraphQlTypeDescription;
}

export interface IGraphQlEnumValue {
  name: string;
  description?: string;
}

export interface IGraphQlType {
  kind: string;
  name: string;
  description?: string;
  fields: IGraphQlField[];
  enumValues?: IGraphQlEnumValue[];
}

export interface IGraphQlSchema {
  data: {
    __schema: {
      queryType?: {
        name: string;
      };
      mutationType?: {
        name: string;
      };
      subscriptionType?: {
        name: string;
      };
      types: IGraphQlType[];
    };
  };
}

export type IGraphQLQueryPartial = Partial<IGraphQLQuery>;

export const AppLanguages = ['en', 'ru'] as const;

export type AppLanguage = (typeof AppLanguages)[number];

export interface ApiUrlInfo {
  id: number;
  url: string;
  exampleQuery?: string;
  exampleVariables?: string;
}
