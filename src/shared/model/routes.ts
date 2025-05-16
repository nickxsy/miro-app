import 'react-router';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  BOARDS: '/boards',
  BOARDS_FAVORITE: '/boards/favorite',
  BOARDS_RECENT: '/boards/recent',
  BOARD: '/boards/:boardId',

  // OTHER ROUTE
  NOT_FOUND: '*'
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];

export type PathParams = {
  [ROUTES.BOARD]: { boardId: string };
};

declare module 'react-router' {
  interface Register {
    params: PathParams;
  }
}
