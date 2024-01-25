'use client';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@/components/ui/auth-checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { LoginSchema } from '@/actions/auth/schemas';
import { Input } from '@/components/ui/auth-input';
import { Button } from '@/components/ui/button';
import FormError from '@/components/ui/form-error';
import FormSuccess from '@/components/ui/form-success';
import { login } from '@/actions/auth/login';
import { useCallback, useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import { MdOutlineEmail } from 'react-icons/md';
import { IoKeyOutline } from 'react-icons/io5';
import bcryptjs from 'bcryptjs';
import { generateSixDigitNumber } from '@/actions/auth/codeGenerator';
import { useRouter, useSearchParams } from 'next/navigation';
import { sendEmailVerificationToken } from '@/actions/auth/sendEmailVerificationToken';

export default function LoginForm() {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const router = useRouter();
  
  const searchParams = useSearchParams();
  const errorAuth = searchParams.get('error');
  const onEnter = useCallback(async () => {
    if (errorAuth) {
      setError('E-mail déjà utilisée');
    }
  }, [errorAuth]);

  useEffect(() => {
    onEnter();
  }, [onEnter]);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isRegistrationFormSuccessful, setRegistrationFormSuccessful] = useState<boolean>(false);

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('');
    setSuccess('');
    startTransition(async () => {
      let code = generateSixDigitNumber();
      const hashedCode = await bcryptjs.hash(code + '', 10);
      login(values, code).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        if (data?.success === 'Un e-mail a été envoyé ! Veuillez vérifier votre compte.') {
          localStorage.setItem(
            'new-verification',
            JSON.stringify({
              email: values.email,
              code: hashedCode,
              role: data.role,
              password: values.password,
              rememberMe: values.rememberMe,
            })
          );
          sendEmailVerificationToken(values.email);
        }
        if (data?.success === 'Vous étes presque arrivé ! complete votre inscription') {
          localStorage.setItem(
            'new-verification',
            JSON.stringify({
              email: values.email,
              code: hashedCode,
              password: values.password,
              rememberMe: values.rememberMe,
            })
          );
          setRegistrationFormSuccessful(true);
        }
      });
    });
  };

  useEffect(() => {
    if (isRegistrationFormSuccessful) {
      router.push('/teacher-after');
    }
  }, [isRegistrationFormSuccessful, router]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" method="post">
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
                    icon={<MdOutlineEmail className="text-muted-foreground w-5 h-5" />}
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
                    icon={<IoKeyOutline className="text-muted-foreground w-5 h-5" />}
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
                  <Checkbox
                    className="mr-1 checked:bg-transparent border-gray"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    name="rester connecté"
                    disabled={isPending}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Rester connecté
                  </label>
                </div>
                <Button
                  size="sm"
                  variant="link"
                  asChild
                  className="text-center text-mainGreen hover:underline text-sm font-semibold max-md:text-xs"
                >
                  <Link href={'/reset-password'}>Mot de passe oublié?</Link>
                </Button>
              </FormLabel>
            )}
          />
        </div>
        <Button
          name="submitButton"
          type="submit"
          disabled={isPending}
          className={`${
            form.formState.isValid ? 'bg-[#1B8392]' : 'bg-[#99c6d3]'
          }  w-full h-10 pt-2 font-semibold items-start justify-center rounded-lg text-center text-white text-base hover:opacity-75`}
        >
          Se connecter
        </Button>
      </form>
    </Form>
  );
}
