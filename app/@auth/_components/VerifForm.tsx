import React, { useEffect, useCallback, useState, useTransition } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { NewVerifSchema } from '@/actions/auth/schemas';
import { Button } from '@/components/ui/button';
import FormError from '@/components/ui/form-error';
import FormSuccess from '@/components/ui/form-success';
import { GoShieldCheck } from 'react-icons/go';
import { Input } from '@/components/ui/auth-input';
import { useRouter, useSearchParams } from 'next/navigation';
import bcryptjs from 'bcryptjs';
import Link from 'next/link';
import { sendVerificationEmail } from '@/lib/mail';
import { emailVerification } from '@/actions/auth/email-verification';
import { sendEmailVerificationToken } from '@/actions/auth/sendEmailVerificationToken';
import { login } from '@/actions/auth/login';
import { renvoyer } from '@/actions/auth/renvoyer-email';
import AuthErrorPage from '../(routes)/error/page';

interface VerificationData {
  email?: string;
  code?: number;
}

export default function VerifForm({ email, code }: VerificationData) {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [isRegistrationSuccessful, setRegistrationSuccessful] = useState<boolean>(false);
  const [isDisabled, setDisabled] = useState<boolean>(false);

  const [renvoyerDisabled, setRenvoyerDisabled] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (renvoyerDisabled) {
      timer = setTimeout(() => {
        setRenvoyerDisabled(false);
      }, 60000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [renvoyerDisabled]);

  const form = useForm<z.infer<typeof NewVerifSchema>>({
    resolver: zodResolver(NewVerifSchema),
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = useCallback(async () => {
    setError('');
    setSuccess('');
    if (success || error) {
      return;
    }

    const formData = form.getValues();

    try {
      const storedVerificationData = JSON.parse(localStorage.getItem('new-verification') || '{}');
      const codeMatch = await bcryptjs.compare(formData.code, storedVerificationData.code);

      if (storedVerificationData && codeMatch) {
        const data = await emailVerification(storedVerificationData.email, token);
        setSuccess(data.success);
        setError(data.error);
        if (data.success && !storedVerificationData?.role) {
          setRegistrationSuccessful(true);
        } else if (storedVerificationData?.role === 'STUDENT') {
          setDisabled(true);
          login(
            {
              email: storedVerificationData?.email || '',
              password: storedVerificationData?.password,
              rememberMe: storedVerificationData?.rememberMe || true,
            },
            123456
          ).then(() => {
            localStorage.removeItem('new-verification');
          });
        }
      } else {
        setError('Code invalid!');
      }
    } catch (err) {
      setError("Quelque chose s'est mal passé !");
    }
  }, [form, success, error, token]);

  useEffect(() => {
    if (isRegistrationSuccessful) {
      router.push('/teacher-after');
    }
  }, [isRegistrationSuccessful, router]);

  const [isPending, startTransition] = useTransition();
  const handleResendVerificationEmail = async () => {
    setSuccess('');
    setError('');
    setRenvoyerDisabled(true);
    startTransition(async () => {
      if (email && code) {
        renvoyer(email, 'email').then((data) => {
          setError(data.error);
          setSuccess(data.success);
          const hashedCode = data.hashedCode;
          const storedVerificationData = JSON.parse(
            localStorage.getItem('new-verification') || '{}'
          );
          localStorage.setItem(
            'new-verification',
            JSON.stringify({
              email: email,
              code: hashedCode,
              role: storedVerificationData?.role,
              password: storedVerificationData?.password,
              rememberMe: storedVerificationData?.rememberMe,
            })
          );
        });
      }
    });
  };

  if (!token) {
    return <AuthErrorPage />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormError message={error} />
        <FormSuccess message={success} />
        <div className="w-full flex flex-col gap-4">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Entrer le code ici"
                    type="text"
                    icon={<GoShieldCheck className="text-muted-foreground w-5 h-5" />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          name="submitButton"
          disabled={isPending || isDisabled}
          type="submit"
          className={`${
            form.formState.isValid ? 'bg-2' : 'bg-12'
          } font-semibold w-full h-12 pt-3 items-start justify-center rounded-lg text-center text-white text-base hover:opacity-75`}
        >
          {isPending || isDisabled ? 'Verification en cours...' : 'Vérifier'}
        </Button>
        <div className="flex flex-col gap-3 w-full items-center  gap-x-2">
          <div className="flex ">
            <p className="text-center text-[#727272] ">Vous n&apos;avez pas reçu le code? </p>
            &nbsp;
            <Link
              className={`text-center ${
                renvoyerDisabled ? 'text-gray-500 cursor-not-allowed' : 'text-2 hover:underline'
              } font-semibold`}
              href={''}
              onClick={renvoyerDisabled ? undefined : handleResendVerificationEmail}
            >
              Renvoyez
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}
