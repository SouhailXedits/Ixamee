'use client';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { LoginSchema } from '@/schemas';
import { Input } from '@/components/ui/auth-input';
import { Button } from '@/components/ui/button';
import FormError from '@/components/ui/form-error';
import FormSuccess from '@/components/ui/form-success';
import { login } from '@/actions/login';
import { useState } from 'react';
import Link from 'next/link';
import { MdOutlineEmail } from 'react-icons/md';
import { IoKeyOutline } from 'react-icons/io5';
import { useTransition } from 'react';
export default function LoginForm() {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('');
    setSuccess('');
    startTransition(() => {
      login(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormError message={error} />
        <FormSuccess message={success} />
        <div className="w-full flex flex-col gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Entrez votre e-mail"
                    type="email"
                    icon={<MdOutlineEmail className="text-gray w-5 h-5" />}
                    disabled={isPending}
                  />
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
                <FormLabel>Mot de passe</FormLabel>
                <FormControl className="relative">
                  <Input
                    {...field}
                    placeholder="Entrez votre mot de passe"
                    type={showPassword ? 'text' : 'password'}
                    icon={<IoKeyOutline className="text-gray w-5 h-5" />}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormLabel className="flex w-full justify-between">
                <div className="flex items-center ">
                  <Input {...field} type="checkbox" disabled={isPending} />
                  <span className="text-sm max-md:text-xs ">Rester connecté</span>
                </div>

                <Link
                  href={'resetPassword'}
                  className=" text-center text-mainGreen hover:underline text-sm font-semibold max-md:text-xs  "
                >
                  Mot de passe oublié?
                </Link>
              </FormLabel>
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={isPending}
          className="bg-[#99c6d3] w-full h-10 pt-2 font-semibold items-start justify-center rounded-lg text-center text-white text-base hover:opacity-75"
        >
          Se connecter
        </Button>
      </form>
    </Form>
  );
}
