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
import { AfterSchema } from '@/actions/auth/schemas';
import { Button } from '@/components/ui/button';
import FormError from '@/components/ui/form-error';
import FormSuccess from '@/components/ui/form-success';
import { login } from '@/actions/auth/login';
import { useState } from 'react';
import { useTransition } from 'react';
export default function AfterForm() {
  const [error, setError] = (useState < string) | (undefined > '');
  const [success, setSuccess] = (useState < string) | (undefined > '');

  const form =
    useForm <
    z.infer <
    typeof AfterSchema >>
      {
        resolver: zodResolver(AfterSchema),
        defaultValues: {
          government: '',
          etablissement: '',
          classe: '',
        },
      };
  const [showPassword, setShowPassword] = useState(false);

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof AfterSchema>) => {
    setError('');
    setSuccess('');
    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
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
            name="government"
            render={({ field }) => (
              <FormField
                control={form.control}
                name="government"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Government<span className="text-red"> *</span>
                    </FormLabel>
                    <FormControl className="flex-grow ">
                      <SelectScrollable
                        field={field}
                        placeholder={'Choisissez votre gouvernerat'}
                        options={govOptions}
                        icon={<FaGraduationCap className="text-gray w-5 h-5" />}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          />
          <FormField
            control={form.control}
            name="etablissement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Établissement<span className="text-red"> *</span>
                </FormLabel>
                <FormControl className="flex-grow ">
                  <SelectScrollable
                    field={field}
                    placeholder={'Choisissez votre établissement'}
                    options={govOptions}
                    icon={<FaGraduationCap className="text-gray w-5 h-5" />}
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
            name="classe"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Classe<span className="text-red"> *</span>
                </FormLabel>
                <FormControl className="flex-grow ">
                  <SelectScrollable
                    field={field}
                    placeholder={'Choisissez votre classe'}
                    options={govOptions}
                    icon={<FaGraduationCap className="text-gray w-5 h-5" />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={isPending}
          className="bg-[#99c6d3] w-full h-10 pt-2 font-semibold items-start justify-center rounded-lg text-center text-white text-base hover:opacity-75"
        >
          Continue
        </Button>
      </form>
    </Form>
  );
}
