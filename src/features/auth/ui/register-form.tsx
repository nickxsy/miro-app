import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/shared/ui/kit/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/shared/ui/kit/form';
import { Input } from '@/shared/ui/kit/input';

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
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="admin@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Подтвердите пароль</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {errorMessage && <p className="text-destructive">{errorMessage}</p>}
        <Button disabled={isPending} type="submit">
          Зарегистрироваться
        </Button>
      </form>
    </Form>
  );
}
