import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Checkbox } from '@/components/ui/auth-checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/auth-input';
import { Button } from '@/components/ui/button';
import FormError from '@/components/ui/form-error';
import FormSuccess from '@/components/ui/form-success';
import { login, sendEmailVerificationToken } from '@/actions/auth/login';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { MdOutlineEmail } from 'react-icons/md';
import { IoKeyOutline } from 'react-icons/io5';
import bcryptjs from 'bcryptjs';
import { generateSixDigitNumber } from '@/actions/auth/codeGenerator';
import { useSearchParams } from 'next/navigation';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  rememberMe: z.boolean(),
});

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorAuth = searchParams.get('error');

  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isRegistrationFormSuccessful, setRegistrationFormSuccessful] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onEnter = useCallback(() => {
    if (errorAuth) {
      setError('E-mail déjà utilisée');
    }
  }, [errorAuth]);

  useEffect(() => {
    onEnter();
  }, [onEnter]);

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('');
    setSuccess('');

    const code = generateSixDigitNumber();
    const hashedCode = bcryptjs.hashSync(code, 10);

    login(values, hashedCode)
      .then((data) => {
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
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  useEffect(() => {
    if (isRegistrationFormSuccessful) {
      router.push('/teacher-after');
    }
  }, [isRegistrationFormSuccessful, router]);

  return (
    <Form>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" method="post">
        <FormError message={error} />
        <FormSuccess message={success} />
        <div className="w-full flex flex-col gap-4">
          <FormField
            control={{ ...register('email') }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Entrez votre e-mail"
                    name="e-mail"
                    type="email"
                    icon={<MdOutlineEmail className="text-muted-foreground w-5 h-5" />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={{ ...register('password') }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl className="relative">
                  <Input
                    {...field}
                    placeholder="Entrez votre mot de passe"
                    name="mot de passe"
                    type={showPassword ? 'text' : 'password'}
                    icon={<IoKeyOutline className="text-muted-foreground w-5 h-5" />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center">
          <FormField
            control={{ ...register('rememberMe') }}
            render={({ field }) => (
              <FormLabel className="flex w-full justify-between">
                <div className="flex items-center ">
                  <Checkbox
                    className="mr-1 checked:bg-transparent border-gray"
                   
