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
import { InvitSchema } from '@/actions/auth/schemas';
import { Input } from '@/components/ui/auth-input';
import { Button } from '@/components/ui/button';
import FormError from '@/components/ui/form-error';
import FormSuccess from '@/components/ui/form-success';
import { useEffect, useState, useTransition } from 'react';
import { IoKeyOutline } from 'react-icons/io5';
import bcryptjs from 'bcryptjs';
import { generateSixDigitNumber } from '@/actions/auth/codeGenerator';
import { useRouter } from 'next/navigation';
import { sendEmailVerificationToken } from '@/actions/auth/sendEmailVerificationToken';
import { RegisterInvitedStudent } from '@/actions/auth/registerInvitedStudent';
import { login } from '@/actions/auth/login';

export default function InvitForm({ email }: any) {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const router = useRouter();
  const form = useForm<z.infer<typeof InvitSchema>>({
    resolver: zodResolver(InvitSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isRegistrationFormSuccessful, setRegistrationFormSuccessful] = useState<boolean>(false);

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof InvitSchema>) => {
    setError('');
    setSuccess('');
    values.email = email;

    startTransition(async () => {
      let code = generateSixDigitNumber();
      const hashedCode = await bcryptjs.hash(code + '', 10);
      RegisterInvitedStudent(values, code).then((data) => {
        setError(data?.error);

        setSuccess(data?.success);

        login(
          {
            email: values?.email || '',
            password: values?.password,
            rememberMe: true,
          },
          123456
        ).then(() => {
          console.log('logged in successfully');
          localStorage.removeItem('new-verification');
          setRegistrationFormSuccessful(true);
        });
      });
    });
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full mt-4" method="post">
        <FormError message={error} />
        <FormSuccess message={success} />
        <div className="w-full flex flex-col gap-4 mb-5">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#727272]">
                  Mot de passe<span className="text-red"> *</span>
                </FormLabel>
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" whitespace-nowrap text-[#727272]">
                  Vérification du mot de passe<span className="text-red"> *</span>
                </FormLabel>
                <FormControl className="relative">
                  <Input
                    {...field}
                    placeholder="Vérifiez le mot de passe"
                    type={showPassword ? 'text' : 'password'}
                    icon={<IoKeyOutline className="text-muted-foreground w-5 h-5" />}
                    disabled={isPending}
                    className=" max-w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          name="submitButton"
          type="submit"
          disabled={isPending}
          className={`${
            form.formState.isValid ? 'bg-2' : 'bg-12'
          }  w-full h-10 pt-2  items-start justify-center rounded-lg text-center text-white text-base hover:opacity-75`}
        >
          {isPending ? ' En cours...' : "Accepter l'invitation"}
        </Button>
      </form>
    </Form>
  );
}
