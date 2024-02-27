'use client';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/auth-input';
import Image from 'next/image';
import { useState, useTransition } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormError from '@/components/ui/form-error';
import FormSuccess from '@/components/ui/form-success';
import { IoKeyOutline } from 'react-icons/io5';
import { updatePassword } from '@/actions/profile/updateUserpassword';
import { UpdatePasswordSchema } from '@/actions/profile/schemas';
interface AjouterUneClasse {
  children: React.ReactNode;
  currentUser: any;
}

export const UpdatePassword = ({ children, currentUser }: AjouterUneClasse) => {
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const currId = currentUser.id;
  const form = useForm<z.infer<typeof UpdatePasswordSchema>>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      email: '',
      actualPassord: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const [isTransPending, startTransition] = useTransition();

  const onSubmit = async (values: z.infer<typeof UpdatePasswordSchema>) => {
    setError('');
    setSuccess('');
    values.email = currentUser?.email;
    startTransition(() => {
      updatePassword(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        if (data.success) {
          setIsFirstModalOpen(!isFirstModalOpen);
        }
      });
    });
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
              <div className="flex flex-col gap-6 placeholder:text-[#727272] items-center">
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
                            disabled={isTransPending}
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
                            disabled={isTransPending}
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
                            name="name"
                            placeholder="Confirmez votre nouveau mot de passe"
                            className="max-w-full "
                            disabled={isTransPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-5">
                <Image
                  src={'/etudiantajouteravecsucces.svg'}
                  alt=""
                  width={150}
                  height={150}
                  className=""
                />
                <div className="flex bg-[#E1FDEE] text-[#12B76A] items-center gap-4 p-2 pl-10 pr-10 rounded-lg ">
                  <Image src={'/subjects-green.svg'} alt="user" width={15} height={15} />
                  Mot de passe modifier avec succees.
                </div>
              </div>
            )}
            {!isFirstModalOpen ? (
              <DialogFooter className="mt-3 ">
                <DialogClose className="flex w-full gap-4">
                  <Button
                    disabled={isTransPending}
                    type="reset"
                    className="w-full bg-[white] text-[#1B8392] border-solid border-2 border-[#1B8392] hover:opacity-80 "
                  >
                    Annuler
                  </Button>
                </DialogClose>
                <Button
                  disabled={isTransPending}
                  type="submit"
                  className="w-full bg-[#1B8392] hover:opacity-80 "
                >
                  Modifier
                </Button>
              </DialogFooter>
            ) : (
              <DialogClose className="flex w-full gap-4">
                <Button
                  onClick={() => {
                    form.reset();
                    setIsFirstModalOpen(false);
                  }}
                  type="reset"
                  className="w-full bg-[white] text-[#1B8392] border-solid border-2 border-[#1B8392] hover:opacity-80 "
                >
                  Retournez
                </Button>
              </DialogClose>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
