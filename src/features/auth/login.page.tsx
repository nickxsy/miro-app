import { Link } from 'react-router';

import { ROUTES } from '@/shared/model';

import { AuthLayout } from './ui/auth-layout';
import { LoginForm } from './ui/login-form';

function Login() {
  return (
    <AuthLayout
      title="Войти в аккаунт"
      description="Введите свои данные, чтобы войти в аккаунт"
      footerText={
        <>
          Нет аккаунта?{' '}
          <Link className="underline underline-offset-4" to={ROUTES.REGISTER}>
            Зарегистрироваться
          </Link>
        </>
      }
      form={<LoginForm />}
    />
  );
}

export const Component = Login;
