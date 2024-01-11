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
import { Button } from '@/components/ui/button';
import FormError from '@/components/ui/form-error';
import FormSuccess from '@/components/ui/form-success';
import { useState } from 'react';
import { useTransition } from 'react';
import { ProfAfterSchema } from '@/actions/auth/schemas';
import { SelectScrollable } from './SelectScrollable';
import { FaGraduationCap } from 'react-icons/fa';


export default function ProfAfterForm() {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<z.infer<typeof ProfAfterSchema>>({
    resolver: zodResolver(ProfAfterSchema),
    defaultValues: {
      subject: '',
      etablissement: '',
      systeme: '',
    },
  });
  const govOptions = [
    { id: 1, value: 'tunis', label: 'Tunis' },
    { id: 1, value: 'sousse', label: 'Sousse' },
    { id: 1, value: 'beja', label: 'Beja' },
  ];
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values: z.infer<typeof ProfAfterSchema>) => {
    setError('');
    setSuccess('');
    // startTransition(() => {
    //   updateTeacherAfterGoogle(values).then((data) => {
    //     setError(data.error);
    //     setSuccess(data.success);
    //   });
    // });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <FormError message={error} />
        <FormSuccess message={success} />

        <div className="w-full flex flex-col gap-4">
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
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Matière<span className="text-red"> *</span>
                </FormLabel>
                <FormControl className="flex-grow ">
                  <SelectScrollable
                    field={field}
                    placeholder={'Choisissez votre matière'}
                    options={govOptions}
                    icon={<FaGraduationCap className="text-gray w-5 h-5" />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="systeme"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Système pédagogique<span className="text-red"> *</span>
                </FormLabel>
                <FormControl className="flex-grow ">
                  <SelectScrollable
                    field={field}
                    placeholder={'Choisissez votre système pédagogique'}
                    options={govOptions}
                    icon={<FaGraduationCap className="text-gray w-5 h-5" />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="bg-[#99c6d3] font-semibold w-full h-12 pt-3 items-start justify-center rounded-lg text-center text-white text-base hover:opacity-75">
          Suivant
        </Button>
      </form>
    </Form>
  );
}
