import { Link } from 'react-router';

import { ROUTES } from '@/shared/model';

import { AuthLayout } from './ui/auth-layout';
import { RegisterForm } from './ui/register-form';

function Register() {
  return (
    <AuthLayout
      title="Зарегистрироваться"
      description="Введите свои данные, чтобы зарегистрироваться"
      footerText={
        <>
          Уже есть аккаунт?{' '}
          <Link className="underline underline-offset-4" to={ROUTES.LOGIN}>
            Войти
          </Link>
        </>
      }
      form={<RegisterForm />}
    />
  );
}

export const Component = Register;
