export interface IAuth {
  isAuth: boolean;
  userEmail?: string | null;
}

export interface IGraphQLQuery {
  query: string;
  variables?: string;
}
