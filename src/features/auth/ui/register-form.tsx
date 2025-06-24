import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button, Form, Input } from '@/shared/ui';

import { useRegister } from '../model/use-register';

const registerSchema = z
  .object({
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
      }),
    confirmPassword: z.string().optional()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword']
  });

export function RegisterForm() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema)
  });

  const { register, errorMessage, isPending } = useRegister();

  const onSubmit = form.handleSubmit(register);

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
        <Form.Field
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Подтвердите пароль</Form.Label>
              <Form.Control>
                <Input.Root type="password" placeholder="********" {...field} />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
        {errorMessage && <p className="text-destructive">{errorMessage}</p>}
        <Button.Root disabled={isPending} type="submit">
          Зарегистрироваться
        </Button.Root>
      </form>
    </Form.Root>
  );
}
