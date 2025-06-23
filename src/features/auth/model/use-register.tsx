import { useNavigate } from 'react-router';

import { type ApiSchemas, publicRqClient } from '@/shared/api';
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
