import { RouterProvider, createBrowserRouter, redirect } from 'react-router';

import { ROUTES } from '@/shared/model';

import { AppHeader } from '@/features/header';

import App from './app';
import { ProtectedRoute, protectedLoader } from './protected-router';
import { Providers } from './providers';

const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    children: [
      {
        loader: protectedLoader,
        element: (
          <>
            <AppHeader />
            <ProtectedRoute />
          </>
        ),
        children: [
          {
            path: ROUTES.BOARDS,
            lazy: () => import('@/features/boards-list/boards-list.page')
          },
          {
            path: ROUTES.BOARDS_FAVORITE,
            lazy: () =>
              import('@/features/boards-list/boards-list-favorite.page')
          },
          {
            path: ROUTES.BOARDS_RECENT,
            lazy: () => import('@/features/boards-list/boards-list-recent.page')
          },
          {
            path: ROUTES.BOARD,
            lazy: () => import('@/features/board/board.page')
          }
        ]
      },
      {
        path: ROUTES.REGISTER,
        lazy: () => import('@/features/auth/register.page')
      },
      {
        path: ROUTES.LOGIN,
        lazy: () => import('@/features/auth/login.page')
      },
      {
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.BOARDS)
      }
    ]
  }
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
