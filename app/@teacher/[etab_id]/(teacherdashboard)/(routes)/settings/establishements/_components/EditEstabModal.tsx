'use client';
import { Button, Label, Input } from '@/components/ui';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';
import { useCreateEstab, useEditEstab } from '../hooks/useCreateEstab';
import { useForm } from 'react-hook-form';

interface EditEstabProps {
  id: number;
  currentName: string;
}

export const EditEstab = ({ id, currentName }: EditEstabProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, setValue, setError, clearErrors, formState: { errors } } = useForm();
  const { editEstablishement, isPending } = useEditEstab();

  async function onSubmit(data: any) {
    if (!data.name.trim()) {
      setError('name', { message: 'Le nom est requis.' });
      return;
    }

    await editEstablishement({ id, name: data.name.trim() });
    setIsOpen(false);
    clearErrors();
  }

  function toggleModal() {
    setIsOpen(!isOpen);
    setValue('name', currentName);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={!isOpen ? 'sm:max-w-[518px]' : 'sm:max-w-[400px]'}>
        <DialogHeader>
          <DialogTitle className="text-[#1B8392] text-xl font-medium ">
            Editer une établissement
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <Label className="text-[#959595]">
              Nom : <span className="text-red">*</span>
            </Label>
            <Input
              {...register('name', { required: 'Le nom est requis.' })}
              type="text"
              defaultValue={currentName}
              onChange={(e) => setValue('name', e.target.value)}
              placeholder="Entrer le nom de l'établissement"
              className="placeholder:text-[#727272]"
            />
            {errors.name && <p className="text-red">{errors.name.message}</p>}
          </div>

          <DialogFooter>
            <DialogClose className=" w-full">
              <Button
                onClick={toggleModal}
                type="button"
                disabled={isPending}
                className="w-full bg-[#1B8392] hover:opacity-80 "
              >
                {isOpen ? 'Annuler' : 'Modifier une établissement.'}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
