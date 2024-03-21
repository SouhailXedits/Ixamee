'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Input from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormError from '@/components/ui/form-error';
import FormSuccess from '@/components/ui/form-success';
import { IoKeyOutline } from 'react-icons/io5';
import { updatePassword } from '@/actions/profile/updateUserpassword';
import { UpdatePasswordSchema } from '@/actions/profile/schemas';

interface UpdatePasswordProps {
  currentUser: any;
}

const UpdatePassword = ({ currentUser }: UpdatePasswordProps) => {
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const currId = currentUser.id;
  const form = useForm<z.infer<typeof UpdatePasswordSchema>>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      email: currentUser?.email || '',
      actualPassord: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof UpdatePasswordSchema>) => {
    setError('');
    setSuccess('');
    values.email = currentUser?.email || '';
    try {
      const data = await updatePassword(values);
      setError(data.error);
      setSuccess(data.success);
      if (data.success) {
        setIsFirstModalOpen(true);
      }
    } catch (error) {
      setError('An error occurred while updating the password.');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={!isFirstModalOpen ? 'sm:max-w-[518px]' : 'sm:max-w-[400px]'}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <DialogHeader>
              <DialogTitle className="text-[#1B8392] text-xl font-medium mb-2 ">
                Modifier mot de passe
              </DialogTitle>
            </DialogHeader>
            <FormError message={error} />
            <FormSuccess message={success} />
            {!isFirstModalOpen ? (
              <>
                <div className="flex flex-col w-full gap-2">
                  <FormField
                    control={form.control}
                    name="actualPassord"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Mot de passe actuel <span className="text-red"> *</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type={showPassword ? 'text' : 'password'}
                            name="actualPassord"
                            placeholder="Entrez votre mot de passe actuel"
                            className="max-w-full "
                            disabled={form.formState.isSubmitting}
                            icon={<IoKeyOutline className="w-5 h-5 text-muted-foreground" />}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col w-full gap-2">
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Confirmez le nouveau mot de passe <span className="text-red"> *</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type={showPassword ? 'text' : 'password'}
                            name="newPassword"
                            placeholder="Entrez votre nouveau mot de passe"
                            className="max-w-full "
                            disabled={form.formState.isSubmitting}
                            icon={<IoKeyOutline className="w-5 h-5 text-muted-foreground" />}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col w-full gap-2">
                  <FormField
                    control={form.control}
                    name="confirmNewPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Confirmez le nouveau mot de passe <span className="text-red"> *</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            icon={<IoKeyOutline className="w-5 h-5 text-muted-foreground" />}
                            type={showPassword ? 'text' : 'password'}
                            name="confirmNewPassword"
                            placeholder="Confirmez votre nouveau mot de passe"
                            className="max-w-full "
                            disabled={form.formState.isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            ) : (
              <div className="
