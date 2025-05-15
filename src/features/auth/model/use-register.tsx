import { useNavigate } from 'react-router';

import { publicRqClient } from '@/shared/api/instance';
import type { ApiSchemas } from '@/shared/api/schema';
import { ROUTES, useSession } from '@/shared/model';

export function useRegister() {
  const navigate = useNavigate();
  const session = useSession();

  const registerMutation = publicRqClient.useMutation(
    'post',
    '/auth/register',
    {
      onSuccess(data) {
        session.login(data.accessToken);
        navigate(ROUTES.BOARDS);
      }
    }
  );

  const register = (data: ApiSchemas['RegisterRequest']) => {
    registerMutation.mutate({ body: data });
  };

  const errorMessage = registerMutation.isError
    ? registerMutation.error?.message
    : undefined;

  return {
    register,
    isPending: registerMutation.isPending,
    errorMessage
  };
}
