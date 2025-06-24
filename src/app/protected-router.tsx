import { Navigate, Outlet, redirect } from 'react-router';

import { enableMocking } from '@/shared/api';
import { ROUTES, useSession } from '@/shared/model';

export function ProtectedRoute() {
  const { session } = useSession();

  if (!session) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <Outlet />;
}

export async function protectedLoader() {
  await enableMocking();

  const token = await useSession.getState().refreshToken();

  if (!token) {
    return redirect(ROUTES.LOGIN);
  }

  return null;
}
