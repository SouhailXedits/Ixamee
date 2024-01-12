'use client';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { VerifSchema } from '@/actions/auth/schemas';
import { Button } from '@/components/ui/button';
import FormError from '@/components/ui/form-error';
import FormSuccess from '@/components/ui/form-success';
import { useCallback, useEffect, useState } from 'react';
import { useTransition } from 'react';
import { GoShieldCheck } from 'react-icons/go';

import { Input } from '@/components/ui/auth-input';
import { useSearchParams } from 'next/navigation';
import { emailVerification } from '@/actions/auth/email-verification';
export default function VerifForm({ code }: { code: string }) {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<z.infer<typeof VerifSchema>>({
    resolver: zodResolver(VerifSchema),
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = useCallback(() => {
    if (success || error) {
      return;
    }
    const formData = form.getValues();
    if (code === formData.code) {
      emailVerification('mohamed.amine.slimani@horizon-tech.tn')
        .then((data) => {
          setSuccess(data.success);
          setError(data.error);
        })
        .catch(() => {
          setError('Quelque chose malle passée !');
        });
    } else {
      setError('Code invalid !');
    }
  }, [code]);

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
          className="bg-[#99c6d3] w-full h-10 pt-2 font-semibold items-start justify-center rounded-lg text-center text-white text-base hover:opacity-75"
        >
          Vérifier
        </Button>
      </form>
    </Form>
  );
}
