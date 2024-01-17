import React, { useEffect, useCallback, useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { VerifSchema } from '@/actions/auth/schemas';
import { Button } from '@/components/ui/button';
import FormError from '@/components/ui/form-error';
import FormSuccess from '@/components/ui/form-success';
import { GoShieldCheck } from 'react-icons/go';
import { Input } from '@/components/ui/auth-input';
import { emailVerification } from '@/actions/auth/email-verification';
import { useRouter } from 'next/navigation';
import bcryptjs from 'bcryptjs';
export default function VerifForm() {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const router = useRouter();

  const [isRegistrationSuccessful, setRegistrationSuccessful] = useState<boolean>(false);

  const form = useForm<z.infer<typeof VerifSchema>>({
    resolver: zodResolver(VerifSchema),
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
      const storedVerificationData = JSON.parse(localStorage.getItem('email-verification') || '{}');
      const codeMatch = await bcryptjs.compare(formData.code, storedVerificationData.code);

      if (storedVerificationData && codeMatch) {
        const data = await emailVerification(storedVerificationData.email);
        setSuccess(data.success);
        setError(data.error);
        setRegistrationSuccessful(true);
      } else {
        setError('Code invalid!');
      }
    } catch (err) {
      setError("Quelque chose s'est mal passé !");
    }
  }, [form, success, error]);

  useEffect(() => {
    if (isRegistrationSuccessful) {
      router.push('/teacher-after');
    }
  }, [isRegistrationSuccessful, router]);

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
                    icon={<GoShieldCheck className="text-gray w-5 h-5" />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className={`${
            form.formState.isValid ? 'bg-[#1B8392]' : 'bg-[#99c6d3]'
          } font-semibold w-full h-12 pt-3 items-start justify-center rounded-lg text-center text-white text-base hover:opacity-75`}
        >
          Vérifier
        </Button>
      </form>
    </Form>
  );
}
