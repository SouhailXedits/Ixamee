import React, { useEffect, useCallback, useState, useTransition } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { ResetSchema } from '@/actions/auth/schemas';
import { Button } from '@/components/ui/button';
import FormError from '@/components/ui/form-error';
import FormSuccess from '@/components/ui/form-success';
import { GoShieldCheck } from 'react-icons/go';
import { Input } from '@/components/ui/auth-input';
import { useRouter } from 'next/navigation';
import bcryptjs from 'bcryptjs';
import Link from 'next/link';
import { sendVerificationEmail } from '@/lib/mail';
import { FaRegEnvelope } from 'react-icons/fa';
import { reset } from '@/actions/auth/reset';
import { generateSixDigitNumber } from '@/actions/auth/codeGenerator';

export default function SendEmailResetForm() {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const router = useRouter();

  const [isVerificationSuccessful, setVerificationSuccessful] = useState<boolean>(false);

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    },
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError('');
    setSuccess('');
    startTransition(async () => {
      let code = generateSixDigitNumber();
      const hashedCode = await bcryptjs.hash(code + '', 10);
      reset(values, code).then((data: any) => {
        setError(data?.error);
        setSuccess(data?.success);
        localStorage.setItem(
          'email-verification',
          JSON.stringify({ email: values.email, code: hashedCode })
        );
        if (data?.success) {
          setVerificationSuccessful(true);
        }
      });
    });
  };

  useEffect(() => {
    if (isVerificationSuccessful) {
      router.push('/email-verification');
    }
  }, [isVerificationSuccessful, router]);

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
                <FormControl>
                  <Input
                    disabled={isPending}
                    {...field}
                    placeholder="Entrez votre e-mail"
                    type="text"
                    icon={<FaRegEnvelope className="text-muted-foreground w-5 h-5" />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          disabled={isPending}
          name="submitButton"
          type="submit"
          className={`${
            form.formState.isValid ? 'bg-[#1B8392]' : 'bg-[#99c6d3]'
          } font-semibold w-full h-12 pt-3 items-start justify-center rounded-lg text-center text-white text-base hover:opacity-75 mt-24`}
        >
          Continuer
        </Button>
      </form>
    </Form>
  );
}
