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
import { NewPasswordSchema } from '@/actions/auth/schemas';
import { Input } from '@/components/ui/auth-input';
import { Button } from '@/components/ui/button';
import FormError from '@/components/ui/form-error';
import FormSuccess from '@/components/ui/form-success';
import { useEffect, useState, useTransition } from 'react';
import { IoKeyOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { newPassword } from '@/actions/auth/new-password';
import { useSearchParams } from 'next/navigation';
interface VerificationData {
  email?: string;
}
export default function ResetForm({ email }: VerificationData) {
  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const router = useRouter();
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isUpdatedSuccessfully, setUpdatedSuccessfully] = useState<boolean>(false);

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError('');
    setSuccess('');
    values.email = email || '';
    
    startTransition(async () => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        if (data.success) {
          setUpdatedSuccessfully(true);
        }
        localStorage.removeItem('email-verification');
      });
    });
  };

  useEffect(() => {
    if (isUpdatedSuccessfully) {
      router.push('/login');
    }
  }, [isUpdatedSuccessfully, router]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" method="post">
        <FormError message={error} />
        <FormSuccess message={success} />
        <div className="w-full flex flex-col gap-4 mb-5">
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" whitespace-nowrap">
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
            form.formState.isValid ? 'bg-[#1B8392]' : 'bg-[#99c6d3]'
          }  w-full h-10 pt-2 font-semibold items-start justify-center rounded-lg text-center text-white text-base hover:opacity-75 `}
        >
          Soumettre
        </Button>
      </form>
    </Form>
  );
}
