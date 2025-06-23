import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button, Form, Input } from '@/shared/ui';

import { useLogin } from '../model/use-login';

const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Обязательное поле'
    })
    .min(2, {
      message: 'Еmail должен быть больше 2 символов'
    }),
  password: z
    .string({
      required_error: 'Обязательное поле'
    })
    .min(6, {
      message: 'Пароль должен быть больше 6 символов'
    })
});

export function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema)
  });

  const { errorMessage, isPending, login } = useLogin();

  const onSubmit = form.handleSubmit(login);

  return (
    <Form.Root {...form}>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <Form.Field
          control={form.control}
          name="email"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Email</Form.Label>
              <Form.Control>
                <Input.Root placeholder="admin@gmail.com" {...field} />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
        <Form.Field
          control={form.control}
          name="password"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Пароль</Form.Label>
              <Form.Control>
                <Input.Root type="password" placeholder="********" {...field} />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
        {errorMessage && <p className="text-destructive">{errorMessage}</p>}
        <Button.Root disabled={isPending} type="submit">
          Войти
        </Button.Root>
      </form>
    </Form.Root>
  );
}
