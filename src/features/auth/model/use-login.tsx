import { useNavigate } from 'react-router';

import { publicRqClient } from '@/shared/api/instance';
import type { ApiSchemas } from '@/shared/api/schema';
import { ROUTES, useSession } from '@/shared/model';

export function useLogin() {
  const navigate = useNavigate();
  const session = useSession();

  const loginMutation = publicRqClient.useMutation('post', '/auth/login', {
    onSuccess(data) {
      session.login(data.accessToken);
      navigate(ROUTES.BOARDS);
    }
  });

  const login = (data: ApiSchemas['LoginRequest']) => {
    loginMutation.mutate({ body: data });
  };

  const errorMessage = loginMutation.isError
    ? loginMutation.error?.message
    : undefined;

  return {
    login,
    isPending: loginMutation.isPending,
    errorMessage
  };
}
