import 'react-router';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  BOARDS: '/boards',
  BOARD: '/boards/:boarId',

  // OTHER ROUTE
  NOT_FOUND: '*'
} as const;

export type PathParams = {
  [ROUTES.BOARD]: { boarId: string };
};

declare module 'react-router' {
  interface Register {
    params: PathParams;
  }
}
