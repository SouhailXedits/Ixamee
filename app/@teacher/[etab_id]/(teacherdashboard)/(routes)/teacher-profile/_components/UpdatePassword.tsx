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
import { useFormik } from 'formik';
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
import { UpdatePasswordSchema } from '@/actions/auth/schemas';
import FormError from '@/components/ui/form-error';
import FormSuccess from '@/components/ui/form-success';
import { IoKeyOutline } from 'react-icons/io5';
interface AjouterUneClasse {
  children: React.ReactNode;
  currentUser: any;
}

export const UpdatePassword = ({ children, currentUser }: AjouterUneClasse) => {
  console.log(currentUser);

  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const currId = currentUser.id;
  const form = useForm<z.infer<typeof UpdatePasswordSchema>>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      actualPassord: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });
  const [isTransPending, startTransition] = useTransition();
  const onSubmit = async (values: z.infer<typeof UpdatePasswordSchema>) => {
    console.log('🚀 ~ onSubmit ~ values:', values);
    setError('');
    setSuccess('');
    startTransition(() => {
      
      setIsFirstModalOpen(!isFirstModalOpen);
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={!isFirstModalOpen ? 'sm:max-w-[518px]' : 'sm:max-w-[400px]'}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
            <DialogHeader>
              <DialogTitle className="text-[#1B8392] text-xl font-medium mb-2 ">
                Modifier mot de passe
              </DialogTitle>
            </DialogHeader>
            <FormError message={error} />
            <FormSuccess message={success} />
            {!isFirstModalOpen ? (
              <div className="flex flex-col gap-6 placeholder:text-[#727272] items-center">
                <div className="flex flex-col gap-2 w-full">
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
                            className=" max-w-full"
                            disabled={false}
                            icon={<IoKeyOutline className="text-muted-foreground w-5 h-5" />}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
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
                            className=" max-w-full"
                            disabled={false}
                            icon={<IoKeyOutline className="text-muted-foreground w-5 h-5" />}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
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
                            icon={<IoKeyOutline className="text-muted-foreground w-5 h-5" />}
                            type={showPassword ? 'text' : 'password'}
                            name="name"
                            placeholder="Confirmez votre nouveau mot de passe"
                            className=" max-w-full"
                            disabled={false}
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
                  Mot ed passe modifier avec succees.
                </div>
              </div>
            )}
            <DialogFooter className=" mt-3">
              <DialogClose className="flex gap-4 w-full">
                <Button
                  type="reset"
                  className="w-full bg-[white] text-[#1B8392] border-solid border-2 border-[#1B8392] hover:opacity-80 "
                >
                  Annuler
                </Button>
                <Button
                  // onClick={() => setIsFirstModalOpen(!isFirstModalOpen)}
                  type="submit"
                  className="w-full bg-[#1B8392] hover:opacity-80 "
                >
                  Modifier
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
